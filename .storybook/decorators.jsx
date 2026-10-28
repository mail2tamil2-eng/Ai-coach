import { MemoryRouter } from 'react-router';
import { Toaster } from 'sonner';

export const withRouter =
  (initialPath = '/') =>
  (Story) => (
    <MemoryRouter initialEntries={[initialPath]}>
      <Story />
    </MemoryRouter>
  );

export const withCourses = (Story) => (
  <>
    <Story />
    <Toaster position="top-right" richColors />
  </>
);
