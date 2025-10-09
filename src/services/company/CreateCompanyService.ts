import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface CompanyRequest {
  email: string;
  name: string;
  password: string;
  created_at?: Date;
}

class CreateCompanyService {
  async execute({ email, name, password }: CompanyRequest) {
    
    const companyEmailAlreadyExists = await prismaClient.company.findFirst({
      select: {
        email: true,
      },
      where: {
        email: email,
      },
    });

    if (companyEmailAlreadyExists) {
      throw new Error("Esse e-mail já está sendo utilizado");
    }

    const companyNameAlreadyExists = await prismaClient.company.findFirst({
      select: {
        name: true,
      },
      where: {
        name: name,
      },
    });

    if (companyNameAlreadyExists) {
      throw new Error("Esse nome já está sendo utilizado");
    }

    const passwordHash = await hash(password, 8);

    const starterPlan = await prismaClient.plan.findFirst({
        select: {
            id: true
        },
        where: {
            name: 'Free'
        }
    })

    const newCompany = await prismaClient.company.create({
      data: {
        name,
        email,
        password: passwordHash,
        plan_id: starterPlan.id,
        status: true,
        users: {
          create: {
            name: "Administrador",
            email: email,
            password: passwordHash,
            role: "ADMIN",
            active: true,
          },
        },
      },
      include: {
        users: true,
      },
    });

    return newCompany;
  }
}

export { CreateCompanyService };
