import { ChangeEvent, FormEvent } from "react";


export type SearchFormProps = {
  onSubmit: (e:FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm = ({onSubmit, onChangeInput }: SearchFormProps) => {
  return <form onSubmit={onSubmit} className="flex flex-row items-center w-full flex-wrap lg:flex-nowrap">
    <input id="query" name="query" type="text" className="p-12 w-full rounded bg-gray-50 border-2 text-2xl border-gray-50 font-semibold" onChange={(e) => onChangeInput(e) } placeholder="DISCOVER"/>
    <button className="text-xl lg:text-4xl font-semibold lg:border-l border-slate-300 bg-gray-50 px-32 py-12 h-full hover:bg-gray-400 duration-300 w-full lg:w-auto">GO</button>
  </form>
}

export default SearchForm;