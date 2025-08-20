import { createRootRoute, Link, Outlet, ErrorComponent } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import {
  AppShell,
  Burger,
  Group,
  Text,
  NavLink,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconDashboard,
  IconUsers,
  IconSettings,
} from '@tabler/icons-react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { RouteLoading } from '@/components/LoadingSpinner'
import { Suspense } from 'react'

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  pendingComponent: RouteLoading,
  notFoundComponent: () => {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>404 - Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/">Go back to home</Link>
      </div>
    )
  },
})

function RootLayout() {
  const [opened, { toggle }] = useDisclosure()
  const theme = useMantineTheme()

  const navigationItems = [
    { icon: IconDashboard, label: 'Dashboard', to: '/' },
    { icon: IconUsers, label: 'Users', to: '/users' },
    { icon: IconSettings, label: 'Settings', to: '/settings' },
  ]

  return (
    <ErrorBoundary>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text size="lg" fw={500}>
              Admin UI
            </Text>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <AppShell.Section grow my="md" component={ScrollArea}>
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                component={Link}
                to={item.to}
                label={item.label}
                leftSection={<item.icon style={{ width: rem(16), height: rem(16) }} />}
                mb="xs"
              />
            ))}
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main>
          <Suspense fallback={<RouteLoading message="Loading page..." />}>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </Suspense>
        </AppShell.Main>

        <TanStackRouterDevtools />
      </AppShell>
    </ErrorBoundary>
  )
}