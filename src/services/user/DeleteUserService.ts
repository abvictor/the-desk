
import prismaClient from "../../prisma";

interface UserDeleteRequest {
  company_id: string;
  user_id: string;
}

class DeleteUserService {
  async execute({ company_id, user_id }: UserDeleteRequest) {

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
        company_id: company_id,
      },
    });

    if(!user){
      throw new Error("Usuário não encontrado ou não registrado na empresa atual.")
    }

    const deleteUser = await prismaClient.user.delete({
      where: {
        id: user_id,
      },
    });

    return deleteUser;
  }
}

export { DeleteUserService };
