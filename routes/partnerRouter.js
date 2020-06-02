const express = require('express');
const bodyParser = require('body-parser');

const partnerRouter = express.Router();

partnerRouter.use(bodyParser.json());

partnerRouter.route('/')
    .all((req, res, next) => {// use as default for all routing method
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next(); // pass control of the application routing next relevant routing method after this one
    })
    .get((req, res) => {
        res.end('Will send all the partners to you');
    })
    .post((req, res) => {
        res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => { // approprivate error code - 403
        res.statusCode = 403;
        res.end('PUT operation not supported on /partners');
    })
    .delete((req, res) => { // normally dangerous operation, make sure don't allow ordinary users to do
        res.end('Will delete all partners');
    });

partnerRouter.route('/:partnerId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next(); // pass control of the application routing next relevant routing method after this one
    })
    .get((req, res) => {
        res.end(`Will send details of the partner: ${req.params.partnerId} to you`);
    })
    .post((req, res) => {
        res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
    })
    .put((req, res) => {
        res.write(`Will update the partner: ${req.params.partnerId}\n`);
        res.end(`Will update the partner: ${req.body.name}
            with description: ${req.body.description}`);
    })
    .delete((req, res) => { // normally dangerous operation, make sure don't allow ordinary users to do
        res.end('Will delete partners: ${req.params.partnerId}');
    });

module.exports = partnerRouter;