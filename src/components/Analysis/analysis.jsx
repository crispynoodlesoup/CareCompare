import style from "./analysis.module.css";

function Analysis({ data }) {
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
    </>
  );
}

export default Analysis