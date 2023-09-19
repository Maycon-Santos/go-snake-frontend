import { ERROR_MAP } from "@/constants";

export type Type = keyof typeof ERROR_MAP;

export type Response<TResults = unknown> =
  | {
      success: true;
      result: TResults;
    }
  | {
      success: false;
      type: Type;
      message: string;
    };
