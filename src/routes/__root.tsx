import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
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

export const Route = createRootRoute({
  component: () => <RootLayout />,
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
        <Outlet />
      </AppShell.Main>

      <TanStackRouterDevtools />
    </AppShell>
  )
}