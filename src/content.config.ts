import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			place: z.string().optional(),
			location: z.string().optional(),
			city: z.string(),
			country: z.string(),
			type: z.string(),
			ratings: z
				.object({
					food: z.number().min(0).max(5),
					vibe: z.number().min(0).max(5),
					value: z.number().min(0).max(5),
				})
				.optional(),
			gallery: z.array(image()).optional(),
		}),
});

export const collections = { blog };
