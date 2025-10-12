import { TicketPriority, TicketStatus } from "@prisma/client";
import prismaClient from "../../prisma";

interface TicketRequest {
  ticket_id: number;
  company_id?: string;
  user_id?: string;
}

class GetTicketByIdService {
  async execute({
    company_id,
    ticket_id,
    user_id
  }: TicketRequest) {


    const findTicket = await prismaClient.ticket.findFirst({
      where: {
        id: ticket_id,
      },
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
      },
    });
    
    return findTicket;
  }
}

export { GetTicketByIdService };
