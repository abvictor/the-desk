import { Request, Response } from "express";
import { FetchDashboardDataService } from "../../services/dashboard/FetchDashboardDataService";

class FetchDashboardDataController {
  async handle(req: Request, res: Response) {
    try {
      const { company_id } = req.query;
      const loggedUser = req.user.id;

      if (!loggedUser) {
        return res.status(403).json({
          message: "Apenas usuários autenticados ver os dados do dashboard",
        });
      }

      const fetchDashboardDataService = new FetchDashboardDataService();

      const dashboard = await fetchDashboardDataService.execute({
        company_id: company_id as string,
        user_id: loggedUser,
      });

      return res.status(200).json({
        dashboard,
      });
    } catch (error: any) {
      console.error("Erro ao listar clientes:", error);
      return res.status(500).json({
        message: "Erro interno do servidor ao listar clientes",
      });
    }
  }
}

export { FetchDashboardDataController };
