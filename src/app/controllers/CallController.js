import Call from "../models/Call";

class CallController {
  async show(request, response) {
    try {
      var id = request.params.id;
      const call = await Call.findOne({ where: { id: id } });
      if (call.length == null) {
        return response.json({ message: "A" });
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

      const call = await Call.create({
        patient_id: patient_id,
        psychologist_id: psychologist_id,
        cal_start: Date.now(),
        cal_end: Date.now(),
      });

      return response.json(call);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }
}

export default new CallController();
