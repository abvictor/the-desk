import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const { name, email, password, products, role } = req.body;

      const loggedUser = req.user;

      if (loggedUser.role !== "ADMIN") {
        return res.status(403).json({
          message: "Apenas administradores podem alterar usuários.",
        });
      }

      const updateUserService = new UpdateUserService();

      const user = await updateUserService.execute({
        name,
        email,
        password,
        products,
        role,
        user_id: user_id,
        company_id: loggedUser.company_id
      });

      return res.status(204).send();

    } catch (error: any) {
      console.error("Erro:", error);

      if (res.statusCode === 404) {
        res.json(404).json({
          message: "Usuário ou empresa não encontrados",
        });
      }

      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }
}

export { UpdateUserController };
