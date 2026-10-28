/**
 * Colours used by the live SaaS UI (AICreateCoursePage, editor panels, dashboard).
 * Prefer these over new hex values; see CLAUDE.md → "Current product palette".
 */
export const SAAS = {
  primary: '#1565F0', // AI / primary actions
  primaryHover: '#1A63E8',
  primarySoft: '#EBF3FF',
  primaryOnSoft: '#1254C7', // text on primarySoft (6.0:1)
  primaryBorder: '#93C5FD',
  accent: '#F97316', // orange-500: icon fills/dots only — never behind white text
  accentStrong: '#C2410C', // orange-700: accent buttons with white text (5.2:1)
  brandNavy: '#134780',
  brandOrange: '#F48120',
  text: '#111827',
  textBody: '#374151',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  borderField: '#6B7280', // inputs, checkboxes, toggles (4.8:1)
  surface: '#FFFFFF',
  page: '#F9FAFB',
  chip: '#F3F4F6',
  disabled: '#C4C4C4',
  danger: '#DC2626',
} as const;
