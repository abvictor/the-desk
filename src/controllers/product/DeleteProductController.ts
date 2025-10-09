import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    try {
        const { product_id } = req.params;
        const loggedUser = req.user;

      if (loggedUser.role !== "ADMIN") {
        return res.status(403).json({
          message: "Apenas administradores podem criar produtos.",
        });
      }

      const deleteProductService = new DeleteProductService();

      const product = await deleteProductService.execute({
        product_id,
        company_id: loggedUser.company_id
      });

      return res.status(204).send();

    } catch (error: any) {
      
      if(res.statusCode == 500){
        res.status(500).json({
          message: "Erro interno do servidor",
        });
      }

      if (res.statusCode == 404) {
        res.status(404).json({
          message: "Não foi possível encontrar o registro para exclui-lo",
        });
      }

      if (res.statusCode == 400) {
        res.status(400).json({
          message: "Ocorreu um erro no lado do cliente",
        });
      }

    }
  }
}

export { DeleteProductController };
