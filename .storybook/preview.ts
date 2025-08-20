import type { Preview } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { initialize, mswLoader } from 'msw-storybook-addon'

// Import Mantine styles
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'

// Initialize MSW
initialize()

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Default Mantine color scheme
    mantineProvider: {
      theme: {},
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
  loaders: [mswLoader],
}

export default preview