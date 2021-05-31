#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkStack } from '../../lib/aws-cdk-stack/aws-cdk-stack';
import { CdkWorkshopStack } from '../../lib/cdk-workshop-stack';

const app = new cdk.App();

new AwsCdkStack(app, "cdk-jenkins-app", {
    env: {region: "us-east-1"},
    encryptBucket: false
});
  
new CdkWorkshopStack(app, "cdk-docker-app", {
    env: {region: "us-east-1"},
    encryptBucket: true
});