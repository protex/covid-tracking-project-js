import CTPRequest from './api.js';
import plotly from 'plotly';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const devOverrides = dotenv.parse(fs.readFileSync('.env.dev'))
for (let key in devOverrides) {
  process.env[key] = devOverrides[key]
}

const pl = plotly(process.env.PLOTLY_USERNAME, process.env.PLOTLY_API_KEY);

(async function main() {
  let newYorkDaily = await new CTPRequest().states().state('NY').daily().get();
  try {
  } catch (e) {
    console.error(e);
  }

  let xData = new Array();
  let yData = new Array();
  let deathsDaily = {
  };
  for (let i = 1; i < newYorkDaily.data.length; ++i) {
    let day = newYorkDaily.data[i];
    deathsDaily[day.dateChecked] = day.deathIncrease
  }

  var data = [{x:Object.keys(deathsDaily), y:Object.values(deathsDaily), type: 'bar'}];
  var layout = {fileopt : "overwrite", filename : "simple-node-example"};

  pl.plot(data, layout, function (err, msg) {
    if (err) return console.log(err);
    console.log(msg);
  });
})();
