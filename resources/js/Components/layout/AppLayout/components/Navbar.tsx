import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

const Navbar = () => {
    const { pathname } = window.location;
    const segments = pathname.split('/').slice(1);
    let urlBuilder = '';

    function handleLogOut() {
        axios.post(route('logout'));
        router.visit(route('dashboard.index'));
    }

    return (
        <nav className="flex h-10 items-center justify-between">
            <div className="flex items-center text-sm">
                {segments.map((s, i) => {
                    if (i == 0) s = 'app';

                    urlBuilder += `/${s}`;

                    if (s == 'app') s = 'dashboard';
                    s = s
                        .split('_')
                        .map(
                            (segment) =>
                                segment.charAt(0).toUpperCase() +
                                segment.slice(1),
                        )
                        .join(' ');

                    return (
                        <Fragment key={s}>
                            {i != 0 && (
                                <ArrowRight className="mx-1 size-4 text-muted-foreground" />
                            )}
                            <Link
                                href={urlBuilder}
                                className={`hover:underline ${i == segments.length - 1 && 'text-primary'}`}
                            >
                                {s}
                            </Link>
                        </Fragment>
                    );
                })}
            </div>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'}>
                            Dereck Guay
                            <ChevronDown className="ml-2 size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogOut}>
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default Navbar;
