import { Stack } from '@aws-cdk/core';
import { expect as expectCDK, haveResource, countResources, SynthUtils } from '@aws-cdk/assert';
import '@aws-cdk/assert/jest';

import * as s3sw from '../cdk-s3-static-website-construct';

//Snapshot Tests
// test('a website bucket is successfully created', () => {
//     //GIVEN
//     const stack = new Stack();
//     //WHEN
//     new s3sw.CdkS3StaticWebsiteConstruct(stack, 's3sw', {
//         projectName: 'projname',
//         websiteIndexDocument: 'index.html',
//         websiteErrorDocument: 'index.html',
//         cdnComment: 'CDN for static website app',
//         cdnWebsiteIndexDocument: 'index.html',
//         useCdn: false
//     });
//     //THEN
//     expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
// });

//Fine-grained Tests
test('s3sw creates a website bucket', () => {
    //GIVEN
    const stack = new Stack();
    //WHEN
    new s3sw.CdkS3StaticWebsiteConstruct(stack, 's3sw', {
        projectName: 'pname',
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: 'index.html',
        cdnComment: 'CDN for static website app',
        cdnWebsiteIndexDocument: 'index.html',
        useCdn: false
    });
    //THEN
    expectCDK(stack).to(countResources('AWS::S3::Bucket', 1));
    
    //from @aws-cdk/assert/jest
    //expect(stack).toHaveResource('AWS::S3::Bucket');
    
    expectCDK(stack).to(haveResource('AWS::S3::Bucket', {
        WebsiteConfiguration: {
            ErrorDocument: 'index.html',
            IndexDocument: 'index.html'
        }
    }));
});

//Validation Tests
test('project name is less than 13 characters', () => {
    //GIVEN
    const stack = new Stack();
    //WHEN
    //THEN
    expect(() => {
        new s3sw.CdkS3StaticWebsiteConstruct(stack, 's3sw', {
            projectName: '12345678987654321',
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html',
            cdnComment: 'CDN for static website app',
            cdnWebsiteIndexDocument: 'index.html',
            useCdn: false
        });
    }).toThrowError(/Project name must be less than 13 characters/);

});

test('project name contains special characters', () => {

    //GIVEN
    const stack = new Stack();
    //WHEN

    //THEN
    expect(() => {
        new s3sw.CdkS3StaticWebsiteConstruct(stack, 's3sw', {
            projectName: '%@#$%@^',
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html',
            cdnComment: 'CDN for static website app',
            cdnWebsiteIndexDocument: 'index.html',
            useCdn: false
        });
    }).toThrowError(/Project name must not contain special characters/);

});



