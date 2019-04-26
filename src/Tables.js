import React from "react";

const Tables = props => {
  const { annos, heiseis, reiwas } = props.date;

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>西暦</th>
            <th>平成</th>
            <th>令和</th>
          </tr>
        </thead>
        <tbody>
          {annos.map((anno, i) => {
            return (
              <tr key={i}>
                <td>{anno}</td>
                <td>{heiseis[i] <= 0 ? "-" : heiseis[i]}</td>
                <td>{reiwas[i] <= 0 ? "-" : reiwas[i]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
