import { Request } from "express";
export interface userRequest extends Request {
  user?: string | JwtPayload
}

export interface TokenInterface {
  decoded: string | JwtPayload
}