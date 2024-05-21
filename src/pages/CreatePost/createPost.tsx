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

const CreatePost = () => {
  const isMobile = window.innerWidth < 640;

  return (
   
    <div className={`flex justify-center items-center w-full h-[80vh] bg-purple-500`}>
        <Card>
          <Label htmlFor="Title">Title</Label>
          <Input
            id="email"
            type="email"
            placeholder="youremail@lostandfound.com"
            className={`my-3 `}
          />
          <Label htmlFor="Description">Description</Label>
          <Input
            id="email"
            type="email"
            placeholder="youremail@lostandfound.com"
            className={`my-3 `}
          />

          <Label htmlFor="Category">Category</Label>
          <Select onValueChange={() => {}}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key={"teste"} value={"teste"}>
                  {"Categorias"}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label htmlFor="Location">Location</Label>
          <Input id="email" type="email" placeholder="" />
        </Card>
   
    </div>
  );
};

export default CreatePost;
