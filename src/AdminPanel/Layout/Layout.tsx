import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        <Outlet /> {/* This will render the matched route component */}
      </main>
    </div>
  );
};

export default Layout;