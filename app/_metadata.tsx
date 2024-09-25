import { Metadata } from "next"

export default function appendSharedMetaData(metadataBase: Metadata): Metadata {
  return {
    title: "Find a Roommate | Roommate Finder for Students & Professionals",
    description:
      "Discover the best roommate matching service to find your perfect shared accommodation. Start your roommate search today",
    metadataBase: new URL("https://roomeyfinder.com"),
    keywords:
      "roommate, living situation, housing, accommodation, room, finder, room finder, roomie, roomey, room",
    robots: "index, follow",
    openGraph: {
      description:
        "We make finding your perfect living situation one less hassle.",
      url: "https://roomeyfinder.com",
      images: [
        "https://pbs.twimg.com/profile_images/1742258368595595265/O5znt_ZT_400x400.jpg",
      ],
      type: "website",
      ttl: 3000,
      locale: "en-NG",
      alternateLocale: "en-US",
      countryName: "Nigeria",
      determiner: "a",
      emails: "exploitenomah@gmail.com",
      siteName: "RoomeyFinder",
      phoneNumbers: "09011288423",
      title: "RoomeyFinder",
    },
    twitter: {
      title: "RoomeyFinder | Coming Soon",
      description:
        "We make finding your perfect living situation one less hassle.",
      site: "roomeyfinder",
      images: [
        "https://pbs.twimg.com/profile_images/1742258368595595265/O5znt_ZT_400x400.jpg",
      ],
      creator: "exploitenomah",
      creatorId: "945750336823873537",
    },
    icons: [
      {
        url: "/favicon.ico",
        sizes: "64x64",
      },
      {
        url: "/icon.ico",
        sizes: "64x64",
      },
    ],
    ...metadataBase,
  }
}
