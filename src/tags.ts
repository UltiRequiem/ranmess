import { API } from "./config.ts";

const tagResponse = await fetch(`${API}/tags`);

const data = await tagResponse.json() as [{ name: string }];

export const AVAILABLE_TAGS = data.map((tag) => tag.name);
