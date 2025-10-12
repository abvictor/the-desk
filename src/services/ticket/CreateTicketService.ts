import { TicketPriority } from "@prisma/client";
import prismaClient from "../../prisma";

interface TicketRequest {
  title: string;
  description: string;
  priority: TicketPriority
  category?: string;
  company_id: string;
  customer_id: string;
  registered_by_id: string;
  product_id: string;
  module_id: string;
}

class CreateTicketService {
  async execute({ title, description, category, priority, product_id, company_id, customer_id, module_id, registered_by_id }: TicketRequest) {

    const createdTicket = await prismaClient.ticket.create({
      data: {
        description,
        title,
        category,
        priority: priority,
        company_id,
        customer_id,
        product_id,
        module_id,
        status: "OPEN",
        registered_by_id,
        created_at: new Date(),
      },
    });


    return createdTicket;
  }
}

export { CreateTicketService };
