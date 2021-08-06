import express from 'express';
var router = express.Router();
import path from "path";
import fs from 'fs';

import AWS from "aws-sdk";
AWS.config.update({
    region: "us-east-1"
});








export default router;


