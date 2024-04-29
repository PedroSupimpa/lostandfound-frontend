import { getPosts } from "@/services/posts";
import CategoryFilterCard from "../CategoryFilterCard";
import ItemCard from "../ItemCard";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";



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

//type ItensListSchema = z.infer<typeof itensListSchema>;



const ItemsListContainer = () => {

//     const { register, handleSubmit, formState: { errors } } = useForm<ItensListSchema>({
//         resolver: zodResolver(itensListSchema)
//     });

//     const getPostItems = getPosts({
//         latitude: "",
//         longitude: "",
//         locationRange: "",
//         category: "",
//         text: "",
//         page: "1",
//         postQty: "10",
//         sortPost: "createdDate"
// });

    
  return (
    <div className="">
      <CategoryFilterCard
        onUpdateFilters={(filters) => {
          console.log(filters);
        }}
        />
      {Array.from({ length: 30 }).map((_, index) => {
        return <ItemCard key={index} />;
      })}
    </div>
  );
};

export default ItemsListContainer;
