import { defaultRoute } from "./routes/index.js";
import express from "express";

const server = express();
const port = 3000;

server.set("views", "./views");
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));
server.use("/", defaultRoute);

server.listen(port, () => {
  console.log("app listening on port: " + port);
});
