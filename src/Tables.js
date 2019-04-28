import React, { Component } from "react";

class Tables extends Component {
  wareki_str(anno, i) {
    const { meijis, taishous, shouwas, heiseis } = this.props.date.year;
    const { meiji, taishou, shouwa } = this.props.date.limit;
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
  }

  reiwa_str(i) {
    const { reiwas } = this.props.date.year;
    let str = "";
    if (reiwas[i] <= 0) {
      str = "-";
    } else {
      str = `令和${reiwas[i]}年`;
    }
    return str;
  }

  class_name(anno) {
    const year = this.props.date.thisYear;
    let str = "";
    if (anno % 10 === 0) {
      str = "demilita";
    } else if (anno === year) {
      str = "this_year";
    }
    return str;
  }

  render() {
    const annos = this.props.date.year.annos;
    return (
      <div className="table">
        <table>
          <tbody>
            {annos.map((anno, i) => {
              return (
                <tr key={i}>
                  <td className={this.class_name(anno)}>{anno}年</td>
                  <td className={this.class_name(anno)}>
                    {this.wareki_str(anno, i)}
                  </td>
                  <td className={this.class_name(anno)}>{this.reiwa_str(i)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Tables;
