import React, { useState, useEffect } from "react";
import "./App.css";
import Typography from "@material-ui/core/Typography";

import Selector from "./Selector";
import Tables from "./Tables";

// 定数 times は、年の範囲を決定するために使用されます
const times = 16;

const App = () => {
  // 年のデータを保持するための state
  const [year, setYear] = useState({
    annos: [],
    meijis: [],
    taishous: [],
    shouwas: [],
    heiseis: [],
    reiwas: []
  });

  // 各時代の終了年を保持するための state
  const [limit] = useState({
    meiji: 1912,
    taishou: 1926,
    shouwa: 1989,
    heisei: 2019
  });

  // 現在の年を保持するための state
  const [thisYear, setThisYear] = useState(0);

  // 年のデータを生成する関数
  const makeDate = (year) => {
    const annos = new Array(times);
    const meijis = new Array(times);
    const taishous = new Array(times);
    const shouwas = new Array(times);
    const heiseis = new Array(times);
    const reiwas = new Array(times);
    for (let i = 0; i < times; i++) {
      annos[i] = year - times / 2 + i;
      meijis[i] = annos[i] - 1867;
      taishous[i] = annos[i] - 1911;
      shouwas[i] = annos[i] - 1925;
      heiseis[i] = annos[i] - 1988;
      reiwas[i] = heiseis[i] - 30;
    }
    setYear({
      annos: annos,
      meijis: meijis,
      taishous: taishous,
      shouwas: shouwas,
      heiseis: heiseis,
      reiwas: reiwas
    });
  };

  // コンポーネントの初回レンダリング時に reset 関数を呼び出す
  useEffect(() => {
    reset();
  }, []);

  // 年のデータを現在の年にリセットする関数
  const reset = () => {
    const year = new Date().getFullYear();
    setThisYear(year);
    makeDate(year);
  };

  // 年のデータを3年進める関数
  const increment = () => {
    setYear((prevYear) => ({
      annos: prevYear.annos.map(a => a + 3),
      meijis: prevYear.meijis.map(a => a + 3),
      taishous: prevYear.taishous.map(a => a + 3),
      shouwas: prevYear.shouwas.map(a => a + 3),
      heiseis: prevYear.heiseis.map(a => a + 3),
      reiwas: prevYear.reiwas.map(a => a + 3)
    }));
  };

  // 年のデータを3年戻す関数
  const decrement = () => {
    setYear((prevYear) => ({
      annos: prevYear.annos.map(a => a - 3),
      meijis: prevYear.meijis.map(a => a - 3),
      taishous: prevYear.taishous.map(a => a - 3),
      shouwas: prevYear.shouwas.map(a => a - 3),
      heiseis: prevYear.heiseis.map(a => a - 3),
      reiwas: prevYear.reiwas.map(a => a - 3)
    }));
  };

  return (
    <div className="App">
      <Typography component="h2" variant="h3">
        和暦
      </Typography>

      <Selector
        date={{ year, limit, thisYear }}
        increment={increment}
        decrement={decrement}
        reset={reset}
      />
      <Tables date={{ year, limit, thisYear }} />
    </div>
  );
}

export default App;
