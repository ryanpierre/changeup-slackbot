///////////////////////////////////////////
//     MAGIC BOILERPLATE FUNCTIONS     ////
///////////////////////////////////////////

const Express = require('express');
const Webtask = require('webtask-tools');
const app = Express();
const router = app.router();

//Use body parser middleware for json
app.use(require('body-parser').json());

//Check if it's a challenge request for initializing a bot
const challengeCheck = (req, res, next) => {
    if(req.body.challenge) {
        return res.json({ challenge: req.body.challenge });
    }

    return next();
}

app.use(challengeCheck);
app.use("/", router);

///////////////////////////////////////////
//            YOUR CODE HERE           ////
///////////////////////////////////////////

router.post('/', (req, res) => {
    return res.json({text: "Henlo."});
});

