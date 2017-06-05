const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const fs = require('fs');
const util = require('util');
const path = require('path');
const request = require('request');
const arg = require('../../../arguments.config.js');
const qs = require('querystring');
const url = require('url');

function nosqlRequestPromise({
    req,
    res,
    data
}) { //数据相关操作

    let params = req.params;
    let nosqlRequestOpts;

    if (params.type == 'insert') {

        nosqlRequestOpts = {
            url: arg.nosqlServerAddress + '/storageMap/' + params.type,
            form: {
                filesInfo: data.filesInfo
            },
        }

    } else if (params.type == 'find') {

        nosqlRequestOpts = {
            url: arg.nosqlServerAddress + '/storageMap/' + params.type,
        }

    }

    return new Promise((resolve, reject) => {

        request.post(Object.assign({}, {
            json: true
        }, nosqlRequestOpts), (nsErr, nsReq, nsRes) => {

            if (nsErr) {
                reject({
                    status: nsErr.status
                })
            }
            // console.log(nsRes);
            resolve({
                req,
                res,
                data: nsRes
            });

        });

    });

}

function fileServerRequestPromise({
    req,
    res,
    // data
}) { //文件服务器相关操作

    let params = req.params;
    let fileServerRequestOpts;
    let method;

    if (params.type == 'insert') {

        fileServerRequestOpts = {
            url: arg.fileServerAddress + '/upload/' + params.dir,
        }

        method = 'post';

    } else if (params.type == 'find') {

        fileServerRequestOpts = {
            url: arg.fileServerAddress + '/' + params.dir + '/' + params.name,
        }

        method = 'get';

    }

    return new Promise((resolve, reject) => {

        req.pipe(request(Object.assign({}, {
            json: true,
            method: method
        }, fileServerRequestOpts), (fsErr, fsReq, fsRes) => {

            if (fsErr) {
                reject({
                    status: nsErr.status
                })
                return false;
            }
            // console.log(fsRes);
            // if (fsRes.code != '9000') {
            //     res.json(fsRes);
            //     return false;
            // }

            resolve({
                req,
                res,
                data: fsRes
            });

        }));

    });

}

router.post('/:dir/:type', (req, res, next) => {

    let params = req.params;
    let type = params.type;

    if (type == 'find') {

        nosqlRequestPromise({
                req,
                res
            })
            // .then(fileServerRequestPromise)
            .then(result => {
                // console.log(result.data);
                res.json(result.data);
            })

    } else if (type == 'insert') {

        fileServerRequestPromise({
                req,
                res
            })
            .then(nosqlRequestPromise)
            .then(result => {
                // console.log(result.data);
                res.json(result.data);
            })
            .catch(next);

    } else {

        res.json({
            code: 404,
            messages: 'not found'
        });

    }

});

router.get('/:type/:dir/:name', (req, res, next) => {
    // console.log(12333)
    // fileServerRequestPromise({
    //         req,
    //         res
    //     })
    //     .then(result => {
    //         // console.log(result);
    //         res.send(result.toString())
    //     })
    //     .catch(next);

    let params = req.params;
    req.pipe(request(Object.assign({}, {
        json: true,
        method: 'get'
    }, {
        url: arg.fileServerAddress + '/' + params.dir + '/' + params.name,
    }))).pipe(res);
    // // var originalUrl = parseUrl.original(req);
    // // var path = parseUrl(req);
    // // console.log(originalUrl);
    // // console.log(path);
    // let form = new multiparty.Form();
    // //设置编辑
    // form.encoding = 'utf-8';
    // //设置文件存储路径
    // form.uploadDir = 'uploads/images/';
    // //设置单文件大小限制
    // form.maxFilesSize = 2 * 1024 * 1024;
    // //form.maxFields = 1000;  设置所以文件的大小总和
    // form.parse(req, function(err, fields, files) {
    //     // console.log(files.file[0]);
    //     // console.log(fields);
    //     //同步重命名文件名
    //     // fs.renameSync(files.file[0].path, files.file[0].originalFilename);
    //     // res.header('Content-Type', 'text/html');
    //     res.download(path.join(__dirname, '../../../uploads/images/-taLx8P0oebMlh5t7kppdiXb.png'));
    //     // res.sendFile('-taLx8P0oebMlh5t7kppdiXb.png', {
    //     //     root: path.join(__dirname, '../../../uploads/images/'),
    //     //     dotfiles: 'deny',
    //     //     headers: {
    //     //         'x-timestamp': Date.now(),
    //     //         'x-sent': true
    //     //     }
    //     // });

    //     // res.send({
    //     //     upload: 'post'
    //     // });

    //     // fs.createReadStream(path.join(__dirname, '../../../uploads/images/-taLx8P0oebMlh5t7kppdiXb.png')).pipe(res);
    // });

});

module.exports = router;