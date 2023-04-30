import {emptyPlace} from '../constants/countriesData';
import countriesService from './countriesService';

const getPlaceByCidAndId = (cid: number, id: number) => {
  const country = countriesService.getCountryById(cid);
  if (!country) return null;
  const place = country.places.find(p => p.id === id);
  return place ?? null;
};

const getStartPlaceSpacer = () => {
  return {
    ...emptyPlace,
    id: -1,
  };
};

const getEndPlaceSpacer = () => {
  return {
    ...emptyPlace,
    id: -2,
  };
};

export default {
  getPlaceByCidAndId,
  getStartPlaceSpacer,
  getEndPlaceSpacer,
};
