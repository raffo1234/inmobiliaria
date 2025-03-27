import { db, User } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(User).values([
		{ id: "1", email: "a@a.com", username: "a", password: "a" },
		{ id: "2", email: "a@a2.com", username: "ab", password: "a" }
	]);
};
