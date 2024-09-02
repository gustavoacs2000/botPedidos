import { Router } from "express";
import whatsappBot from "../models/venomBot.js";
import emailModel from "../models/email.js";

const defaultRoute = Router();

// Configura uma rota para exibir o formulário
defaultRoute.get("/", (req, res) => {
  res.render("form"); // Renderiza a view 'form.ejs'
});

defaultRoute.post("/submit", async (req, res) => {
  try {
    const emailModelInstance = new emailModel(
      "gustavoacs2000@gmail.com",
      "glck zpsq psom bvjh"
    );

    emailModelInstance.buildMailOptions(
      req.body.email,
      "[Qr Code para login do Bot de pedidos]",
      {}
    );
    const whatsappBotModel = new whatsappBot();
    const botPedidos = whatsappBotModel.createWppInstante("botPedidos");
    await start(botPedidos);
    await whatsappBotModel.sendTextMessage(
      botPedidos,
      "Oi Gorinha, Guto te ama!",
      "61982491146"
    );
  } catch (error) {
    throw new Error(`Deu ruim`);
  }
});

export { defaultRoute };
