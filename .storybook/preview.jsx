import { useEffect } from 'react';
import '../src/styles/index.css';
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/600.css';
import '@fontsource/nunito-sans/700.css';

const WithTheme = (Story, context) => {
  const theme = context.globals.theme;
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return (
    <div className="bg-background text-foreground" style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
      <Story />
    </div>
  );
};

const preview = {
  globalTypes: {
    theme: {
      description: 'Colour mode',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [WithTheme],
  parameters: {
    layout: 'padded',
    options: {
      storySort: {
        order: ['Foundations', 'SaaS', ['Screens', '*'], 'Pages', 'Components', 'Primitives (shadcn)'],
      },
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: {
      test: 'todo',
      options: { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } },
    },
  },
};

export default preview;
