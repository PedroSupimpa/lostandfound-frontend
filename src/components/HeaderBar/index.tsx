import { useNavigate } from "react-router-dom";
import Login from "../login";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CreatePost from "@/pages/CreatePost/createPost";

const HeaderBar = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext<any>(AuthContext);

  return (
    <header className="sticky top-0 w-full z-50 mt-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex md:justify-start">
          <Button onClick={() => navigate("/")}>L&F</Button>
        </div>

        <div className="flex  items-center justify-between space-x-2 md:justify-end">
          {isAuth ? (
            <>
              <Button>My posts</Button>
              <Button>Chat</Button>
              <CreatePost/>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/pedrosupimpa.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>Chat</DropdownMenuItem>
                  <DropdownMenuItem>
                    <ModeToggle />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsAuth(false), navigate("/");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Login />
              <ModeToggle />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
