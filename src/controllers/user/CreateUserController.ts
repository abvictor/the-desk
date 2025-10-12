import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password, role, products } = req.body;

      const loggedUser = req.user;

      if (loggedUser.role !== "ADMIN") {
        return res.status(403).json({
          message: "Apenas administradores podem criar novos usuários.",
        });
      }

      if (!products || products.length === 0) {
        return res.status(400).json({
          message: "É necessário informar os produtos para o novo usuário.",
        });
      }

      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        name,
        email,
        password,
        company_id: loggedUser.company_id,
        role,
        products
      });

    
      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: user,
      });
      
    } catch (error: any) {

      console.log(error)

      if (error.message.includes("e-mail")) {
        return res.status(400).json({
          message: "Email já está em uso",
        });
      }

      if (error.message.includes("nome")) {
        return res.status(400).json({
          message: "Nome de usuário já existente",
        });
      }

      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }
}

export { CreateUserController };
