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
      let { patient_id, psychologist_id, cal_start } = request.body;

      if (cal_start == null) {
        cal_start = Date.now();
      } else if (cal_start < Date.now()) {
        return response.json({ error: "Data invalida" });
      }

      const data = {
        patient_id: patient_id,
        psychologist_id: psychologist_id,
        cal_start: cal_start,
      };

      const call = await Call.create(data);

      return response.json(call);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }

  async edit(request, response) {
    try {
      const { id } = request.params;
      const { psychologist_id } = request.body;

      let call = await Call.findByPk(id);

      if (call) {
        call.psychologist_id = psychologist_id;
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
