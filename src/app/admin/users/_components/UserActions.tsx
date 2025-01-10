'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/app/admin/_actions/users';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export function DeleteDropdownItem({id}: {
    id: string,
}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <DropdownMenuItem
            onClick={() => startTransition(async () => {
                await deleteUser(id);
                router.refresh();
            })}
            disabled={isPending}
            variant={'destructive'}
        >
            Delete
        </DropdownMenuItem>
    );
}