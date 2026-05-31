import { redirect } from "next/navigation";

export default function SmsInboxRedirectPage() {
  redirect("/messages?channel=sms");
}
