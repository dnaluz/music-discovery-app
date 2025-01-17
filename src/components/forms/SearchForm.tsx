import { ChangeEvent, FormEvent } from "react";


export type SearchFormProps = {
  onSubmit: (e:FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm = ({onSubmit, onChangeInput }: SearchFormProps) => {
  return <form onSubmit={onSubmit} className="flex flex-row items-center w-full">
    <input id="query" name="query" type="text" className="p-12 w-full rounded bg-gray-50 border-2 text-2xl border-gray-50 font-semibold" onChange={(e) => onChangeInput(e) } placeholder="DISCOVER MUSIC NOW"/>
    <button className="text-4xl border-l border-slate-300 bg-gray-50 px-32 py-12 h-full hover:bg-gray-400 duration-300">Discover</button>
  </form>
}

export default SearchForm;