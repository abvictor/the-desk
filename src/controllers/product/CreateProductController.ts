import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const loggedUser = req.user;

      if (loggedUser.role !== "ADMIN") {
        return res.status(403).json({
          message: "Apenas administradores podem criar produtos.",
        });
      }

      const createProductService = new CreateProductService();

      const product = await createProductService.execute({
        name,
        description,
        company_id: req.user.company_id,
      });

      return res.status(201).send().json(product);
      
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }
}

export { CreateProductController };
