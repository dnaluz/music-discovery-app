import { countries } from 'countries-list';

const discOgCountries = Object.entries(countries).map((country) => {
  return country[1].name === 'United States' ? 'US' : country[1].name;
});

export { discOgCountries };