import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '@prisma/client';
import db from '@/db/db';
import { cache } from '@/lib/cache';
import { Button } from '@/components/ui/button';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';

// function getMostPopularProducts() {
//     return db.product.findMany({
//         where: {isAvailableForPurchase: true},
//         orderBy: {orders: {_count: 'desc'}},
//         take: 6
//     });
// }

const getMostPopularProducts = cache(() => {
        return db.product.findMany({
            where: {isAvailableForPurchase: true},
            orderBy: {orders: {_count: 'desc'}},
            take: 6
        });
    },
    ['/', 'getMostPopularProducts'],
    {revalidate: 60 * 60 * 24}
);

const getNewestProducts = cache(() => {
        return db.product.findMany({
            where: {isAvailableForPurchase: true},
            orderBy: {createdAt: 'desc'},
            take: 6
        });
    },
    ['/', 'getNewestProducts'],
);

export default function HomePage() {
    return (
        <main className={'space-y-12'}>
            <ProductGridSection productsFetcher={getMostPopularProducts} title={'Most Popular'}/>
            <ProductGridSection productsFetcher={getNewestProducts} title={'Newest'}/>
        </main>
    );
}

type ProductGridSectionProps = {
    productsFetcher: () => Promise<Product[]>,
    title: string,
};

function ProductGridSection({productsFetcher, title}: ProductGridSectionProps) {
    return (
        <div className={'space-y-4'}>
            <div className={'flex gap-4'}>
                <h2 className={'text-3xl font-bold'}>{title}</h2>
                <Button asChild variant={'outline'}>
                    <Link href={'/products'} className={'space-x-2'}>
                        <span>View All</span>
                        <ArrowRight className={'size-4'}/>
                    </Link>
                </Button>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                <Suspense fallback={
                    <>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                        <ProductCardSkeleton/>
                    </>
                }>
                    <ProductsSuspense productsFetcher={productsFetcher}/>
                </Suspense>
            </div>
        </div>
    );
}

async function ProductsSuspense({productsFetcher}: { productsFetcher: () => Promise<Product[]> }) {
    return (await productsFetcher()).map(product => (
        <ProductCard key={product.id} {...product}/>
    ));
}
