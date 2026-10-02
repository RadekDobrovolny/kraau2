import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { criterionSchema, exampleSchema, transitionSchema } from './lib/schema';
export const collections = {
  criteria: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/criteria' }),
    schema: criterionSchema,
  }),
  examples: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/examples' }),
    schema: exampleSchema,
  }),
  transitions: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/transitions' }),
    schema: transitionSchema,
  }),
};
