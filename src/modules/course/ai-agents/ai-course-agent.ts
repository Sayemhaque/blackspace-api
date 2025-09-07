import { Agent, run } from '@openai/agents';
import { z } from 'zod';

export const CourseOutputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  categoryId: z.number().int().positive('Category ID must be positive'),
  image: z.string().nullable().optional().default(null),
  discount: z.number().min(0).max(100).nullable().optional().default(null),
});

export type CourseOutput = z.infer<typeof CourseOutputSchema>;

const agent = new Agent({
  name: 'Course generator',
  instructions: `
    You are a professional course creation assistant. Generate comprehensive course data based on the user's request.
    
    Guidelines:
    - Create engaging, descriptive titles
    - Write detailed descriptions (minimum 100 characters)
    - Set reasonable prices based on course complexity
    - The categoryId will be provided to you, use the exact categoryId given
    - Suggest relevant image descriptions when applicable
    - Apply discounts strategically (0-30% for new courses)
    
    Always return properly structured data matching the required schema.
  `,
  outputType: CourseOutputSchema,
});

export const aiCourseCreateAgent = async (
  coursePrompt: string,
): Promise<CourseOutput> => {
  const result = await run(agent, `Create a course about: ${coursePrompt}`);

  if (!result.finalOutput) {
    throw new Error('Agent failed to generate course data');
  }

  return result.finalOutput;
};
