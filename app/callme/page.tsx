import { redirect } from "next/navigation";

/**
 * /callme is now folded into the /solutions/voice-whatsapp use case page.
 * CallMe is the brand name of the product, not a separate route.
 */
export default function CallmeRedirect() {
  redirect("/solutions/voice-whatsapp");
}
