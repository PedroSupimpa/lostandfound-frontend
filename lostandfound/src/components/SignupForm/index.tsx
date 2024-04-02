

const SignupForm = () => {
    return (
        <main className="h-screen bg-zinc-50 flex items-center justify-center">
            
            <form className="flex flex-col gap-4 w-full max-w-sm">

            <div className="flex flex-col gap-1">
                <input type="text" placeholder="Name" 
                className="border border-zinc-200 shadow-sm rounded h-10 px-3"/>
            </div>

            <div className="flex flex-col gap-1">
                <input type="tel" placeholder="Phone" 
                className="border border-zinc-200 shadow-sm rounded h-10 px-3"/>
            </div>            
             <div className="flex flex-col gap-1">
                <input type="email" placeholder="Email" 
                className="border border-zinc-200 shadow-sm rounded h-10 px-3"/>
            </div>


            <div className="flex flex-col gap-1">
                <input type="password" placeholder="Password" 
                className="border border-zinc-200 shadow-sm rounded h-10 px-3"/>
            </div>

            <div className="flex flex-col">

                <input type="text" placeholder="Address" 
                className="border border-zinc-200 shadow-sm rounded h-10 px-3"/>

                <div className="flex-row gap-3">

                <input type="text" placeholder="Number" 
                className="border border-zinc-200 shadow-sm rounded h-10 w-1/4 px-3"/>
                <input type="text" placeholder="ZipCode" 
                className="border border-zinc-200 shadow-sm rounded h-10 w-3/4 px-3"/>

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