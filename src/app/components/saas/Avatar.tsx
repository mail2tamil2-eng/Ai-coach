import { cn } from '../ui/utils';

export interface AvatarProps {
  name: string;
  /** `orange` = signed-in user (header), `blue` = other people (course tables). */
  tone?: 'orange' | 'blue' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const tones = {
  orange: 'from-orange-400 to-orange-600',
  blue: 'from-blue-400 to-blue-600',
  gray: 'from-gray-400 to-gray-600',
};
const sizes = { sm: 'size-6 text-[10px]', md: 'size-8 text-sm', lg: 'size-11 text-base' };

export function Avatar({ name, tone = 'orange', size = 'md', className }: AvatarProps) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join('') || '?';
  return (
    <span
      role="img"
      aria-label={name}
      className={cn('inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white', tones[tone], sizes[size], className)}
    >
      {initials}
    </span>
  );
}
