import style from "./style.module.css";
import Nav from "./components/nav/nav";

function App() {
  return (
    <div className={style.pageContainer}>
      <Nav></Nav>
      <div>hey</div>
    </div>
  )
}

export default App
