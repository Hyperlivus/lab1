import { z } from 'zod';

export const notePayloadSchema = z.object({
  title: z.string().max(64),
  content: z.string().max(10000),
});

export type NotePayload = z.infer<typeof notePayloadSchema>;

export function validateNotePayload(payload: unknown): { success: boolean; data?: NotePayload; errors: string[] } {
  const parsed = notePayloadSchema.safeParse(payload);
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
