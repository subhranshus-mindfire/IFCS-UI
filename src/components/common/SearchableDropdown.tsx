import { useEffect, useRef, useState, type SetStateAction } from "react";

interface Option {
  [key: string]: string;
}

interface SearchableDropdownProps {
  options: Option[];
  label: string;
  id: string;
  selectedVal: SetStateAction<string>;
  handleChange: (value: SetStateAction<string>) => void;
}

const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
}: SearchableDropdownProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target === inputRef.current) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const selectOption = (option: Option) => {
    setQuery("");
    handleChange(option[label]);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  console.log(options)

  const filteredOptions = options.filter((option) => 
    option[label].toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="dropdown relative w-full">
      {/* Input Box */}
      <div className="control w-full">
        <input
          ref={inputRef}
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder={label}
          value={getDisplayValue() as string}
          name="searchTerm"
          onChange={(e) => {
            setQuery(e.target.value);
            handleChange("");
          }}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="options absolute left-0 right-0 bg-white border border-gray-300 rounded shadow-md max-h-48 overflow-auto z-50">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                onClick={() => selectOption(option)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${option[label] === selectedVal ? "bg-gray-200" : ""
                  }`}
                key={`${id}-${index}`}
              >
                {option[label]}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
