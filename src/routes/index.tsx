import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Group,
  ThemeIcon,
  SimpleGrid,
  Progress,
  Alert,
  Skeleton,
  Stack,
} from '@mantine/core'
import {
  IconUsers,
  IconServer,
  IconActivity,
  IconCheckbox,
  IconAlertCircle,
} from '@tabler/icons-react'
import { DataLoading } from '@/components/LoadingSpinner'

export const Route = createFileRoute('/')({
  component: Dashboard,
  pendingComponent: () => <DataLoading rows={3} />,
  errorComponent: ({ error }) => (
    <Container size="xl">
      <Alert variant="light" color="red" title="Failed to load dashboard" icon={<IconAlertCircle size="1rem" />}>
        {error.message}
      </Alert>
    </Container>
  ),
})

// Dashboard stats type
interface DashboardStats {
  totalUsers: number
  activeServices: number
  systemHealth: number
  testsPassingRatio: string
  userGrowth: number
  serviceUptime: number
  healthChange: number
  testChange: number
}

// System health data type
interface SystemHealth {
  authentication: number
  userManagement: number
  notifications: number
  database: number
}

// Mock API functions (using actual API endpoints with MSW)
const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch('/api/dashboard/stats')
  if (!response.ok) throw new Error('Failed to fetch dashboard stats')
  return response.json()
}

const fetchSystemHealth = async (): Promise<SystemHealth> => {
  const response = await fetch('/api/dashboard/health')
  if (!response.ok) throw new Error('Failed to fetch system health')
  return response.json()
}

function Dashboard() {
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 30, // Refetch every 30 seconds
  })

  const {
    data: health,
    isLoading: healthLoading,
    error: healthError,
  } = useQuery({
    queryKey: ['dashboard', 'health'],
    queryFn: fetchSystemHealth,
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 15, // Refetch every 15 seconds
  })

  // Mock data fallback for demo
  const defaultStats = {
    totalUsers: 1234,
    activeServices: 8,
    systemHealth: 98,
    testsPassingRatio: '142/150',
    userGrowth: 12,
    serviceUptime: 2,
    healthChange: 1,
    testChange: -2,
  }

  const defaultHealth = {
    authentication: 95,
    userManagement: 87,
    notifications: 78,
    database: 92,
  }

  const displayStats = stats || defaultStats
  const displayHealth = health || defaultHealth

  const statsCards = [
    {
      title: 'Total Users',
      value: displayStats.totalUsers.toLocaleString(),
      diff: displayStats.userGrowth,
      icon: IconUsers,
      color: 'blue',
    },
    {
      title: 'Active Services',
      value: displayStats.activeServices.toString(),
      diff: displayStats.serviceUptime,
      icon: IconServer,
      color: 'green',
    },
    {
      title: 'System Health',
      value: `${displayStats.systemHealth}%`,
      diff: displayStats.healthChange,
      icon: IconActivity,
      color: 'orange',
    },
    {
      title: 'Tests Passing',
      value: displayStats.testsPassingRatio,
      diff: displayStats.testChange,
      icon: IconCheckbox,
      color: displayStats.testChange < 0 ? 'red' : 'green',
    },
  ]

  const getProgressColor = (value: number) => {
    if (value >= 90) return 'green'
    if (value >= 75) return 'yellow'
    if (value >= 50) return 'orange'
    return 'red'
  }

  if (statsError || healthError) {
    return (
      <Container size="xl">
        <Alert 
          variant="light" 
          color="red" 
          title="Failed to load dashboard data" 
          icon={<IconAlertCircle size="1rem" />}
        >
          {statsError?.message || healthError?.message || 'An error occurred while loading the dashboard'}
        </Alert>
      </Container>
    )
  }

  return (
    <Container size="xl">
      <Title order={1} mb="xl">
        Dashboard
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="xl">
        {statsCards.map((stat) => (
          <Card key={stat.title} padding="lg" radius="md" withBorder>
            <Group justify="apart">
              {statsLoading ? (
                <Skeleton height={16} width="60%" />
              ) : (
                <Text size="sm" c="dimmed" fw={500} tt="uppercase">
                  {stat.title}
                </Text>
              )}
              
              {statsLoading ? (
                <Skeleton height={38} width={38} circle />
              ) : (
                <ThemeIcon color={stat.color} variant="light" size={38} radius="md">
                  <stat.icon size="1.8rem" stroke={1.5} />
                </ThemeIcon>
              )}
            </Group>

            {statsLoading ? (
              <Skeleton height={24} width="50%" mt="md" />
            ) : (
              <Text fw={700} fz="xl" mt="md">
                {stat.value}
              </Text>
            )}

            {statsLoading ? (
              <Skeleton height={12} width="70%" mt="xs" />
            ) : (
              <Text c="dimmed" fz="sm" mt="xs">
                {stat.diff > 0 ? '+' : ''}
                {stat.diff}% from last month
              </Text>
            )}
          </Card>
        ))}
      </SimpleGrid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card padding="lg" radius="md" withBorder>
            {statsLoading ? (
              <Skeleton height={24} width="40%" mb="md" />
            ) : (
              <Title order={3} mb="md">
                System Overview
              </Title>
            )}
            
            {statsLoading ? (
              <Stack gap="sm">
                <Skeleton height={12} />
                <Skeleton height={12} />
                <Skeleton height={12} width="80%" />
              </Stack>
            ) : (
              <Text c="dimmed" mb="lg">
                Welcome to the Admin UI. This is your central dashboard for managing
                user services and monitoring system health.
              </Text>
            )}
            
            {healthLoading ? (
              <Stack gap="sm">
                <Skeleton height={16} width="40%" />
                <Skeleton height={8} />
                <Skeleton height={16} width="35%" />
                <Skeleton height={8} />
                <Skeleton height={16} width="45%" />
                <Skeleton height={8} />
                <Skeleton height={16} width="30%" />
                <Skeleton height={8} />
              </Stack>
            ) : (
              <>
                <Title order={4} mb="sm">Service Status</Title>
                
                <Text size="sm" c="dimmed" mb="xs">Authentication Service</Text>
                <Progress 
                  value={displayHealth.authentication} 
                  color={getProgressColor(displayHealth.authentication)} 
                  mb="sm" 
                />
                
                <Text size="sm" c="dimmed" mb="xs">User Management</Text>
                <Progress 
                  value={displayHealth.userManagement} 
                  color={getProgressColor(displayHealth.userManagement)} 
                  mb="sm" 
                />
                
                <Text size="sm" c="dimmed" mb="xs">Notification Service</Text>
                <Progress 
                  value={displayHealth.notifications} 
                  color={getProgressColor(displayHealth.notifications)} 
                  mb="sm" 
                />

                <Text size="sm" c="dimmed" mb="xs">Database</Text>
                <Progress 
                  value={displayHealth.database} 
                  color={getProgressColor(displayHealth.database)} 
                  mb="sm" 
                />
              </>
            )}
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card padding="lg" radius="md" withBorder>
            {statsLoading ? (
              <Skeleton height={24} width="60%" mb="md" />
            ) : (
              <Title order={3} mb="md">
                Quick Actions
              </Title>
            )}
            
            {statsLoading ? (
              <Stack gap="sm">
                <Skeleton height={12} />
                <Skeleton height={12} width="90%" />
                <Skeleton height={12} width="80%" />
              </Stack>
            ) : (
              <Text c="dimmed">
                Use the navigation menu to access user management, system settings,
                and other administrative functions.
              </Text>
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  )
}