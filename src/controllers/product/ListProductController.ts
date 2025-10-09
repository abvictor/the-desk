import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
  async handle(req: Request, res: Response) {
    try {
      const loggedUser = req.user;

      if(!loggedUser){
        return res.status(403).json({
          message: "Necessário efetuar o login"
        })
      }

      const listProductService = new ListProductService()

      const productsList = await listProductService.execute({
        company_id: loggedUser.company_id,
        user_id: loggedUser.id
      });

      return res.json({
        products: productsList,
      });

    } catch (error: any) {

      if(res.status(404)){
        return res.json({
          message: "Nenhum registro encontrado"
        })
      }

      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }
}

export { ListProductController };
