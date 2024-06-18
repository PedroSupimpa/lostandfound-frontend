import { AuthContext } from "@/context/authContext";
import CreatePost from "@/pages/CreatePost/createPost";
import { logout } from "@/services/user";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../SignupForm";
import Login from "../login";
import { ModeToggle } from "../mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const HeaderBar = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext<any>(AuthContext);

  return (
    <header className="sticky top-0 w-full z-50 mt-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex md:justify-start">
          <Button onClick={() => navigate("/")}>L&F</Button>
        </div>

        <div className="flex  items-center justify-between space-x-2 md:justify-end">
          {isAuth ? (
            <>
              <Button onClick={()=> navigate("/myposts")}>My posts</Button>
              <Button>Chat</Button>
              <CreatePost/>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://avatars.dicebear.com/api/avataaars/123.svg"
                      alt=""
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
                      logout(), navigate("/");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
            <SignupForm />
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
