import { Route, Routes } from "react-router-dom"
import { PublicLayout } from "./layout/PublicLayout"
import { Home } from "./pages/Home"
import { BirthSearchPage } from "./pages/births/BirthSearchPage"
import { MarriageSearchPage } from "./pages/marriages/MarriageSearchPage"
import { DeathSearchPage } from "./pages/deaths/DeathSearchPage"

export const AppRoutes = () => {

  return (

    <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path ="births" element={<BirthSearchPage />} />
          <Route path ="marriages" element={<MarriageSearchPage />} />
          <Route path ="deaths" element={<DeathSearchPage />} />   
        </Route>

    </Routes>

  )

}  