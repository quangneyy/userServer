import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8081;

// config cors
configCors(app);

// config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection db
connection();

// init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port = " + PORT);
});
