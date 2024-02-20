import style from "./nav.module.css";

function NavLink({ link, text }) {
  return (
    <li className={style.navLink}>
      <a href={link}>{text}</a>
    </li>
  );
}

function Nav() {
  return (
    <nav>
      <h2>CareCompare</h2>
      <ul>
        <NavLink link="./" text="Price Checker" />
        <NavLink link="./" text="About" />
      </ul>
    </nav>
  );
}

export default Nav;
