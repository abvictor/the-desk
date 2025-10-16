import { Request, Response } from "express";
import { ListProductModuleService } from "../../services/product-module/ListProductModuleService";

class ListProductModuleController {
  async handle(req: Request, res: Response) {
    try {
      const { product_id } = req.query;
      const loggedUser = req.user;

      if (!loggedUser) {
        return res.status(403).json({
          message: "Apenas usuários autenticados podem consultar os módulos",
        });
      }

      const listProductModuleService = new ListProductModuleService();

      const productId = String(product_id);
      const module = await listProductModuleService.execute({
        product_id: productId,
      });

      res.status(200).json({
        modulos: module,
      });

    } catch (error: any) {
      if (res.status(500)) {
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

export { ListProductModuleController };
