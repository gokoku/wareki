import React, { Component } from "react";
import "./App.css";
import Typography from "@material-ui/core/Typography";

import Selector from "./Selector";
import Tables from "./Tables";

const times = 16;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: {
        annos: [],
        shouwas: [],
        heiseis: [],
        reiwas: []
      },
      limit: {
        shouwa: 1989,
        heisei: 2019
      }
    };

    this.yearHandler = this.yearHandler.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  makeDate(year) {
    const annos = new Array(times);
    const shouwas = new Array(times);
    const heiseis = new Array(times);
    const reiwas = new Array(times);
    for (let i = 0; i < times; i++) {
      annos[i] = year - times / 2 + i;
      shouwas[i] = annos[i] - 1925;
      heiseis[i] = annos[i] - 1988;
      reiwas[i] = heiseis[i] - 30;
    }
    this.setState({
      year: {
        annos: annos,
        heiseis: heiseis,
        reiwas: reiwas
      }
    });
  }
  componentDidMount() {
    const year = new Date().getFullYear();
    this.makeDate(year);
  }

  yearHandler(e) {
    console.log(e.target.value);
    this.makeDate(e.target.value);
  }

  increment() {
    const { annos, heiseis, reiwas } = this.state.year;
    this.setState({
      year: {
        annos: annos.map(a => {
          return a + 1;
        }),
        heiseis: heiseis.map(a => {
          return a + 1;
        }),
        reiwas: reiwas.map(a => {
          return a + 1;
        })
      }
    });
  }

  decrement() {
    const { annos, heiseis, reiwas } = this.state.year;
    this.setState({
      year: {
        annos: annos.map(a => {
          return a - 1;
        }),
        heiseis: heiseis.map(a => {
          return a - 1;
        }),
        reiwas: reiwas.map(a => {
          return a - 1;
        })
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Typography component="h2" variant="display3">
          和暦
        </Typography>

        <Selector
          date={this.state}
          increment={this.increment}
          decrement={this.decrement}
        />
        <Tables date={this.state} />
      </div>
    );
  }
}

export default App;
