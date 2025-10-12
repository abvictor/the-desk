import { TicketStatus } from "@prisma/client";
import prismaClient from "../../prisma";

interface TicketRequest {
  status: TicketStatus;
  ticket_id: number
}

class UpdateTicketStatusService {
  async execute({
    status,
    ticket_id
  }: TicketRequest) {
    const findTicket = await prismaClient.ticket.findFirst({
      select: {
        id: true,
      },
      where: {
        id: Number(ticket_id),
      },
    });

    if (!findTicket) {
      throw new Error("Ticket não encontrado");
    }

    const updatedTicket = await prismaClient.ticket.update({
      data: {
        status: status,
      },
      where: {
        id: findTicket.id,
      },
    });

    return updatedTicket;
  }
}

export { UpdateTicketStatusService };
