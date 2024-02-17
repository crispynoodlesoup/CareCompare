import style from "./style.module.css";
import Nav from "./components/nav/nav";
import PriceChecker from "./components/priceChecker/priceChecker";

function App() {
  return (
    <div className={style.pageContainer}>
      <Nav/>
      <PriceChecker/>
    </div>
  )
}

export default App
