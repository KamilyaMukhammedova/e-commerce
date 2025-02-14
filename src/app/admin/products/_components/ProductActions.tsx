'use client';

import { useTransition } from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { deleteProduct, toggleProductAvailability } from '@/app/admin/_actions/products';
import { useRouter } from 'next/navigation';

export function ActiveToggleDropdownItem({id, isAvailableForPurchase}: {
    id: string,
    isAvailableForPurchase: boolean
}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
            onClick={async () => {
                await toggleProductAvailability(id, !isAvailableForPurchase);
                router.refresh();
            }}
            disabled={isPending}
        >
            {isAvailableForPurchase ? 'Deactivate': 'Activate'}
        </DropdownMenuItem>
    );
}

export function DeleteDropdownItem({id, disabled}: {
    id: string,
    disabled: boolean
}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
            onClick={() => startTransition(async () => {
                await deleteProduct(id);
                router.refresh();
            })}
            disabled={disabled || isPending}
            variant={'destructive'}
        >
            Delete
        </DropdownMenuItem>
    );
}