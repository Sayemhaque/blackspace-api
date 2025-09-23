import { Agent, run } from '@openai/agents';
import { Course } from 'src/drizzle/model';
import { z } from 'zod';

export const ModuleOutputSchema = z.object({
  title: z.string().min(1, 'Module title is required'),
  sequence: z.number().int().positive('Sequence must be a positive integer'),
  courseId: z.number().int().positive('Course ID must be positive'),
});
export const ModulesArraySchema = z.array(ModuleOutputSchema).min(1);
export const ModulesResponseSchema = z.object({
  modules: ModulesArraySchema,
});

export type ModuleOutput = z.infer<typeof ModuleOutputSchema>;
export type ModulesOutput = z.infer<typeof ModulesArraySchema>;
export type ModulesCreateInput = {
  title: string;
  sequence: number;
  courseId: number;
}[];

const moduleAgent = new Agent({
  name: 'Modules generator',
  instructions: `
    You are a professional course structuring assistant.
    Generate a complete module outline for a given course.

    Guidelines:
    - Return an object with a "modules" field that is an array of modules (not just one).
    - Titles must be concise and descriptive (3–8 words).
    - Sequence should reflect the module order (start at 1, increment by 1).
    - Use the exact courseId provided.
    - Ensure logical flow (introductory modules first, advanced topics later).
    - Typical courses should have between 4 and 12 modules, depending on complexity.

    Always return properly structured data matching the required schema (object with a "modules" array).
  `,
  outputType: ModulesResponseSchema,
});

export const aiModulesCreateAgent = async (
  course: Pick<Course, 'id' | 'title' | 'description'>,
): Promise<ModulesCreateInput> => {
  const result = await run(
    moduleAgent,
    `Create modules for the course (ID: ${course.id}) titled "${course.title}". 
    Description: ${course.description}`,
  );

  if (!result.finalOutput) {
    throw new Error('Agent failed to generate modules');
  }

  return result.finalOutput.modules as ModulesCreateInput;
};
