import prismaClient from "../../prisma";

interface ProductModuleRequest {
  name: string;
  description: string;
  product_id: string;
}

class CreateProductModuleService {
  async execute({
    name,
    description,
    product_id,
  }: ProductModuleRequest) {
    try{
        const verifyModule = await prismaClient.productModule.findFirst({
          where: {
            AND: [
                {
                    name: name
                },
                {
                    product_id: product_id
                }
            ]
          }
        });

        if (verifyModule) {
            throw new Error("Já existe um módulo com esse nome")
        }

        const newModule = await prismaClient.productModule.create({
            data: {
                name: name,
                active: true,
                product_id: product_id,
                description: description
            }
        })

        return newModule;
        
    }catch(error: any){
      console.log(error)
    }
  }
}

export { CreateProductModuleService };