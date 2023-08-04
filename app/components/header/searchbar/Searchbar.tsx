'use client';

import { useState } from 'react';

import SearchButton from './SearchButton';

const Searchbar = () => {
  const [query, setQuery] = useState<string>('');

  const triggerSearch = () => {
    console.log('searching...' + query);
  };

  return (
    <div className="flex items-center flex-wrap gap-4 w-full md:w-auto rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <input
        className="outline-none px-6 py-2"
        type="text"
        placeholder="Kde..."
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton triggerSearch={triggerSearch} />
    </div>
  );
};

export default Searchbar;
