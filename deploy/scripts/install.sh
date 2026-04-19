#!/bin/bash

set -e

# Variant number - replace with your actual variant
VARIANT=1

echo "Starting automated deployment for variant $VARIANT"

# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y nodejs npm postgresql postgresql-contrib nginx curl

# Install Node.js LTS if not available
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
    apt-get install -y nodejs
fi

# Create users
echo "Creating users..."

# student user
useradd -m -s /bin/bash student
echo "student:12345678" | chpasswd
chage -d 0 student  # Force password change on first login

# teacher user
useradd -m -s /bin/bash teacher
echo "teacher:12345678" | chpasswd
chage -d 0 teacher
usermod -aG sudo teacher

# app user (system user)
useradd -r -s /bin/false app

# operator user
useradd -m -s /bin/bash operator
echo "operator:12345678" | chpasswd
chage -d 0 operator

# Configure sudo for operator
echo "operator ALL=(ALL) NOPASSWD: /bin/systemctl start mywebapp, /bin/systemctl stop mywebapp, /bin/systemctl restart mywebapp, /bin/systemctl status mywebapp, /bin/systemctl reload nginx" > /etc/sudoers.d/operator
chmod 0440 /etc/sudoers.d/operator

# Create database
echo "Setting up database..."
sudo -u postgres createdb notes_db
sudo -u postgres createuser app
sudo -u postgres psql -c "ALTER USER app PASSWORD 'app_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE notes_db TO app;"

# Copy application files
echo "Copying application files..."
mkdir -p /opt/mywebapp
cp -r /path/to/project/* /opt/mywebapp/  # Replace with actual project path
chown -R app:app /opt/mywebapp

# Install dependencies and build
cd /opt/mywebapp
npm install
npm run build

# Copy config files
mkdir -p /etc/mywebapp
cp etc/mywebapp/config.env /etc/mywebapp/
chown app:app /etc/mywebapp/config.env
chmod 600 /etc/mywebapp/config.env

# Install systemd units
cp deploy/systemd/mywebapp.service /etc/systemd/system/
cp deploy/systemd/mywebapp.socket /etc/systemd/system/
systemctl daemon-reload
systemctl enable mywebapp.socket
systemctl start mywebapp.socket

# Configure nginx
cp deploy/nginx/mywebapp.conf /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/mywebapp.conf /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl reload nginx

# Create gradebook file
echo "$VARIANT" > /home/student/gradebook
chown student:student /home/student/gradebook

# Lock default user (assuming ubuntu)
passwd -l ubuntu

echo "Deployment completed successfully!"
echo "System is ready. Please change passwords on first login."