import style from "./priceChecker.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Analysis from "../Analysis/analysis";
import AttorniesTable from "../AttorneysTable/attorneysTable";

// main body
function PriceChecker() {
  const isMounted = useRef(false);
  const [file, setFile] = useState(null);
  const [submit, setSubmit] = useState({ count: 0 });
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingAttorneys, setLoadingAttorneys] = useState(false);
  const [data, setData] = useState(null);
  const [attorneys, setAttorneys] = useState(null);

  const handleGetAttorneys = async () => {
    try {
      setLoadingAttorneys(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          axios
            .get(
              `https://crispynoodlesoup.pythonanywhere.com/getNearbyAttorneys?lat=${latitude}&lon=${longitude}`
            )
            .then((response) => {
              setAttorneys(response.data.attorneys);
            })
            .catch((error) => {
              console.error("Error fetching attorneys: " + error);
            })
            .finally( () => {
              setLoadingAttorneys(false);
            });
        },
        (error) => {
          console.error("Error fetching attorneys: " + error);
        }
      );
    } catch (error) {
      console.error("Error fetching attorneys: " + error);
    }
  };

  // post request to API
  useEffect(() => {
    if (isMounted.current) {
      setLoadingAnalysis(true);
      const formData = new FormData();
      formData.append("file", file);
      // dummy URL for testing, change this out for the real post
      fetch("https://crispynoodlesoup.pythonanywhere.com/imgProcessing", {
        mode: "cors",
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => console.log(error))
        .finally( () => {
          setLoadingAnalysis(false);
        });
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
          best prices for any healthcare products and services you're
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
              onClick={(e) => setSubmit({ count: submit.count + 1 })}
            >
              SUBMIT
            </button>
          ) : (
            <button type="button" className={style.fileButton} disabled>
              SUBMIT
            </button>
          )}
        </form>
        { loadingAnalysis ? <p className={style.loading}>Loading...</p> : null}
        {data ? <Analysis data={data} /> : null}

        <h2 className={style.sectionTitle}>Attorneys Near You</h2>
        <p>
          CareCompare should not be your only source of guidance on this issue!
          If you believe you have a case to appeal your expenses, please reach
          out to a credible attorney or consultant on this matter.
        </p>
        <div className={style.fileButtons}>
          <button className={style.fileButton} onClick={handleGetAttorneys}>
            Find Nearby Attorneys
          </button>
        </div>
        { loadingAttorneys ? <p className={style.loading}>Loading...</p> : null}
        { attorneys ? attorneys.length > 0 ? <AttorniesTable attorneys={attorneys}/> : <p>Could not find attorneys in your location {":("}</p> : null }
      </div>
    </main>
  );
}

export default PriceChecker;
