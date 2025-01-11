import React from 'react';
import { Body, Container, Head, Heading, Hr, Html, Preview, Tailwind } from '@react-email/components';
import { OrderInformation } from '@/email/components/OrderInformation';

type OrderHistoryEmailProps = {
    orders: {
        id: string,
        createdAt: Date,
        pricePaidInCents: number,
        downloadVerificationId: string,
        product: {
            name: string,
            imagePath: string,
            description: string,
        },
    }[]
}

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 10000,
            downloadVerificationId: crypto.randomUUID(),
            product: {
                name: 'Test product name 1',
                imagePath: '/products/06c17d84-4c30-4ab0-b930-bb0796c035ec-ppp.jpeg',
                description: 'Test description 1',
            },
        },
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 50000,
            downloadVerificationId: crypto.randomUUID(),
            product: {
                name: 'Test product name 2',
                imagePath: '/products/06c17d84-4c30-4ab0-b930-bb0796c035ec-ppp.jpeg',
                description: 'Test description 2',
            },
        },
    ]
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({orders}: OrderHistoryEmailProps) {
    return (
        <Html>
            <Preview>
                Order History & Downloads
            </Preview>
            <Tailwind>
                <Head/>
                <Body className={'font-sans bg-white'}>
                    <Container className={'max-w-xl'}>
                        <Heading>Order History</Heading>
                        {orders.map((order, index) => (
                            <React.Fragment key={order.id}>
                                <OrderInformation
                                    order={order}
                                    product={order.product}
                                    downloadVerificationId={order.downloadVerificationId}/>
                                {index < orders.length - 1 && <Hr/>}
                            </React.Fragment>
                        ))}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}