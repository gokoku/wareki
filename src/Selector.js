import React from "react";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    margin: theme.spacing.unit * 1
  }
});

const Selector = props => {
  const { classes, increment, decrement, reset } = props;

  return (
    <div className="selector">
      <Button variant="contained" color="default" onClick={decrement}>
        <Icon className={classes.icon}>expand_less</Icon>
      </Button>
      &nbsp;&nbsp;
      <Button variant="contained" color="default" onClick={reset}>
        <Icon className={classes.icon}>adjust</Icon>
      </Button>
      &nbsp;&nbsp;
      <Button variant="contained" color="default" onClick={increment}>
        <Icon className={classes.icon}>expand_more</Icon>
      </Button>
    </div>
  );
};

export default withStyles(styles)(Selector);
