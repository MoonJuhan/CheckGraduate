const express = require('express');
const axios = require('axios');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const PORT = 5002;

const app = express();

const apiRouter = express.Router();

const limeUrl = "https://web-production.lime.bike/api/rider";

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api', apiRouter);

apiRouter.options('*', cors());

apiRouter.get('/login', cors(), (req, res) => {
    console.log(req.query);
    const phone = req.query.phone;

    let api = axios.create();

    const url = limeUrl + "/v1/login";

    axios
        .all([
            api.get(url, {
                params: {
                    phone
                }
            })
        ])
        .then(responses => {
            res.status(200).send("OK");
        })
        .catch(error => {
            console.log(error);
            console.log(`Status : ${error.response.status} Text : ${error.response.statusText}`)
            res.status(401).send(error.response.statusText);
        });
});

apiRouter.post('/login', cors(), (req, res) => {
    console.log(req.body);
    const phone = req.body.phone;
    const code = req.body.code;

    let api = axios.create();

    const url = limeUrl + "/v1/login";

    axios
        .all([
            api.post(url, { phone, login_code: code }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        ])
        .then(responses => {
            if (responses[0].status == "200") {
                let returnData = {
                    data: responses[0].data,
                    cookie: responses[0].headers["set-cookie"]
                }
                res.status(200).send(returnData);
            } else {
                res.status(400).send("status code is not 200");
            }
        })
        .catch(error => {
            let errorMsg = "";
            if (error.response.status == "401") {
                errorMsg = "Unauthorized";
                res.status(401).send(errorMsg);
            } else {
                console.log(`Status : ${error.response.status} Text : ${error.response.statusText}`)
                res.status(400).json("Error");
            }



        });
});


apiRouter.get('/get-bicycles', cors(), (req, res) => {
    console.log(req.query);
    let params = {
        ne_lat: req.query.ne_lat,
        ne_lng: req.query.ne_lng,
        sw_lat: req.query.sw_lat,
        sw_lng: req.query.sw_lng,
        user_latitude: req.query.user_latitude,
        user_longitude: req.query.user_longitude,
        zoom: req.query.zoom,
    }
    const url = "https://web-production.lime.bike/api/rider/v1/views/map";
    let api = axios.create();
    axios
        .all([
            api.get(
                url,
                {
                    params,
                    headers: {
                        Cookie: `_limebike-web_session=${req.query.webSession}`,
                        authorization: `Bearer ${req.query.token}`,
                    },
                }
            ),
        ])
        .then((responses) => {
            console.log(responses[0]);

            res.status(200).send(responses[0].data);
        })
        .catch((error) => {
            console.log(error);

            res.status(401).send("ERR");
        });
});




app.listen(5002, function () {
    console.log('Example skill server listening on port 5002!');
});
