const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
    .all((req, res, next) => {// use as default for all routing method
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next(); // pass control of the application routing next relevant routing method after this one
    })
    .get((req, res) => {
        res.end('Will send all the promotions to you');
    })
    .post((req, res) => {
        res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => { // approprivate error code - 403
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res) => { // normally dangerous operation, make sure don't allow ordinary users to do
        res.end('Will delete all promotions');
    });

promotionRouter.route('/:promotionId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next(); // pass control of the application routing next relevant routing method after this one
    })
    .get((req, res) => {
        res.end(`Will send details of the promotion: ${req.params.promotionId} to you`);
    })
    .post((req, res) => {
        res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
    })
    .put((req, res) => {
        res.write(`Will update the promotion: ${req.params.promotionId}\n`);
        res.end(`Will update the promotion: ${req.body.name}
            with description: ${req.body.description}`);
    })
    .delete((req, res) => { // normally dangerous operation, make sure don't allow ordinary users to do
        res.end('Will delete promotions: ${req.params.promotionId}');
    });

module.exports = promotionRouter;