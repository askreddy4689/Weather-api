//jshint esversion:6
const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// var city = 'Madanapalle';
// var temp = '';
// var country = '';
// var url = '';

const sender = (city) => {
  return new Promise(async (resolve, reject) => {
    try {
      https.get(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
          city +
          '&appid=03c28434b0c9b9a200d45bd7770e4821&units=metric',
        (response) => {
          response.on('data', async (data) => {
            const wdata = await JSON.parse(data);
            if (wdata.cod == 404) {
              res.send('city not found');
            } else {
              var dataset = {
                city: '',
                temp: '',
                country: '',
                url: '',
              };
              dataset.temp = wdata.main.temp;
              const icon = wdata.weather[0].icon;
              dataset.country = wdata.sys.country;
              dataset.city = wdata.name;
              dataset.url =
                'http://openweathermap.org/img/wn/' + icon + '@2x.png';
              resolve(dataset);
            }
          });
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

app.get('/', async (req, res) => {
  const displaydata = await sender('madanapalle');

  res.render('index', {
    currcity: displaydata.city,
    citytemp: displaydata.temp,
    pic: displaydata.url,
    currcountry: displaydata.country,
  });
});

app.post('/', async (req, res) => {
  curcity = req.body.cityname;
  const displaydata = await sender(curcity);

  res.render('index', {
    currcity: displaydata.city,
    citytemp: displaydata.temp,
    pic: displaydata.url,
    currcountry: displaydata.country,
  });
});
app.listen(3000, function () {
  console.log('server is running on port 3000.');
});
