import express from 'express';
var router = express.Router();
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

import AWS from "aws-sdk";
AWS.config.update({
    region: "us-east-1"
});

/* GET home page. */
router.post('/api/download-note', function (req, res, next) {
    let note = (req.body);
    const content = 'Some content!'

    let path1 = path.join(__dirname, '../../public/uploads/');
    let name = note.name.replace(" ", "_");
    let file = `${path1}${name}.txt`;

    console.log(file);

    fs.writeFile(file, note.text, err => {
        if (err) {
            console.error(err)
            return;
        }
        else {
            //file written successfully
            res.send(`${name}.txt`);
        }
    })
});

//create note
router.post('/api/notes', function (req, res, next) {

    let note = (req.body);

    note.lastUpdated = new Date().toISOString();

    var table = "Notes";

    var params = {
        TableName: table,
        Item: note
    };

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send(JSON.stringify(note));
        }
    });
});

//update note
router.put('/api/notes', function (req, res, next) {
    let note = (req.body);

    note.lastUpdated = new Date().toISOString();

    var table = "Notes";

    var params = {
        TableName: table,
        Key: {
            "id": note.id
        },
        UpdateExpression: "set #name=:n, #fav=:f",
        ExpressionAttributeValues: {
            ":n": note.name,
            ":f": note.favorite
        },
        ExpressionAttributeNames: {
            "#name": "name",
            "#fav": "favorite"
        }
    };

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send(JSON.stringify(note));
        }
    });
});

//get all notes for user
router.get('/api/notes/:email', function (req, res, next) {
    var table = "Notes";

    var params = {
        TableName: table,
        FilterExpression: "#email = :data",
        ExpressionAttributeNames: {
            "#email": "email",
        },

        ExpressionAttributeValues: {
            ":data": req.params.email,
        }
    };

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to get items. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

export default router;
