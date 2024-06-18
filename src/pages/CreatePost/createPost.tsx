import LocationSearch from "@/components/LocationSearch/location-seach";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
import { createPost, getPostsCategories, saveImageLink } from "@/services/posts";
import { firebaseFileUpload } from "@/utils/firabase-file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.number(),
 location:z.any().optional(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

const CreatePost = () => {
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; locationRange: number }>();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  });

  const handleCreatePost = async (data: CreatePostSchema) => {
    if (!location) {
      // Handle error: location not set
      return;
    }

    const payload = {
      ...data,
      location:`(${location.latitude}, ${location.longitude})`,
      category:{id:data.category},
    };

    const postCreation = await createPost(payload);

    if (postCreation.status === 200 && images.length > 0) {
      firebaseFileUpload(images).then((urls) => {
        urls.forEach((url) => {
          saveImageLink(postCreation.data.id, url).then((res) => {
            console.log(res);
          });
        });
      });
    }
  };

  useEffect(() => {
    getPostsCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Post</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[2/3] h-auto">
        <DialogHeader>
          <DialogTitle>Create a new Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreatePost)}>
          <Label htmlFor="Title">Title</Label>
          <Input
            {...register("title")}
            type="text"
            placeholder="title"
            className={`my-3 `}
          />
          {errors.title && <span>{errors.title.message}</span>}

          <div className="flex justify-between">
            <div className="w-1/2">
              <Label htmlFor="Category">Category</Label>
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
            </div>
            <div className="flex  flex-col justify-between">
              <Label htmlFor="Location">Location</Label>
              <LocationSearch
              title="Select location"
              setGeoLocation={setLocation}
              hasRadius={false} />
            </div>
          </div>

          <Label htmlFor="Description">Description</Label>
          <Textarea {...register("description")} />

          <Label htmlFor="Images">Images</Label>
          <Input
            id="images"
            type="file"
            placeholder=""
            multiple
            onChange={(event) => {
              if (event.target.files != null) {
                const filesArray = Array.from(event.target.files);
                setImages(filesArray);
              }
            }}
          />

          <div className="flex justify-center items-center mt-5">
            <Button className="w-1/4" type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
