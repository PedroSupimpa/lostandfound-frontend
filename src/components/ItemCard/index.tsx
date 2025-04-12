import { Post } from "@/services/posts";
import getLocationName from "@/utils/getLocationName";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MapPin, Calendar, Tag, Eye, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
  postData: Post;
}

const ItemCard = ({ postData }: ItemCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [locationName, setLocationName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationName = async () => {
      if (postData && postData.location) {
        try {
          const name = await getLocationName(
            postData.location.x,
            postData.location.y,
          );
          setLocationName(name);
        } catch (error) {
          setLocationName("Unknown location");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchLocationName();
  }, [postData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const handleViewDetails = () => {
    // In a real app, this would navigate to a details page
    console.log("View details for post:", postData.id);
  };

  const handleContactOwner = () => {
    console.log("Contact owner for post:", postData.id);
    // Navigate to messages page with the post owner's contact info
    navigate(
      `/messages?contactId=${postData.userId || "default"}&postId=${postData.id}`,
    );
  };

  return isLoading ? (
    <Card className="w-full overflow-hidden bg-card">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="h-[220px] md:w-1/3" />
        <div className="p-4 md:w-2/3 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </div>
    </Card>
  ) : (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-all duration-300 bg-card border-border">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-[220px] md:w-1/3 overflow-hidden group">
          <img
            src={
              postData?.images?.length > 0
                ? postData.images[0].imageLink
                : "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"
            }
            alt={postData.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2">
            <Badge
              variant={postData.closedDate ? "secondary" : "default"}
              className="font-medium"
            >
              {postData.closedDate ? "Found" : "Lost"}
            </Badge>
          </div>
          {postData?.images?.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              +{postData.images.length - 1} more
            </div>
          )}
        </div>
        <div className="flex flex-col p-4 md:w-2/3">
          <CardHeader className="p-0 pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl md:text-2xl font-bold">
                {postData.title}
              </CardTitle>
              <CardDescription className="flex items-center text-sm whitespace-nowrap ml-2">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(postData.createdDate)}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-0 py-3 flex-grow">
            <p className="text-sm md:text-base line-clamp-3 text-foreground/90">
              {postData.description}
            </p>
          </CardContent>

          <CardFooter className="p-0 pt-2 flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex flex-col space-y-1 sm:space-y-0 sm:flex-row sm:space-x-4">
              <span className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate max-w-[150px]">{locationName}</span>
              </span>
              <span className="flex items-center text-sm text-muted-foreground">
                <Tag className="h-4 w-4 mr-1 flex-shrink-0" />
                {postData.category.name}
              </span>
            </div>

            <div className="flex space-x-2 w-full sm:w-auto justify-end">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-initial"
                onClick={handleContactOwner}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex-1 sm:flex-initial"
                onClick={handleViewDetails}
              >
                <Eye className="h-4 w-4 mr-2" />
                Details
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
