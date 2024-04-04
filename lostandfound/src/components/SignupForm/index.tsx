import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { createUser } from "../../services/user";

const createUserSchema = z.object({
    name: z.string().nonempty('Name is required'),
    phone: z.string(),
    email: z.string().nonempty('Email is required').email(),
    password: z.string(),
    address: z.object({
        zipcode: z.string(),
        address: z.string(),
        number: z.string()
    }).optional()
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserSchema>({
        resolver: zodResolver(createUserSchema)
    });

    function handleCreateUser(data: CreateUserSchema) {
        createUser(data)        
    }

    return (
        <main className="h-screen bg-zinc-50 flex items-center justify-center">
            <form onSubmit={handleSubmit(handleCreateUser)} className="flex flex-col gap-4 w-full max-w-sm">
                <div className="flex flex-col gap-1">
                    <input type="text" placeholder="Name"
                        className="border border-zinc-200 shadow-sm rounded h-10 px-3"
                        {...register("name")} />
                    {errors.name && <span className="text-red-500">Name is required</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <input type="tel" placeholder="Phone"
                        className="border border-zinc-200 shadow-sm rounded h-10 px-3"
                        {...register("phone")} />
                    {errors.phone && <span className="text-red-500">Invalid phone number</span>}
                </div>     
             <div className="flex flex-col gap-1">
                <input type="email" placeholder="Email" 
                        className="border border-zinc-200 shadow-sm rounded h-10 px-3"
                        {...register("email", { required: true })} />
                    {errors.email && <span className="text-red-500">Email is required</span>}
            </div>


            <div className="flex flex-col gap-1">
                <input type="password" placeholder="Password" 
                        className="border border-zinc-200 shadow-sm rounded h-10 px-3"
                        {...register("password", { required: true })} />
            </div>

            <div className="flex flex-col">

                <input type="text" placeholder="Address" 
                        className="border border-zinc-200 shadow-sm rounded h-10 px-3"
                        {...register("address.address", { required: true })} />

                <div className="flex-row gap-3">

                <input type="text" placeholder="Number" 
                            className="border border-zinc-200 shadow-sm rounded h-10 w-1/4 px-3"
                            {...register("address.number", { required: true })} />
                <input type="text" placeholder="ZipCode" 
                            className="border border-zinc-200 shadow-sm rounded h-10 w-3/4 px-3"
                            {...register("address.zipcode", { required: true })} />

                </div>


            </div>


            <button  type='submit'
            className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600">
                Submit</button>
        
            </form>
        </main>
    )
}

export default SignupForm