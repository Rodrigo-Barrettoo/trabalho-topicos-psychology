import Call from "../models/Call";
import Patient from "../models/Patient";
import Psychologist from "../models/Psychologist";
import AttendanceHistory from "../models/AttendanceHistory";

class CallController {
  async show(request, response) {
    try {
      const { id } = request.params;
      const call = await Call.findOne({
        where: { id: id },
        include: [
          {
            model: Patient,
            as: "fk_patients",
            attributes: { exclude: ["pat_password_hash"] },
          },
          {
            model: Psychologist,
            as: "fk_psychologists",
            attributes: { exclude: ["psy_password_hash"] },
          },
        ],
      });

      return response.json(call);
    } catch (error) {
      console.log(error);
    }
  }

  async store(request, response) {
    try {
      const { patient_id, psychologist_id } = request.body;

      let patientExists = await Patient.findOne({
        where: { id: patient_id },
      });
      let psychologistExists = await Psychologist.findOne({
        where: { id: psychologist_id },
      });

      if (!patientExists) {
        return response.json({ error: "Paciente não existe" });
      }

      if (!psychologistExists) {
        return response.json({ error: "Psicologo não existe" });
      }

      const data = {
        patient_id: request.body.patient_id,
        psychologist_id: request.body.psychologist_id,
        cal_note: request.body.cal_note,
        cal_start: Date.now(),
      };

      const call = await Call.create(data);

      return response.json(call);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }

  async close(request, response) {
    try {
      const { id } = request.params;
      const { cal_note } = request.body;

      let call = await Call.findByPk(id);

      if (call) {
        call.cal_end = Date.now();
        call.cal_note = cal_note;
        call.save();
      } else {
        console.log({ error: "Atendimento invalido" });
        return response.json({ error: "Atendimento invalido" });
      }

      return response.json(call);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }

  async history(request, response) {
    try {
      const { id } = request.params;
      let call = await Call.findByPk(id);

      if (!call) {
        console.log({ error: "Atendimento invalido" });
        return response.json({ error: "Atendimento invalido" });
      }

      const history = await AttendanceHistory.findAll({
        where: { call_id: id },
        order: [["created_at", "asc"]],
      });

      return response.json(history);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }
}

export default new CallController();
