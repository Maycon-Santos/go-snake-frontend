import { API_BASE_URL } from "@/constants";
import { getCookie } from "cookies-next";
import { OK } from "http-codes";
import type { GetServerSidePropsContext } from "next";
import { Response } from "./types";

export type Account = {
  id: string;
  username: string;
  skin: {
    color: string;
    pattern: string;
  };
};

export async function getAccount(
  req?: GetServerSidePropsContext["req"],
  res?: GetServerSidePropsContext["res"]
) {
  const token =
    typeof window === "undefined"
      ? getCookie("token", { req, res })
      : getCookie("token");

  if (!token) {
    return null;
  }

  const headers: HeadersInit = new Headers();
  headers.set("Token", token);

  const url =
    typeof window === "undefined"
      ? `${API_BASE_URL}/v1/get_account`
      : `/api/get_account`;

  try {
    const request = await fetch(url, {
      headers,
    });

    if (request.status != OK) {
      return null;
    }

    const response = (await request.json()) as Response<Account>;

    if (!response.success) {
      return null;
    }

    return response.result;
  } catch (e) {
    return null;
  }
}
