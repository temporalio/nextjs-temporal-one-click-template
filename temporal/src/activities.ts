// @@@SNIPSTART typescript-next-oneclick-activities
import { Context } from '@temporalio/activity';

export async function purchase(id: string): Promise<string> {
  console.log(`Purchased ${id}!`);
  return Context.current().info.activityId;
}
// @@@SNIPEND
