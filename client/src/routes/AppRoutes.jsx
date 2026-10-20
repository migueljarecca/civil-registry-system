import { Route, Routes } from "react-router-dom"
import { DashboardLayout } from "../layouts/DashboardLayout/DashboardLayout"
import { DashboardPage } from "../pages/dashboard/dashboardPage"
import { MainLayout } from "../layouts/MainLayout/MainLayout"
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout"
import { LoginPage } from "../pages/auth/login/LoginPage"
import { NotFound } from "../pages/shared/NotFound"
import { HomePage } from "../pages/home/HomePage"
import { ServicesPage } from "../pages/services/ServicesPage"
import { ContactPage } from "../pages/Contact/ContactPage"
import { BirthServicePage } from "../pages/services/birth/BirthServicePage"
import { MarriageServicePage } from "../pages/services/marriage/MarriageServicePage"
import { DeathServicePage } from "../pages/services/death/DeathServicePage"
import { CertificatesServicePage } from "../pages/services/certificates/CertificatesServicePage"
import { ServicesOverview } from "../pages/services/overview/ServicesOverview"
import { RegisterPage } from "../pages/auth/register/RegisterPage"


export const AppRoutes = () => {

  return (

    <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/services" element={<ServicesPage />}>
            <Route index element={<ServicesOverview />}/>
            <Route path="birth" element={<BirthServicePage />}/>
            <Route path="marriage" element={<MarriageServicePage />}/>
            <Route path="death" element={<DeathServicePage />}/>
            <Route path="certificates" element={<CertificatesServicePage />}/>
          </Route>

          <Route path="/contact" element={<ContactPage />} />

        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />



    </Routes>

  )

}  