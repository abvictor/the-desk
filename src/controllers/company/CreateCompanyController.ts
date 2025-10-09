import { Request, Response } from "express";
import { CreateCompanyService } from "../../services/company/CreateCompanyService";

class CreateCompanyController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const createCompanyService = new CreateCompanyService();

      const company = await createCompanyService.execute({
        name,
        email,
        password
      });

      return res.status(201).json({
        message: "Empresa criada com sucesso",
        company: company,
      });
      
    } catch (error: any) {
      console.error("Erro:", error);

      if (error.message.includes("e-mail")) {
        return res.status(400).json({
          message: "Email já está em uso",
        });
      }

      if (error.message.includes("nome")) {
        return res.status(400).json({
          message: "Nome da empresa já existe",
        });
      }

      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }
}

export { CreateCompanyController };
