import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Slider, Grid, Select,MenuItem } from '@material-ui/core';
import BarPlot from './BarPlot';
function App() {
  const yearCountData =[
    {
        "Year": 2008,
        "count": 2
    },
    {
        "Year": 2009,
        "count": 1
    },
    {
        "Year": 2010,
        "count": 11
    },
    {
        "Year": 2013,
        "count": 16
    },
    {
        "Year": 2015,
        "count": 3
    },
    {
        "Year": 2017,
        "count": 14
    },
    {
        "Year": 2018,
        "count": 37
    },
    {
        "Year": 2019,
        "count": 12
    },
    {
        "Year": 2020,
        "count": 30
    },
    {
        "Year": 2021,
        "count": 36
    }
  ]
  
  let max = yearCountData.map(each => each.Year)[yearCountData.length - 1];
  let min = yearCountData.map(each => each.Year)[0];
  const range = [min, max];
  let marksFinal = [{ value: max, label: max }, { value: min, label: min }]; //marks value
  const [val, setVal] = useState(range);
  const updateR = (e, d) => {
    setVal(d);
  };

  const updateSelectinitial = e => {
    const value = e.target.value;
    const newState = [value, val[1]];
    setVal(newState);
    if(value >= val[1]){
      setVal([val[1],value])
    }
  };
  const updateSelectEnd = e => {
    setVal();
    const value = e.target.value;
    const newState = [val[0], value];
    setVal(newState);
    if(value <= val[0]){
      setVal([value,val[0]])
    }
  };

  return (
    <>
        <BarPlot
          {...{
            data: yearCountData,
            value: val,
          }}
        />
        <div id="yearSlider" style={{ width: 636,margin: 15 }}>
          <Slider
            min={min}
            max={max}
            color="grey"
            value={val}
            marks={marksFinal}
            onChange={updateR}
          />
          <Grid
            container
            alignItems="center"
            justify="space-around"
            style={{ marginTop: '88px' }}
          >
            <Grid item xs={4} style={{ textAlign: 'right' }}>
              <Select
                variant="outlined"
                value={val[0]}
                displayEmpty
                onChange={updateSelectinitial}
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                {yearCountData.map(each => (
                  <MenuItem value={each.Year}>{each.Year}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4} style={{ textAlign: 'center' }}>
              —
            </Grid>
            <Grid item xs={4} style={{ textAlign: 'left' }}>
              <Select
                variant="outlined"
                value={val[1]}
                displayEmpty
                onChange={updateSelectEnd}
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                {yearCountData.map(each => (
                  <MenuItem value={each.Year}>{each.Year}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </div>
    </>
  );
}

export default App;
