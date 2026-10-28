import type { ReactNode } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { cn } from '../ui/utils';
import { Avatar } from './Avatar';
import { SearchBar } from './SearchBar';

export interface AppHeaderProps {
  userName: string;
  userRole?: string;
  /** Unread notifications. 0 hides the dot; >0 shows a count for screen readers. */
  notificationCount?: number;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  /** Hide the search bar (e.g. focused editor views). */
  showSearch?: boolean;
  onNotificationsClick?: () => void;
  onUserMenuClick?: () => void;
  /** Extra controls placed before the bell. */
  actions?: ReactNode;
  className?: string;
}

/** 80px top bar: search left, actions + notifications + user menu right. Position it yourself (the app fixes it next to the sidebar). */
export function AppHeader({
  userName, userRole = 'Course Creator', notificationCount = 0, searchPlaceholder = 'Search here…', onSearch, showSearch = true,
  onNotificationsClick, onUserMenuClick, actions, className,
}: AppHeaderProps) {
  return (
    <header className={cn('flex h-20 items-center border-b border-gray-100 bg-white shadow-sm', className)}>
      {showSearch && (
        <div className="max-w-[440px] flex-[0_1_440px] pl-6">
          <SearchBar placeholder={searchPlaceholder} onSearch={onSearch} variant="filled" />
        </div>
      )}
      <div className="flex-1" />
      <div className="flex items-center gap-3 pr-6">
        {actions}
        <button
          type="button"
          onClick={onNotificationsClick}
          aria-label={notificationCount ? `Notifications, ${notificationCount} unread` : 'Notifications'}
          className="relative rounded-lg p-2 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]"
        >
          <Bell className="size-5 text-gray-500" />
          {notificationCount > 0 && <span aria-hidden className="absolute right-1.5 top-1.5 size-2 rounded-full border-2 border-white bg-orange-500" />}
        </button>
        <button
          type="button"
          onClick={onUserMenuClick}
          aria-haspopup="menu"
          className="flex items-center gap-2.5 rounded-xl py-1.5 pl-1 pr-2 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]"
        >
          <Avatar name={userName} tone="orange" />
          <span className="text-left leading-tight">
            <span className="mb-0.5 block text-sm font-semibold leading-none text-gray-800">{userName}</span>
            <span className="block text-sm leading-none text-gray-500">{userRole}</span>
          </span>
          <ChevronDown className="size-3.5 shrink-0 text-gray-500" />
        </button>
      </div>
    </header>
  );
}
