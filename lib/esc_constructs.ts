import * as ec2 from "@aws-cdk/aws-ec2";
import { GenericLinuxImage } from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import { LoadBalancer } from "@aws-cdk/aws-elasticloadbalancing";
import { aws_elasticloadbalancing } from "aws-cdk-lib";

const vpc = new ec2.Vpc(this, "vpc-0a42d889dd13270f", {
    maxAzs: 3 // Default is all AZs in region
  });

  const cluster = new ecs.Cluster(this, "Public_BLeumi_VPC", {
    vpc: vpc
  });

  // Create a load-balanced Fargate service and make it public
  new ecs_patterns.ApplicationLoadBalancedFargateService(aws_elasticloadbalancing, "amazon_nlb"  {
    cluster: cluster, // Required
    cpu: 512, // Default is 256
    desiredCount: 6, // Default is 1
    taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/NLB") },
    memoryLimitMiB: 2048, // Default is 512
    publicLoadBalancer: true // Default is false
  });

  const vpc = new ec2.Vpc(this, "vpc-d94700a9", {
    maxAzs: 3 // Default is all AZs in region
  });

  const cluster = new ecs.Cluster(this, "Private_BLeumi_VPC", {
    vpc: vpc
  });

  // Create a load-balanced Fargate service and make it public
  new ecs_patterns.ApplicationLoadBalancedFargateService(GenericLinuxImage, "nginx_nlb", {
    cluster: cluster, // Required
    cpu: 512, // Default is 256
    desiredCount: 6, // Default is 1
    taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/Ubuntu_1804_Load_balance") },
    memoryLimitMiB: 2048, // Default is 512
    publicLoadBalancer: false // Default is false
  });