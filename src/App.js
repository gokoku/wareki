import React, { useState, useEffect } from "react";
import "./App.css";
import Typography from "@material-ui/core/Typography";

import Selector from "./Selector";
import Tables from "./Tables";

const times = 16;
const App = () => {
  const [year, setYear] = useState({
    annos: [],
    meijis: [],
    taishous: [],
    shouwas: [],
    heiseis: [],
    reiwas: []
  });

  const [limit] = useState({
    meiji: 1912,
    taishou: 1926,
    shouwa: 1989,
    heisei: 2019
  });

  const [thisYear, setThisYear] = useState(0);

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

  useEffect(() => {
    reset();
  }, []);

  const reset = () => {
    const year = new Date().getFullYear();
    setThisYear(year);
    makeDate(year);
  };

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
