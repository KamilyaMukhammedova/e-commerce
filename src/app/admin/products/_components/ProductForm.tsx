'use client';

import { useState } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Product } from '@prisma/client';
import { formatCurrency } from '@/lib/formatters';
import { addProduct, updateProduct } from '@/app/admin/_actions/products';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ProductForm({product} : {product? : Product | null}) {
    const [error, action] =
        useFormState(!product ? addProduct : updateProduct.bind(null, product.id), {});

    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents);

    return (
        <form
            className={'space-y-8'}
            action={action}
        >
            <div className={'space-y-2'}>
                <Label htmlFor={'name'}>Name</Label>
                <Input type={'text'} id={'name'} name={'name'} required={true} defaultValue={product?.name || ''}/>
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
                <Textarea id={'description'} name={'description'} required={true} defaultValue={product?.description || ''}/>
                {error.description && <div className={'text-destructive'}>{error.description}</div>}
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'file'}>File</Label>
                <Input type={'file'} id={'file'} name={'file'} required={!product}/>
                {product && <div className={'text-muted-foreground'}>{product.filePath}</div>}
                {error.file && <div className={'text-destructive'}>{error.file}</div>}
            </div>
            <div className={'space-y-2'}>
                <Label htmlFor={'image'}>Image</Label>
                <Input type={'file'} id={'image'} name={'image'} required={!product}/>
                {product && <Image src={product.imagePath} alt={'Product image'} width={'400'} height={'400'}/>}
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