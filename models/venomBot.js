import * as fs from "fs";
import * as venom from "venom-bot";
import { sendQrCodeViaEmail } from "../dispatcher/sendQrCodeEmail";

export default class whatsappBot {
  constructor() {}

  async createWppInstante(instanceName) {
    try {
      return venom.create(
        "sessionName",
        (base64Qr, asciiQR) => {
          console.log(asciiQR); // Opcional to log the QR in the terminal
          var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

          if (matches.length !== 3) {
            return new Error("Invalid input string");
          }
          response.type = matches[1];
          response.data = new Buffer.from(matches[2], "base64");

          var imageBuffer = response;
          fs.mkdir("wppCaptcha");
          fs.writeFile(
            `wppCaptcha/${instanceName}.png`,
            imageBuffer["data"],
            "binary",
            function (err) {
              if (err != null) {
                console.log(err);
              }
            }
          );
          sendQrCodeViaEmail("", wppCaptcha, instanceName + ".png"); // AQUI PRECISA VER COMO RECEBER ESSES PARAMETROS
        },
        undefined,
        { logQR: false }
      );
    } catch (error) {
      throw new Error(`Erro ao montar instancia de whatsapp:\n${error}`);
    }
  }

  async sendTextMessage(instanceClient, messageText, numberToSend) {
    try {
      await instanceClient
        .sendText(numberToSend + "@c.us", messageText)
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
          console.error("Error when sending: ", erro); //return object error
        });
    } catch (error) {
      console.log(`Erro ao enviar mensagem de captcha:\n${error}`);
      console.log(`Erro ao enviar mensagem de captcha:\n${error}`);
    }
  }
}
