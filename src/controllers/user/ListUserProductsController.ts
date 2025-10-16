import { Request, Response } from "express";
import { ListUserProductService } from "../../services/user/ListUserProductsService";

class ListUserProductModuleController {
  async handle(req: Request, res: Response) {
    try {
      const { product_id } = req.query;
      const loggedUser = req.user;

      if (!loggedUser) {
        return res.status(403).json({
          message:
            "Apenas usuários autenticados podem consultar os módulos dos produtos",
        });
      }

      const listUserProductService = new ListUserProductService();

      const productId = String(product_id)

      const result = await listUserProductService.execute({
        user_id: loggedUser.id,
        product_id: productId,
      });

      return res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao listar módulos do produto:", error);
      return res.status(500).json({
        message: "Erro interno do servidor ao listar módulos ou produtos",
      });
    }
  }
}

export { ListUserProductModuleController };
