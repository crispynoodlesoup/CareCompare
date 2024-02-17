import navStyle from "./nav.module.css";

function NavLink({ link, text }) {
    return (
        <li className={navStyle.navLink}>
           <a href={link}>{text}</a> 
        </li>
    )
}

function Nav() {
  return (
    <nav>
      <ul>
        <NavLink link="./" text="Home"/>
        <NavLink link="./" text="Price Checker"/>
        <NavLink link="./" text="About"/>
      </ul>
    </nav>
  )
}

export default Nav;
