import { AuthContext } from "@/context/authContext";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Search, PlusCircle, MessageCircle, User, LogOut } from "lucide-react";
import { Input } from "../ui/input";

const HeaderBar = () => {
  const navigate = useNavigate();
  const { isAuth, user } = useContext<any>(AuthContext);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 w-full z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-xl font-bold"
          >
            Lost & Found
          </Button>

          <div className="hidden md:flex items-center ml-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lost items..."
              className="pl-10 w-[200px] lg:w-[300px]"
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAuth ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center gap-1"
                onClick={() => navigate("/myposts")}
              >
                <User className="h-4 w-4" />
                My Posts
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center gap-1"
                onClick={() => navigate("/messages")}
              >
                <MessageCircle className="h-4 w-4" />
                Messages
              </Button>

              <Button
                variant="default"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => navigate("/create-post")}
              >
                <PlusCircle className="h-4 w-4" />
                <span className="hidden md:inline">New Post</span>
              </Button>

              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "user"}`}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email || ""}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/myposts")}>
                    <User className="mr-2 h-4 w-4" />
                    My Posts
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Messages
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-2">
                <SignupForm />
                <Login />
              </div>
              <div className="md:hidden flex items-center gap-2">
                <Login />
              </div>
              <ModeToggle />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
