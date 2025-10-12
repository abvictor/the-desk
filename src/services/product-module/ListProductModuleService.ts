import prismaClient from "../../prisma";

interface ListProductModuleRequest {
  product_id: string
}

class ListProductModuleService{
  async execute({ product_id }: ListProductModuleRequest) {
    try {
      
      const listAllProducts = await prismaClient.product.findFirst({
        select:{
          id: true,
          name: true,
        },
        where: {
          id: product_id
        }
      })

      const listAllModules = await prismaClient.productModule.findMany({
        select: {
          id: true,
          name: true,
          description: true,
        },
        where: {
          product_id: listAllProducts.id,
        },
      });

      return listAllModules;

    } catch (error: any) {
      console.log(error);
    }
  }
}

export { ListProductModuleService};