// @@@SNIPSTART typescript-next-oneclick-api
import { oneClickBuy } from '../../../temporal/src/workflows';
import { getTemporalClient } from '../../../temporal/src/client';
import { TASK_QUEUE_NAME } from '../../../temporal/src/shared';

export async function POST(req: Request) {
  interface RequestBody {
    itemId: string;
    transactionId: string;
  }

  let body: RequestBody;

  try {
    body = await req.json() as RequestBody;
  } catch (error) {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const { itemId, transactionId } = body;

  if (!itemId) {
    return new Response("Must send the itemID to buy", { status: 400 });
  }

  await getTemporalClient().workflow.start(oneClickBuy, {
    taskQueue: TASK_QUEUE_NAME,
    workflowId: transactionId,
    args: [itemId],
  });

  return Response.json({ ok: true });
}
// @@@SNIPEND
