import { Request, Response } from "express";
import { CreateTicketService } from "../../services/ticket/CreateTicketService";

class CreateTicketController {
  async handle(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        priority,
        product_id,
        customer_id,
        module_id,
      } = req.body;

      const loggedUser = req.user;

      if(!loggedUser){
        return res.status(403).json({
          message: "Apenas usuários autenticados podem registrar os tickets",
        });
      }

      const createTicketService = new CreateTicketService();

      const ticket = await createTicketService.execute({
        title,
        description,
        priority,
        product_id,
        company_id: loggedUser.company_id,
        customer_id,
        module_id,
        registered_by_id: loggedUser.id,
      });

      return res
        .status(204)
        .json({ message: "Ticket atualizado com sucesso.", ticket });
    } catch (error: any) {
      console.log(error);
    }
  }
}

export { CreateTicketController };
