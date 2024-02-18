import style from "./priceChecker.module.css";
import { useState, useEffect, useRef } from "react";

function PriceChecker() {
  const isMounted = useRef(false);
  const [file, setFile] = useState(null);
  const [submit, setSubmit] = useState({ count: 0 });

  useEffect(() => {
    if (isMounted.current) {
      // dummy URL for testing, change this out for the real post
      fetch("http://127.0.0.1:5000/imgProcessing", {
        mode: "cors",
        method: "POST",
        body: file,
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  }, [isMounted, submit]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

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
        {file ? (
          <>
            <img
              className={style.fileImage}
              src={URL.createObjectURL(file)}
              alt="UB-04 document image"
            />
            <p
              className={style.selectedFile}
            >{`Selected file: ${file.name}`}</p>
          </>
        ) : null}
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
            <button
              type="button"
              className={style.fileButton}
              onClick={(e) =>
                setSubmit({ count: submit.count + 1 })
              }
            >
              SUBMIT
            </button>
          ) : (
            <button type="button" className={style.fileButton} disabled>
              SUBMIT
            </button>
          )}
        </form>
      </div>
    </main>
  );
}

export default PriceChecker;
