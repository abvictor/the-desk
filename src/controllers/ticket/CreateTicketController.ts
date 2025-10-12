import { Request, Response } from "express";
import { UpdateTicketService } from "../../services/ticket/UpdateTicketService";

class CreateTicketController {
  async handle(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        category,
        priority,
        product_id,
        company_id,
        customer_id,
        module_id,
        status,
        registered_by_id,
        solved_by_id,
      } = req.body;

      const { ticket_id } = req.query;

      const updateTicketService = new UpdateTicketService();

      const ticket = await updateTicketService.execute({
        ticket_id: Number(ticket_id),
        title,
        description,
        category,
        priority,
        product_id,
        company_id,
        customer_id,
        module_id,
        status,
        registered_by_id,
        solved_by_id,
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
