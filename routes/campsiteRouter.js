const express = require('express');
const bodyParser = require('body-parser');

const campsiteRouter = express.Router();

campsiteRouter.use(bodyParser.json());

campsiteRouter.route('/')
    .all((req, res, next) => {// use as default for all routing method
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next(); // pass control of the application routing next relevant routing method after this one
    })
    .get((req, res) => {
        res.end('Will send all the campsites to you');
    })
    .post((req, res) => {
        res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => { // approprivate error code - 403
        res.statusCode = 403;
        res.end('PUT operation not supported on /campsites');
    })
    .delete((req, res) => { // normally dangerous operation, make sure don't allow ordinary users to do
        res.end('Will delete all campsites');
    });

campsiteRouter.route('/:campsiteId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next(); // pass control of the application routing next relevant routing method after this one
    })
    .get((req, res) => {
        res.end(`will send details of the campsite: ${req.params.campsiteId} to you`);
    })
    .post((req, res) => {
        res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
    })
    .put((req, res) => {
        res.write(`Will update the campsite: ${req.params.campsiteId}\n`);
        res.end(`Will update the campsite: ${req.body.name}
            with description: ${req.body.description}`);
    })
    .delete((req, res) => { // normally dangerous operation, make sure don't allow ordinary users to do
        res.end('Will delete campsites: ${req.params.campsiteId}');
    });

module.exports = campsiteRouter;