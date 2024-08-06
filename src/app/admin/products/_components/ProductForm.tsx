'use client';

import { useState } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { addProduct } from '@/app/admin/_actions/products';

export function ProductForm() {
    const [error, action] = useFormState(addProduct, {});
    const [priceInCents, setPriceInCents] = useState<number>();

    return (
        <form
            className={'space-y-8'}
            action={action}
        >
            <div className={'space-y-2'}>
                <Label htmlFor={'name'}>Name</Label>
                <Input type={'text'} id={'name'} name={'name'} required={true}/>
                {error.name && <div className={'text-destructive'}>{error.name}</div>}
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'priceInCents'}>Price In Cents</Label>
                <Input
                    type={'number'}
                    id={'priceInCents'}
                    name={'priceInCents'}
                    required={true}
                    value={priceInCents}
                    onChange={e => setPriceInCents(Number(e.target.value) || undefined)}
                />
                <div className={'text-muted-foreground'}>{formatCurrency((priceInCents || 0) /100)}</div>
                {error.priceInCents && <div className={'text-destructive'}>{error.priceInCents}</div>}
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'description'}>Description</Label>
                <Textarea id={'description'} name={'description'} required={true}/>
                {error.description && <div className={'text-destructive'}>{error.description}</div>}
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'file'}>File</Label>
                <Input type={'file'} id={'file'} name={'file'} required={true}/>
                {error.file && <div className={'text-destructive'}>{error.file}</div>}
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'image'}>Image</Label>
                <Input type={'file'} id={'image'} name={'image'} required={true}/>
                {error.image && <div className={'text-destructive'}>{error.image}</div>}
            </div>
            <SubmitButton/>
        </form>
    );
}

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <Button type={'submit'} disabled={pending}>{pending ? 'Saving...': 'Save'}</Button>
    );
}