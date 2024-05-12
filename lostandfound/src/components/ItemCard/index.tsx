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

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (postData) {
      setIsLoading(false);
    }
  }, [postData]);

  

  

  return isLoading ? (
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
      <Card className={`my-5 flex md:container md:mx-auto ${isMobile ? 'h-[28vw]':'h-[10vw]'}`}>
        <CardContent className="relative min-w-[120px] md:w-[15vw] md:pb-[10vw] overflow-hidden">
          <img
            src={ ` ${postData ? postData.images.map((image) => image.imageLink)[0] : '/images/placeholder.png'}`}
            alt=""
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
        </CardContent>
        <div className="m-2 w-full flex flex-col">
          <CardHeader className="flex flex-grow p-0">
            <CardTitle>{postData.title}</CardTitle>
          </CardHeader>
          {!isMobile && (
            <CardDescription className="flex-grow overflow-hidden">
              {postData.description}
            </CardDescription>
          )}
          <div className="flex flex-grow-0 h-[20%] items-end justify-between p-0 overflow-hidden">
            <p>{"Taguatinga - DF"}</p>
            <p>{postData.category.name}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ItemCard;
