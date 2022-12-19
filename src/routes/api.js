import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */
const testMiddleware = (req, res, next) => {
  console.log("Calling a middleware");
  if (true) {
    return res.send("reject middleware");
  }
  next();
};

const initApiRoutes = (app) => {
  // path, handler
  //rest api
  //GET - R, POST - C, PUT - U, DELETE - D
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  router.post("/login", testMiddleware, apiController.handleLogin);

  router.get("/user/read", userController.readFunc);
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  router.get("/group/read", groupController.readFunc);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
