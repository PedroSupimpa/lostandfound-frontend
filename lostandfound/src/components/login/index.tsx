import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "../../services/user";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z.string().nonempty('Email is required').email(),
    password: z.string().nonempty('Password is required')
});


type LoginSchema = z.infer<typeof loginSchema>;


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });



    const handleLogin = (data: LoginSchema) => {
        login(data.email, data.password).then((res) => {
            if (res?.status === 200) {
                alert('User logged in successfully');
            } else {
                alert('Error logging in');
            }

        });
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="gap-4 py-4">
                        <div className="">
                            <Input
                                id="email"
                                type="email"
                                placeholder="youremail@lostandfound.com"
                                className={`my-3 ${errors.email ? 'border-red-500' : ''}`}
                                {...register("email")}
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                className={`my-3 ${errors.password ? 'border-red-500' : ''}`}
                                {...register("password")}
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
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
                        <Button type="submit">Log in</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default Login;