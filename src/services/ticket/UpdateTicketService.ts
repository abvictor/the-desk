import { TicketPriority, TicketStatus } from "@prisma/client";
import prismaClient from "../../prisma";

interface TicketRequest {
  ticket_id: number;
  title?: string;
  description?: string;
  priority?: TicketPriority;
  category?: string;
  company_id: string;
  customer_id: string;
  registered_by_id: string;
  product_id: string;
  module_id: string;
  status: TicketStatus;
  solved_by_id: string;
}

class UpdateTicketService {
  async execute({
    ticket_id,
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
  }: TicketRequest) {
    
    const findTicket = await prismaClient.ticket.findFirst({
      select:{
        id: true,
      },
      where: {
        id: Number(ticket_id)
      }
    })

    if(!findTicket){
      throw new Error('Ticket não encontrado')
    }
  
    const updatedTicket = await prismaClient.ticket.update({
      data: {
        description,
        title,
        category,
        priority: priority,
        company_id,
        customer_id,
        product_id,
        module_id,
        status: status,
        registered_by_id,
        updated_at: new Date(),
        solved_by_id,
      },
      where: {
        id: findTicket.id,
      },
    });

    return updatedTicket;
  }
}

export { UpdateTicketService };
