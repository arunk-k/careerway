import { createContext, useEffect, useState } from "react"

export const AuthContextAdmin = createContext()

function AdminAuthContext({ children }) {

    const [adminAuthStatus, setAdminAuthStatus] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem("admintoken");
        if (token) {
            setAdminAuthStatus(true);
        }
    }, [])

    return (
        <>
            <AuthContextAdmin.Provider value={{ adminAuthStatus, setAdminAuthStatus }} >
                {children}
            </AuthContextAdmin.Provider>
        </>
    )
}

export default AdminAuthContext
