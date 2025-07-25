import { createContext, useEffect, useState } from "react";

export const AuthContextUser = createContext();

function UserAuthContext({ children }) {



    const [userAuthStatus, setUserAuthStatus] = useState(() => {
        return !!sessionStorage.getItem("token");
    });

    return (
        <AuthContextUser.Provider value={{ userAuthStatus, setUserAuthStatus }}>
            {children}
        </AuthContextUser.Provider>
    );
}

export default UserAuthContext;
