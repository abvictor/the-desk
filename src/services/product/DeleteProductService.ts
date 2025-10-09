import prismaClient from "../../prisma";
import { compare, hash } from "bcryptjs";

interface DeleteProductRequest {
  product_id: string;
  company_id: string;
}

class DeleteProductService {
  async execute({ product_id, company_id }: DeleteProductRequest) {
    const findProduct = await prismaClient.product.findFirst({
      where: {
        AND: [{ id: product_id }, { company_id: company_id }],
      },
    });

    if (!findProduct) {
        throw new Error("Não foi possível excluir o módulo desejado")
    }   

    const deleteProduct = await prismaClient.product.delete({
        where: {
            id: findProduct.id
        }
    })

    return deleteProduct;
  }
}

export { DeleteProductService };
