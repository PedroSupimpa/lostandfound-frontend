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
import { Search, MapPin, Tag } from "lucide-react";

interface CategoryFilterCardProps {
  onUpdateFilters: (filters: {
    searchText: string;
    selectedCategory: string;
    selectedLocation: {
      latitude: string;
      longitude: string;
      locationRange: string;
    };
  }) => void;
}

const CategoryFilterCard = ({ onUpdateFilters }: CategoryFilterCardProps) => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    locationRange: number;
  }>();
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const categoriesData = await getPostsCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const [filters, setFilters] = useState({
    searchText: "",
    selectedCategory: "",
    selectedLocation: {
      latitude: "",
      longitude: "",
      locationRange: "",
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
      const newFilters = {
        ...filters,
        selectedLocation: {
          latitude: location.latitude.toString(),
          longitude: location.longitude.toString(),
          locationRange: location.locationRange.toString(),
        },
      };
      setFilters(newFilters);
      onUpdateFilters(newFilters);
    }
  }, [location]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or description"
          className="pl-10 w-full"
          value={filters.searchText}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-2 mb-1">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Category</span>
          </div>
          <Select
            onValueChange={handleCategoryChange}
            value={filters.selectedCategory}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Categories</SelectItem>
                {isLoadingCategories ? (
                  <SelectItem value="loading" disabled>
                    Loading categories...
                  </SelectItem>
                ) : (
                  categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Location</span>
          </div>
          <LocationSearch
            title="Select location"
            setGeoLocation={setLocation}
            hasRadius={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterCard;
