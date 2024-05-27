import {
    Avatar,
    Box,
    Button,
    ButtonProps,
    Flex,
    Heading,
    Image,
    Spinner,
    Text,
} from '@chakra-ui/react';
import FavouriteIcon from '../_assets/SVG/Favourite';
import imgOne from '../_assets/images/sample.png';
import ListingCardImageCarousel from './ListingCardImageCarousel';
import DotSeparator from './DotSeparator';
import { rentDurationMapping } from '../_utils';
import { Photo } from '../_types/User';
import { useCallback, useContext, useMemo, useState } from 'react';
import { FavoriteType } from '../_types/Favorites';
import useAxios from '../_hooks/useAxios';
import { FavoritesContext } from '../_providers/FavoritesProvider';
import useAppToast from '../_hooks/useAppToast';
import { Listing } from '../_types/Listings';
import { useRouter } from 'next/navigation';
import { AuthModalContext } from '../_providers/AuthModalProvider';
import { AuthContext } from '../_providers/AuthContext';

export default function RoomListingCard({
    variant,
    showFavoriteButton = false,
    ownersName,
    ownersOccupation,
    // city,
    rentAmount,
    rentDuration,
    images,
    listingId,
}: {
    variant?: 'outlined' | 'default';
    showFavoriteButton?: boolean;
    ownersName: string;
    ownersOccupation: string;
    city: string;
    rentAmount: number;
    rentDuration: Listing['rentDuration'];
    title: string;
    images: Photo[];
    listingId: string;
}) {
    const router = useRouter();
    const { token } = useContext(AuthContext);
    const { open: showAuthModal } = useContext(AuthModalContext);

    return (
        <Flex
            onClick={() =>
                token ? router.push(`/ads/${listingId}`) : showAuthModal()
            }
            w='95dvw'
            padding={variant === 'outlined' ? '1rem' : '0'}
            maxW={{ base: '32rem', sm: '28.3rem' }}
            alignItems='start'
            flexDir='column'
            gap='.5rem'
            pos='relative'
            border={variant === 'outlined' ? '1px solid #7070704D' : ''}
            borderRadius='1.2rem'
            background='transparent'
            cursor='pointer'>
            {showFavoriteButton && (
                <FavouriteButton
                    color='white'
                    listingId={listingId}
                    type={FavoriteType.LISTING}
                />
            )}
            <Box w='full' pos='relative'>
                <ListingCardImageCarousel
                    slides={images}
                    swiperSlideContent={({ slide }) => (
                        <Image
                            key={slide.secure_url}
                            src={slide.secure_url}
                            w='100%'
                            h='100%'
                            minH='27.7rem'
                            rounded='1.2rem'
                            alt=''
                        />
                    )}
                />
            </Box>
            <Box p='.5rem' roundedBottom='1.2rem'>
                <OwnersInfo ownersName={ownersName} />
                <AboutSection
                    rentAmount={rentAmount}
                    rentDuration={rentDuration}
                    title={
                        'Single Bedroom in Beautiful Mbuoba for lease just testing'
                    }
                    ownersOccupation={ownersOccupation}
                    location={'Port Harcourt'}
                    apartmentType={'4 Rooms'}
                />
            </Box>
        </Flex>
    );
}

