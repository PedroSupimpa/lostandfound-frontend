import { useNavigate } from "react-router-dom";
import Login from "../login";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { Input } from "../ui/input";
import SignupForm from "../SignupForm";

const HeaderBar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 w-full z-50 mt-1">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">

        
        <div className="flex md:justify-start">

        <Button onClick={() => navigate("/")}>Lost&Found</Button>
        </div>
   



    
      <div className="flex w-1/2 md:justify-center items-center py-4">
     

      <Input
          placeholder="Filter emails..."
          value={"Teste"}
          onChange={()=>{}}
         className="w-2/3"
          />
         
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
