const express = require('express');
const router = express.Router();
const CreateConnect = require('../../handleDB/CreateConnect');
const createConnect = new CreateConnect('runoob');

router.post('/', (req, res, next) => {

    const srcollection = createConnect.collection('storage_resources', next);

    let body = req.body;

    srcollection.find().toArray(function(err, result) {

        if (err) {
            console.log('Error:' + err);
            return res.json(Object.assign({}, {
                code: 4000,
                messages: '查询失败'
            }));
        }

        res.json(Object.assign({}, {
            code: 9000,
            messages: '查询成功',
            result: result
        }));

    });

})

module.exports = router;