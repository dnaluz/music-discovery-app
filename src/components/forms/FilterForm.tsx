import { years } from '@/lib/years';
import { genres } from '@/lib/genres';
import { discOgCountries } from '@/lib/countries';

export type FilterFormProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  filters: {
    year: string;
    country: string;
    genre: string;
  }
}

const FilterForm = ({handleChange, filters}: FilterFormProps) => {
  return <div className="flex flex-row flex-wrap text-xl font-semibold">
    <div className="w-full text-base">Filter by </div>
      <div className="mr-4">
        <label htmlFor="year">Year:</label>
        <select onChange={handleChange} name="year" id="year" value={filters.year} className="text-xl min-w-40">
          {years.map((year) =>  <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
      <div className="mr-4">
        <label htmlFor="genre">Genre:</label>
        <select onChange={handleChange} name="genre" id="genre" value={filters.genre} className="text-xl min-w-40">
          <option value="">All</option>
          {genres.map((genre: string) => { return <option key={genre} value={genre}>{genre}</option>})}
        </select>
      </div>
      <div>
        <label htmlFor="countries">Country:</label>
        <select id="countries" name="country" value={filters.country} onChange={handleChange} className="text-xl">
          {discOgCountries.map((country) => {
            return <option key={country} value={country}>{country}</option>
          })}
        </select>
      </div>
  </div>
}

export default FilterForm;