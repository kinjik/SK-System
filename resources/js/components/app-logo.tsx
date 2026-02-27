import AppLogoIcon from './app-logo-icon';
import { Shield } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
               <img src="/logo sk.png" alt="Logo" className="rounded-sm" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    SK Portal
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    SK Management System
                </span>
            </div>
        </>
    );
}
