import { render } from '../../src/health/render';

describe('Health Render', () => {
  describe('htmlPage', () => {
    it('should render HTML page with title and body', () => {
      const result = render.htmlPage('Test Title', '<p>Test body</p>');

      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain('<html>');
      expect(result).toContain('<head>');
      expect(result).toContain('<title>Test Title</title>');
      expect(result).toContain('<body>');
      expect(result).toContain('<h1>Test Title</h1>');
      expect(result).toContain('<p>Test body</p>');
    });
  });

  describe('endpointsList', () => {
    it('should render endpoints list', () => {
      const result = render.endpointsList();

      expect(result).toContain('<table');
      expect(result).toContain('GET');
      expect(result).toContain('/notes');
      expect(result).toContain('POST');
      expect(result).toContain('GET');
    });
  });

  describe('errorMessage', () => {
    it('should render error message', () => {
      const result = render.errorMessage('Health check failed');

      expect(result).toContain('<div style="color: #a00;">');
      expect(result).toContain('<h2>Помилка</h2>');
      expect(result).toContain('<p>Health check failed</p>');
    });
  });
});