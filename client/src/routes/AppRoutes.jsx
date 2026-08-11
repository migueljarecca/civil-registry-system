import { Route, Routes } from "react-router-dom"
import { DashboardLayout } from "../layouts/DashboardLayout/DashboardLayout"
import { DashboardPage } from "../pages/dashboard/dashboardPage"
import { PublicLayout } from "../layouts/PublicLayout/PublicLayout"
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout"
import { AuthPage } from "../pages/auth/AuthPage"
import { Login } from "../components/auth/Login"
import { NotFound } from "../pages/shared/NotFound"
import { PublicPage } from "../pages/public/PublicPage"
import { HomePage } from "../pages/public/HomePage/HomePage"


export const AppRoutes = () => {

  return (

    <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          


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