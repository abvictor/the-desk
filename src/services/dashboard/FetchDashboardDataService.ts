import prismaClient from "../../prisma";

interface DashboardRequest {
  company_id: string;
  user_id?: string;
}

class FetchDashboardDataService {
  async execute({ company_id, user_id }: DashboardRequest) {
    try {

      const date = new Date();
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);  

      const mounthTickets = await prismaClient.ticket.findMany({
        select:{
            id: true,
            title: true,
            created_at: true,
        },
        where: {
          company_id,
          created_at: {
            gte: startOfMonth,
            lt: endOfMonth,
          },
        },
      });

      const totalMounthTickets = await prismaClient.ticket.count({
        where: {
          company_id,
          created_at: {
            gte: startOfMonth,
            lt: endOfMonth,
          },
        },
      });

      const ticketsPerProductModule = await prismaClient.ticket.groupBy({
        by: ["product_id", "module_id"],
        _count: { id: true },
        where: { company_id },
      });

      const products = await prismaClient.product.findMany({
        where: { company_id },
        include: { modules: true },
      });

      const resultTicketsPerProductModule = products.map((product) => {
        const productModules = product.modules.map((module) => {
          const found = ticketsPerProductModule.find(
            (t) => t.product_id === product.id && t.module_id === module.id
          );
          return {
            moduleName: module.name,
            ticketCount: found?._count.id || 0,
          };
        });
        return {
          productName: product.name,
          modules: productModules,
        };
      });

      return [
        { mounthTickets: mounthTickets },
        { totalMounthTickets: totalMounthTickets },
        { ticketsPerProductModule: resultTicketsPerProductModule },
      ];
    } catch (error: any) {
      console.error(error);
      throw new Error("Erro ao listar clientes");
    }
  }
}

export { FetchDashboardDataService };
