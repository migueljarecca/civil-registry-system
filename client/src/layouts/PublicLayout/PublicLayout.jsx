import { Outlet } from "react-router-dom"
import { Header } from "../../components/public/Header/Header"
import { Footer } from "../../components/public/Footer/Footer"

export const PublicLayout = () => {

    return (
    
        <>  
            <Header />
            <main className="public-main">
                <Outlet />
            </main>
            <Footer />

        </>
    )
}