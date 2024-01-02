import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div className="font-raleway space-y-5 tracking-tight">
      <Header />
      <main className="px-5">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
