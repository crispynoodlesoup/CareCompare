import style from "./nav.module.css";
import { Link } from "react-router-dom";

function NavLink({ link, text }) {
  return <Link className={style.navLink} to={link}>{text}</Link>;
}

function Nav() {
  return (
    <nav>
      <h2>CareCompare</h2>
      <ul>
        <NavLink link="./" text="Price Checker" />
        <NavLink link="./about" text="About" />
      </ul>
    </nav>
  );
}

export default Nav;
