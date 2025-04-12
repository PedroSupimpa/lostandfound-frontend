import LocationSearch from "@/components/LocationSearch/location-seach";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  createPost,
  getPostsCategories,
  saveImageLink,
} from "@/services/posts";
import { firebaseFileUpload } from "@/utils/firabase-file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  category: z.number({ required_error: "Category is required" }),
  location: z.any().optional(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

const CreatePost = () => {
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    locationRange: number;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  });

  const handleCreatePost = async (data: CreatePostSchema) => {
    if (!location) {
      toast.error("Please select a location");
      return;
    }

    setIsSubmitting(true);
    setSuccess(false);

    try {
      const payload = {
        ...data,
        location: `(${location.latitude}, ${location.longitude})`,
        category: { id: data.category },
      };

      const postCreation = await createPost(payload);

      if (postCreation.status === 201) {
        if (images.length > 0) {
          const urls = await firebaseFileUpload(images);
          for (const url of urls) {
            await saveImageLink(postCreation.data.id, url);
          }
        }

        setSuccess(true);
        toast.success("Post created successfully!");
        reset();
        setTimeout(() => {
          navigate("/myposts");
        }, 1500);
      } else {
        toast.error(postCreation.data?.error || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("An error occurred while creating the post");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getPostsCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create a New Post
          </CardTitle>
          <CardDescription>
            Fill in the details about the lost or found item
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleCreatePost)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                {...register("title")}
                id="title"
                type="text"
                placeholder="What did you lose or find?"
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange } }) => (
                    <Select
                      onValueChange={(selectedValue) =>
                        onChange(parseInt(selectedValue))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-sm text-destructive">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <LocationSearch
                  title="Select location"
                  setGeoLocation={setLocation}
                  hasRadius={false}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                id="description"
                placeholder="Provide details about the item, when and where it was lost or found"
                className="min-h-[120px]"
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                  if (event.target.files != null) {
                    const filesArray = Array.from(event.target.files);
                    setImages(filesArray);
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                Upload images of the item to help others identify it
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || success}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : success ? (
                  <>Success!</>
                ) : (
                  <>Create Post</>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
