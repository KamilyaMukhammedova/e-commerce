import { MoreVertical } from 'lucide-react';
import db from '@/db/db';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { PageHeader } from '@/app/admin/_components/PageHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DeleteDropdownItem } from '@/app/admin/users/_components/UserActions';

function getUsers() {
    return db.user.findMany({
        select: {
            id: true,
            email: true,
            orders: {select: {pricePaidInCents: true}}
        },
        orderBy: {createdAt: 'desc'}
    });
}

export default function UsersPage() {
    return (
        <>
            <PageHeader>Customers</PageHeader>
            <UsersTable/>
        </>
    );
}

async function UsersTable() {
    const users = await getUsers();

    if(users.length === 0) return <p>No customers found</p>;

    return (
       <Table>
           <TableHeader>
               <TableRow>
                   <TableHead>Emails</TableHead>
                   <TableHead>Orders</TableHead>
                   <TableHead>Value</TableHead>
                   <TableHead className={'w-0'}>
                       <span className={'sr-only'}>Actions</span>
                   </TableHead>
               </TableRow>
           </TableHeader>
           <TableBody>
               {users.map(user => (
                   <TableRow key={user.id}>
                       <TableCell>{user.email}</TableCell>
                       <TableCell>{formatNumber(user.orders.length)}</TableCell>
                       <TableCell>
                           {formatCurrency(user.orders.reduce(
                               (acc, order) => order.pricePaidInCents + acc, 0
                           ) / 100)}
                       </TableCell>
                       <TableCell className={'text-center'}>
                           <DropdownMenu>
                               <DropdownMenuTrigger>
                                   <MoreVertical/>
                                   <span className={'sr-only'}>Actions</span>
                               </DropdownMenuTrigger>
                               <DropdownMenuContent>
                                   <DeleteDropdownItem id={user.id}/>
                               </DropdownMenuContent>
                           </DropdownMenu>
                       </TableCell>
                   </TableRow>
               ))}
           </TableBody>
       </Table>
    );
}