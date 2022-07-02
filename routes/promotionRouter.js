const express = require('express');
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');

const promotionRouter = express.Router();

// PROMOTION /

promotionRouter.route('/')
.get((req, res, next) => {
    Promotion.find()
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        // res.json sends the response back 
        res.json(promotions);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotion.create(req.body)
    .then(promotion => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
// put isnt allowed so we leave it as is 
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

// PROMOTION ID 

promotionRouter.route('/:promotionId')
.get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

// promotionRouter.route('/')
// .all((req, res, next) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   next();
// })
// .get((req, res) => {
//   res.end('Will send all the promotions to you');
// })
// .post((req, res) => {
//   res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
// })
// .put((req, res) => {
//   res.statusCode = 403;
//   res.end('PUT operation not supported on /promotions');
// })
// .delete((req, res) => {
//   res.end('Deleting all promotions');
// });

// promotionRouter.route('/:promotionId')
// .all((req, res, next) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   next();
// })
// .get((req, res) => {
//   res.end(`Will send the promotion ID ${req.params.promotionId} to you`);
// })
// .post((req, res) => {
//   res.statusCode = 403;
//   res.end('POST operation not supported on /promotions');
// })
// .put((req, res) => {
//   res.end(`Will update the promotion: ${req.body.name} with description: ${req.body.description}`);
// })
// .delete((req, res) => {
//   res.end(`Deleting the promotion ID ${req.params.promotionId}`);
// });

module.exports = promotionRouter;