import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { createUser } from "../../services/user";

const createUserSchema = z.object({
    name: z.string().nonempty('Name is required'),
    phone: z.string(),
    email: z.string().nonempty('Email is required').email(),
    password: z.string().nonempty('Password is required'),
    address: z.object({
        zipcode: z.string(),
        address: z.string(),
        number: z.string()
    })
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

const SignupForm = () => {
    const [step, setStep] = useState(1); // Step state
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserSchema>({
        resolver: zodResolver(createUserSchema)
    });

    const handleCreateUser = (data: CreateUserSchema) => {
        // Assuming createUser is a function that handles the API call
        createUser(data);
    };

    const nextStep = () => {
        setStep((currStep) => currStep + 1);
    };

    const prevStep = () => {
        setStep((currStep) => currStep - 1);
    };

    return (
        <main className="max-w-md w-full mx-auto p-5 bg-zinc-50 flex items-center justify-center rounded-md">
            <form onSubmit={handleSubmit(handleCreateUser)} className="flex flex-col gap-4 w-full max-w-sm">
                {step === 1 && (
                    <>
                        <input type="text" placeholder="Name" {...register("name")}
                           className="border border-zinc-200 shadow-sm rounded h-10 px-3" />
                        {errors.name && <span>{errors.name.message}</span>}
                        <input type="tel" placeholder="Phone" {...register("phone")}
                          className="border border-zinc-200 shadow-sm rounded h-10 px-3" />
                        <input type="email" placeholder="Email" {...register("email")} 
                          className="border border-zinc-200 shadow-sm rounded h-10 px-3" />
                        {errors.email && <span>{errors.email.message}</span>}
                        <div className='flex justify-center'>

                        <button type="button" onClick={nextStep}
                        className="bg-emerald-500 rounded font-semibold text-white h-10 w-1/3 hover:bg-emerald-600">
                        Next</button>
                            </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <input type="text" placeholder="Address" {...register("address.address")} 
                          className="border border-zinc-200 shadow-sm rounded h-10 px-3" />
                        <input type="text" placeholder="Number" {...register("address.number")} 
                          className="border border-zinc-200 shadow-sm rounded h-10 px-3" />
                        <input type="text" placeholder="ZipCode" {...register("address.zipcode")} 
                          className="border border-zinc-200 shadow-sm rounded h-10 px-3" />

                        <div className='flex justify-evenly'>
                        <button type="button" onClick={prevStep}
                         className="bg-slate-400 rounded font-semibold text-white h-10 w-1/3 hover:bg-slate-600">
                        Back</button>
                        <button type="button" onClick={nextStep}
                        className="bg-emerald-500 rounded font-semibold text-white h-10 w-1/3 hover:bg-emerald-600">
                        Next</button>
                        </div>
                    </>
                )}
                {step === 3 && (
                    <>

                        <input type="password" placeholder="Password" {...register("password")} 
                          className="border border-zinc-200 shadow-sm rounded h-10 px-3" />
                        {errors.password && <span>{errors.password.message}</span>}
                    <div className='flex justify-evenly'>
                        <button type="button" onClick={prevStep}
                          className="bg-slate-400 rounded font-semibold text-white h-10 w-1/3 hover:bg-slate-600">
                        Back</button>
                        <button type="submit" 
                        className="bg-emerald-500 rounded font-semibold text-white h-10 w-1/3 hover:bg-emerald-600">
                            Submit</button>
                    </div>
                    </>
                )}
            </form>
        </main>
    );
};

export default SignupForm;
