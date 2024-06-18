import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUserPosts } from "@/services/posts";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";





const MyPosts = () => {

    const [posts, setPosts] = useState<any>([]);
   
    const getPosts = async () => 
    {
        const posts = await getUserPosts();
        
        return setPosts(posts);
    }

    useEffect(() => {
        getPosts();
    }, []);


    

    return(
        <div className="flex  container justify-center">

        
        <Table>
        <TableHeader>
            
          <TableRow>
            <TableHead >Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead >Created At</TableHead>
            <TableHead>Closed at</TableHead>
            <TableHead >Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {posts?.map((post:any, index:any) => (
                <TableRow key={index}>
                <TableHead>{post.title}</TableHead>
                <TableHead>{post.category.name}</TableHead>
                <TableHead>{post.createdDate}</TableHead>
                <TableHead>{!post.closedDate ?  "-" : post.closedDate }</TableHead>
                <TableHead>
                <div className="flex justify-start gap-5">
                <Pencil
                    size={20}
                    className="cursor-pointer"
                    
                    
                  />
                <Trash
                    size={20}
                    className="cursor-pointer"
                    
                  />
                </div>
                </TableHead>

                </TableRow>
            ))}
        </TableBody>
      </Table>
      </div>
    )
    
}

export default MyPosts