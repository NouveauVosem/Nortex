import { NavLink } from "react-router"


function Menu() {
  return (
     <div className="admin-menu">
              
              <div className="admin-menu-title">Nortex Dashboard</div>
              <div className="admin-menu-title">MENU</div>
              <NavLink to={"/profile"} className="admin-menu-item">Profile</NavLink>
              <NavLink to={"/"} className="admin-menu-item">Products</NavLink>
              <div className="admin-menu-item">Design</div>
            </div>
  )
}

export default Menu