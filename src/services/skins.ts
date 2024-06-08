import { API_BASE_URL } from "@/constants";
import { getCookie } from "cookies-next";
import { OK } from "http-codes";
import type { GetServerSidePropsContext } from "next";
import { Response } from "./types";

export type Pattern = {
  image: HTMLImageElement;
  source: string;
  type: "svg";
};

export type AvailableSkins = {
  colors: {
    [id: string]: string;
  };
  patterns: {
    [id: string]: Pattern;
  };
};

export async function getAvailableSkins(
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) {
  const token = getCookie("token", { req, res });

  if (!token) {
    return null;
  }
  try {
    const request = await fetch(`${API_BASE_URL}/v1/available_skins`);

    if (request.status != OK) {
      return null;
    }

    const response = (await request.json()) as Response<AvailableSkins>;

    if (!response.success) {
      return null;
    }

    return response.result;
  } catch (e) {
    return null;
  }
}
