import style from "./priceChecker.module.css";
import { useState } from "react";

function PriceChecker() {
  const [file, setFile] = useState(null);
  if (file) console.log(file.name);

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
        <form className={style.fileButtons}>
          <label htmlFor="upload" className={style.fileButton}>
            UPLOAD
          </label>
          <input
            id="upload"
            accept=".jpg, .jpeg, .png"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file ? (
            <button type="button" className={style.fileButton}>
              SUBMIT
            </button>
          ) : (
            <button type="button" className={style.fileButton} disabled>
              SUBMIT
            </button>
          )}
        </form>
        {file ? (
          <p className={style.selectedFile}>{`Selected file: ${file.name}`}</p>
        ) : null}
      </div>
    </main>
  );
}

export default PriceChecker;
