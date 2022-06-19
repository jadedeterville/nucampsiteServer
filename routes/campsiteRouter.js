const express = require('express');
const campsiteRouter = express.Router();

campsiteRouter.route('/')
//all = catch all for http verbs 
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
    // next passes control of the routing to the next relevant routing method
    // above is a callback function with args of req and res  
})
// no semi colon needed because we are chaining 

// methods have now been chained 
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
// posts carries info typically in json
// post is just adding a new campsite to the path  
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
// 403 operation not supported 
// we arent updating all campsites and dont know which specific one 
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
// delete is a dangerous opp - need to restrict to only users with certain privileges 
.delete((req, res) => {
    res.end('Deleting all campsites');
});

campsiteRouter.route('/:campsiteId') 
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the campsite ID ${req.params.campsiteId} to you`);
})
// looking at a specific campsite so we can update it but we cant add one 
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /campsites');
})
.put((req, res) => {
    res.end(`Will add the campsite ID: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting the campsite ID ${req.params.campsiteId}`);
});


module.exports = campsiteRouter;




