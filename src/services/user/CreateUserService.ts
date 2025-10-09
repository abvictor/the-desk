import prismaClient from "../../prisma";
import { hash } from "bcryptjs";


interface Product {
  product_id: string;
  user_id: string;
}

interface UserRequest {
  email: string;
  name: string;
  password: string;
  company_id: string;
  role: string;

  products: Product[];
}

class CreateUserService {
  async execute({ email, name, password, company_id, products }: UserRequest) {
    const userEmailAlreadyExists = await prismaClient.user.findFirst({
      select: {
        email: true,
      },
      where: {
        email: email,
      },
    });

    const companyEmailAlreadyExists = await prismaClient.company.findFirst({
      select: {
        email: true,
      },
      where: {
        email: email,
      },
    });

    if (userEmailAlreadyExists || companyEmailAlreadyExists) {
      throw new Error("Esse e-mail já está sendo utilizado");
    }

    const userNameAlreadyExists = await prismaClient.user.findFirst({
      select: {
        name: true,
      },
      where: {
        name: name,
      },
    });

    if (userNameAlreadyExists) {
      throw new Error("Esse nome já está sendo utilizado");
    }

    const passwordHash = await hash(password, 8);

    const newUser = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        role: "OPERATIONAL",
        company_id: company_id,
      },
    });

    prismaClient.userProduct.createMany({
      data: products.map((product) => ({
        user_id: newUser.id,
        product_id: product.product_id,
      })),
    });

    

    return newUser;
  }
}

export { CreateUserService };
