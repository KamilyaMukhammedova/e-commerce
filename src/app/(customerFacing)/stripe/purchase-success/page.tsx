import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';
import db from '@/db/db';
import { formatCurrency } from '@/lib/formatters';
import { Button } from '@/components/ui/button';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchaseSuccessPage({searchParams}: { searchParams: { payment_intent: string } }) {
    const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent);

    if (paymentIntent.metadata.productId === null) return notFound();

    const product = await db.product.findUnique({where: {id: paymentIntent.metadata.productId}});

    if (product === null) return notFound();

    const isSuccess = paymentIntent.status = 'succeeded';

    return (
        <div className={'max-w-5xl mx-auto w-full space-y-8'}>
            <div className={'font-bold text-4xl'}>{isSuccess ? 'Success' : 'Error'}</div>
            <div className={'flex gap-4 items-center'}>
                <div className={'aspect-video flex-shrink-0 w-1/3 relative'}>
                    <Image src={product.imagePath} alt={product.name} fill={true} className={'object-cover'}/>
                </div>
                <div>
                    <div className={'text-lg'}>{formatCurrency(product.priceInCents / 100)}</div>
                    <h1 className={'text-3xl font-bold'}>{product.name}</h1>
                    <div className={'text-muted-foreground line-clamp-3'}>{product.description}</div>
                    <Button size={'lg'} asChild={true} className={'mt-4'}>
                        {isSuccess ?
                            <a href={`/products/download/${(await createDownloadVerfication(product.id))}`}>Download</a> :
                            <Link href={`/products/${product.id}/purchase`}>Try again</Link>
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
}

async function createDownloadVerfication(productId: string) {
    return (await db.downloadVerification.create({
        data: {
            productId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 *24),
        }
    })).id;
}