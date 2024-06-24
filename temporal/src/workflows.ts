// @@@SNIPSTART typescript-next-oneclick-workflows
import { proxyActivities, sleep } from '@temporalio/workflow';
import type * as activities from './activities';

const { purchase } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function OneClickBuy(id: string): Promise<string> {
  const result = await purchase(id); // calling the activity
  await sleep('10 seconds'); // sleep to simulate a longer response.
  console.log(`Activity ID: ${result} executed!`);
  return result;
}
// @@@SNIPEND
