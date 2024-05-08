import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Post } from "@/services/posts";

interface ItemCardProps {
  postData: Post;
}

const ItemCard = ({ postData }: ItemCardProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (postData) {
      setIsLoading(false);
    }
  }, [postData]);

  return (
    isLoading ? (
      <div>
      <Card className="m-6 flex md:container md:mx-auto">
          <div className="flex  space-x-4 p-4 w-full">
            <Skeleton className="h-[120px] w-[130px] " />
            <div className="space-y-2 w-full">
              <Skeleton className="h-10 w-[40%]" />


              <Skeleton className="h-4 w-[50%]" />
              <Skeleton className="h-4 w-[50%]" />

            </div>
          </div>
        </Card>
      </div>
    ) : (
      <div key={postData.id}>
        <        Card className="m-6 flex md:container md:mx-auto">
          <CardContent className="relative w-full md:w-[15vw] md:pb-[10vw] overflow-hidden">

            <img
              src={false ? "" : "/images/placeholder.png"}
              alt=""
              className="absolute top-0 left-0 h-full w-full object-cover"
            />
          </CardContent>
          <div className="m-2">
            <CardHeader className="h-1/3">
                <CardTitle>{postData.title}</CardTitle>
              </CardHeader>
              <CardDescription className="overflow-hidden h-1/3">
                {postData.description}
              </CardDescription>
              <div className="px-5 flex items-baseline justify-end gap-4 h-1/3">
                <p>{"category"}</p>
                <p>{"location"}</p>
              </div>
            </div>
          </Card>
        </div>
      )
  );
};

export default ItemCard;
