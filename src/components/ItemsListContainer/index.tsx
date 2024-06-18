import { IPostResponse, getPosts } from "@/services/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CategoryFilterCard from "../CategoryFilterCard";
import ItemCard from "../ItemCard";

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
  const { } = useForm<ItensListSchema>({
    resolver: zodResolver(itensListSchema),
  });

  const [filters, setFilters] = useState({
    selectedCategory: "",
    searchText: "",
    selectedLocation: { latitude: "", longitude: "", locationRange: "" },
  });

  const [posts, setPosts] = useState<IPostResponse>({ posts: [], totalPages: 0 });

  const getPostItems = async () => {
    try {
      const posts = await getPosts({
        text: `${filters.searchText}` || "",
        category: `${filters.selectedCategory}` || "",
        latitude: `${filters.selectedLocation.latitude}` || "",
        longitude: `${filters.selectedLocation.longitude}` || "",
        locationRange: `${filters.selectedLocation.locationRange}` || "",
        page: "1",
        postQty: "10",
        sortPost: "createdDate",
      });

      setPosts(posts);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    getPostItems();
  }, [filters]);

  return (
    <div className="w-full">
      <CategoryFilterCard
        onUpdateFilters={(
          filters: {
            searchText: string;
            selectedCategory: string;
            selectedLocation: {
              latitude: string;
              longitude: string;
              locationRange: string;
            };
          }
        ) => setFilters((prevFilters) => ({ ...prevFilters, ...filters }))}
      />
      {posts?.posts.map((post) => (
        <ItemCard key={post.id} postData={post} />
      ))}
    </div>
  );
};

export default ItemsListContainer;
