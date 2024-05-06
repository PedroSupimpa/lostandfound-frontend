import { useEffect, useState } from "react";
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
import { useDebounce } from "@uidotdev/usehooks";
import { getPostsCategories } from "@/services/posts";





interface CategoryFilterCardProps {
    onUpdateFilters: (filters: { searchText: string; selectedCategory: string; selectedLocation: {latitude:string,longitude:string,locationRange:string} }) => void;
}

const CategoryFilterCard = ({ onUpdateFilters }:CategoryFilterCardProps) => { 
  const isMobile = window.innerWidth < 640;
  
  const [categories, setCategories] = useState<{id:number,name:string}[]>([]);

  useEffect(() => {
    getPostsCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);
  

  const [filters, setFilters] = useState({
    searchText: "",
    selectedCategory: "",
    selectedLocation:{
        latitude:"",
        longitude:"",
        locationRange:""
    },
  });

 
 const debouncedSearchTerm = useDebounce(filters.searchText, 300);

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const newFilters = { ...filters, searchText: e.target.value };
     setFilters(newFilters);
 };

 useEffect(() => {
     const newFilters = { ...filters, searchText: debouncedSearchTerm };
     onUpdateFilters(newFilters);
 }, [debouncedSearchTerm]);  


const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, selectedCategory: category };
    setFilters(newFilters);
    onUpdateFilters(newFilters);
};

  const handleLocationClick = () => {
    const newFilters = { ...filters, selectedLocation: {latitude:"",longitude:"",locationRange:""} };
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
        <Select  onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}> 
                  {category.name}
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
