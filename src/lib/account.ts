import { API_BASE_URL } from "@/constants";
import { getCookie } from "cookies-next";
import { OK } from "http-codes";
import type { GetServerSidePropsContext } from "next";

export type Account = {
  id: string;
  username: string;
};

export async function getAccount(
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) {
  const token = getCookie("token", { req, res });

  if (!token) {
    return null;
  }

  const headers: HeadersInit = new Headers();
  headers.set("Token", token);

  try {
    const request = await fetch(`${API_BASE_URL}/v1/get_account`, {
      headers,
    });

    if (request.status != OK) {
      return null;
    }
    return (await request.json()) as Account;
  } catch (e) {
    return null;
  }
}
