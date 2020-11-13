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
    html: `
    <html>
      <div style="width: 100%; height: 300px">
        <body  style="width: 320px;">
          <header style="width: 320px; background: #26235A;  border-radius: 8px 8px 0 0;">
            <h2 style="color: #fff; padding: 16px;">
              Consultas
            </h2>
          </header>

          <main style="width:100%; background: #d1d1d1;">
            <h3 style="padding: 30px 16px;">
              Você tem uma consulta em ${minutos} minutos!
            </h3>
          </main>

          <div style="width: 320px; background: #26235A;  border-radius: 0 0 8px 8px;">
            <h4 style="color: #fff; padding: 16px;">
              Todos os direitos reservados. 2020.
            </h4>
          </div>
        </body>
      </div>
    </html>
    `,
  }).then(message => {
    console.log(message);
  }).catch(err => {
    console.log(err);
  })
}
