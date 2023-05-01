import placesService from './placesService';

const getHotelsByCidAndPid = (cid: number, pid: number) => {
  const place = placesService.getPlaceByCidAndId(cid, pid);
  if (!place) return null;
  return place.hotels;
};

export default {
  getHotelsByCidAndPid,
};
