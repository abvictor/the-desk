import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
  async handle(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const loggedUser = req.user;

      if (loggedUser.role !== "ADMIN") {
        return res.status(403).json({
          message: "Apenas administradores podem excluir usuários.",
        });
      }

      const deleteUserService = new DeleteUserService();

      const user = await deleteUserService.execute({
        user_id: user_id,
        company_id: loggedUser.company_id,
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

export { DeleteUserController };
