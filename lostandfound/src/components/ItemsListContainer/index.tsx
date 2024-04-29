import { getPosts } from "@/services/posts";
import CategoryFilterCard from "../CategoryFilterCard";
import ItemCard from "../ItemCard";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";



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

    const {  } = useForm<ItensListSchema>({
        resolver: zodResolver(itensListSchema)
    });

    const [filters, setFilters] = useState({selectedCategory:"",searchText:"" ,selectedLocation:{latitude:"",longitude:"",locationRange:""}});
    
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
          sortPost: "createdDate"
        });
       
        return posts;
        
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    

    useEffect(() => {
      getPostItems();
    }, [filters]);

    
  return (
    <div className="">
      <CategoryFilterCard
        onUpdateFilters={(filters: { searchText: string; selectedCategory: string;
           selectedLocation: { latitude: string; longitude: string; locationRange: string; }; }) => 
            setFilters(prevFilters => ({ ...prevFilters, ...filters }))}
      />
      {Array.from({ length: 30 }).map((_, index) => {
        return <ItemCard key={index} />;
      })}
    </div>
  );
};

export default ItemsListContainer;
