import Call from "./app/models/Call";
import Patient from "./app/models/Patient";
import { formatISO } from "date-fns";
import Sequelize from 'sequelize'
import convertHourToMinutes from './utils/convertHourToMinutes';
import Mail from './lib/Mail';

export default () =>
  setInterval(async () => {
    const calls = await Call.findAll({
      raw: true,
      attributes: ["cal_start", [Sequelize.col('fk_patients.pat_email'), 'Patient']],
      include: [
        {
          model: Patient,
          as: "fk_patients",
          attributes: [],
        },
      ],
    });

    calls.map(async(call) => {
      const agendado = formatISO(call.cal_start);
      const hoje = formatISO(new Date());

      const [dataAtual, horaAtual] = hoje.split('T');
      const [dataAgendada, horaAgendada] = agendado.split('T');

      if (dataAgendada === dataAtual) {

        const horMinAg = convertHourToMinutes(horaAgendada);
        const horMinAt = convertHourToMinutes(horaAtual);

        //13:00 - 12:00 === 780 - 720 = 60
        if (horMinAg - horMinAt <= 15 && horMinAg - horMinAt > 0) {
          const minutos = (horMinAg - horMinAt);
          console.log(call.Patient);
          await Mail(call.Patient, minutos);
        }
      }
    });
  }, 900000);
