import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight, Bell } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

const Navbar = () => {
    const { pathname } = window.location;
    const segments = pathname.split('/').slice(1);
    let urlBuilder = '';

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
                                <ArrowRight className="size-4 text-muted-foreground" />
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
                <Button variant={'outline'}>Dereck Guay</Button>
                <Button variant={'outline'} size="icon">
                    <Bell />
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
