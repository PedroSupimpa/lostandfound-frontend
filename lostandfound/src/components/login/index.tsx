import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "../../services/user";

const loginSchema = z.object({
    email: z.string().nonempty('Email is required').email(),
    password: z.string().nonempty('Password is required')
});


type LoginSchema = z.infer<typeof loginSchema>;


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>();

    const [isOpen, setIsOpen] = useState(false);


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
        <>
            <button onClick={() => setIsOpen(!isOpen)}
                className="bg-emerald-500 rounded font-semibold text-white h-10 w-fit p-2 hover:bg-emerald-600"
            >Login</button>

            {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center">

                <div className="max-w-md w-full mx-auto  p-5 bg-zinc-50 flex items-center justify-center rounded-md">
                    < form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4 w-full max-w-sm">
                        <input type="email" placeholder="Email" {...register("email")}
                            className="border border-zinc-200 shadow-sm rounded h-10 px-3" />
                        {errors.email && <span>{errors.email.message}</span>}
                        <input type="password" placeholder="Password" {...register("password")}
                            className="border border-zinc-200 shadow-sm rounded h-10 px-3" />
                        {errors.password && <span>{errors.password.message}</span>}
                        <div className='flex justify-evenly'>
                            <button type="submit"
                                className="bg-emerald-500 rounded font-semibold text-white h-10 w-1/3 hover:bg-emerald-600">
                                Login</button>
                            <button type="button" onClick={() => setIsOpen(false)}
                                className="bg-emerald-500 rounded font-semibold text-white h-10 w-1/3 hover:bg-emerald-600">Close</button>
                        </div>
                    </form >
                </div>
                </div>

            )}

        </>
    );
}

export default Login;