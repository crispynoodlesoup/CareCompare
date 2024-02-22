import style from "./nav.module.css";
import { Link, useLocation } from "react-router-dom";

function NavLink({ link, text, selected }) {
  return (
    <Link
      className={
        selected ? `${style.navLink} ${style.selectedLink}` : style.navLink
      }
      to={link}
    >
      {text}
    </Link>
  );
}

function Nav() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav>
      <h2>CareCompare</h2>
      <ul>
        <NavLink link="./" text="Price Checker" selected={pathname == "/"} />
        <NavLink link="./about" text="About" selected={pathname == "/about"} />
      </ul>
    </nav>
  );
}

export default Nav;
