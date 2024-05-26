import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { createUser } from "../../services/user";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogContent,DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

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

    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserSchema>({
        resolver: zodResolver(createUserSchema)
    });

    const handleCreateUser = (data: CreateUserSchema) => {
        createUser(data).then((res) => {
            if (res?.status === 201) {
                alert('User created successfully');
            } else {
                alert('Error creating user');
            }

        }
        );
    };


    return (
        <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Signup</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create your account</DialogTitle>
            </DialogHeader>
        <main className="max-w-md w-full mx-auto  p-5flex items-center justify-center rounded-md">
            <form onSubmit={handleSubmit(handleCreateUser)} className="flex flex-col gap-4 w-full max-w-sm">
               
                   
                        <Input type="text" placeholder="Name" {...register("name")}
                          />
                        {errors.name && <span>{errors.name.message}</span>}
                        <Input type="tel" placeholder="Phone" {...register("phone")}
                           />
                        <Input type="email" placeholder="Email" {...register("email")} 
                           />
                        {errors.email && <span>{errors.email.message}</span>}
                      
                
                        <Input type="text" placeholder="Address" {...register("address.address")} 
                          />
                        <Input type="text" placeholder="Number" {...register("address.number")} 
                     />
                        <Input type="text" placeholder="ZipCode" {...register("address.zipcode")} 
                        />

                      
                        <Input type="password" placeholder="Password" {...register("password")} 
                           />
                        {errors.password && <span>{errors.password.message}</span>}
                    <div className='flex justify-evenly'>
                    
                        <Button type="submit" 
                       >
                            Submit</Button>
                    </div>
                   
                
            </form>
        </main>
        </DialogContent>
        </Dialog>
    );
};

export default SignupForm;
