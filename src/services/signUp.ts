import { Response } from "./types";

export default async function signUp(username: string, password: string) {
  const req = await fetch("/api/sign_up", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const response = (await req.json()) as Response;

  return response;
}
