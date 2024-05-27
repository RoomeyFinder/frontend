import { Flex } from '@chakra-ui/react';
import AppLogo from './Logo';
import Navigation from './Navigation/Navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppHeader() {
    const pathname = usePathname();
    return (
        <Flex
            data-testid='header'
            as='header'
            position='sticky'
            zIndex='150'
            top='0'
            h='9dvh'
            minH='8rem'
            justifyContent={{ base: 'space-between', '2xl': 'space-around' }}
            px={{ base: '5.5%', md: '5.5%' }}
            // border='1px solid'
            // borderColor='white.100'
            boxShadow='1px 1px 3px 0px rgba(0,0,0,0.3);'
            bg='white.main'>
            <Flex href='/' as={Link}>
                <AppLogo showTextLogoAlways={pathname !== '/'} />
            </Flex>
            <Navigation />
        </Flex>
    );
}
