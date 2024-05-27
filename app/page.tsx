'use client';
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Link,
    Text,
} from '@chakra-ui/react';
import PublishAdClicker from './_components/PublishAdClicker';
import FeatureCard from './_components/FeatureCard';
import ChatIcon from './_assets/SVG/ChatIcon';
import Handlens from './_assets/SVG/Handlens';
import PeopleGroup from './_assets/SVG/PeopleGroup';
import {
    LegacyRef,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import { SearchContext } from './_providers/SearchProvider';
import ListingsGridLayout from './_components/ListingsGridLayout';
import RoomListingCard from './_components/RoomListingCard';
import { Listing } from './_types/Listings';
import { AuthContext } from './_providers/AuthContext';
import Empty from './_components/Empty';
import { RoomListingCardSkeleton } from './_components/Skeletons/ListingCardSkeleton';
import Image from 'next/image';
import heroImage from './_assets/images/hero-image.jpg';
import ForRent from './_assets/SVG/ForRent';

export default function Home() {
    const { roomies, rooms } = useContext(SearchContext);
    return (
        <>
            <Hero />
            <FeaturesSection />
            <ListingsSection />
        </>
    );
}

function Hero() {
    return (
        <>
            <Flex
                minH='40dvh'
                bg='white'
                justifyContent='space-between'
                alignItems='center'
                flexDir={{ base: 'column', md: 'row' }}
                px={{ base: '3rem', md: '8rem', lg: '8rem' }}
                py={{ base: '5rem', md: '10rem' }}>
                <Box as='main'>
                    <Heading
                        as='h1'
                        variant='xl'
                        mb='2.5rem'
                        fontSize={{ base: '4rem', md: '7rem' }}>
                        Find Roomies & Rooms.
                    </Heading>

                    <Text
                        fontSize={{ base: '1.6rem', md: '2rem' }}
                        color='gray.main'
                        mb='4.9rem'
                        lineHeight='2.2rem'>
                        Whether you&apos;re a student searching for a cozy
                        apartment, a professional seeking a shared living space,
                        or a homeowner looking for a compatible roommate,
                        we&apos;ve got you covered.
                    </Text>
                    <Button
                        px='3rem'
                        py='1.5rem'
                        as={Link}
                        href='/signup'
                        variant={'brand'}
                        fontSize='2rem'
                        width='fit-content'
                        fontWeight='700'>
                        Get Started
                    </Button>
                </Box>
                <Box maxW={{ base: '100vw', md: '50vw', lg: '50vw' }}>
                    <Image
                        src={heroImage}
                        alt='Hero image for Roomeyfinder. Two ladies sitting on a blue couch having coffee'
                    />
                </Box>
            </Flex>
        </>
    );
}

function FeaturesSection() {
    return (
        <>
            <Flex
                minH='40dvh'
                bg='#f5f9ff'
                textAlign='center'
                justifyContent='center'
                w='100%'
                px={{ base: '3rem', md: '8rem', lg: '8rem' }}
                py={{ base: '5rem', md: '8rem' }}>
                <Box as='section'>
                    <Heading
                        as='h1'
                        variant='md'
                        mb='3rem'
                        fontSize={{ base: '3rem', md: '5rem' }}>
                        What Roomeyfinder offers
                    </Heading>
                    <Text
                        fontSize={{ base: '1.7rem', md: '2.6rem' }}
                        mb='5rem'
                        maxW='80rem'
                        mx='auto'
                        lineHeight='3rem'>
                        Find your perfect roommate effortlessly.
                    </Text>
                    <Flex
                        as='ul'
                        flexWrap='wrap'
                        gap='3rem'
                        w='full'
                        justifyContent='center'>
                        <FeatureCard
                            iconChild={<ForRent />}
                            heading='List your space'
                            body='Roomeyfinder helps you effortlessly project and list your available living spaces. Our platform serves as a dedicated avenue to showcase your space and connect with individuals searching for their ideal space.'
                        />
                        <FeatureCard
                            iconChild={<Handlens />}
                            heading='Find a new space'
                            body=' Our platform is designed to provide a seamless avenue for discovering spaces that match your preferences. We provide access to a detailed selection of spaces  to help you make the best choice.'
                        />
                        <FeatureCard
                            iconChild={<ChatIcon />}
                            heading='Message potential roommates'
                            body='Message and get in touch with potential roommates in order to get to know each other  by using the Roomeyfinder messaging system.'
                        />
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}

function ListingsSection() {
    const { isAuthorized } = useContext(AuthContext);
    const { rooms, hasMoreRooms, loadMoreRooms, loadingRooms, search, focus } =
        useContext(SearchContext);

    const roomsSectionRef = useRef<HTMLDivElement | null>(null);
    const allListingsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (focus === 'rooms')
            roomsSectionRef.current?.firstElementChild?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
    }, [focus]);

    const filteredRoomsBySearch = useMemo(() => {
        if (!search) return rooms;
        else {
            const isMatch = (obj: { [x: string]: any }) =>
                JSON.stringify(Object.values(obj))
                    .toLowerCase()
                    .includes(search.toLowerCase());
            const roomsFiltered = rooms.filter((room) => isMatch(room));
            return roomsFiltered;
        }
    }, [rooms, search]);

    return (
        <>
            <Box ref={allListingsRef}>
                <ListSectionContainer sectionRef={roomsSectionRef}>
                    <Heading pl='1.2rem' variant='md'>
                        Latest Rooms
                    </Heading>
                    <RoomsList
                        rooms={filteredRoomsBySearch}
                        allowFavoriting={isAuthorized}
                        loading={loadingRooms}
                        emptyTextValue={
                            <>
                                No rooms found
                                {search && <Text as='b'> {search}</Text>}
                            </>
                        }
                    />
                    {rooms.length > 0 && (
                        <ContinueExploring
                            text='rooms'
                            onClick={() => loadMoreRooms()}
                            show={hasMoreRooms}
                        />
                    )}
                </ListSectionContainer>
            </Box>
        </>
    );
}

