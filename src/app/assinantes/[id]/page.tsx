import SubscriberForm from "@/app/components/subscribers-form";
import { updateSubscriber } from "@/app/actions/subscribers";
import { fetchSubscriberById } from "@/db/queries/subscribers";
interface SubscriberEditProps {
  params: {
      id: string;
  };
}

export default async function subscriberEdit({params}: SubscriberEditProps) {
  const subscriber = await fetchSubscriberById(params.id)
  
  const updateAction = updateSubscriber.bind(null, params.id)

  return (
    <SubscriberForm formAction={updateAction} initialData={{
      name: subscriber?.name,
      phone: subscriber.phone,
      cnpj: subscriber?.cnpj,
      email: subscriber.email
    }} />
  );
}
