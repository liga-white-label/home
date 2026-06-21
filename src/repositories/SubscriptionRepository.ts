import { httpClient } from "@/app/utils/httpClient";

export class SubscriptionRepository {
  subscribe = async (email: string, teamId: string): Promise<void> => {
    await httpClient.post("subscriptions", { email, teamId });
  };

  unsubscribe = async (teamId: string, email: string): Promise<void> => {
    await httpClient.delete(`subscriptions/${teamId}/${email}`);
  };
}

export const subscriptionRepo = new SubscriptionRepository();
