import { Router } from "express";
import multer from "multer";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateCompanyController } from "./controllers/company/CreateCompanyController";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductController } from "./controllers/product/ListProductController";

import { DeleteProductController } from "./controllers/product/DeleteProductController";

import { CreateProductModuleController } from "./controllers/product-module/CreateProductModuleController";
import { ListProductModuleController } from "./controllers/product-module/ListProductModuleController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { CreateTicketController } from "./controllers/ticket/CreateTicketController";
import { ListAllTicketsController } from "./controllers/ticket/ListAllTicketsController";
import { UpdateTicketController } from "./controllers/ticket/UpdateTicketController";
import { GetTicketByIdService } from "./services/ticket/GetTicketByIdService";
import { GetTicketByIdController } from "./controllers/ticket/GetTicketByIdController";
import { UpdateTicketStatusController } from "./controllers/ticket/UpdateTicketStatusController";



const router = Router();

// const upload = multer(uploadConfig.updload("./tmp"));


//rota de login
router.post("/login", new AuthUserController().handle)

//rotas da empresa
router.post("/create-account/company", new CreateCompanyController().handle);


//rotas de usuário
router.post("/create-account/user", isAuthenticated ,new CreateUserController().handle);
router.delete("/manage/company/users/:user_id", isAuthenticated, new DeleteUserController().handle);
router.patch("/manage/company/users/:user_id", isAuthenticated, new UpdateUserController().handle);


//rotas de produto
router.get(
  "/product/list-products",
  isAuthenticated,
  new ListProductController().handle
);

router.get(
  "/product/list-modules",
  isAuthenticated,
  new ListProductModuleController().handle
);

router.post("/product/create-product", isAuthenticated, new CreateProductController().handle);
router.delete("/product/delete-product/:product_id", isAuthenticated, new DeleteProductController().handle);

//rotas de modulos
router.post("/product-module/create-module", isAuthenticated, new CreateProductModuleController().handle);


//rotas para tickets
router.post(
  "/tickets/create-ticket",
  isAuthenticated,
  new CreateTicketController().handle
);

router.get(
  "/tickets/list-all",
  isAuthenticated,
  new ListAllTicketsController().handle
);

router.put(
  "/tickets/update",
  isAuthenticated,
  new UpdateTicketController().handle
);

router.get(
  "/tickets/:ticket_id",
  isAuthenticated,
  new GetTicketByIdController().handle
);

router.put(
  "/tickets/update/status",
  isAuthenticated,
  new UpdateTicketStatusController().handle
);

export { router };

