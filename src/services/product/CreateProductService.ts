import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface ProductRequest {
    name: string;
    description: string;
    company_id: string;
}

class CreateProductService {
  async execute({ name, description, company_id }: ProductRequest) {
    

    const verifyProduct = await prismaClient.product.findFirst({
      where: {
        AND: [
          {
            company_id: company_id,
          },
          {
            name: {
              contains: name,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (verifyProduct) {
        throw new Error("Já possui um nome de produto cadastrado para essa empresa")
    }

    const newProduct = await prismaClient.product.create({
        data: {
            name,
            description,
            active: true,
            company_id,
        }
    })
  

    return newProduct

    }
}

export { CreateProductService };
