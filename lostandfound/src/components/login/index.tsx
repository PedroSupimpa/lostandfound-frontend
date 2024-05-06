import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "../../services/user";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";



const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email(),
  password: z.string().nonempty("Password is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const isMobile = window.innerWidth < 640;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });


  

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const  {setIsAuth}  = useContext<any>(AuthContext);

  const handleLogin = (data: LoginSchema) => {
    setIsLoading(true); 
    login(data.email, data.password)
      .then((res) => {
        setIsLoading(false); 
        if (res.status === 200) {
          setIsAuth(true);
          setMessage("Login successful");
          setError(false);
        } else {
          
          if (res.data && res.data.error) {
            setMessage(res.data.error); 
          } else {
            setMessage("An error occurred while logging in."); 
          }
          setError(true);
        }
      })
      .catch((error) => {
        setIsLoading(false); 
        if (error.response && error.response.data && error.response.data.error) {
          setMessage(error.response.data.error); 
        } else {
          setMessage("Network error occurred while logging in."); 
        }
        setError(true);
        console.error(error); 
      });
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className={`${isMobile ? "w-full" : "sm:max-w-[425px]"}`}>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Enter your email and password to login
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="gap-4 py-4">
            <div className="">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="youremail@lostandfound.com"
                  className={`my-3 ${errors.email ? "border-red-500" : ""}`}
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={`my-3 ${errors.password ? "border-red-500" : ""}`}
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 mt-4">
              <Label htmlFor="forgetpassword">
                <a href="#" className="text-blue-500">
                  Forget password?
                </a>
              </Label>
            </div>
          </div>
          <DialogFooter>
            <span className={`${error ? "text-red-500" : "text-green-500"}`}>
              {message}
            </span>

            <Button type="submit">Log in</Button>
          </DialogFooter>
        </form>
        {isloading && <span>Loading...</span>}
      </DialogContent>
    </Dialog>
  );
};

export default Login;
