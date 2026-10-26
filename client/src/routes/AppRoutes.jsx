import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardLayout } from "../layouts/DashboardLayout/DashboardLayout"
import { DashboardPage } from "../pages/dashboard/dashboardPage"
import { MainLayout } from "../layouts/MainLayout/MainLayout"
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout"
import { LoginPage } from "../pages/auth/login/LoginPage"
import { HomePage } from "../pages/home/HomePage"
import { ServicesPage } from "../pages/services/ServicesPage"
import { ContactPage } from "../pages/Contact/ContactPage"
import { BirthServicePage } from "../pages/services/birth/BirthServicePage"
import { MarriageServicePage } from "../pages/services/marriage/MarriageServicePage"
import { DeathServicePage } from "../pages/services/death/DeathServicePage"
import { CertificatesServicePage } from "../pages/services/certificates/CertificatesServicePage"
import { ServicesOverview } from "../pages/services/overview/ServicesOverview"
import { RegisterPage } from "../pages/auth/register/RegisterPage"
import { UserListPage } from "../pages/dashboard/users/UserListPage"
import { ProtectedRoute } from "../components/common/ProtectedRoute"
import { UserLayout } from "../layouts/UserProfileLayout/UserProfileLayout"
import { NotFoundPage } from "../pages/shared/NotFoundPage"
import { ProfilePage } from "../pages/user/perfil/ProfilePage"
import { ProfileEditPage } from "../pages/user/perfil/ProfileEditPage"
import { ChangePasswordPage } from "../pages/user/perfil/ChangePasswordPage"
import { ForbiddenPage } from "../pages/shared/ForbiddenPage"
import { UserFormPage } from "../pages/dashboard/users/UserFormPage"
import { UserDetailPage } from "../pages/dashboard/users/UserDetailPage"


export const AppRoutes = () => {

  return (

    <Routes>

      {/* Public routes with MainLayout */}
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


      {/* Public routes with auth */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>        


      {/* Protected routes with UserLayout (ROLE_USER) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/profile/change-password" element={<ChangePasswordPage />} />
        </Route>
      </Route>


      {/* Protected routes with DashboardLayout (ROLE_ADMIN) */}
      <Route element={<ProtectedRoute requiredRoles={['ROLE_ADMIN']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/users" element={<UserListPage />} />
          <Route path="/admin/users/new" element={<UserFormPage />} />
          <Route path="/admin/users/:id" element={<UserDetailPage />} />
          <Route path="/admin/users/:id/edit" element={<UserFormPage />} />
        </Route>
      </Route>


      {/* 403 - Access denied */}
      <Route path="/403" element={<ForbiddenPage />} />

      {/* 404 - Not found */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>

  )

}  