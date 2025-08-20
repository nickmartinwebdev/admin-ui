import type { Preview } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { adminTheme } from '../src/theme'

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
    // Configure theme controls
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#242424' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const colorScheme = context.globals.colorScheme || context.parameters.colorScheme || 'light'
      
      return (
        <MantineProvider theme={adminTheme} forceColorScheme={colorScheme}>
          <Story />
        </MantineProvider>
      )
    },
  ],
  loaders: [mswLoader],
  globalTypes: {
    colorScheme: {
      description: 'Mantine color scheme',
      defaultValue: 'light',
      toolbar: {
        title: 'Color scheme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
}

export default preview