import nodemailer from "nodemailer";

export default class emailModel {
  constructor(remetente, password) {
    this.remetente = remetente;
    this.password = password;
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      auth: {
        user: remetente,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async buildMailOptions(destinatario, assunto, infoEmail) {
    try {
      let mailOptions = {
        from: this.remetente,
        to: destinatario,
        subject: assunto,
      };

      if (infoEmail.text) {
        mailOptions.text = infoEmail.text;
      }

      if (infoEmail.html) {
        mailOptions.html = infoEmail.html;
      }

      if (infoEmail.attachments) {
        mailOptions.attachments = infoEmail.attachments;
      }
      return mailOptions;
    } catch (error) {
      throw new Error(
        `Erro ao montar informações para envio de email:\n${error}`
      );
    }
  }

  async enviarEmail(mailOptions, LogExecucao) {
    try {
      this.transporter.sendMail(mailOptions, async function (err, info) {
        if (err) {
          throw new Error();
        } else {
          await LogExecucao.addLog(`Email enviado com sucesso`);
          console.log(`Email enviado com sucesso`);
        }
      });
    } catch (error) {
      throw new Error(`Erro ao enviar email:\n${error}`);
    }
  }
}