export function FavouriteButton({
    color,
    type,
    listingId,
    buttonProps = {},
    useConfirmation = true,
}: {
    color?: string;
    listingId: string;
    type: FavoriteType;
    buttonProps?: ButtonProps;
    useConfirmation?: boolean;
}) {
    const toast = useAppToast();
    const { addNewFavorite, favorites, deleteSingleFavorite } =
        useContext(FavoritesContext);
    const { fetchData } = useAxios();
    const favorite = useMemo(
        () => favorites?.find((it) => it.doc?._id === listingId),
        [favorites, listingId]
    );
    const isFavorite = useMemo(() => Boolean(favorite), [favorite]);
    const [loading, setLoading] = useState(false);
    const handleAddFavorite = useCallback(async () => {
        toast.closeAll();
        setLoading(true);
        const body = {
            doc: listingId,
            type,
        };
        const res = await fetchData({
            url: '/favorites/me',
            method: 'post',
            body,
        });
        if (res.statusCode === 201) {
            addNewFavorite(res.favorite);
        } else
            toast({
                status: 'error',
                title: res.message || 'Something went wrong',
            });
        setLoading(false);
    }, [type, fetchData, toast, addNewFavorite, listingId]);

    const handleRemoveFavorite = useCallback(async () => {
        if (!favorite) return;
        toast.closeAll();
        setLoading(true);
        const res = await fetchData({
            url: `/favorites/${favorite?._id}`,
            method: 'delete',
        });
        if (res.statusCode === 200) deleteSingleFavorite(res.favorite);
        else
            toast({
                status: 'error',
                title: res.message || 'Something went wrong',
            });
        setLoading(false);
    }, [fetchData, favorite, deleteSingleFavorite, toast]);

    const getChildren = useCallback(
        () =>
            loading ? (
                <Spinner color='brand.main' />
            ) : (
                <FavouriteIcon isFilled={isFavorite} />
            ),
        [loading, isFavorite]
    );
    const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
    return (
        <Box
            onClick={
                !isFavorite
                    ? handleAddFavorite
                    : () =>
                          useConfirmation
                              ? setShowRemoveConfirmation(true)
                              : handleRemoveFavorite()
            }
            as='button'
            pos='absolute'
            color={color || 'inherit'}
            top='5%'
            zIndex={'120'}
            right='8%'
            {...buttonProps}>
            {getChildren()}
            <Box
                display={showRemoveConfirmation ? 'block' : 'none'}
                pos='absolute'
                zIndex='130'
                top='50%'
                right='100%'
                bg='white'
                rounded='1.2rem'
                p='1.2rem'
                fontSize='1.6rem'
                textAlign='center'
                w='95dvw'
                maxW='22rem'
                fontWeight='600'>
                <Text as='h6' color='black' mb='1.5rem'>
                    Are you sure you want to remove this favorite?
                </Text>
                <Flex justifyContent='center' alignItems='center' gap='1.5rem'>
                    <Text
                        role='button'
                        py='.8rem'
                        px='1.5rem'
                        rounded='1.2rem'
                        color='red.main'
                        _hover={{ bg: 'red.main', color: 'white' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite();
                            setShowRemoveConfirmation(false);
                        }}>
                        Remove
                    </Text>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowRemoveConfirmation(false);
                        }}
                        as='p'
                        role='button'
                        py='1rem'
                        variant='brand-secondary'>
                        Cancel
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}

function OwnersInfo({ ownersName }: { ownersName: string }) {
    return (
        <Flex gap='.8rem' alignItems='center'>
            <Avatar w={25} h={25} src={imgOne.src} />
            <Heading
                as='h6'
                fontSize='1.6rem'
                fontWeight='normal'
                lineHeight='1.6rem'>
                Stay with {ownersName}
            </Heading>
        </Flex>
    );
}

function AboutSection({
    title,
    ownersOccupation,
    location,
    apartmentType,
    rentAmount,
    rentDuration,
}: {
    title: string;
    ownersOccupation: string;
    location: string;
    apartmentType: string;
    rentDuration: Listing['rentDuration'];
    rentAmount: number;
}) {
    return (
        <Flex flexDir='column' textAlign='left' gap='.5rem'>
            <Heading
                noOfLines={1}
                as='h6'
                fontSize='1.6rem'
                lineHeight='1.8rem'>
                {title}
            </Heading>
            <Text
                fontSize='1.6rem'
                lineHeight='1.8rem'
                color='gray.main'
                // noOfLines={1}
                display='flex'
                gap='1rem'
                alignItems='center'>
                <Text as='span' whiteSpace='nowrap'>
                    {apartmentType}
                </Text>

                <DotSeparator backgroundColor='gray.100' w='.4rem' h='.4rem' />
                <Text as='span'>{location}</Text>
            </Text>
            <Text as='b' fontSize='1.6rem' lineHeight='1.8rem'>
                ₦{rentAmount.toLocaleString('en-us')}/
                {
                    rentDurationMapping[
                        (rentDuration || '') as keyof typeof rentDurationMapping
                    ]
                }
            </Text>
        </Flex>
    );
}
