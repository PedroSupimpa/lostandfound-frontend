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
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email(),
  password: z.string().nonempty("Password is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const isMobile = window.innerWidth < 640;
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuth } = useContext<any>(AuthContext);

  const handleLogin = async (data: LoginSchema) => {
    setIsLoading(true);
    setMessage("");

    try {
      const res = await login(data.email, data.password);

      if (res.status === 200) {
        setIsAuth(true);
        setMessage("Login successful");
        setError(false);
        reset();
        setTimeout(() => setOpen(false), 1000); // Close dialog after successful login
      } else {
        if (res.data && res.data.error) {
          setMessage(res.data.error);
        } else {
          setMessage("An error occurred while logging in.");
        }
        setError(true);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Invalid email or password.");
      }
      setError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent
        className={`${isMobile ? "w-full" : "sm:max-w-[425px]"} bg-card`}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Welcome Back</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="youremail@example.com"
                className={errors.email ? "border-destructive" : ""}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={errors.password ? "border-destructive" : ""}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="flex-col space-y-2">
            {message && (
              <p
                className={`text-sm ${error ? "text-destructive" : "text-green-500"}`}
              >
                {message}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
