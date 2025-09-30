import { Outlet } from "react-router";
import Menu from "./Menu/Menu";

export function DefaultLayout() {
  return (
    <main>
      <section className="admin-section">
        <div className="admin-title">
          <h1>Nortex dashboard</h1>
        </div>

        <div className="admin-wrap">
          <Menu />
          <Outlet />
        </div>
      </section>
    </main>
  );
}


export default DefaultLayout