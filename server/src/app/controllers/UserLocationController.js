import UserLocation from '../Schemas/UserLocation';
import { findConnections, sendMessage } from '../../websocket';

class UserLocationController {
  async index(req, res) {
    const usersLocations = await UserLocation.find();

    return res.json(usersLocations);
  }

  async store(req, res) {
    const { name, user_health, latitude, longitude } = req.body;
    const id = req.userId;

    let userLocation = await UserLocation.findOne({ id });

    if (!userLocation) {
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      userLocation = await UserLocation.create({
        name,
        id,
        user_health,
        location,
      });

      // filtrar as conexoes que estao no max 10km de distancia e que o novo dev tenha pelo menos 1 das tech
      // filtradas

      const sendSocketMessageIo = findConnections({ latitude, longitude });

      sendMessage(sendSocketMessageIo, 'new-user-location', userLocation);
    }

    return res.json(userLocation);
  }
}

export default new UserLocationController();
