import { Request, Response } from "express";
import { GetTicketByIdService } from "../../services/ticket/GetTicketByIdService";

class GetTicketByIdController {
  async handle(req: Request, res: Response) {
    try {

      const { ticket_id } = req.params;
      console.log(ticket_id)

      const getTicketByIdService = new GetTicketByIdService();

      
      if (!ticket_id || isNaN(Number(ticket_id))) {
       return res.status(400).json({
         error: "Parâmetro 'ticket_id' inválido ou ausente.",
       });
      }

      const ticket = await getTicketByIdService.execute({
        ticket_id: Number(ticket_id),
      });

      return res.status(200).json({
        message: "Sucesso.",
        ticket,
      });

    } catch (error: any) {
      console.log(error);
    }
  }
}

export { GetTicketByIdController };
