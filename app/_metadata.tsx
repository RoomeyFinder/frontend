import { Metadata } from "next"

export default function appendSharedMetaData(metadataBase: Metadata): Metadata {
  return {
    title: "Find a Roommate | Roommate Finder for Students & Professionals",
    description:
      "Discover the best roommate matching service to find your perfect shared accommodation. Start your roommate search today",
    metadataBase: new URL("https://roomeyfinder.com"),
    keywords:
      "roommate, living situation, housing, accommodation, room, finder, room finder, roomie, roomey, room, nigeria, apartment, flatmate, housemate, shared living, student housing, professional housing, rental, affordable housing, roommate matching, house sharing, flat sharing, co-living, shared apartment, shared room, rental listings, accommodation search, housing search, roommate wanted, room for rent, shared home",
    robots: "index, follow",
    openGraph: {
      description:
        "We make finding your perfect living situation one less hassle.",
      url: "https://roomeyfinder.com",
      images: [
        {
          url: "https://pbs.twimg.com/profile_images/1742258368595595265/O5znt_ZT_400x400.jpg",
          width: 400,
          height: 400,
          alt: "RoomeyFinder Logo",
        }
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
      title: "Find a Roommate | RoomeyFinder - Nigeria's #1 Roommate Matching Service",
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
    verification: {
      google: "CMjgKjsziclrkIOp9eyalVvYqfl5uOQ4IxOsEvkbI5M",
    },
    alternates: {
      canonical: "https://roomeyfinder.com",
      languages: {
        'en-NG': 'https://roomeyfinder.com',
        'en-US': 'https://roomeyfinder.com/us',
      },
    },
    ...metadataBase,
  }
}
