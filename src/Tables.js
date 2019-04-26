import React from "react";

const Tables = props => {
  const { annos, heiseis, reiwas } = props.date.year;

  return (
    <div className="table">
      <table>
        <tbody>
          {annos.map((anno, i) => {
            return (
              <tr key={i}>
                <td>{anno}年</td>
                <td>{heiseis[i] <= 0 ? "-" : `平成${heiseis[i]}年`}</td>
                <td>{reiwas[i] <= 0 ? "-" : `令和${reiwas[i]}年`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
