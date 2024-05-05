
import  {createContext, useState} from "react";


export const AuthContext = createContext({});



function AuthProvider({children}: any) {

    const [isAuth, setIsAuth] = useState(false);

    return (
        <AuthContext.Provider value={{isAuth,setIsAuth}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;