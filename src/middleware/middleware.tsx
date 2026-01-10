import MainLayout from "@/layout/main-layout"
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router"

const Middleware = () => {
    const isMainPath = useLocation().pathname === "/"
    const navigation = useNavigate();

    // ----------------------------------------------------------------------

    useEffect(() => {
        if (isMainPath) {
            navigation("/projects", { replace: true });
        }
    }, [isMainPath, navigation]);

    // ----------------------------------------------------------------------


    return <MainLayout><Outlet /></MainLayout>
}

export default Middleware