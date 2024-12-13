import ListingsSection, {
  FeaturesSection,
  Hero,
} from "./_components/HomepageComponents"
import appendSharedMetaData from "./_metadata"

export async function generateMetadata() {
  return appendSharedMetaData({})
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <ListingsSection />
    </>
  )
}
