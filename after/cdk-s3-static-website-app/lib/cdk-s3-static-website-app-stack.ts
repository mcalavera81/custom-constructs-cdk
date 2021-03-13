import * as cdk from '@aws-cdk/core';
import * as s3sw from '@blndspt/cdk-s3-static-website';

export interface CdkS3StaticWebsiteAppStackProps extends cdk.StackProps {
  projectName: string,
  s3WebsiteDeploySource: string,
  websiteIndexDocument: string,
  websiteErrorDocument: string,
  cdnWebsiteIndexDocument: string,
  cdnComment: string,
  useCdn: boolean
}


export class CdkS3StaticWebsiteAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: CdkS3StaticWebsiteAppStackProps) {
    super(scope, id, props);

    const s3website = new s3sw.CdkS3StaticWebsiteConstruct(this, 'Mys3Website', {
      projectName: props.projectName,
      s3WebsiteDeploySource: props.s3WebsiteDeploySource,
      websiteIndexDocument: props.websiteIndexDocument,
      websiteErrorDocument: props.websiteErrorDocument,
      cdnWebsiteIndexDocument: props.cdnWebsiteIndexDocument,
      cdnComment: props.cdnComment,
      useCdn: props.useCdn
    });
  }
}
