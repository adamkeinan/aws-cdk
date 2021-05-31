import * as sns from '@aws-cdk/aws-sns';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import * as assert from '@aws-cdk/assert';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as codebuile from'@aws-cdk/aws-codebuild';
import * as codecommit from '@aws-cdk/aws-codecommit';
import * as codeeploy from '@aws-cdk/aws-codedeploy';
import * as codepipline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as cognito from '@aws-cdk/aws-cognito';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as efs from '@aws-cdk/aws-efs';
import * as elasticloadbalancinig from '@aws-cdk/aws-elasticloadbalancing';
import * as elasticloadbalancingv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as elasticloadbalancingv2_targets from '@aws-cdk/aws-elasticloadbalancingv2-targets';
import * as lambada from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as secretmanager from '@aws-cdk/aws-secretsmanager';
import * as sns_subscriptions from '@aws-cdk/aws-sns-subscriptions';
import { Ec2Service } from 'aws-cdk-lib/lib/aws-ecs';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';

// Define the new VPC
export class BLeumiPublicnlbvpc extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "Private_BLeumi_VPC", {
      maxAzs: 3 // defaulat
    });

    const cluster = new ecs.Cluster(this, "BLeumiCluster", {
      vpc: vpc
    });

    new ecs_patterns.ApplicationLoadBalanacedFargateService(this, "NLB", {
      cluster: cluster, // requierd
      cpu: 512,
      desiredCount: 2,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry("amazon/amzon-ecs-nlb")
      },
      memoryLimitMiB: 2048, //Defalt 512
      publicloadBalancer: false // Default
    });
  }
}