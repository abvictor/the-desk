import prismaClient from "../../prisma";
interface ListAllCustomersRequest {
  company_id?: string;
  user_id?: string;
}

class ListAllCustomersService {
  async execute({ company_id, user_id }: ListAllCustomersRequest) {
    try {
        
      let resolvedCompanyId = company_id;

      if (!resolvedCompanyId && user_id) {
        const user = await prismaClient.user.findUnique({
          where: { id: user_id },
          select: { company_id: true },
        });

        if (!user) throw new Error("Usuário não encontrado");
        resolvedCompanyId = user.company_id;
      }

      const listAllCustomers = await prismaClient.customer.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
        where: {
          company_id: resolvedCompanyId,
        },
        orderBy: {
          name: "asc",
        },
      });

      return listAllCustomers;
    } catch (error: any) {
      console.error(error);
      throw new Error("Erro ao listar clientes");
    }
  }
}

export { ListAllCustomersService };