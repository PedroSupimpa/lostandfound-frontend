import { useNavigate } from "react-router-dom";
import Login from "../login";


const HeaderBar = () => {
    const navigate = useNavigate();



   


    return (
        <div>
            <header className="bg-slate-600 h-16 flex justify-between items-center px-4">
                <div className="text-white font-semibold text-xl">Lost & Found</div>
                <nav>
                    <ul className="flex gap-4 items-center">
                        <li>
                            <button onClick={ () => navigate('/')}
                              className="bg-emerald-500 rounded font-semibold text-white h-10 w-fit p-2 hover:bg-emerald-600">Home</button>
                        </li>
                        <li>
                            <button onClick={ () => navigate('/signup')}
                             className="bg-emerald-500 rounded font-semibold text-white h-10 w-fit p-2 hover:bg-emerald-600">Signup</button>
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