import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { UserRole } from "@prisma/client";

interface Product {
  product_id: string;
  user_id: string;
}

interface UpdateUserRequest {
  company_id: string;
  user_id: string;

  email: string;
  name: string;
  password: string;
  role: string;

  products: Product[];
}

class UpdateUserService {
  async execute({ company_id, user_id, name, email, password, products, role }: UpdateUserRequest) {

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
        company_id: company_id,
      },
    });

    if (!user) {
      throw new Error(
        "Usuário não encontrado ou não registrado na empresa atual."
      );
    }

    const passwordHash = await hash(password, 8);

    const updateUser = await prismaClient.user.updateMany({
      data: {
        name,
        email,
        password: passwordHash,
        role: role as UserRole,
      },
      where: {
        AND: [{ id: user.id }, { company_id: user.company_id }],
      },
    });

    prismaClient.userProduct.createMany({
      data: products.map((product) => ({
        user_id: user.id,
        product_id: product.product_id,
      })),
    });

    return updateUser;
  }
}

export { UpdateUserService };
