import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Divider,
  UnorderedList,
} from "@chakra-ui/react"

const Page = () => (
  <Box w="90dvw" mx="auto" py="4rem" maxW="125rem" fontSize="1.6rem">
    <Heading as="h3" variant="sm" mb={2}>
      Terms and Conditions of Use
    </Heading>
    <Text fontSize="1.6rem">
      <Text as="strong" display="block">
        Terms
      </Text>
      <Text as="span">
        For Roomeyfinder.com (including all subsidiaries).
      </Text>
      <Text as="span">
        This website (Website), including all subsidiaries, is owned, operated,
        and maintained by ROOMEYFINDER LIMITED. It provides an online community
        that enables:
      </Text>
    </Text>

    <List styleType="disc" pl={4} mb={4} fontSize="1.6rem">
      <ListItem>
        People with accommodation looking for a tenant or co-tenant to:
        <List styleType="circle" pl={4}>
          <ListItem>
            Create a Listing for their rental properties by uploading Content.
          </ListItem>
          <ListItem>
            Search Listings for people who are seeking to rent accommodation as
            a tenant or co-tenant.
          </ListItem>
        </List>
      </ListItem>
      <ListItem>
        People seeking to rent accommodation to:
        <List styleType="circle" pl={4}>
          <ListItem>
            Create a Listing for themselves by uploading Content.
          </ListItem>
          <ListItem>
            Search for rental properties and get in contact with people who have
            accommodation to rent.
          </ListItem>
        </List>
      </ListItem>
    </List>

    <Text fontSize="1.6rem">
      (collectively, the Services). By accessing, registering on, and/or using
      the Website or Services, you agree to be bound by these Terms and
      Conditions of Use.
    </Text>
    <br />
    <Divider my={4} />
    <br />
    <Heading as="h3" variant="sm" mb={2}>
      1. LISTINGS
    </Heading>

    <Text fontSize="1.6rem">
      <strong>1.1 Users Uploading Listings</strong>
      <br />
      If you upload Content and/or create a Listing:
    </Text>

    <List styleType="disc" pl={4} mb={4} fontSize="1.6rem">
      <ListItem>
        You must ensure that such Content and Listings are true, correct, and
        not duplicated.
      </ListItem>
      <ListItem>
        You must ensure that such Content and Listings are up-to-date at the
        time they are uploaded and are kept up-to-date for the duration they are
        available on the Website.
      </ListItem>
      <ListItem>
        You must remove any Content and Listings as soon as reasonably
        practicable after either:
        <List styleType="circle" pl={4}>
          <ListItem>
            The accommodation the subject of the Listing has been withdrawn from
            rent or after you have filled the vacancy for that accommodation,
            whichever is earlier.
          </ListItem>
          <ListItem>
            The person identified in the Listing that is seeking accommodation
            has found accommodation and no longer needs to seek accommodation or
            no longer needs accommodation for whatever reason, whichever is
            earlier.
          </ListItem>
        </List>
      </ListItem>
      <ListItem>
        You are solely responsible for making your own assessment of any user
        who contacts you in relation to any Listing and their suitability for
        the vacancy the subject of the Listing or the suitability of the
        accommodation (as applicable).
      </ListItem>
      <ListItem>
        You must ensure that any proposed rental agreement between you and
        another person for accommodation abides by any local, state, or federal
        laws relating to the provision or use of rental accommodation, including
        residential tenancy law and local government planning laws.
      </ListItem>
      <ListItem>
        If you use the Services in a way that breaches these Terms and
        Conditions of Use or we deem any Content or Listing on the Website to be
        unacceptable, Roomeyfinder.com may take action to remedy this, including
        but not limited to, amending or deleting the Content or Listing,
        adjusting access to your Account, terminating your Account, or any other
        action that we determine appropriate in our sole and absolute
        discretion.
      </ListItem>
      <ListItem>
        If Roomeyfinder.com determines that any Content or Listing has been
        inactive for 7 days or longer, it may remove that Content or Listing in
        its sole and absolute discretion.
      </ListItem>
    </List>

    <Text fontSize="1.6rem">
      Discretion is granted to Roomeyfinder.com to delete, deactivate, or
      edit any Content or Listings that are duplicated, breach our Terms and
      Conditions, or are found to be inappropriate. Roomeyfinder.com does not
      make any representation or provide any warranty in respect of any user of
      the Website including, without limitation, any representation or warranty
      in respect of the suitability, behavioural characteristics, or
      creditworthiness of a user as a tenant or prospective tenant of any
      accommodation the subject of a Listing.
    </Text>

    <br />
    <Divider my={4} />
    <br />

    <Heading as="h3" variant="sm" mb={2}>
      2. ACCOUNTS
    </Heading>

    <Text fontSize="1.6rem">
      <strong>2.1 Registration</strong>
      <br />
      To upload Content, you must register with Roomeyfinder.com by providing
      certain information including your name, email address, and your mobile
      telephone number (Account).
    </Text>

    <List styleType="disc" pl={4} mb={4} fontSize="1.6rem">
      <ListItem>
        After creating an Account but before uploading Content, you must enter
        an activation code sent by Roomeyfinder.com to your email address.
      </ListItem>
      <ListItem>
        You represent and warrant that you are the account holder for the email
        address provided to Roomeyfinder.com when registering your Account.
      </ListItem>
      <ListItem>
        You must:
        <List styleType="circle" pl={4}>
          <ListItem>
            Be 16 years or older or over the age of majority in the jurisdiction
            from which you access the Website; or
          </ListItem>
          <ListItem>
            If you are under 16 years or under the age of majority in the
            jurisdiction from which you access the Website, have the permission
            or consent of one of your parents or legal guardians to register an
            Account and/or upload Content to the Website and you represent and
            warrant at the time of registering your Account that you are 18
            years or older, over the age of majority in that jurisdiction, or
            otherwise have the permission or consent of one of your parents or
            legal guardians.
          </ListItem>
        </List>
      </ListItem>
      <ListItem>
        You represent and warrant that the information you provide to
        Roomeyfinder.com to open an Account is true and correct. If, at any
        time during the term of your Account, any of that information ceases to
        be true and correct, you undertake to notify Roomeyfinder.com of the
        change to that information as soon as is reasonably practicable.
      </ListItem>
      <ListItem>
        Any personal information you provide to Roomeyfinder.com will be
        treated in accordance with Roomeyfinder.com&apos;s Privacy Policy
        available{" "}
        <a href="https://www.roomeyfinder.com/privacy" target="_blank">
          here
        </a>
        .
      </ListItem>
      <ListItem>
        You may not use another user&apos;s Account or allow anyone else to use
        your Account without Roomeyfinder.com&apos;s express prior written
        permission.
      </ListItem>
      <ListItem>
        You are solely responsible for any activity which occurs on your
        Account.
      </ListItem>
      <ListItem>
        You must keep your Account details, including your password and
        verification details, secure at all times and must immediately notify
        Roomeyfinder.com of any breach, or any suspected breach, of the security
        of or unauthorized access to your Account.
      </ListItem>
    </List>
    <Text fontSize="1.6rem">
      <strong>2.2 Request Account Deletion</strong>
      <br />
      You may delete your account at any time, for any reason, by visiting your
      account settings and locating "Delete Account" at the bottom of the page.
      Once an account is deleted, your personal information and active listings
      will be removed from the website.
    </Text>

    <Text fontSize="1.6rem">
      If you wish to pause your listing but keep your account with us, you may
      do so by simply deactivating your listings from your dashboard.
    </Text>
    <Heading as="h3" fontSize="1.6rem" mb={2}>
      2.3 Termination
    </Heading>
    <Text mb={4}>
      Roomeyfinder.com may, in its absolute discretion, suspend or terminate
      your Account if:
    </Text>
    <List styleType="disc" pl={4} mb={4}>
      <ListItem>
        you breach or violate any term or condition of these Terms and
        Conditions of Use; or
      </ListItem>
      <ListItem>
        in Roomeyfinder.com&apos;s sole opinion, your ongoing use of the Service
        will bring, or may bring, the reputation of Roomeyfinder.com into
        disrepute or cause Roomeyfinder.com to be in breach of an applicable
        law.
      </ListItem>
    </List>
    <br />
    <Divider my={4} />
    <br />
    <Heading as="h3" variant="sm" mb={2}>
      3. WEBSITE AND SERVICES
    </Heading>

    <Heading as="h4" mb={2} fontSize="1.6rem">
      3.1 Use of Website and Services
    </Heading>
    <Text mb={4}>You must not, and must not attempt to:</Text>
    <List styleType="disc" pl={4} mb={4}>
      <ListItem>
        use the Website for any purpose other than for the purpose of offering
        to rent accommodation or seeking to rent accommodation;
      </ListItem>
      <ListItem>
        use the Website or the Services in any way that causes, or is likely to
        cause the Website or access to it to be interrupted, damaged, rendered
        less efficient or in a way that impairs the effectiveness or
        functionality of the Website;
      </ListItem>
      <ListItem>
        authorise any other person to do any act which would, if that act were
        to be done by you, infringe any Intellectual Property Rights or us, our
        licensors or third parties;
      </ListItem>
      <ListItem>
        reverse engineer, decompile, disassemble, modify, translate, or
        otherwise uncover the source code of any software forming part of the
        Website;
      </ListItem>
      <ListItem>
        capture or copy any software on the Website for any reason whatsoever
        (temporary copies for facilitating a technical computing process
        excepted);
      </ListItem>
      <ListItem>
        hack, infiltrate or otherwise do anything which may compromise the
        Website;
      </ListItem>
      <ListItem>
        cause Roomeyfinder.com to lose (in whole or in part) the services of
        Roomeyfinder.com's internet service providers (ISPs) or other suppliers;
      </ListItem>
      <ListItem>
        introduce any computer viruses, macro viruses, trojan horses, worms or
        anything else designed to interfere with, interrupt or disrupt the
        normal operating procedures of a computer or to surreptitiously
        intercept, access without authority or expropriate any system, data or
        personal information;
      </ListItem>
      <ListItem>
        prevent or restrict us from complying with any applicable law, industry
        code or court order;
      </ListItem>
      <ListItem>
        use the Website or any of the Services for any improper or unlawful
        purpose, causing a nuisance or causing the operation of any of the
        Services to be jeopardised or impaired;
      </ListItem>
      <ListItem>
        use the Website or any of the Services to provide, to aid, abet,
        procure, counsel or assist another person to provide, or to encourage,
        solicit or entice the provision of, any services of a sexual nature for
        monetary or non-monetary consideration;
      </ListItem>
      <ListItem>
        use the Website or any of the Services to create, host or transmit any
        defamatory, offensive or obscene material or engage in activities which
        would cause offence to, insult, humiliate or intimidate others on the
        grounds of race, religion, creed, sex or gender, or sexual preference;
      </ListItem>
      <ListItem>
        use the Website or any of the Services to harm, or attempt to harm,
        persons (including persons under the age of 18 years) in any way;
      </ListItem>
      <ListItem>
        use the Website or any of the Services to create, host or transmit any
        material that threatens or encourages bodily harm or the destruction of
        property or would constitute a criminal offence or give rise to civil
        liability;
      </ListItem>
      <ListItem>
        use the Website or any of the Services to create, host or transmit
        material which infringes the Intellectual Property Rights (including
        without restriction copyright, trade mark, patent, trade secret or other
        intellectual property rights) of any other party;
      </ListItem>
      <ListItem>
        use the Website or any of the Services to create, host or transmit
        unsolicited advertising material to other users;
      </ListItem>
      <ListItem>
        use the Website or any of the Services to collect, or attempt to
        collect, personal information about third parties without their
        knowledge or consent or to engage in screen scraping, database scraping
        or any other activity with the purpose of obtaining lists of users or
        other data;
      </ListItem>
      <ListItem>
        use the Website or any of the Services for any activity which adversely
        affects the ability of other people or systems to use the Website or any
        of the Services, or the Internet generally, including the uploading of
        files that contain viruses, corrupted files, or any other similar
        software or programs that may damage the operation of another&apos;s
        computer; or
      </ListItem>
      <ListItem>
        at any time while you are using the Website or any of the Services,
        impersonate any person or entity or use or provide a false name or a
        name that you are not authorised to use.
      </ListItem>
    </List>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      3.2 Access to Website and Services
    </Heading>
    <Text mb={4}>
      Roomeyfinder.com will attempt to make the Website and Services available
      for use 24 hours a day, 7 days a week. However, it will be necessary for
      Roomeyfinder.com to take down the Website and cease providing the Services
      for a period of time for regular maintenance and to make improvements and
      if circumstances beyond Roomeyfinder.com&apos;s control exist, such as
      problems preventing access to internet or web hosting services. In such
      circumstances Roomeyfinder.com will incur no liability to you for such
      interruption or cessation of Services no matter how such liability would
      otherwise arise.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      3.3 No advice
    </Heading>
    <Text mb={4}>
      From time to time, Roomeyfinder.com will make available on the Website
      articles and other material setting out information relevant to seeking
      accommodation or renting accommodation, such as articles relating to
      tenants&apos; rights as tenants (Informative Content). Any Informative
      Content on the Website is of a general nature only and does not consider
      your personal objectives, financial situation or particular needs. You
      should not regard Informative Content as advice and you should seek
      professional legal, property, accounting or other advice for your specific
      circumstances. You should not rely on any Informative Content as the basis
      for taking any legal action, negotiating or entering any agreement, or
      incurring any financial liabilities.
    </Text>

    {/* <Heading as="h4" fontSize="1.6rem" mb={2}>
      3.4 Upgrade Services
    </Heading>
    <Text mb={4}>
      In addition to the free Services, Roomeyfinder.com provides Upgraded Services
      which allow users to contact other users who have Listings within the
      “early-bird period” (the first 14 days from activation). Users of the
      Upgraded Service (provided they are mobile verified) can also access
      mobile numbers where available. (Upgraded Services)
    </Text>
    <Text mb={4}>
      Roomeyfinder.com provides the following packages for Upgraded Services:
    </Text>
    <List styleType="disc" pl={4} mb={4}>
      <ListItem>
        a basic Upgraded Service, which provides access to the Upgraded Services
        for 10 days from and including the date of registration for the Upgraded
        Service;
      </ListItem>
      <ListItem>
        a full Upgraded Service, which provides access to the Upgraded Services
        for 30 days from and including the date of registration for the Upgraded
        Service; and
      </ListItem>
      <ListItem>
        a pro Upgraded Service, which provides access to the Upgraded Services
        for 365 days from and including the date of registration for the
        Upgraded Service.
      </ListItem>
    </List>
    <Text mb={4}>
      If you upgrade to a full Upgraded Service and you do not find suitable
      accommodation from a Listing or a suitable tenant from a Listing for
      available accommodation, you will receive a further 30 days of use of the
      Upgraded Service provided that you:
    </Text>
    <List styleType="disc" pl={4} mb={4}>
      <ListItem>
        have a live Listing for the duration of the term of the full Upgraded
        Service; and
      </ListItem>
      <ListItem>
        have one or more photographs appearing on that Listing.
      </ListItem>
    </List>
    <Text mb={4}>
      All payments for access to Upgraded Services are processed by Stripe or
      Braintree (a PayPal company). Roomeyfinder.com does not store credit card
      details.
    </Text>
    <Text mb={4}>
  Once a payment for access to Upgraded Services is complete, you will get immediate access to the Upgraded Services and Roomeyfinder.com will not refund any such payment under any circumstances including, without limitation, if Roomeyfinder.com terminates your Access to the Website or the Services for breaching these Terms and Conditions of Use.
</Text>

<Text mb={4}>
  Roomeyfinder.com does not guarantee that you will find accommodation to live in if you are searching for accommodation, or find a tenant or co-tenant if you are offering accommodation, by virtue of access to an Upgraded Service.
</Text>

<Text mb={4}>
  To be eligible for the further 30 days of use of the Upgraded Service detailed in clause 3.4(c) above, you must apply for the guarantee within 7 days of the original Upgraded Service expiring.
</Text>
 */}
    <br />
    <Divider my={4} />
    <br />
    <Heading as="h3" variant="sm" mb={2}>
      4. CONTENT
    </Heading>
    <Heading as="h4" fontSize="1.6rem" mb={2}>
      4.1 Uploading of Content
    </Heading>
    <Text mb={4}>
      As part of the Services, the Website allows you to upload Content for
      viewing by other users of the Website as part of a Listing. Each time you
      upload Content to the Website, you confirm your acceptance of, and your
      agreement to be bound by, all the terms and conditions set out in these
      Terms and Conditions of Use. Roomeyfinder.com will not review, vet or
      approve, and is not responsible for reviewing, vetting or approving, the
      Content or any part of the Content, or any material appearing in the
      Content, and it is the sole responsibility of the user uploading the
      Content to ensure that the Content or any part of the Content, or any
      material appearing in the Content, complies with these Terms and
      Conditions of Use.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      4.2 Rights to the Content
    </Heading>
    <Text mb={4}>
      At the time you upload Content, you represent and warrant that:
    </Text>
    <UnorderedList>
      <ListItem>
        you are the owner of all Content and all Intellectual Property Rights in
        and to the Content and all material appearing in the Content, or you
        otherwise have the authorisation, permission or consent of the owner of,
        or any other relevant person to, the Content or any part of it or any
        material appearing in the Content;
      </ListItem>
      <ListItem>
        you have the authorisation, permission or consent of each person
        appearing in the Content for them to appear in the Content and for you
        to submit that Content, make the Content available on the Website and
        otherwise grant the rights to Roomeyfinder.com you grant under these
        Terms and Conditions of Use;
      </ListItem>
      <ListItem>
        the Content or any part of it, or any material appearing in the Content,
        does no infringe the rights, including any Intellectual Property Rights,
        of any third party; and
      </ListItem>
      <ListItem>
        the Content does not contain any material which is offensive,
        defamatory, discriminatory, pornographic, abusive, obscene, or otherwise
        illegal in any jurisdiction anywhere in the world.
      </ListItem>
    </UnorderedList>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      4.3 No endorsement
    </Heading>
    <Text mb={4}>
      Roomeyfinder.com does not endorse any Content or Listing uploaded to the
      Website by you or any user, or any opinion, recommendation or advice
      expressed in the Content or Listing.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      4.4 Ownership
    </Heading>
    <Text mb={4}>
      Roomeyfinder.com acknowledges and agrees that no right, title and interest
      in and to the Content you submit to the Website is transferred to
      Roomeyfinder.com and that it has no rights in respect of that Content
      except those rights granted to it under these Terms and Conditions of Use
      or otherwise in writing by you.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      4.5 Licence
    </Heading>
    <Text mb={4}>
      At the time you upload Content, you grant to Roomeyfinder.com a
      non-exclusive, royalty-free, worldwide, irrevocable, perpetual licence to
      host, cache, store, maintain, use, reproduce, communicate, distribute,
      display, exhibit, perform, publish, broadcast, transmit, modify, prepare
      derivative works of, adapt, reformat, translate or otherwise exploit all
      or any part of the Content on the Website and any other Website which is
      associated with, connected to, or otherwise operated by Roomeyfinder.com
      including, without limitation, websites owned and/or operated by persons
      other than Roomeyfinder.com.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      4.6 Take-down or modification of Content or Listing
    </Heading>
    <Text mb={4}>
      Roomeyfinder.com, in its sole and absolute discretion, may edit, modify,
      block or delete any Content or any Listing, or any comments or messages
      made on the Website in respect of a Listing, if Roomeyfinder.com
      determines that any of the preceding material contravenes or is likely to
      contravene these Terms and Conditions of Use.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      4.7 Release
    </Heading>
    <Text mb={4}>
      You forever release Roomeyfinder.com, and its directors, officers,
      employees, agents and contractors, for any and all claims, rights,
      demands, actions or suits which you have, may have or would have had, in
      connection with Roomeyfinder.com&apos;s exploitation of the Content or the
      exploitation of the Content by any of Roomeyfinder.com or its directors,
      officers, employees, agents or contractors and whether that claim arose or
      arises in contract, tort (including, without limitation, negligence),
      under statute or otherwise.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      4.8 Waiver
    </Heading>
    <Text mb={4}>
      You hereby consent to all acts or omissions by Roomeyfinder.com, its
      licensees or others authorised by it, or its successors in title, which
      would otherwise constitute an infringement of any moral rights you have,
      or may have, in the Content or any part of it, or any material appearing
      in the Content, whatsoever and wheresoever subsisting throughout the
      world. You acknowledge that such consent is provided genuinely and
      includes consent for Roomeyfinder.com, or any other person authorised by
      Roomeyfinder.com, to materially alter, modify, add to and in any way
      change the Content or any part of it, or any material appearing in the
      Content, and deal with the Content or any part of it, or any material
      appearing in the Content, without identifying you or any third person as
      the author of the Content or any part of the Content, or any material
      appearing in the Content. You warrant that any third party who has
      acquired any moral rights in the Content or any part of it, or any
      material appearing in the Content, has also waived his or her moral rights
      or consented to all acts or omissions (as applicable) on terms similar to
      the terms set out in these Terms and Conditions of Use.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      4.9 Access to and use of Messages, other Content, and correspondence by
      Roomeyfinder.com
    </Heading>
    <Text mb={4}>
      Roomeyfinder.com may access, read, and permanently store any messages sent
      by you to another user of the Website using the Website&apos;s messaging
      function, or sent to Roomeyfinder.com using the Website&apos;s messaging
      function, for the purposes of protecting the safety and security of the
      Website and its users. The messages sent by you may be used as the basis
      for removing your Content from the Website, terminating your Account, or
      reporting your behaviour to any government law enforcement authorities.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      4.10 Collecting reviews
    </Heading>
    <Text mb={4}>
      Roomeyfinder may ask you to leave a review at the end of your search. By
      leaving a review, you agree that your review is genuine and based solely
      on your experience. You consent to have Roomeyfinder publish and display
      your review on the website, which may or may not include your first name,
      last initial, and city. We may freely use and transfer the content and
      disclose the content to third parties.
    </Text>

    <Text mb={4}>
      Roomeyfinder members must not, and must not allow third-party members to
      publish reviews on the website that:
    </Text>
    <UnorderedList>
      <ListItem>are of a marketing nature or have marketing purposes,</ListItem>
      <ListItem>
        are unlawful, deceptive, misleading, fraudulent, threatening, abusive,
        harassing, defamatory, obscene, pornographic, have sexist, political or
        racial character, and violate other people's rights, including any
        intellectual property rights, rights of privacy and rights of publicity,
      </ListItem>
      <ListItem>Violate these Terms and Conditions of Use</ListItem>
    </UnorderedList>
    <br />
    <Divider my={4} />
    <br />
    <Heading as="h3" variant="sm" mb={2}>
      5. TENANCY
    </Heading>
    <Text mb={4}>Roomeyfinder.com:</Text>
    <UnorderedList mt={2} mb={4}>
      <ListItem>
        is not a party to any contract, arrangement, or understanding between
        users relating to the renting of accommodation by one user to another
        user or users;
      </ListItem>
      <ListItem>
        does not act, or purport to act, for or on behalf of, and is not the
        agent for, any user of the Website;
      </ListItem>
      <ListItem>
        will not get involved in any dispute between users in relation to the
        content of any Listing or any contract, arrangement, or understanding
        between users relating to the renting of accommodation by one user to
        another user or users;
      </ListItem>
      <ListItem>
        does not collect rent or bond or facilitate the payment of rent or bond
        between users; or
      </ListItem>
      <ListItem>
        may make available data relating to accommodation rental prices based on
        historical data collected from Listings but does not set, or provide any
        parameters within which to set, the price at which accommodation is
        offered for rent in any Listing.
      </ListItem>
    </UnorderedList>
    <br />
    <Divider my={4} />
    <br />
    <Heading as="h3" variant="sm" mb={2}>
      6. INTELLECTUAL PROPERTY RIGHTS IN WEBSITE
    </Heading>
    <Text mb={4}>
      You acknowledge and agree that all rights in the Website and all material
      comprised in the Website (including, but not limited to, Intellectual
      Property Rights, text, images, web pages, sound, software (including code,
      interface, and website structure) and video, and the look and feel,
      design, and compilation thereof) (Website Content), excluding the Content,
      are owned by Roomeyfinder.com or the supplier of the relevant material.
      You acknowledge and agree that you are permitted to use the Website
      Content only as set out in these Terms and Conditions of Use or as
      otherwise expressly authorised in writing by Roomeyfinder.com, and that
      you may not otherwise copy, reproduce, transmit, publicly perform,
      distribute, commercially exploit, adapt, translate, modify, bundle, merge,
      share or make available to any person, or create derivative works of the
      Website Content. Subject to your compliance with these Terms and
      Conditions of Use, you may reproduce or communicate any Website Content
      appearing in any articles or blog posts appearing on the Website that have
      been posted by Roomeyfinder.com as long as you credit Roomeyfinder.com as
      the source of any such content and provide a link to the Website when
      reproducing or communicating such content.
    </Text>

    <Heading as="h3" variant="sm" mb={2}>
      7. TAKE-DOWN NOTICE
    </Heading>
    <Text mb={4}>
      Roomeyfinder.com operates on a “notice and takedown basis”. If you have
      any objections or complaints to any content or material appearing on the
      Website, or if you believe that content or material posted on the Website
      infringes your copyright, please contact us immediately at{" "}
      <Text as="a" href="mailto:support@roomeyfinder.com">
        support@roomeyfinder.com
      </Text>
    </Text>
    <br />
    <Divider my={4} />
    <br />
    <Heading as="h3" variant="sm" mb={2}>
      8. LIMITATION OF LIABILITY
    </Heading>
    <Heading as="h4" fontSize="1.6rem" mb={2}>
      8.1 Website and Services
    </Heading>
    <Text mb={4}>
      Use of the Website and the Service is at your own risk. Both are provided
      on an “as is” basis, and Roomeyfinder.com makes no representation, and
      gives no warranty or guarantee (to the extent permitted by law), as to its
      function or operation, or that it is free from any defects.
    </Text>
    <Heading as="h4" fontSize="1.6rem" mb={2}>
      8.2 Competition and Consumer Act
    </Heading>
    <Text mb={4}>
      If the Competition and Consumer Act 2010 (Cth) or any other Act
      (including, without limitation, equivalent country, state or territory
      legislation) implies into these Terms and Conditions of Use any term, or
      otherwise provides that any guarantee applies in relation to the services
      supplied under or in connection with these Terms and Conditions of Use,
      which, or the effect of which, cannot be excluded or modified, and if we
      breach such term, condition, warranty or guarantee, then
      Roomeyfinder.com's liability (if permitted by the relevant Act) is
      limited, at Roomeyfinder.com's election, to the re-supplying of the
      relevant services, a refund of the cost of having those services supplied,
      or payment of the cost of having the services re-supplied.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      8.3 Limitation
    </Heading>
    <Text mb={4}>
      Subject to clause 8.1 above, and to the extent permitted by law,
      Roomeyfinder.com shall not have any liability whatsoever (whether in
      contract, tort including negligence, pursuant to statute or otherwise) to
      you for any direct or indirect loss or damage of whatsoever kind you
      suffer or incur as a result of, or in any way in connection with, your use
      of the Website or the Services, or which otherwise arises in connection
      with your dealings with Roomeyfinder.com.
    </Text>
    <br />
    <Divider my={4} />
    <br />
    <Heading as="h3" variant="sm" mb={2}>
      9. INDEMNITY
    </Heading>
    <Text mb={4}>
      You indemnify Roomeyfinder.com and its directors, officers, employees,
      agents and contractors, and agree to keep each of them fully indemnified,
      from and against any loss, claim, or damages (including, without
      limitation, any costs (including legal costs) on a full indemnity basis)
      suffered, incurred, or brought against any one or more of them by a third
      party as a result of any breach by you of these Terms and Conditions of
      Use or arising out of any use by you of the Website or the Services,
      including but not limited to the following circumstances:
      <UnorderedList mt={2} mb={4}>
        <ListItem>
          any loss, claim or damages suffered or made by any third party arising
          out of or in relation to any information, material or Content that you
          post or communicate to the Website or us whether via a social
          networking site or otherwise;
        </ListItem>
        <ListItem>
          any loss, claim or damages suffered by a third party as a result of
          any infringement of any rights of a third party including, without
          limitation, Intellectual Property Rights in any information, material
          or Content that you upload to the Website or provide to
          Roomeyfinder.com;
        </ListItem>
        <ListItem>
          any loss, claim or damages suffered by a third party as a result of
          any act or default committed by you and which is directly or
          indirectly related to any information, material or Content that you or
          another person upload to the Website or provide to Roomeyfinder.com or
          your use of the Website; or
        </ListItem>
        <ListItem>
          any loss, claim or damages suffered or alleged by a third party as a
          result (direct, indirect or otherwise) of any act, omission, failure
          or default by you or by anyone for whom you are legally responsible
          (vicariously or otherwise) in any way connected with your access to
          the Website or your Account for or use of any of the Services.
        </ListItem>
      </UnorderedList>
    </Text>
    <br />
    <Divider my={4} />
    <br />
    <Heading as="h3" variant="sm" mb={2}>
      10. THIRD PARTY SITES
    </Heading>
    <Text mb={4}>
      This Website may contain links to other websites or resources operated by
      parties other than Roomeyfinder.com. References to any products, services,
      processes, trade names, trademarks, or other information of third parties
      does not imply or constitute an endorsement, sponsorship, association with
      or recommendation by Roomeyfinder.com. Links to third party sites not
      operated by Roomeyfinder.com are provided to you for your convenience
      and/or reference only. You acknowledge and agree that Roomeyfinder.com
      does not control such sites and Roomeyfinder.com is not responsible for
      the content on those sites or the privacy or other practices of such
      sites. You further acknowledge and agree that Roomeyfinder.com shall not
      be responsible or liable, directly or indirectly, for any damage, loss, or
      cost whatsoever caused or alleged to be caused by or in connection with
      use of or reliance on any such sites or the contents, goods or services
      available on or through any such site.
    </Text>
    <br />
    <Divider my={4} />
    <br />
    <Heading as="h3" variant="sm" mb={2}>
      11. GENERAL
    </Heading>
    <Heading as="h4" fontSize="1.6rem" mb={2}>
      11.1 Relationship
    </Heading>
    <Text mb={4}>
      Neither these Terms and Conditions nor use of the Website and/or the
      Services create any partnership, joint venture, or agency relationship
      between Roomeyfinder.com and users or between users. You must not enter
      into any agreements or incur any liabilities on behalf of Roomeyfinder.com
      or any other user without that party&apos;s prior written consent and must
      not represent that it has any authority to do so.
    </Text>
    <Heading as="h4" fontSize="1.6rem" mb={2}>
      11.2 Entire Assignment
    </Heading>
    <Text mb={4}>
      These Terms and Conditions of Use constitute the entire agreement and
      understanding between the parties with respect to its subject matter and
      supersede all prior or contemporaneous oral or written agreements,
      undertakings, or representations between the parties concerning such
      subject matter.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      11.3 Severability
    </Heading>
    <Text mb={4}>
      If any provision of these Terms and Conditions of Use is void, voidable,
      unenforceable, or illegal, that provision will be read down so as to be
      valid and enforceable or, alternatively, will be severed from these Terms
      and Conditions of Use. The severance of any provision in accordance with
      this clause will not affect the validity or effectiveness of the remaining
      provisions of these Terms and Conditions of Use.
    </Text>

    <Heading as="h4" fontSize="1.6rem" mb={2}>
      11.4 Governing law
    </Heading>
    <Text mb={4}>
      The interpretation, construction, and effect of these Terms and Conditions
      of Use shall be governed and construed in all respects in accordance with
      the laws of Nigeria, and the parties submit to the jurisdiction of the
      Courts exercising jurisdiction in Nigeria.
    </Text>
  </Box>
)

export default Page
