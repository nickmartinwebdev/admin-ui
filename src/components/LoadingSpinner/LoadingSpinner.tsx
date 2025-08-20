import {
  Loader,
  Center,
  Stack,
  Text,
  Overlay,
  Paper,
  Skeleton,
  Group,
  Box,
} from '@mantine/core'
import type { MantineSize } from '@mantine/core'

interface LoadingSpinnerProps {
  size?: MantineSize | number
  message?: string
  variant?: 'spinner' | 'skeleton' | 'minimal'
  overlay?: boolean
  fullscreen?: boolean
  color?: string
}

interface SkeletonLoadingProps {
  lines?: number
  height?: number
}

export function LoadingSpinner({
  size = 'lg',
  message = 'Loading...',
  variant = 'spinner',
  overlay = false,
  fullscreen = false,
  color = 'blue',
}: LoadingSpinnerProps) {
  const content = () => {
    switch (variant) {
      case 'skeleton':
        return <SkeletonLoading />
      case 'minimal':
        return <Loader size={size} color={color} />
      default:
        return (
          <Stack align="center" gap="md">
            <Loader size={size} color={color} />
            {message && (
              <Text size="sm" c="dimmed" ta="center">
                {message}
              </Text>
            )}
          </Stack>
        )
    }
  }

  if (fullscreen) {
    return (
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--mantine-color-body)',
          zIndex: 9999,
        }}
      >
        <Center h="100vh">
          {content()}
        </Center>
      </Box>
    )
  }

  if (overlay) {
    return (
      <>
        <Overlay opacity={0.7} color="var(--mantine-color-body)" blur={2} />
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <Paper p="lg" radius="md" shadow="lg">
            {content()}
          </Paper>
        </Box>
      </>
    )
  }

  return (
    <Center py="xl">
      {content()}
    </Center>
  )
}

function SkeletonLoading({ lines = 5, height = 8 }: SkeletonLoadingProps) {
  return (
    <Stack gap="sm">
      {/* Header skeleton */}
      <Group gap="sm" mb="md">
        <Skeleton height={40} circle />
        <Stack gap={4} flex={1}>
          <Skeleton height={12} width="60%" />
          <Skeleton height={10} width="40%" />
        </Stack>
      </Group>

      {/* Content skeleton */}
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={height}
          width={
            index === lines - 1 ? '70%' : // Last line is shorter
            index % 3 === 0 ? '90%' :      // Every third line is shorter
            '100%'
          }
        />
      ))}

      {/* Button skeleton */}
      <Group mt="md">
        <Skeleton height={36} width={100} />
        <Skeleton height={36} width={80} />
      </Group>
    </Stack>
  )
}

// Page-level loading component
export function PageLoading({ 
  message = 'Loading page...' 
}: { 
  message?: string 
}) {
  return (
    <LoadingSpinner
      size="xl"
      message={message}
      fullscreen
      color="blue"
    />
  )
}

// Route transition loading
export function RouteLoading({ 
  message = 'Loading...' 
}: { 
  message?: string 
}) {
  return (
    <LoadingSpinner
      size="lg"
      message={message}
      variant="spinner"
    />
  )
}

// Data loading skeleton for tables/lists
export function DataLoading({ 
  rows = 5 
}: { 
  rows?: number 
}) {
  return (
    <Stack gap="sm">
      {Array.from({ length: rows }).map((_, index) => (
        <Paper key={index} p="md" radius="md" withBorder>
          <Group gap="sm">
            <Skeleton height={40} circle />
            <Stack gap={4} flex={1}>
              <Skeleton height={12} width="70%" />
              <Skeleton height={10} width="50%" />
            </Stack>
            <Group gap="xs">
              <Skeleton height={24} width={60} />
              <Skeleton height={32} width={32} circle />
              <Skeleton height={32} width={32} circle />
            </Group>
          </Group>
        </Paper>
      ))}
    </Stack>
  )
}