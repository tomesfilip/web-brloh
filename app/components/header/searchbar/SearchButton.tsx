import { AiOutlineSearch } from 'react-icons/ai';

const SearchButton = ({ triggerSearch }: { triggerSearch: () => void }) => {
  return (
    <button
      onClick={triggerSearch}
      className="border-0 cursor-pointer rounded-lg inline-flex items-center py-2 px-4"
    >
      <AiOutlineSearch size={20} className="mr-1" />
      <div>Hledat</div>
    </button>
  );
};

export default SearchButton;
