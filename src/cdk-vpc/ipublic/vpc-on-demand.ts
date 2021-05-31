/**
 * Create or import VPC
 * @param scope the cdk scope
 */
 function getOrCreateVpc(scope: Construct): ec2.IVpc {
    // use an existing vpc or create a new one
    return scope.node.tryGetContext('use_default_vpc') === '1' ?
      ec2.Vpc.fromLookup(scope, 'Vpc', { isDefault: true }) :
      scope.node.tryGetContext('use_vpc_id') ?
        ec2.Vpc.fromLookup(scope, 'Vpc', { vpcId: scope.node.tryGetContext('use_vpc_id') }) :
        new ec2.Vpc(scope, 'Vpc', { maxAzs: 3, natGateways: 1 });
  }