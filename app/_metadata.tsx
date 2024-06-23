import { Metadata } from "next"

export default function appendSharedMetaData(metadataBase: Metadata): Metadata {
  return {
    title: "RoomeyFinder | Find a roommate",
    description:
      "Facilitating seamless roommate connections for Nigerian professionals and students, ensuring they find compatible roommates who are also schoolmates effortlessly.",
    openGraph: {
      type: "website",
      url: "https://roomeyfinder.com",
      title: "RoomeyFinder",
      description:
        "Facilitating seamless roommate connections for Nigerian professionals and students, ensuring they find compatible roommates who are also schoolmates effortlessly.",
      // "Helping Nigerian students find roommates who are schoolmates with ease.",
      siteName: "RoomeyFinder",
      images: [
        {
          url: "https://roomeyfinder.com/og.png",
        },
      ],
    },
    metadataBase: new URL("https://roomeyfinder.com"),
    ...metadataBase,
  }
}
