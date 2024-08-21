import express from "express";

const server = express();
const port = 3000;

server.listen(port, () => {
  console.log("app listening on port: " + port);
});
