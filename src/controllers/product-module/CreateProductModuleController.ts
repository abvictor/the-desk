import { Request, Response } from "express";
import { CreateProductModuleService } from "../../services/product-module/CreateProductModuleService";

class CreateProductModuleController {
  async handle(req: Request, res: Response) {
    try {
      
      const { name, description, product_id } = req.body;
      const loggedUser = req.user;

      if (loggedUser.role !== "ADMIN") {
        return res.status(403).json({
          message: "Apenas administradores podem criar modulos.",
        });
      }

      const createProductModuleService = new CreateProductModuleService();

      const module = await createProductModuleService.execute({
        name,
        description,
        product_id,
      });

      res.status(201).json({
        message: "Módulo criado com sucesso"
      })

    } catch (error: any) {
      if(res.status(500)){
        res.json({
          message: "Erro interno do servidor",
        });
      }

      if (res.status(400)) {
        res.json({
          message: "Ocorreu um erro do lado do cliente",
        });
      }
    }
  }
}

export { CreateProductModuleController };
