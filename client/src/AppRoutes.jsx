import { Route, Routes } from "react-router-dom"
import { PublicLayout } from "./layout/PublicLayout"

export const AppRoutes = () => {

  return (

    <Routes>
        <Route path="/" element={<PublicLayout />}>

        </Route>
    </Routes>

  )

}  