import {countriesData, emptyCountry} from '../constants/countriesData';

const getCountries = () => {
  return countriesData;
};

const getCountryById = (id: number) => {
  return countriesData.find(c => c.id === id);
};

const getStartCountrySpacer = () => {
  return {
    ...emptyCountry,
    id: -1,
  };
};

const getEndCountrySpacer = () => {
  return {
    ...emptyCountry,
    id: -2,
  };
};

export default {
  getCountries,
  getCountryById,
  getStartCountrySpacer,
  getEndCountrySpacer,
};
