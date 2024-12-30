import { MetadataRoute } from 'next';

import citiesInNigeria from './_data/citiesInNigeria.json';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://roomeyfinder.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://roomeyfinder.com/about',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://roomeyfinder.com/contact',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://roomeyfinder.com/login',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://roomeyfinder.com/signup',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://roomeyfinder.com/terms-and-conditions',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://roomeyfinder.com/privacy',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://roomeyfinder.com/ads',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        ...Object.keys(citiesInNigeria).map((city) => ({
            url: `https://roomeyfinder.com/${city}`,
            lastModified: new Date(Date.now()),
            changeFrequency: 'yearly' as any,
            priority: 1,
        })),
    ];
}
