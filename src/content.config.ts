import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const commonFields = {
  title: z.string().trim().min(1),
  published: z.coerce.date(),
  updated: z.coerce.date().optional(),
  draft: z.boolean().default(false),
};

const withDateOrder = <T extends z.ZodRawShape>(shape: T) =>
  z.object(shape).refine(
    (data) => {
      const { published, updated } = data as {
        published: Date;
        updated?: Date;
      };
      return !updated || updated >= published;
    },
    {
      message: 'updated는 published와 같거나 이후여야 합니다.',
      path: ['updated'],
    },
  );

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: withDateOrder({
    ...commonFields,
    description: z.string().trim().min(1),
  }),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  schema: withDateOrder({
    ...commonFields,
    description: z.string().trim().min(1).optional(),
  }),
});

const lab = defineCollection({
  loader: glob({ base: './src/content/lab', pattern: '**/*.md' }),
  schema: withDateOrder({
    ...commonFields,
    description: z.string().trim().min(1),
  }),
});

export const collections = { writing, notes, lab };
