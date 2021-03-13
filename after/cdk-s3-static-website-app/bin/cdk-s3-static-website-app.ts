#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkS3StaticWebsiteAppStack } from '../lib/cdk-s3-static-website-app-stack';

const app = new cdk.App();

const s3WebsiteProps = {
	projectName: 'mystaticwebsite',
    s3WebsiteDeploySource: './assets',
    websiteIndexDocument: 'index.html',
    websiteErrorDocument: 'index.html',
	cdnComment: 'CDN for static website app',
    cdnWebsiteIndexDocument: 'index.html',
    useCdn: false
}


new CdkS3StaticWebsiteAppStack(app, 'CdkS3StaticWebsiteAppStack', s3WebsiteProps);
