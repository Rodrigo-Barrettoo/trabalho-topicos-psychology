import Psy_availability from "../models/Psy_availability";
import convertHourToMinutes from '../../utils/convertHourToMinutes'

class Psy_availabilityController {
  async show(request, response) {
    const psychologist_id = request.auth_id;

    const availabilities = await Psy_availability.findAll({ where: {psychologist_id} });

    return response.json(availabilities);

  }

  async store(request, response) {
    const { availabilities } = request.body;
    const psychologist_id = request.auth_id;

    const availability = availabilities.map(availability => {
      return {
        psychologist_id,
        week_day: availability.week_day,
        from: convertHourToMinutes(availability.from),
        to: convertHourToMinutes(availability.to),
      };
    })

    await Psy_availability.bulkCreate(availability);

    return response.json();
  }

  async delete(request, response) {
    const { id } = request.params;
    const psychologist_id = request.auth_id;

    const psy_availability = await Psy_availability.findByPk(id)

    if (psy_availability.psychologist_id === psychologist_id) {
      await psy_availability.destroy();
      return response.status(201).json({ success: "Disponibilidade excluida com sucesso!" });
    }

    return response.status(401).json({ error: "Não foi possivel excluir disponibilidade!"})
  }
}

export default new Psy_availabilityController();
