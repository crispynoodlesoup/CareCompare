import style from "./priceChecker.module.css";

function PriceChecker() {
  return (
    <main>
      <div className={style.content}>
        <h1>Home Care Price Compare</h1>
        <p>
          Our automatic price comparison tool is here to make your care
          affordable, transparent, and simple! We'll ensure you're getting the
          best prices for any and all healthcare products and services you're
          currently paying for. It's simple, just request an itemized receipt of
          your medical bill, and submit it here for an analysis.
        </p>
        <h5>*Please upload a UB-04 document in a PNG or JPEG format</h5>
        <div className={style.fileButtons}>
          <button>UPLOAD</button>
          <button>SUBMIT</button>
        </div>
      </div>
    </main>
  );
}

export default PriceChecker;
