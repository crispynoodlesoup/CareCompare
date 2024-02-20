import style from "./priceChecker.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Analysis({ data }) {
  const [userLocation, setUserLocation] = useState({ lat: 0, lon: 0 });
  const [attorneys, setAttorneys] = useState([]);

  const handleGetAttorneys = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          axios
            .get(
              `http://crispynoodlesoup.pythonanywhere.com/getNearbyAttorneys?lat=${latitude}&lon=${longitude}`
            )
            .then((response) => {
              setAttorneys(response.data.attorneys);
            })
            .catch((error) => {
              console.error("Error fetching attorneys: " + error);
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

  let total = data.total;
  let percentage = data.percentage;
  let discrepancies = data.discrepancies;
  let items = data.items;
  let cheaper = true;
  if (percentage > 0) cheaper = false;

  return (
    <>
      <h2 className={style.overviewTitle}>Your Price Summary</h2>
      <div className={style.overview}>
        <div className={style.statBox}>
          <h3>${total}</h3>
          {cheaper ? <p>Cheaper</p> : <p>More Expensive</p>}
        </div>
        <div className={style.statBox}>
          <h3>{percentage}%</h3>
          <p>{cheaper ? "Lower" : "Higher"} than Average</p>
        </div>
        <div className={style.statBox}>
          <h3>{discrepancies}</h3>
          <p>Major Discrepancies</p>
        </div>
      </div>
      <div className={style.tableWrapper}>
        <table className={style.itemTable}>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Code</th>
              <th>Avg. Price</th>
              <th>Your Price</th>
              <th>% difference</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              let itemPercent = Math.round(
                (item.measured / item.average) * 100
              );
              itemPercent = itemPercent - 100;
              let color = "#00000000";
              let textColor = "black";
              if (itemPercent >= 15) {
                color = "#ffbdc0";
                textColor = "#ff4e4e";
              } else if (itemPercent <= 0) {
                color = "#9dff9d";
                textColor = "#00a600";
              }
              return (
                <tr key={item.code}>
                  <td>{item.name}</td>
                  <td>{item.code}</td>
                  <td>${item.average}</td>
                  <td>${item.measured}</td>
                  <td>
                    <div
                      style={{ backgroundColor: color, color: textColor }}
                      className={style.itemPercent}
                    >
                      {itemPercent > 0 ? "+" : null}
                      {itemPercent}%
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h2 className={style.overviewTitle}>Attorneys Near You</h2>
      <p>
        CareCompare should not be your only source of guidance on this issue! If
        you believe you have a case to appeal your expenses, please reach out to
        a credible attorney or consultant on this matter.
      </p>
      <div className={style.fileButtons}>
        <button className={style.fileButton} onClick={handleGetAttorneys}>
          Find Nearby Attorneys
        </button>
      </div>
      {attorneys.length > 0 ? (
        <div className={style.tableWrapper}>
          <table className={style.itemTable2}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {attorneys.map((attorney) => {
                return (
                  <tr key={attorney.id}>
                    <td>{attorney.name}</td>
                    <td>{attorney.email}</td>
                    <td>{attorney.full_address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}

// main body
function PriceChecker() {
  const isMounted = useRef(false);
  const [file, setFile] = useState(null);
  const [submit, setSubmit] = useState({ count: 0 });
  const [data, setData] = useState(null);

  // post request to API
  useEffect(() => {
    if (isMounted.current) {
      const formData = new FormData();
      formData.append("file", file);
      // dummy URL for testing, change this out for the real post
      fetch("http://crispynoodlesoup.pythonanywhere.com/imgProcessing", {
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
        {data ? <Analysis data={data} /> : null}
      </div>
    </main>
  );
}

export default PriceChecker;
