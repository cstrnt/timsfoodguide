import type { CollectionEntry } from 'astro:content';

export function toSlug(name: string): string {
	return name
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

type Post = CollectionEntry<'blog'>;
type GroupedPosts = Map<string, Post[]>;

export function groupByKey(posts: Post[], key: 'city' | 'country' | 'type'): GroupedPosts {
	const map: GroupedPosts = new Map();
	for (const post of posts) {
		const value = post.data[key];
		if (!value) continue;
		if (!map.has(value)) map.set(value, []);
		map.get(value)!.push(post);
	}
	return map;
}

export function sortedGroups(map: GroupedPosts): [string, Post[]][] {
	return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
}
