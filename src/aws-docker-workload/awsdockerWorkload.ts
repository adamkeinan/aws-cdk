import { awsdockerWorkload } from './aws-docker-workload';
const app = new App();
// Don't
new awsdockerWorkload(app, 'Stack', {
  env: {
    account: '123456',
    region: 'us-east-1',
  },
});
// Do
new awsdockerWorkload(app, 'Stack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});