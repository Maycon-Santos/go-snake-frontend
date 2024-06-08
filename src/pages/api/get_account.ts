import { METHOD_NOT_ALLOWED, OK, UNAUTHORIZED } from "http-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import { API_BASE_URL } from "@/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = getCookie("token", { req, res });

    if (!token) {
      res.status(UNAUTHORIZED).json({});
      return;
    }

    const headers: HeadersInit = new Headers();
    headers.set("Token", token);

    const apiReq = await fetch(`${API_BASE_URL}/v1/get_account`, {
      headers,
    });

    const response = await apiReq.json();

    res.status(OK).json(response);
  } else {
    res.status(METHOD_NOT_ALLOWED).json({});
  }
}
