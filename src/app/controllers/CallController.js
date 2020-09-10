import Call from "../models/Call";
import Patient from "../models/Patient";
import Psychologist from "../models/Psychologist";

class CallController {
  async show(request, response) {
    try {
      var id = request.params.id;
      const call = await Call.findOne({ where: { id: id } });
      if (call) {
        return response.json({ message: "Atendimento não existente" });
      }
      return response.json(call);
    } catch (error) {
      console.log(error);
    }
  }

  /*
  TODO: Colocar em outro lugar
  Metodo para pegar as mensagens
async (request, response) {
  try {
    var id = request.params.id;
    const history = await AttendanceHistory.findAll({
      where: { call_id: id },
      order: ["created_at", "ASC"],
    });
  } catch (error) {
    console.log(error);
  }
}
*/
  async store(request, response) {
    try {
      const { patient_id, psychologist_id } = request.body;

      let patientExists = await Patient.findOne(patient_id);
      let psychologistExists = await Psychologist.findOne(psychologist_id);

      if (!patientExists) {
        return response.json({ error: "Paciente não existe" });
      }

      if (!psychologistExists) {
        return response.json({ error: "Psicologo não existe" });
      }
      const call = await Call.create({
        patient_id: patient_id,
        psychologist_id: psychologist_id,
      });

      return response.json(call);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }
}

export default new CallController();
