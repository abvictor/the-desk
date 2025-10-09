declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      name: string;
      email: string;
      role: "ADMIN" | "OPERATIONAL";
      company_id: string;
      token: string;
    };
  }
}
