import { z } from 'zod';

const id = z.string().uuid();
export const phaseSchema = z.enum(['planovani', 'realizace', 'reflexe']);
export const statusSchema = z.enum([
  'draft',
  'methodological_review',
  'approved',
  'published',
  'retired',
  'imported',
  'demo',
]);
export const criterionSchema = z.object({
  id,
  criterionId: id,
  editionId: id,
  title: z.string().min(1),
  mindset: z.string().min(1),
  status: statusSchema,
  sourceLocator: z.object({ documentId: id, page: z.number().int().positive() }),
  levels: z
    .array(z.object({ id, level: z.number().int().min(0).max(3), text: z.string().min(1) }))
    .length(4),
});
export const exampleSchema = z.object({
  id,
  publicId: z.string().regex(/^[a-z0-9-]+$/),
  revisionId: id,
  title: z.string().min(1),
  type: z.enum(['transkript', 'priprava', 'reflexe', 'artefakt', 'foto', 'video']),
  status: statusSchema,
  summary: z.string().min(1),
  duration: z.string().min(1),
  context: z.object({
    subject: z.string(),
    school: z.string(),
    age: z.string(),
    situation: z.string(),
  }),
  topics: z.array(z.string()),
  phases: z.array(phaseSchema),
  questions: z.array(z.string()).min(1),
  body: z.array(z.object({ heading: z.string(), text: z.string() })).min(1),
  limitations: z.string().min(1),
  author: z.string(),
  rights: z.object({ permissionStatus: z.enum(['original-demo', 'approved']), scope: z.string() }),
  reviewedAt: z.string().nullable(),
  links: z
    .array(
      z.object({
        id,
        criterionCode: z.string(),
        criterionRevisionId: id,
        level: z.number().int().min(0).max(3).nullable(),
        evidence: z.string().min(1),
        commentary: z.string().min(1),
      }),
    )
    .min(1),
});
export const transitionSchema = z.object({
  id,
  criterionRevisionId: id,
  fromLevel: z.number().int().min(0).max(3),
  toLevel: z.number().int().min(0).max(3),
  status: statusSchema,
  summaryPoints: z.array(z.string()).min(1),
  observationQuestion: z.string(),
  highlights: z.array(
    z.object({
      descriptorId: id,
      phrase: z.string().min(1),
      occurrence: z.number().int().nonnegative(),
    }),
  ),
});
export type CriterionRevision = z.infer<typeof criterionSchema>;
export type Example = z.infer<typeof exampleSchema>;
export type Transition = z.infer<typeof transitionSchema>;
export type Phase = z.infer<typeof phaseSchema>;
