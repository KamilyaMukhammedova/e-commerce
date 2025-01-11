'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { emailOrderHistory } from '@/actions/orders';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MyOrdersPage() {
    const [data, action] = useFormState(emailOrderHistory, {});

    return (
        <form className={'mx-auto max-w-2xl'} action={action}>
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>
                        Enter your email and we will send you your order history and download links.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={'space-y-2'}>
                        <Label htmlFor={'email'}>Email</Label>
                        <Input id={'email'} name={'email'} required={true} type={'email'}/>
                        {data.error && <div className={'text-destructive'}>{data.error}</div>}
                    </div>
                </CardContent>
                <CardFooter>
                    {data.message ? <div>{data.message}</div> : <SubmitButton/>}
                </CardFooter>
            </Card>
        </form>
    );
}

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <Button className={'w-full font-bold'} size={'lg'} type={'submit'}>{pending ? 'Sending...' : 'Send'}</Button>
    );
}