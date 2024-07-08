// @@@SNIPSTART typescript-next-oneclick-activities
import { activityInfo } from '@temporalio/activity';
export async function purchase(id: string): Promise<string> {
  console.log(`Purchased ${id}!`);
  return activityInfo().activityId;
}
// @@@SNIPEND