function ListSectionContainer({
    children,
    sectionRef,
}: {
    children: ReactNode | ReactNode[];
    sectionRef?: LegacyRef<HTMLDivElement>;
}) {
    return (
        <Box
            w={{ base: '95dvw', md: 'full' }}
            maxW={{ md: '84%' }}
            mx='auto'
            display='flex'
            flexDir='column'
            gap='3rem'
            py={{ base: '3rem', md: '6rem' }}
            ref={sectionRef}>
            {children}
        </Box>
    );
}

function RoomsList({
    rooms,
    allowFavoriting,
    loading,
    emptyTextValue,
}: {
    rooms: Listing[];
    allowFavoriting: boolean;
    loading: boolean;
    emptyTextValue: ReactNode;
}) {
    if (loading)
        return (
            <ListingsGridLayout
                list={new Array(12).fill(1).map((_, idx) => (
                    <RoomListingCardSkeleton key={idx} />
                ))}
            />
        );
    if (rooms.length === 0 && !loading)
        return <Empty heading='Oops' text={emptyTextValue} />;
    return (
        <>
            <ListingsGridLayout
                list={rooms.map((room) => (
                    <RoomListingCard
                        key={room._id}
                        ownersName={room.owner?.firstName as string}
                        ownersOccupation={room.owner?.occupation as string}
                        city={room.city as string}
                        rentAmount={room.rentAmount as number}
                        rentDuration={room.rentDuration as any}
                        title={room.lookingFor as string}
                        images={room.photos as []}
                        showFavoriteButton={allowFavoriting}
                        listingId={room._id as string}
                    />
                ))}></ListingsGridLayout>
        </>
    );
}

function ContinueExploring({
    text,
    onClick,
    show,
}: {
    text: ReactNode;
    onClick: () => void;
    show: boolean;
}) {
    if (!show) return null;
    return (
        <Text
            color={{ base: 'black', md: 'brand.main' }}
            fontWeight={{ base: '600', md: '400' }}
            fontSize={{ base: '1.6rem', md: '1.9rem' }}
            display='flex'
            flexDir={{ base: 'column', md: 'row' }}
            justifyContent={{ base: 'center', md: 'start' }}
            alignItems={{ base: 'center', md: 'baseline' }}
            gap='1.6rem'
            p='0'
            h='unset'>
            Continue exploring {text}
            <Button
                onClick={onClick}
                fontSize={{ base: '1.4rem', md: '1.6rem' }}
                variant='brand-secondary'
                bgColor={{ md: 'transparent !important' }}
                color={{ md: 'gray.main !important' }}
                fontWeight={{ md: '400' }}
                padding={{ md: '0' }}
                _hover={{
                    md: {
                        bg: 'transparent',
                        color: 'black',
                        textDecor: 'underline',
                    },
                }}
                _active={{ bg: 'transparent' }}>
                Show more
            </Button>
        </Text>
    );
}
