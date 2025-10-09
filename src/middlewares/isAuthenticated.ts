import { NextFunction, Request, Response  } from 'express'
import jwt from "jsonwebtoken"

interface Payload {
    sub: string;
    name: string;
    email: string;
    role: string;
    company_id: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: "Token não informado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Payload;
    
    req.user = {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role as "ADMIN" | "OPERATIONAL",
      company_id: decoded.company_id,
      token
    };

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}