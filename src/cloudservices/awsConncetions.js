import * as AWS from 'aws-sdk';
import config from 'config';

// Configure and authenticate with AWS
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID, 
    secretAccessKey: process.env.SECRET_ACCESS_KEY, 
    region: config.get('aws_settings.default_region')
});

// Initialize S3 module
let s3 = new AWS.S3();

module.exports.s3 = s3;
