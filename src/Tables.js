import React from "react";

function Tables(props) {
  const { annos, meijis, taishous, shouwas, heiseis, reiwas } = props.date.year;
  const { meiji, taishou, shouwa } = props.date.limit;
  const year = props.date.thisYear;

  const wareki_str = (anno, i) => {
    let str = "";
    if (anno <= 1867) {
      str = "-";
    } else if (anno < meiji) {
      str = `明治${meijis[i]}年`;
    } else if (anno < taishou) {
      str = `大正${taishous[i]}年`;
    } else if (anno < shouwa) {
      str = `昭和${shouwas[i]}年`;
    } else {
      str = `平成${heiseis[i]}年`;
    }
    return str;
  };

  const reiwa_str = i => {
    let str = "";
    if (reiwas[i] <= 0) {
      str = "-";
    } else {
      str = `令和${reiwas[i]}年`;
    }
    return str;
  };

  const class_name = anno => {
    let str = "";
    if (anno % 10 === 0) {
      str = "demilita";
    } else if (anno === year) {
      str = "this_year";
    }
    return str;
  };

  return (
    <div className="table">
      <table>
        <tbody>
          {annos.map((anno, i) => {
            return (
              <tr key={i}>
                <td className={class_name(anno)}>{anno}年</td>
                <td className={class_name(anno)}>{wareki_str(anno, i)}</td>
                <td className={class_name(anno)}>{reiwa_str(i)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Tables;
