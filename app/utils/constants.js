"use strict";

const CONSTANTS = {};

CONSTANTS.SERVER = {
  ONE: 1,
};

CONSTANTS.REFERRAL_CODE_LENGTH = 6;

CONSTANTS.SERVER_TYPES = {
  API: "api",
  SOCKET: "socket",
};

CONSTANTS.USER_ROLES = {
  ADMIN: 1,
  USER: 2,
};

CONSTANTS.AVAILABLE_AUTHS = {
  ADMIN: 1,
  SERVER: 0,
};

CONSTANTS.FILE_UPLOAD_TYPE = {
  PROFILE_IMAGE: 1,
};

CONSTANTS.TOKEN_TYPES = {
  LOGIN: 1,
  OTP: 2,
  RESET_PASSWORD: 3,
};

CONSTANTS.OTP_TYPES = {
  EMAIL_VERIFICATION: 1,
  FORGOT_PASSWORD: 2,
};

CONSTANTS.DATABASE_VERSIONS = {
  ONE: 1,
};

CONSTANTS.USER_TYPE = {
  ADMIN: 1,
  USER: 2,
};

CONSTANTS.PASSWORD_PATTER_REGEX =
  /^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;

CONSTANTS.NAME_REGEX = /^[a-zA-Z\s]{1,20}[a-zA-Z\s]$/;
CONSTANTS.EMAIL_REGEX =
  /^(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*;\s*|\s*$))*$/;
CONSTANTS.PHONE_REGEX = /^\+\d{1,3}\d{8,10}$/;
CONSTANTS.ETHEREUM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

CONSTANTS.NORMAL_PROJECTION = {
  __v: 0,
  isDeleted: 0,
  createdAt: 0,
  updatedAt: 0,
};

CONSTANTS.MESSAGES = require("./messages");

CONSTANTS.SECURITY = {
  JWT_SIGN_KEY: "fasdkfjklandfkdsfjladsfodfafjalfadsfkads",
  BCRYPT_SALT: 8,
  STATIC_TOKEN_FOR_AUTHORIZATION: "58dde3df315587b279edc3f5eeb98145",
};
CONSTANTS.MAP_DEFAULT_MONGO_ID = "6298bbf1c5f9f220b1dd1de2";

CONSTANTS.ERROR_TYPES = {
  DATA_NOT_FOUND: "DATA_NOT_FOUND",
  BAD_REQUEST: "BAD_REQUEST",
  MONGO_EXCEPTION: "MONGO_EXCEPTION",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  FORBIDDEN: "FORBIDDEN",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  CONFLICT: "CONFLICT",
  MISDIRECTED_REQUEST: "MISDIRECTED_REQUEST",
  INVALID_MOVE: "invalidMove",
};

CONSTANTS.LOGIN_TYPES = {
  METAMASK: 1,
};

CONSTANTS.EMAIL_TYPES = {
  SETUP_PASSWORD: 1,
};

CONSTANTS.EMAIL_SUBJECTS = {
  RESET_PASSWORD_EMAIL: "Reset Password",
};

CONSTANTS.EMAIL_CONTENTS = {
  RESET_PASSWORD_TEMPLATE: "public/templates/reset-password.html",
};

CONSTANTS.AVAILABLE_EXTENSIONS_FOR_FILE_UPLOADS = ["csv", "png"];
CONSTANTS.ALLOWED_EXTENSIONS_FOR_PROFILE_IMAGE = [
  "jpg",
  "png",
  "jpeg",
  "JPG",
  "PNG",
  "JPEG",
  "webp",
  "WEBP",
];

CONSTANTS.GENDER = {
  MALE: "Male",
  FEMALE: "Female",
  OTHERS: "Other",
};

CONSTANTS.OTP_EXPIRIED_TIME_IN_SECONDS = 300;

CONSTANTS.OTP_EXPIRY_TIME = 5; // minutes

CONSTANTS.S3_DEFAULT_IMAGE = "default.png";

CONSTANTS.REDIS_EXPIRE_TIME_IN_SEC = 10800;

CONSTANTS.SOCKET_EVENTS = {
  TEST: "test",
  DISCONNECT: "disconnect",
};

CONSTANTS.PAGINATION = {
  SKIP: 0,
  LIMIT: 10,
};

CONSTANTS.REDIS_EVENTS = {
  TEST: "test",
};

CONSTANTS.SMTP_CREDENTIALS = {
  HOST: "smtp-relay.brevo.com",
  PORT: 587,
  USER: "775149001@smtp-brevo.com",
  PASS: "Hrf85YPBzGFZtCq2",
  USER_FROM: "karandeep.singh@chicmic.co.in",
};

CONSTANTS.ACCESS_TYPES = {
  FREE: 1,
  PAID: 2,
};

CONSTANTS.RETURN_TO_PLAYER = {
  DEFAULT: 95,
};

CONSTANTS.MINIMUM_RTP_CALCULATION = {
  10: 98,
  20: 95,
  30: 90,
  40: 80,
  50: 70,
  60: 55,
  70: 50,
  80: 45,
  90: 40,
  100: 35,
};

CONSTANTS.ARROW_SYMBOLS = {
  ARROW_SYMBOL: 3,
  ARROW_SYMBOL_2: 4,
  ARROW_SYMBOL_3: 5,
  NEGATIVE: 1,
  POSITIVE: 2,
};

CONSTANTS.JACKPOT_AMOUNT = 100000;

module.exports = CONSTANTS;
