import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: { email },
      include: { company: true },
    });

    if (!user || !user.company) {
      throw new Error("Usuário ou senha incorretos");
    }

    if (!user.active || !user.company.status) {
      throw new Error("Usuário ou empresa desativados");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Usuário ou senha incorretos");
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
        company_id: user.company_id,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "7d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      company_id: user.company_id,
      token,
    };
  }
}

export { AuthUserService };
