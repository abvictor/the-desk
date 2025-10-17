import { Request, Response } from "express";
import { AuthUserService } from "../../services/auth/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authService = new AuthUserService();

    const authResult = await authService.execute({ email, password });

    res.cookie("auth_token", authResult.token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 1
    })

    if(res.statusCode === 200){
      return res.json({
        message: "Login realizado com sucesso!"
      })
    }

    if (res.statusCode === 404) {
      return res.json({
        message: "Usuário não encontrado.",
      });
    }

    if (res.statusCode === 400) {
      return res.json({
        message: "Não foi possível realizar o login devido a um erro no cliente.",
      });
    }

  }
}

export { AuthUserController };
