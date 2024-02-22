import style from "./style.module.css";
import Nav from "./components/nav/nav";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className={style.pageContainer}>
      <Nav/>
      <Outlet />
    </div>
  )
}

export default App
