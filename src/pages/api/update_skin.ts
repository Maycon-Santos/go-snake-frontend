import { METHOD_NOT_ALLOWED, OK, UNAUTHORIZED } from "http-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "@/constants";
import { getCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { colorId, patternId } = JSON.parse(req.body);
    const token = getCookie("token", { req, res });

    if (!token) {
      res.status(UNAUTHORIZED).json({});
      return;
    }

    const headers: HeadersInit = new Headers();
    headers.set("Token", token);

    const apiReq = await fetch(`${API_BASE_URL}/v1/update_skin`, {
      method: "POST",
      headers,
      body: JSON.stringify({ color_id: colorId, pattern_id: patternId }),
    });

    const response = await apiReq.json();

    res.status(OK).json(response);
  } else {
    res.status(METHOD_NOT_ALLOWED).json({});
  }
}
