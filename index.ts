#!/usr/bin/env node
import ecs = require('@aws-cdk/aws-ecs');
import ecs_patterns = require('@aws-cdk/aws-ecs-patterns');
import { Stack, Construct, StackProps, App } from '@aws-cdk/core';
import { SplitAtListener_LoadBalancerStack, SplitAtListener_ServiceStack } from './split-at-listener';
import { SplitAtTargetGroup_LoadBalancerStack, SplitAtTargetGroup_ServiceStack } from './split-at-targetgroup';
import { AwsCdkStack } from './lib/aws-cdk-stack/aws-cdk-stack';
import { CdkWorkshopStack } from './lib/cdk-workshop-stack';
import s3 = require('@aws-cdk/aws-s3');
import autoscaling = require('@aws-cdk/aws-autoscaling');
import ec2 = require('@aws-cdk/aws-ec2');
import elb = require('@aws-cdk/aws-elasticloadbalancing');
import cdk = require('@aws-cdk/core');
import { FromCloudFormation } from '@aws-cdk/aws-iam/node_modules/@aws-cdk/core/lib/cfn-parse';
import ISecret = require('@aws-cdk/aws-secretsmanager');


/**
 * Shared LoadBalancer -- VPC and Cluster
 */

class LoadBalancerStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id);

    const vpc = new ec2.Vpc(this, 'VPC');

    const asg = new autoscaling.AutoScalingGroup(this, 'ASG', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage(),
    });

    const lb = new elb.LoadBalancer(this, 'NLB', {
      vpc,
      internetFacing: true,
      healthCheck: {
        port: 80
      },
    });

    lb.addTarget(asg);
    const listener = lb.addListener({ externalPort: 80 });

    listener.connections.allowDefaultPortFromAnyIpv4('Open to the world');
  }
}

const awsdockerapp = new cdk.App();
  
new BonjourFargate(awsdockerapp, 'Bonjour');

awsdockerapp.synth()

class BonjourFargate extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      // Create VPC and Fargate Cluster
      // NOTE: Limit AZs to avoid reaching resource quotas
      const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 2 });
      const cluster = new ecs.Cluster(this, 'Cluster', { vpc });
  
      // Instantiate Fargate Service with just cluster and image
      new ecs_patterns.ApplicationLoadBalancedFargateService(this, "FargateService", {
        cluster,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
        },
      });
    }
  }
  
  const awsjenkinsapp = new cdk.App();
  
  new BonjourFargate(awsjenkinsapp, 'Bonjour');
  
  awsjenkinsapp.synth()