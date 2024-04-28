import { useNavigate } from "react-router-dom";
import Login from "../login";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import SignupForm from "../SignupForm";

const HeaderBar = () => {
  const navigate = useNavigate();


  return (
    <header className="sticky top-0 w-full z-50 mt-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">

        
        <div className="flex md:justify-start">

        <Button onClick={() => navigate("/")}>Lost&Found</Button>
        </div>
   
       
        <div className="flex  items-center justify-between space-x-2 md:justify-end">

       <SignupForm/>
        <Login />
        <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
