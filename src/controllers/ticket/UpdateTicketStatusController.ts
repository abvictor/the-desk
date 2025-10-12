import { Request, Response } from "express";
import { UpdateTicketStatusService } from "../../services/ticket/UpdateTicketStatusService";

class UpdateTicketStatusController {
  async handle(req: Request, res: Response) {
    try {
      const { status } = req.body;

      const { ticket_id } = req.query;

      const updateTicketService = new UpdateTicketStatusService();

      const ticket = await updateTicketService.execute({
        ticket_id: Number(ticket_id),
        status,
      });

      return res
        .status(204)
        .json({ message: "Status do ticket atualizado com sucesso.", ticket });
    } catch (error: any) {
      console.log(error);
    }
  }
}

export { UpdateTicketStatusController };
