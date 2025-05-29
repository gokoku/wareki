import React from "react"
import Button from "@mui/material/Button"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import AdjustIcon from "@mui/icons-material/Adjust"

const iconStyles = {
  padding: "5px",
  fontSize: "1.5rem",
  color: "#888",
}

const Selector = (props) => {
  const { increment, decrement, reset } = props

  return (
    <div className="selector">
      <Button variant="contained" color="default" onClick={decrement}>
        <ArrowUpwardIcon sx={iconStyles} />
      </Button>
      &nbsp;&nbsp;
      <Button variant="contained" color="default" onClick={reset}>
        <AdjustIcon sx={iconStyles} />
      </Button>
      &nbsp;&nbsp;
      <Button variant="contained" color="default" onClick={increment}>
        <ArrowDownwardIcon sx={iconStyles} />
      </Button>
    </div>
  )
}

export default Selector
