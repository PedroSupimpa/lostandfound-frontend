import { IPostResponse, getPosts } from "@/services/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CategoryFilterCard from "../CategoryFilterCard";
import ItemCard from "../ItemCard";
import { initializeLocalStorage } from "@/utils/localStorage";

const itensListSchema = z.object({
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  locationRange: z.string().optional(),
  category: z.string().optional(),
  text: z.string().optional(),
  page: z.string().optional(),
  postQty: z.string().optional(),
  sortPost: z.string().optional(),
});

type ItensListSchema = z.infer<typeof itensListSchema>;

const ItemsListContainer = () => {
  const {} = useForm<ItensListSchema>({
    resolver: zodResolver(itensListSchema),
  });

  const [filters, setFilters] = useState({
    selectedCategory: "",
    searchText: "",
    selectedLocation: { latitude: "", longitude: "", locationRange: "" },
  });

  // Implement debounced filter updates to prevent rapid reloads
  const updateFilters = (newFilters: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const [posts, setPosts] = useState<IPostResponse>({
    posts: [],
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);

  // Initialize localStorage with mock data - only once when component mounts
  useEffect(() => {
    initializeLocalStorage();
    // Initial data fetch
    getPostItems();
  }, []);

  // Define getPostItems outside of the component or memoize it
  const getPostItems = async () => {
    try {
      setLoading(true);
      const posts = await getPosts({
        text: filters.searchText || "",
        category: filters.selectedCategory || "",
        latitude: filters.selectedLocation.latitude || "",
        longitude: filters.selectedLocation.longitude || "",
        locationRange: filters.selectedLocation.locationRange || "",
        page: "1",
        postQty: "10",
        sortPost: "createdDate",
      });

      setPosts(posts);
    } catch (error) {
      console.error(error);
      setPosts({ posts: [], totalPages: 0 });
    } finally {
      setLoading(false);
    }
  };

  // Use a ref to track if filters have changed
  const prevFiltersRef = useRef<typeof filters | null>(null);

  useEffect(() => {
    // Only fetch if filters have actually changed
    const filtersChanged =
      JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters);
    if (filtersChanged || prevFiltersRef.current === null) {
      getPostItems();
      prevFiltersRef.current = { ...filters };
    }
  }, [
    filters.searchText,
    filters.selectedCategory,
    filters.selectedLocation.latitude,
    filters.selectedLocation.longitude,
    filters.selectedLocation.locationRange,
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-2xl font-bold mb-4">Find Lost Items</h2>
        <CategoryFilterCard
          onUpdateFilters={(filters: {
            searchText: string;
            selectedCategory: string;
            selectedLocation: {
              latitude: string;
              longitude: string;
              locationRange: string;
            };
          }) => updateFilters(filters)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : posts.posts.length > 0 ? (
        <div className="space-y-6">
          {posts.posts.map((post) => (
            <ItemCard key={post.id} postData={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No items found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search filters
          </p>
        </div>
      )}
    </div>
  );
};

export default ItemsListContainer;
