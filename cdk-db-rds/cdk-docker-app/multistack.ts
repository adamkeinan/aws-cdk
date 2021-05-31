#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkStack } from '../../lib/BLeumiPrivatevpc/BLeumiPrivatevpc';
import { CdkWorkshopStack } from '../../lib/BLeumiPublicvpc/BLeumiPublicvpc';

const app = new cdk.App();

new AwsCdkStack(app, "cdk-jenkins-app", {
    env: {region: "us-east-1"},
    encryptBucket: false
});
  
new CdkWorkshopStack(app, "cdk-docker-app", {
    env: {region: "us-east-1"},
    encryptBucket: true
});