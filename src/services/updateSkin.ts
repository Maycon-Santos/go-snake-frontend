import { Response } from "./types";

export default async function updateSkin(colorId: string, patternId: string) {
  const req = await fetch("/api/update_skin", {
    method: "POST",
    body: JSON.stringify({
      colorId,
      patternId,
    }),
  });

  const response = (await req.json()) as Response;

  return response;
}
