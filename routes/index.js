import { Router } from "express";
import whatsappBot from "../models/venomBot.js";
import { sendQrCodeViaEmail } from "../dispatcher/sendQrCodeEmail.js";
import path from "path";

const defaultRoute = Router();

// Configura uma rota para exibir o formulário
defaultRoute.get("/", (req, res) => {
  res.render("form"); // Renderiza a view 'form.ejs'
});

defaultRoute.post("/submit", async (req, res) => {
  try {
    const whatsappBotModel = new whatsappBot();
    const botPedidos = await whatsappBotModel.createWppInstante("botPedidos");
    await sendQrCodeViaEmail(req.body.email, "wppCaptcha/", "botPedidos"); // hard codded file path see why venomBot.js row 22/23
    // await start(botPedidos);
    // await whatsappBotModel.sendTextMessage(
    //   botPedidos,
    //   "Oi Gorinha, Guto te ama!",
    //   "61982491146"
    // );
  } catch (error) {
    throw new Error(`Deu ruim`);
  }
});

export { defaultRoute };
