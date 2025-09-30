import { Outlet } from "react-router"
import Header from "./Header/Header"

export function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

