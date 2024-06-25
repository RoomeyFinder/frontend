import {
  Box,
  Heading,
  Text,
  ListItem,
  UnorderedList,
  Link,
} from "@chakra-ui/react"
import appendSharedMetaData from "../_metadata"

export async function generateMetadata() {
  return appendSharedMetaData({
    title: "Privacy Policy • Roomeyfinder",
    description:
      "Read our Privacy Policy to understand how Roomeyfinder collects, uses, and protects your personal information. Your privacy is important to us.",
  })
}
const PrivacyPolicy = () => (
  <Box w="90dvw" mx="auto" py="4rem" maxW="125rem" fontSize="1.6rem">
    <Heading as="h1" variant="md" mb={4}>
      Privacy
    </Heading>
    <Text mb={4}>
      ROOMEYFINDER LIMITED (Roomeyfinder.com) is committed to protecting your
      privacy. ROOMEYFINDER LIMITED&apos;s privacy policy is outlined below.
      This privacy policy is regularly reviewed and Roomeyfinder.com may amend
      it from time to time. While ROOMEYFINDER LIMITED will endeavour to notify
      you of any major changes to this Privacy Policy from time to time, you
      agree that you will periodically review the most up-to-date version of
      this Privacy Policy available.
    </Text>
    <Text mb={4}>
      This policy sets out how Roomeyfinder.com will collect, use, store,
      disclose and provide access to information about you and how you can keep
      that information accurate. By using the Website, you agree to be bound by
      and consent to this policy.
    </Text>
    <Text mb={4}>
      In this Policy, defined terms have the meaning given to them in
      Roomeyfinder.com&apos;s Terms and Conditions of Use:{" "}
      <Link href="https://www.roomeyfinder.com/terms-and-conditions" isExternal>
        https://www.roomeyfinder.com/terms-and-conditions
      </Link>
    </Text>

    <Heading as="h2" variant="sm" mb={4}>
      1. Collection
    </Heading>
    <Text mb={4}>
      Roomeyfinder collects information from you that is required to create an
      account. The details are used for the purpose of publishing your
      listing(s), to communicate with others, and to save other listings to your
      dashboard. In addition, the information and content collected will assist
      in promoting your listing to the most relevant users. This personal
      information may include, but is not limited to, your name, telephone
      number, street address, and email address.
    </Text>
    <Text mb={4}>
      You may delete your account at any time, for any reason, by visiting your
      account settings and locating &apos;Delete Account&apos; at the bottom of
      the page. Once an account is deleted, your personal information and active
      listings will be removed from the website.
    </Text>
    <Text mb={4}>
      If you wish to pause your listing but keep your account with us, you may
      do so by simply deactivating your listing from your dashboard.
    </Text>
    <Text mb={4}>
      You may also send us an email at{" "}
      <Link href="mailto:support@roomeyfinder.com">
        support@roomeyfinder.com
      </Link>{" "}
      to request a deletion of your data.
    </Text>

    <Heading as="h2" variant="sm" mb={4}>
      2. Use and disclosure
    </Heading>
    <Text mb={4}>
      In addition to the primary purpose for which Roomeyfinder.com collects and
      uses your personal information, Roomeyfinder.com and its nominated agents
      may also use the personal information Roomeyfinder.com collects, and you
      consent to Roomeyfinder.com&apos;s use of that personal information:
    </Text>
    <UnorderedList mb={4}>
      <ListItem>
        for purposes necessary or incidental to the provision of goods and
        services to you including, without limitation, for marketing or
        promotional purposes;
      </ListItem>
      <ListItem>to manage and enhance the Services;</ListItem>
      <ListItem>
        to communicate with you, including by email, mail or telephone;
      </ListItem>
      <ListItem>to verify your identity;</ListItem>
      <ListItem>
        to investigate you and your use of the Website and the Services if
        Roomeyfinder.com has reason to suspect that you are in breach of the
        terms and conditions of use of or have otherwise engaged in unlawful
        activity; and/or
      </ListItem>
      <ListItem>as required or permitted by any law.</ListItem>
    </UnorderedList>
    <Text mb={4}>
      Roomeyfinder.com may disclose your personal information, and you consent
      to Roomeyfinder.com disclosing your personal information, to
      Roomeyfinder.com&apos;s related bodies corporate and associated entities
      (as those terms are defined in the Companies and Allied Matters Act (CAMA)
      2020.) (Other Entities) whereby your personal information will be
      collected, used, disclosed, managed and stored in accordance with this
      policy.
    </Text>
    <Text mb={4}>
      Roomeyfinder.com may also disclose personal information, and you consent
      to Roomeyfinder.com disclosing your personal information, to third
      parties:
    </Text>
    <UnorderedList mb={4}>
      <ListItem>
        Roomeyfinder.com engages to perform functions or provide goods or
        services on its behalf;
      </ListItem>
      <ListItem>
        that are Roomeyfinder.com&apos;s agents, business partners or joint
        venture entities;
      </ListItem>
      <ListItem>
        authorised by you to receive information held by Roomeyfinder.com;
      </ListItem>
      <ListItem>
        as part of any investigation into you or your activities, for example,
        if Roomeyfinder.com has reason to suspect that you have committed a
        breach of these Terms and Conditions of Use or have otherwise engaged in
        unlawful activity, and Roomeyfinder.com reasonably believes that
        disclosure is necessary to police, any relevant authority or enforcement
        body, or your internet service provider or network administrator;
      </ListItem>
      <ListItem>
        as part of a sale (or proposed sale) of all or part of
        Roomeyfinder.com&apos;s business or the preparation for a listing of
        Roomeyfinder.com; and/or
      </ListItem>
      <ListItem>as required or permitted by any law.</ListItem>
    </UnorderedList>
    <Text mb={4}>
      Users of the Website other than yourself cannot access your personal
      information, such as your address, email address or telephone number,
      unless you give them access to that information.
    </Text>
    <Text mb={4}>
      Roomeyfinder.com will not disclose to any user other than the intended
      recipient the contents of any messages sent through the messaging service
      available on the Website.
    </Text>
    <Text mb={4}>
      Roomeyfinder.com will not disclose to any user the content or source of
      any complaint made against, or feedback received, about that user (or any
      other user), including the nature, substance, or origin of that complaint
      or feedback.
    </Text>

    <Heading as="h2" variant="sm" mb={4}>
      3. Storage
    </Heading>
    <Text mb={4}>
      Roomeyfinder.com will take all reasonable steps to protect the personal
      information it holds about you from misuse, loss, or unauthorised access.
      You acknowledge that the security of online transactions you conduct using
      this website cannot be guaranteed. Roomeyfinder.com does not accept
      responsibility for misuse of, or loss of, or unauthorised access to, your
      personal information where the security of that information is not within
      Roomeyfinder.com&apos;s control.
    </Text>

    <Heading as="h2" variant="sm" mb={4}>
      4. Overseas disclosure
    </Heading>
    <Text mb={4}>
      In some circumstances, Roomeyfinder.com may need to disclose your personal
      information to entities located overseas where Roomeyfinder.com may not be
      in a position to know that those entities comply with Nigerian privacy
      laws or that the laws of the country in which that entity operates (if
      any) are substantially similar to Nigerian privacy laws. When necessary,
      Roomeyfinder.com will inform you that such disclosure may be necessary and
      will seek your express consent to disclose your personal information to
      such overseas entities.
    </Text>
    {/* <Text mb={4}>
      If you request Upgraded Services from Roomeyfinder.com, it will be
      necessary for Roomeyfinder.com to collect your credit card details and
      disclose those details to Paystack or Braintree who may or may not be
      obliged to comply with the Nigerian Privacy Principles under the Privacy
      Act 1988 (Cth). By requesting Upgraded Services, you hereby acknowledge
      and accept these matters and expressly consent to Roomeyfinder.com
      disclosing your personal information to Stripe or Braintree (wherever
      located) with full knowledge that it may not be obliged to comply with the
      Nigerian Privacy Principles. Roomeyfinder.com will not be accountable to
      you in respect of the use or disclosure by that overseas entity of your
      personal information and you will not be able to seek redress under the
      Privacy Act in respect of such use or disclosure. You also expressly
      acknowledge and accept that you may not be able to seek redress under the
      laws of the country in which Stripe or Braintree is located or in the
      country or place in which that personal information is subsequently or
      otherwise disclosed or accessed. You may withdraw your consent to such
      disclosure at any time by providing not less than 7 days&apos; prior
      written notice to Roomeyfinder.com using the contact details provided
      below. If you do not consent to such disclosure, or you do consent but
      later withdraw that consent, you will not be able to use the Upgraded
      Services or, if you have already started using the Upgraded Services at
      the time you withdraw your consent, you will not be able to continue to
      use those Upgraded Services. You acknowledge and agree that you will not
      be entitled to any refund in respect of the Upgraded Services if you
      withdraw your consent.
    </Text> */}

    <Heading as="h2" variant="sm" mb={4}>
      5. Cookies
    </Heading>
    <Text mb={4}>
      Roomeyfinder.com may use cookies on the Website to provide you with a
      better experience and so that it can gather statistical information about
      user visits to the website. Cookies are small data files that are
      downloaded onto your computer when you visit a particular website. Cookies
      help provide added functionality to the Website or help Roomeyfinder.com
      analyse Website usage. You can disable cookies by turning them off in your
      browser, however, some areas of the website may not function properly if
      you do so.
    </Text>

    <Heading as="h2" variant="sm" mb={4}>
      6. Access
    </Heading>
    <Text mb={4}>
      You have the right to seek access to and update the personal information
      which Roomeyfinder.com holds about you. You can seek access to and update
      your personal information by contacting Roomeyfinder.com directly at{" "}
      <Link href="mailto:support@roomeyfinder.com">
        support@roomeyfinder.com
      </Link>
      .
    </Text>

    <Heading as="h2" variant="sm" mb={4}>
      7. Website tracking
    </Heading>
    <Text mb={4}>
      Roomeyfinder.com collects data about your browsing activity on the
      Website, such as the search terms you have used and other details of the
      way you use the Website, in order to provide suggested search results to
      you and, once aggregated with other users&apos; data, other users based on
      your and other users&apos; searches on the Website. This data does not
      include your personal information. However, this data may be associated
      with your personal information if you have an Account or if you sign-up
      for an Account in the future. The collection, use and disclosure, storage
      of, and access to, that data (if it is associated with your personal
      information) will be in accordance with this Privacy Policy.
      Roomeyfinder.com will not provide that data to any third parties in a way
      which will enable them to personally identify you.
    </Text>

    <Heading as="h2" variant="sm" mb={4}>
      8. Subscriptions
    </Heading>
    <Text mb={4}>
      If you wish to stop receiving emails or other communications from
      Roomeyfinder.com which may be sent to you in the future, please notify
      Roomeyfinder.com by using the contact details given below, or by clicking
      the unsubscribe link at the bottom of any email newsletter you have
      received from Roomeyfinder.com.
    </Text>

    <Heading as="h2" variant="sm" mb={4}>
      9. Contact Details
    </Heading>
    <Text mb={4}>
      Roomeyfinder.com team
      <br />
      <Link href="mailto:support@roomeyfinder.com">
        support@roomeyfinder.com
      </Link>
    </Text>
  </Box>
)

export default PrivacyPolicy
