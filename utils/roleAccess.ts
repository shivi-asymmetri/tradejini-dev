import { Access, AccessModules } from "@/enums/AccessEnum";
import { User, UserSession } from "@/db/schema";

export type Role = "Admin" | "Content" | "HR" | "Support";
export type Module = "blogs" | "knowledge-base" | "careers" | "decoders" | "galleries" | "Chart-speaks" | "kickstarter" | "user-management"  | "ipo" | "media" ;

export function getRoleFromString(roleString: string): Access {
  switch (roleString) {
    case "Admin":
      return Access.Admin;
    case "Content":
      return Access.Content;
    case "HR":
      return Access.HR;
    case "Support":
      return Access.Support;
    default:
      return Access.Support; // Default to most restrictive role
  }
}

export function getStringFromRole(role: Access): Role {
  switch (role) {
    case Access.Admin:
      return "Admin";
    case Access.Content:
      return "Content";
    case Access.HR:
      return "HR";
    case Access.Support:
      return "Support";
    default:
      return "Support";
  }
}

export function hasModuleAccess(userRole: Access, module: Module): boolean {
  const allowedModules = AccessModules[userRole];
  return (allowedModules as readonly string[]).includes(module);
}

export function canManageUsers(userRole: Access): boolean {
  return userRole === Access.Admin;
}

export function getUserModules(userRole: Access): Module[] {
  return [...AccessModules[userRole]] as Module[];
}

export function createUserSession(user: User): UserSession {
  const role = getRoleFromString(user.role);
  return {
    uid: user.id,
    email: user.email,
    role: user.role,
    modules: getUserModules(role),
  };
} 