import { Outlet } from "react-router-dom"
import { Header } from "../../components/main/Header/Header"
import { Footer } from "../../components/main/Footer/Footer"

export const MainLayout = () => {

    return (
    
        <>  
            <Header />
                <Outlet />
            <Footer />

        </>
    )
}