const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send({
        "a": "1",
        "b": "2"
    });
});

router.post('/', (req, res, next) => {
    res.send({
        "a": "post",
        "b": "2"
    });
});
module.exports = router;