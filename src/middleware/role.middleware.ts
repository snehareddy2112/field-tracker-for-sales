import { IUser } from "@/models/User";
import { UserRole } from "@/constants/roles";

export function requireRole(
  user: IUser,
  allowedRoles: UserRole[]
) {
  if (!allowedRoles.includes(user.role)) {
    throw new Error("Forbidden");
  }
}