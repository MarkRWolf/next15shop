export const COUPON_CODES = {
  BLACKFRIDAY: "BLACKFRIDAY",
  XMAS2024: "XMAS2024",
  NY2425: "NY2425",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
