// CategoryFilterCard.tsx
import { getPostsCategories } from "@/services/posts";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import LocationSearch from "../LocationSearch/location-seach";
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

interface CategoryFilterCardProps {
  onUpdateFilters: (filters: { searchText: string; selectedCategory: string; selectedLocation: { latitude: string, longitude: string, locationRange: string } }) => void;
}

const CategoryFilterCard = ({ onUpdateFilters }: CategoryFilterCardProps) => {
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; locationRange: number }>();

  useEffect(() => {
    getPostsCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const [filters, setFilters] = useState({
    searchText: "",
    selectedCategory: "",
    selectedLocation: {
      latitude: "",
      longitude: "",
      locationRange: ""
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

  useEffect(() => {
    if (location) {
      const newFilters = { ...filters, selectedLocation: {
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        locationRange: location.locationRange.toString()
      } };
      setFilters(newFilters);
      onUpdateFilters(newFilters);
    }
  }, [location]);

  return (
    <div className="flex-row md:flex md:gap-8 items-center">
      <Input
        placeholder="Search"
        className="max-w-full md:w-1/2"
        value={filters.searchText}
        onChange={handleInputChange}
      />
      <div className="flex justify-between my-3 md:w-1/2 md:justify-between">
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex w-2/3 justify-end">
          <LocationSearch
          title="Select location"
          setGeoLocation={setLocation}
          hasRadius={true} />
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterCard;
