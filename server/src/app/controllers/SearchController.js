import UserLocation from '../Schemas/UserLocation';

class SearchController {
  async index(req, res) {
    const { latitude, longitude } = req.query;

    const usersLocations = await UserLocation.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });
    return res.json({ usersLocations });
  }
}

export default new SearchController();
