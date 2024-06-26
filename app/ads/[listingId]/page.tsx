import { capitalizeFirstLetter } from "@/app/_utils"
import ClientContent from "./ClientContent"
import { Listing } from "@/app/_types/Listings"

export async function generateMetadata({
  params,
}: {
  params: { listingId: string }
}) {
  let res: Response | undefined
  try {
    res = await fetch(
      `${process.env.SERVER_URL}/api/v1/listings/${params.listingId}`,
      {
        method: "get",
      }
    )
  } catch (err) {
    console.log(err)
  }
  const json = await res?.json()
  if (json?.statusCode !== 200) {
    return {
      title: "Listing not found",
      description: "The requested listing was not found.",
    }
  }
  const title = `Stay with ${capitalizeFirstLetter(json?.listing?.owner?.firstName || "")}`
  const description = `${json?.listing?.isStudioApartment ? "Studio apartment" : `${json?.listing?.numberOfBedrooms} bedroom apartment`} located at ${json?.listing?.streetAddress}`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ((json?.listing.photos as Listing["photos"]) || []).map(
        (photo) => ({
          url: photo.secure_url,
          width: 800,
          height: 600,
        })
      ),
      type: "website",
      ttl: 3000,
      locale: "en-NG",
      alternateLocale: "en-US",
      countryName: "Nigeria",
      determiner: "a",
      emails: "contact@roomeyfinder.com",
      siteName: "RoomeyFinder",
      phoneNumbers: "+2349097178588",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: `${params.listingId}`,
      creator: "@roomeyfinder",
      creatorId: "945750336823873537",
      images: {
        url: "https://pbs.twimg.com/profile_images/1742258368595595265/O5znt_ZT_400x400.jpg",
        alt: "Roomeyfinder Logo",
      },
    },
    alternates: {
      canonical: "https://roomeyfinder.netlify.app",
      languages: {
        "en-US": "https://roomeyfinder.netlify.app",
        "de-DE": "https://roomeyfinder.netlify.app",
      },
      media: {
        "only screen and (max-width: 600px)":
          "https://roomeyfinder.netlify.app/",
      },
      types: {
        "application/rss+xml": "https://roomeyfinder.netlify.app/",
      },
    },
    appLinks: {
      web: {
        url: "https://roomeyfinder.netlify.app/",
        should_fallback: true,
      },
    },
    bookmarks: ["https://roomeyfinder.netlify.app"],
    category: "entertainment",
  }
}

export default function ListingPage() {
  return (
    <>
      <ClientContent />
    </>
  )
}
