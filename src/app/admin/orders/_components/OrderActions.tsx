'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteOrder } from '@/app/admin/_actions/orders';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export function DeleteDropdownItem({id}: {
    id: string,
}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
            onClick={() => startTransition(async () => {
                await deleteOrder(id);
                router.refresh();
            })}
            disabled={isPending}
            variant={'destructive'}
        >
            Delete
        </DropdownMenuItem>
    );
}