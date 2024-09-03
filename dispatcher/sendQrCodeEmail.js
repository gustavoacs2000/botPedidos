import emailModel from "../models/email.js";
import path from "path";

async function sendQrCodeViaEmail(destinatario, filePath, fileName) {
  try {
    const emailModelInstance = new emailModel(
      "gustavoacs2000@gmail.com",
      "glck zpsq psom bvjh"
    );
    const mailOptions = await emailModelInstance.buildMailOptions(
      destinatario,
      "[Qr Code para login do Bot de pedidos]",
      {
        text: "Segue em anexo QrCode para iniciar uma sessão do bot de pedidos",
        attachments: [
          {
            path: path.join(filePath, fileName),
            filename: fileName,
          },
        ],
      }
    );

    await emailModelInstance.enviarEmail(mailOptions);
  } catch (error) {
    console.log(error);
  }
}

export { sendQrCodeViaEmail };
