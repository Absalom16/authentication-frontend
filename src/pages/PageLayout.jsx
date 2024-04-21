import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <span style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <Footer />
      </span>
    </div>
  );
}
