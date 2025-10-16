import { Request, Response } from "express";
import { ListAllCustomersService } from "../../services/customer/ListAllCustomersService";

class ListAllCustomersController {
  async handle(req: Request, res: Response) {
    try {
      const { company_id } = req.query;
      const loggedUser = req.user.id;

      if (!loggedUser) {
        return res.status(403).json({
          message: "Apenas usuários autenticados podem consultar os clientes",
        });
      }

      const listAllCustomersService = new ListAllCustomersService();

      const customers = await listAllCustomersService.execute({
        company_id: company_id as string,
        user_id: loggedUser, 
      });

      return res.status(200).json({
        customers,
      });
    } catch (error: any) {
      console.error("Erro ao listar clientes:", error);
      return res.status(500).json({
        message: "Erro interno do servidor ao listar clientes",
      });
    }
  }
}

export { ListAllCustomersController };
