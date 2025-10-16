import prismaClient from "../../prisma";

interface ListUserProductRequest {
  user_id: string;
  product_id: string;
}

class ListUserProductService {
  async execute({ user_id, product_id }: ListUserProductRequest) {
    try {
      if (!product_id) {
        const products = await prismaClient.userProduct.findMany({
          where: { user_id },
          select: {
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        return products.map((p) => p.product);
      }

      const productWithModules = await prismaClient.product.findUnique({
        where: { id: product_id },
        select: {
          id: true,
          name: true,
          modules: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      });

      return productWithModules;
    } catch (error: any) {
      console.error(error);
      throw new Error("Erro ao listar produtos ou módulos do usuário");
    }
  }
}

export { ListUserProductService };
