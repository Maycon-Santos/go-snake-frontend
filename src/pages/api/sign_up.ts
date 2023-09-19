import { METHOD_NOT_ALLOWED, OK } from "http-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { API_BASE_URL } from "@/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = JSON.parse(req.body);

    const apiReq = await fetch(`${API_BASE_URL}/v1/signup`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const response = await apiReq.json();

    if (response.success) {
      setCookie("token", response.result.access_token, {
        req,
        res,
        maxAge: 10 * 365 * 24 * 60 * 60,
      });
    }

    res.status(OK).json(response);
  } else {
    res.status(METHOD_NOT_ALLOWED).json({});
  }
}
