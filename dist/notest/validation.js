"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notePayloadSchema = void 0;
exports.validateNotePayload = validateNotePayload;
const zod_1 = require("zod");
exports.notePayloadSchema = zod_1.z.object({
    title: zod_1.z.string().max(64),
    content: zod_1.z.string().max(10000),
});
function validateNotePayload(payload) {
    const parsed = exports.notePayloadSchema.safeParse(payload);
    if (!parsed.success) {
        const errors = parsed.error.issues.map((issue) => {
            if (issue.path.length > 0) {
                return `${issue.path.join('.')} ${issue.message}`;
            }
            return issue.message;
        });
        return { success: false, errors };
    }
    return { success: true, data: parsed.data, errors: [] };
}
