import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUser } from "../../services/user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { useState } from "react";
import { Loader2, User, Phone, Mail, Lock, MapPin } from "lucide-react";

const createUserSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone: z.string().optional(),
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
  address: z
    .object({
      zipcode: z.string().optional(),
      address: z.string().optional(),
      number: z.string().optional(),
    })
    .optional(),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

const SignupForm = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      address: {
        zipcode: "",
        address: "",
        number: "",
      },
    },
  });

  const handleCreateUser = async (data: CreateUserSchema) => {
    setIsLoading(true);
    setMessage("");

    try {
      const res = await createUser(data);
      if (res?.status === 201) {
        setMessage("Account created successfully! You can now log in.");
        setError(false);
        reset();
        setTimeout(() => setOpen(false), 2000); // Close dialog after success
      } else {
        setMessage(res?.data?.error || "Error creating account");
        setError(true);
      }
    } catch (error: any) {
      setMessage(
        error?.response?.data?.error || "An unexpected error occurred",
      );
      setError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create your account
          </DialogTitle>
          <DialogDescription>
            Join our community to find your lost items or help others
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleCreateUser)}
          className="space-y-4 py-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="pl-10"
                  {...register("phone")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address (Optional)</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Street Address"
                  className="pl-10"
                  {...register("address.address")}
                />
              </div>
              <Input placeholder="Number" {...register("address.number")} />
              <Input placeholder="Zip Code" {...register("address.zipcode")} />
            </div>
          </div>

          <DialogFooter className="flex-col space-y-2 pt-4">
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
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupForm;
