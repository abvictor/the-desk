import prismaClient from "../../prisma";

interface ListAllTicketsRequest {
  company_id: string;
  user_id: string;
}

class ListAllTicketsService {
  async execute({ company_id, user_id }: ListAllTicketsRequest) {
    try {
      const user = await prismaClient.user.findUnique({
        where: { id: user_id },
        select: {
          id: true,
          role: true,
          company_id: true,
          UserProduct: {
            select: { product_id: true },
          },
        },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      let whereCondition: any = { company_id };

      if (user.role === "OPERATIONAL") {
        const productIds = user.UserProduct.map((up) => up.product_id);
        whereCondition.product_id = { in: productIds };
      }

      const listAllTickets = await prismaClient.ticket.findMany({
        where: whereCondition,
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          created_at: true,
          updated_at: true,
          module: {
            select: {
              id: true,
              version: true,
              product_id: true,
            },
          },
          registered_by: {
            select: {
              id: true,
              role: true,
            },
          },
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
          solved_by: {
            select: {
              id: true,
              role: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return listAllTickets;
    } catch (error: any) {
      console.error(error);
      throw new Error("Erro ao listar tickets");
    }
  }
}

export { ListAllTicketsService };
