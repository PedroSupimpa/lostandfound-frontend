import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const categoriesList = [
  "All",
  "Electronics",
  "Clothing",
  "Pets",
  "Jewelry",
  "Furniture",
  "Books",
  "Other",
];

interface CategoryFilterCardProps {
    onUpdateFilters: (filters: any) => void;
}

const CategoryFilterCard = ({ onUpdateFilters }:CategoryFilterCardProps) => {
  const isMobile = window.innerWidth < 640;

  const [filters, setFilters] = useState({
    searchText: "",
    selectedCategory: "All",
    selectedLocation: "",
  });

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, searchText: e.target.value };
    setFilters(newFilters);
    onUpdateFilters(newFilters);
};

const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, selectedCategory: category };
    setFilters(newFilters);
    onUpdateFilters(newFilters);
};

  const handleLocationClick = () => {
    const newFilters = { ...filters, selectedLocation: "selectedLocation" };
    setFilters(newFilters);
    onUpdateFilters(newFilters);
  };

  return (
    <div className={`${isMobile ? "flex-row" : "flex"}`}>
      <Input
        placeholder="Search"
        className={`${isMobile ? "max-w-full" : "w-1/2"}`}
        value={filters.searchText}
        onChange={handleInputChange}
      />
      <div className={`${
          isMobile ? "flex justify-between my-3" : "flex w-1/2 justify-evenly"
        }`}
      >
        <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categoriesList.map((item) => (
                        <SelectItem key={item} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
        <Button onClick={handleLocationClick}>
            Location
        </Button>
      </div>
    </div>
  );
};

export default CategoryFilterCard;