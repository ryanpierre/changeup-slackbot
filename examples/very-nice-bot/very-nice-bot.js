///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
//         SET UP / MIDDLEWARE         ////
///////////////////////////////////////////

/*
   /*_/|         /^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\
   =0-0=      <:(       DON'T CHANGE THIS :)     )
   \'I'|         \............................../
   |<|,,\_
   |[>,,/,\ 
   |[|,\_,,)
   ((J(=_*/

const Express = require('express');
const Webtask = require('webtask-tools');
const request = require('superagent');
const logger = require('loggerithm')();
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const app = Express();

//Use body parser middleware for json
app.use(require('body-parser').json());

//Check if it's a challenge request for initializing a bot
const challengeCheck = (req, res, next) => {
    if (req.body.challenge) {
        return res.json({ challenge: req.body.challenge });
    }

    return next();
}

//Check if l33t haxx0rs are trying to mess with your bot!
const sanitizeInput = (req, res, next) => {
    return next();
}

app.use(challengeCheck);
app.use(sanitizeInput);

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
//           HELPER FUNCTIONS          ////
///////////////////////////////////////////

/*
   /*_/|         /^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\
   =0-0=      <:(       DON'T CHANGE THIS :)     )
   \'I'|         \............................../
   |<|,,\_
   |[>,,/,\ 
   |[|,\_,,)
   ((J(=_*/

app.post('/', (req, res) => {

    const auth = `Bearer ${req.webtaskContext.data.BOT_TOKEN}`;

    //Message context used to make writing code easier
    let _context = {};

    const createBotResponse = (options) => {
        resetContext();
        _context["options"] = parseOptions(options);
        _context["messageFromUser"] = req.body;

        if (_context.options.logMessage && _context.options.logMessage === true) {
            logMessageBody(req.body);
        }
    }

    const resetContext = () => {
        _context = {};
    }

    const parseOptions = (options) => {

        return options;
    }

    const logMessageBody = (requestBody) => {
        logger.log("info", "YOUR BOT TOKEN IS: " + `${req.webtaskContext.data.BOT_TOKEN}`.output);
        logger.log("request", "THE MESSAGE YOUR BOT RECEIVED IS: ")
        logger.output(parseMessageBody(requestBody));
    }

    const logBotResponse = (responseBody) => {
        logger.log("response", "YOUR BOT RESPONDED WITH: ");
        logger.output(parseMessageBody(responseBody));
    }

    const parseBotResponse = (responseBody) => {
        return responseBody;
    }

    const parseMessageBody = (requestBody) => {
        return requestBody;
    }

    const validateRequest = () => {

        //Override for hackathon
        _context.options["noBots"] = true;

        if (_context.options.noBots && _context.options.noBots === true) {
            if (!req.body.event.subtype || req.body.event.subtype != 'bot_message') {
                //Need to invert this
            }
            else {
                return false;
            }
        }

        return true;

    }

    const addSwitch = ({ condition, parameter, operator, value, yesResponse, noResponse }) => {
        if (condition === "if") {
            if (parameter === "message") {
                if (operator === "equals") {
                    if (_context["messageFromUser"].event.text == value) {
                        return yesResponse();
                    }
                    else {
                        return noResponse();
                    }
                }
                else if (operator === "contains") {
                    if (_context["messageFromUser"].event.text.indexOf(value) !== -1) {
                        return yesResponse();
                    }
                    else {
                        return noResponse();
                    }
                }
            }
            if (parameter === "sentiment") {
                let sentimentOfSentence = sentiment.analyze(_context["messageFromUser"].event.text).comparative;
                let sentimentValueThreshold = value;

                logger.log("info", "SENTIMENT IS: " + sentimentOfSentence);
                logger.log("info", "CHECKING AGAINST: " + sentimentValueThreshold);
                
                if (operator === "equals"){
                    if (sentimentOfSentence == sentimentValueThreshold) {
                        return yesResponse();
                    }
                    else {
                        return noResponse();
                    }
                }
                else if (operator === "greaterThan"){
                    if (sentimentOfSentence > sentimentValueThreshold) {
                        return yesResponse();
                    }
                    else {
                        return noResponse();
                    }
                }
                else if (operator === "lessThan"){
                    if (sentimentOfSentence < sentimentValueThreshold) {
                        return yesResponse();
                    }
                    else {
                        return noResponse();
                    }
                }
            }
        }

        return noCallback;
    }

    const buildBasicMessage = (message) => {
        _context["message"] = {
            "token": `${req.body.token}`,
            "channel": `${req.body.event.channel}`,
            "text": `${message}`
        };
    }

    const doNothing = () => {
        _context["message"] = null;
    }

    const sendMessageToUser = () => {
        if (validateRequest() === true && _context["message"]) {
            request
                .post('https://slack.com/api/chat.postMessage')
                .set('Content-Type', "application/json; charset=utf-8")
                .set('Authorization', auth)
                .send(_context["message"])
                .then((response) => {
                    if (_context.options.logResponse && _context.options.logResponse === true) {
                        logBotResponse(response.body);
                    }
                })
                .catch((error) => {
                    logger.log("error", error);
                });
        }
    }

    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////

    /*
       /*_/|         /^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\
       =0-0=      <:(   HI! WRITE SOME CODE HERE     )
       \'I'|         \............................../
       |<|,,\_
       |[>,,/,\ 
       |[|,\_,,)
       ((J(=_*/

    ///////////////////////////////////////////
    //          v  YOUR CODE HERE  v       ////
    ///////////////////////////////////////////

    createBotResponse({
        logMessage: true,
        logResponse: true
    });

    addSwitch({
        condition: "if",
        parameter: "sentiment",
        operator: "greaterThan",
        value: 0,
        yesResponse: doNothing.bind(null),
        noResponse: buildBasicMessage.bind(this, "Be nice!")
    });

    addSwitch({
        condition: "if",
        parameter: "message",
        operator: "contains",
        value: "fuck",
        yesResponse: buildBasicMessage.bind(this, "That was very rude!"),
        noResponse: doNothing.bind(null)
    });

    sendMessageToUser();


    ///////////////////////////////////////////
    //           ^ YOUR CODE HERE ^        ////
    ///////////////////////////////////////////

    /*
        ("`-''-/").___..--''"`-._ 
        `6_ 6  )   `-.  (     ).`-.__.`) 
        (_Y_.)'  ._   )  `._ `. ``-..-`  
        _..`--'_..-_/  /--'_.' ,'  
        (il),-''  (li),'  ((!.-'
    */

    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////

    /*
       /*_/|         /^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\
       =0-0=      <:(       DON'T CHANGE THIS :)     )
       \'I'|         \............................../
       |<|,,\_
       |[>,,/,\ 
       |[|,\_,,)
       ((J(=_*/

    return res.status(200).send("All good.");
});

module.exports = Webtask.fromExpress(app);

    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    ///////////////////////////////////////////

