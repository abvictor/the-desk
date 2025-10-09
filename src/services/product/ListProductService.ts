import prismaClient from "../../prisma";

interface ListProductRequest {
    company_id: string;
    user_id: string;
}

class ListProductService {
  async execute({ company_id, user_id }: ListProductRequest) {
    try {
      const listAllProducts = await prismaClient.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
        },
        where: {
          company_id: company_id,
        },
      });

      return listAllProducts;

    } catch (error: any) {
      console.log(error);
    }
  }
}

export { ListProductService };
