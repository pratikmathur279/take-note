import express from 'express';
var router = express.Router();
import path from "path";
import fs from 'fs';

import AWS from "aws-sdk";
AWS.config.update({
    region: "us-east-1"
});

/* GET home page. */
router.post('/api/download-note', function (req, res, next) {
    let note = (req.body);
    console.log(note);
    const content = 'Some content!'

    let path1 = path.join(__dirname, '../../public/uploads/');
    let file = `${path1}${note.name}.txt`;

    fs.writeFile(file, note.text, err => {
        if (err) {
            console.error(err)
            return;
        }
        else {
            //file written successfully
            console.log("file written successfully");
            res.send(`${note.name}.txt`);
        }
    })
});

//create note
router.post('/api/notes', function (req, res, next) {

    let note = (req.body);

    note.lastUpdated = new Date().toISOString();

    console.log(note);
    var table = "Notes";

    var params = {
        TableName: table,
        Item: note
    };

    console.log("Adding a new item...");

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.send(JSON.stringify(note));
        }
    });
});

//update note
router.put('/api/notes', function (req, res, next) {
    let note = (req.body);

    note.lastUpdated = new Date().toISOString();

    var table = "Notes";

    console.log(note.name);

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

    console.log("Updating note - " + note.id);

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.update(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.send(JSON.stringify(note));
        }
    });
});

//get all notes for user
router.get('/api/notes/:email', function (req, res, next) {
    console.log(req.params);

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

    console.log(`Getting items for ${req.params.email}...`);

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to get items. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Getting items:", JSON.stringify(data, null, 2));
            res.send(JSON.stringify(data));
        }
    });
});

export default router;
