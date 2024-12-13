import BlogPostItem from "./BlogPostItem"
import backupImage from "../_assets/images/featured.webp"
import { Client } from "@notionhq/client"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react"

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export async function getBlogPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID || ""
  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 4,
    filter: {
      and: [
        {
          property: "Status",
          status: {
            equals: "Published",
          },
        },
        {
          property: "Featured",
          checkbox: {
            equals: false,
          },
        },
      ],
    },
  })
  return response.results.map((page) => {
    return {
      id: page.id,
      title: (
        (page as PageObjectResponse).properties?.["Content Title"] as {
          title: { plain_text: string }[]
        }
      )?.title?.[0]?.plain_text,
      publishedAt: (
        (page as PageObjectResponse).properties["Published Date"] as {
          date: { start: string }
        }
      ).date?.start,
      cover: (
        (page as PageObjectResponse).cover as {
          type: "file"
          file: { url: string; expiry_time: string }
        }
      )?.file?.url,
      publicUrl: (page as PageObjectResponse).public_url,
    }
  })
}
type Post = {
  id: string
  isFeatured: boolean
  author: string
  statuus: string
  KW: string
  category: string
  title: string
  publishedAt: string
  cover: string
  publicUrl: string | null
}
export default async function BlogSection() {
  const posts: Partial<Post>[] = await getBlogPosts()

  return (
    <Box w="90dvw" mx="auto" maxW="125rem" mb="6rem">
      <Heading
        as="h1"
        variant="md"
        mb="1rem"
        fontSize={{ base: "2.6rem", md: "4rem" }}
        fontWeight="500"
        mx="auto"
        textAlign="center"
      >
        Explore Our Blog
      </Heading>
      <Text
        textAlign="center"
        fontSize={{ base: "1.6rem", md: "2rem" }}
        mb="4rem"
        maxW="80rem"
        mx="auto"
      >
        Stay updated with the latest tips, advice, and insights on finding
        roommates, sharing living spaces, and enhancing your living experience.
        Check out our recent articles:
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} gap="2.4rem">
        {posts.map((post) => (
          <BlogPostItem
            key={post.id}
            imageSrc={post.cover || backupImage}
            imageAlt=""
            href={post.publicUrl as string}
            date={new Date(post.publishedAt || Date.now()).toDateString()}
            heading={post.title}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}
