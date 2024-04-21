import Login from "../login";


const HeaderBar = () => {

    return (
        <div>
            <header className="bg-slate-600 h-16 flex justify-between items-center px-4">
                <div className="text-white font-semibold text-xl">Lost & Found</div>
                <nav>
                    <ul className="flex gap-4 items-center">
                        <li>
                            <a href="/home"  className="bg-emerald-500 rounded font-semibold text-white h-10 w-fit p-2 hover:bg-emerald-600">Home</a>
                        </li>
                        <li>
                            <a href="/signup"  className="bg-emerald-500 rounded font-semibold text-white h-10 w-fit p-2 hover:bg-emerald-600">Signup</a>
                        </li>
                        <li>
                        <Login/>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )


}

export default HeaderBar;