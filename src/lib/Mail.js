const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'psytopicos@gmail.com',
    pass: '123Psy123'
  }
});

export default async function run(email, minutos) {
  await transporter.sendMail({
    subject:'Agendamentos',
    from: `Psicólogo <${'psytopicos@gmail.com'}>`,
    to: email,
    html: `<html><h1>Você tem uma consulta em ${minutos} minutos!</h1></html>`,
  }).then(message => {
    console.log(message);
  }).catch(err => {
    console.log(err);
  })
}
