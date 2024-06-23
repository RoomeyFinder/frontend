import appendSharedMetaData from "../_metadata"
import ContactPageClient from "./ContactPageClient"

export async function generateMetadata() {
  return appendSharedMetaData({
    title: "Contact Us • Roomeyfinder",
    description:
      "Get in touch with the Roomeyfinder team. We're here to help with any questions, concerns, or feedback you may have.",
  })
}

export default function ContactPage() {
  return <ContactPageClient />
}
