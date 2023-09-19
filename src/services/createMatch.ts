import { Response } from "./types";

export default async function createMatch() {
  const req = await fetch("/api/create_match", {
    method: "POST",
  });

  const response = (await req.json()) as Response<{ match_id: string }>;

  return response;
}
