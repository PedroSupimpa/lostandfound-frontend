import { Card } from "@/components/ui/card";
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
import { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost, getPostsCategories, saveImageLink } from "@/services/posts";
import { firebaseFileUpload } from "@/utils/firabase-file-upload";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const createPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.number(),
  location: z.any(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

const CreatePost = () => {
  const isMobile = window.innerWidth < 640;
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );


  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  });

  const handleCreatePost = async (data: CreatePostSchema) => {
    data.location = "(11.2, 75.5)";
    const postCreation = await createPost(data,1);
    
    if (postCreation.status === 200 && images.length > 0) {
      firebaseFileUpload(images).then((urls) => {
        urls.forEach((url) => {
          saveImageLink(postCreation.data.id,url).then((res) => {
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
    
      <form
        onSubmit={handleSubmit(handleCreatePost)}
      >
       
          <Label htmlFor="Title">Title</Label>
          <Input
            {...register("title")}
            type="text"
            placeholder="title"
            className={`my-3 `}
          />
        

          <div className="flex justify-between">

          <div className="w-[50%]">

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
            <div>

          <Label htmlFor="Location">Location</Label>
          <Input  type="text" placeholder="location" {...register('location')}/>

            </div>
            </div>
            
            <Label htmlFor="Description">Description</Label>
            
            <Textarea 
            {...register("description")}
            
            />
          
          
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
          

          <div className=" flex justify-center items-center mt-5">
            <Button   className="w-[35%]" type="submit">Create</Button>
          </div>
        
      </form>
      
        </DialogContent>
        </Dialog>
  );
};

export default CreatePost;
