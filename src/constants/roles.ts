export const ROLES = {
  SALES_ASSOCIATE: "sales_associate",
  BRANCH_HEAD: "branch_head",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];