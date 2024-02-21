import style from "./attorneysTable.module.css";

function AttorniesTable({ attorneys }) {
  return (
    <>
      <div className={style.tableWrapper}>
        <table className={style.itemTable}>
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
    </>
  );
}

export default AttorniesTable;