import { Navbar } from "../components/Navbar";
import { HomePage } from "../pages/home";

export const Mainbody = () => {

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "50px" }}>
        <HomePage />
      </div>
    </>
  );
};