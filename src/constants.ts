export const API_BASE_URL = process.env.API_BASE_URL;
export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL;

export const ERROR_MAP = {
  ACCOUNT_NOT_FOUND: "Username does not exist",
  ACCOUNT_PASSWORD_WRONG: "Incorrect password",
  ACCOUNT_USERNAME_EXISTS: "The username already exists",

  USERNAME_MISSING: "Missing username",
  USERNAME_BELOW_MIN_LEN: "Username too short",
  USERNAME_ABOVE_MAX_LEN: "Username too long",
  USERNAME_INVALID_CHAR: "Username contains invalid character",

  PASSWORD_MISSING: "Missing password",
  PASSWORD_BELOW_MIN_LEN: "Password too short",
  PASSWORD_ABOVE_MAX_LEN: "Password too long",

  UNKNOWN: "",
  PAYLOAD_INVALID: "",
  ROOM_NOT_FOUND: "",
};

export const USERNAME_ERROR_TYPES = [
  "ACCOUNT_NOT_FOUND",
  "ACCOUNT_USERNAME_EXISTS",
  "USERNAME_MISSING",
  "USERNAME_BELOW_MIN_LEN",
  "USERNAME_ABOVE_MAX_LEN",
  "USERNAME_INVALID_CHAR",
];

export const PASSWORD_ERROR_TYPES = [
  "ACCOUNT_PASSWORD_WRONG",
  "PASSWORD_MISSING",
  "PASSWORD_BELOW_MIN_LEN",
  "PASSWORD_ABOVE_MAX_LEN",
];
