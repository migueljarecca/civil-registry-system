import { Route, Routes } from "react-router-dom"
import { DashboardLayout } from "../layouts/DashboardLayout/DashboardLayout"
import { DashboardPage } from "../pages/dashboard/dashboardPage"
import { PublicLayout } from "../layouts/PublicLayout/PublicLayout"
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout"
import { AuthPage } from "../pages/auth/AuthPage"
import { Login } from "../components/auth/Login"
import { NotFound } from "../pages/shared/NotFound"
import { HomePage } from "../pages/public/HomePage/HomePage"
import { ServicesPage } from "../pages/public/ServicesPage/ServicesPage"
import { ContactPage } from "../pages/public/Contact/ContactPage"


export const AppRoutes = () => {

  return (

    <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />

        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>

        <Route path="*" element={<NotFound />} />



    </Routes>

  )

}  