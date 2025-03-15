import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchValue } from "../features/Search/searchSlice";

function NotFound() {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchValue(search));
    setSearch("");
  };
  return (
    <div className="mt-5 bg-[#f1f3f5] flex  items-center justify-center flex-col gap-8 pt-5 pb-[14rem] md:pt-10 md:pb-5">
      <p className="font-serif text-2xl font-semibold text-center md:text-4xl ">The page you&apos;re looking
      for can&apos;t be found.</p>
      <form onSubmit={handleSearchSubmit}>
              <input
                className="w-[16rem] md:w-[18rem] py-[4px] focus:outline-none focus:ring-2 dark:focus:ring-black rounded-md pl-1"
                placeholder="Search News"
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              ></input>
              <button
                type="submit"
                className="ml-3 bg-gray-400 px-[5px] py-[1.5px] rounded-sm text-white text-[16px]"
              >
                Go
              </button>
            </form>
    </div>
  );
}

export default NotFound;
