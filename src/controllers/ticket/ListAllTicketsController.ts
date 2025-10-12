import { Request, Response } from "express";
import { ListAllTicketsService } from "../../services/ticket/ListAllTicketsService";

class ListAllTicketsController {
  async handle(req: Request, res: Response) {
    try {
      const { company_id, user_id } = req.body;

      if (!user_id) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const listAllTicketsService = new ListAllTicketsService();

      const tickets = await listAllTicketsService.execute({
        company_id,
        user_id,
      });

      return res.status(200).json({ tickets });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar tickets" });
    }
  }
}

export { ListAllTicketsController };
