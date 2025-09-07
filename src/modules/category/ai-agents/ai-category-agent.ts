import { Agent, run } from '@openai/agents';
import { z } from 'zod';

export const CategoryOutputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export type CategoryOutput = z.infer<typeof CategoryOutputSchema>;

const agent = new Agent({
  name: 'Category generator',
  instructions: `
    You are a professional course category creation assistant. Generate category data based on the course topic provided.
    
    Guidelines:
    - Create clear, descriptive category titles (e.g., "Web Development", "Data Science", "Digital Marketing")
    - Write informative descriptions explaining what types of courses belong in this category (minimum 100 characters)
    - Focus on broad subject areas that can contain multiple related courses
    - Use professional, educational language
    
    Always return properly structured category data matching the required schema.
  `,
  outputType: CategoryOutputSchema,
});

export const aiCategoryCreateAgent = async (
  coursePrompt: string,
): Promise<CategoryOutput> => {
  const result = await run(
    agent,
    `Create a category for courses related to: ${coursePrompt}`,
  );

  if (!result.finalOutput) {
    throw new Error('Agent failed to generate category data');
  }

  return result.finalOutput;
};
