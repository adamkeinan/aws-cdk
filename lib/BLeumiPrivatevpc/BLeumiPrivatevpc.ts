import * as core from '@aws-cdk/core';
import { Construct } from 'constructs';
import { App, Stack } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import * as assert from '@aws-cdk/assert';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as codebuile from'@aws-cdk/aws-codebuild';
import * as codecommit from '@aws-cdk/aws-codecommit';
import * as codeeploy from '@aws-cdk/aws-codedeploy';
import * as codepipline from '@aws-cdk/aws-codepipeline';
import * as actions from '@aws-cdk/aws-codepipeline-actions';
import * as cognito from '@aws-cdk/aws-cognito';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as patterns from '@aws-cdk/aws-ecs-patterns';
import * as efs from '@aws-cdk/aws-efs';
import * as elasticloadbalancinig from '@aws-cdk/aws-elasticloadbalancing';
import * as elasticloadbalancingv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as targets from '@aws-cdk/aws-elasticloadbalancingv2-targets';
import * as lambada from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as secretmanager from '@aws-cdk/aws-secretsmanager';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import { Names } from '@aws-cdk/core';

// Define the new VPC
export class BLeumiPrivatevpc extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const new ec2.CfnVPC(this, "id", {
      cidrBlock: "string", // Required
      enableDnsHostnames: false,
      enableDnsSupport: false,
      instanceTenancy: "string",
      tags: [Names],
      name: BLeumiPrivatevpc
    });
  }
}
