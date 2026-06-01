import { getCurrentWorkspaceId } from "@/lib/workspace";
import { MessagesHub } from "@/components/messages/messages-hub";

export default async function MessagesPage() {
  const workspaceId = await getCurrentWorkspaceId();
  return <MessagesHub workspaceId={workspaceId} />;
}
