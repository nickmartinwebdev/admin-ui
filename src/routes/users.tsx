import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import {
  Container,
  Title,
  Text,
  Table,
  Card,
  Group,
  Button,
  Badge,
  Avatar,
  TextInput,
  ActionIcon,
  Pagination,
  Select,
  Alert,
  Stack,
} from '@mantine/core'
import { 
  IconSearch, 
  IconPlus, 
  IconPencil, 
  IconTrash,
  IconAlertCircle,
} from '@tabler/icons-react'
import { useState } from 'react'
import { useUsers, useDeleteUser } from '@/api/users'
import { DataLoading } from '@/components/LoadingSpinner'
import { UserSearchParamsSchema, type UserSearchParams } from '@/schemas/user'
import { getStatusColor, getRoleColor } from '@/theme'

// Search params validation schema
const usersSearchSchema = z.object({
  page: z.number().int().min(1).catch(1),
  limit: z.number().int().min(1).max(100).catch(10),
  search: z.string().optional(),
  role: z.enum(['admin', 'user', 'moderator']).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
})

export const Route = createFileRoute('/users')({
  component: Users,
  validateSearch: usersSearchSchema,
  pendingComponent: () => <DataLoading rows={5} />,
  errorComponent: ({ error }) => (
    <Container size="xl">
      <Alert variant="light" color="red" title="Failed to load users" icon={<IconAlertCircle size="1rem" />}>
        {error.message}
      </Alert>
    </Container>
  ),
})

function Users() {
  const { page, limit, search, role, status } = Route.useSearch()
  const navigate = Route.useNavigate()
  
  // Create search params for API
  const searchParams: UserSearchParams = {
    page: page || 1,
    limit: limit || 10,
    search: search || undefined,
    role: role || undefined,
    status: status || undefined,
  }

  const {
    data,
    isLoading,
    error,
    isError,
  } = useUsers(searchParams)

  const deleteUser = useDeleteUser()

  const updateSearch = (updates: Partial<typeof searchParams>) => {
    navigate({
      search: (prev) => ({ ...prev, ...updates, page: 1 }), // Reset to page 1 when searching
    })
  }

  const updatePage = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    })
  }

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser.mutate(userId)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    const colorMap: Record<string, string> = {
      active: 'green',
      inactive: 'red',
      suspended: 'orange',
    }
    return colorMap[status] || 'gray'
  }

  const getRoleBadgeColor = (role: string) => {
    const colorMap: Record<string, string> = {
      admin: 'red',
      moderator: 'blue',
      user: 'gray',
    }
    return colorMap[role] || 'gray'
  }

  if (isError && error) {
    return (
      <Container size="xl">
        <Alert 
          variant="light" 
          color="red" 
          title="Failed to load users" 
          icon={<IconAlertCircle size="1rem" />}
        >
          {error.message}
        </Alert>
      </Container>
    )
  }

  const users = data?.users || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / (limit || 10))

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={user.avatar} radius={40}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Text fz="sm" fw={500}>
              {user.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {user.email}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge color={getRoleBadgeColor(user.role)} variant="light">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={getStatusBadgeColor(user.status)} variant="light">
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon 
            variant="subtle" 
            color="gray"
            aria-label={`Edit ${user.name}`}
          >
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon 
            variant="subtle" 
            color="red"
            onClick={() => handleDeleteUser(user.id)}
            loading={deleteUser.isPending}
            aria-label={`Delete ${user.name}`}
          >
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Container size="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={1}>User Management</Title>
          <Text c="dimmed" mt="xs">
            Manage user accounts, roles, and permissions
          </Text>
        </div>
        <Button leftSection={<IconPlus size="1rem" />}>
          Add User
        </Button>
      </Group>

      <Card padding="lg" radius="md" withBorder>
        <Stack gap="md" mb="md">
          <Group justify="space-between">
            <TextInput
              placeholder="Search users..."
              value={search || ''}
              onChange={(event) => updateSearch({ search: event.currentTarget.value })}
              leftSection={<IconSearch size="1rem" />}
              style={{ flex: 1, maxWidth: 400 }}
            />
            <Group>
              <Select
                placeholder="Filter by role"
                value={role || null}
                onChange={(value) => updateSearch({ role: value as any })}
                data={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'moderator', label: 'Moderator' },
                  { value: 'user', label: 'User' },
                ]}
                clearable
                style={{ minWidth: 150 }}
              />
              <Select
                placeholder="Filter by status"
                value={status || null}
                onChange={(value) => updateSearch({ status: value as any })}
                data={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                  { value: 'suspended', label: 'Suspended' },
                ]}
                clearable
                style={{ minWidth: 150 }}
              />
            </Group>
          </Group>

          {/* Results summary */}
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              {isLoading ? 'Loading...' : `Showing ${users.length} of ${total} users`}
            </Text>
            <Group gap="xs">
              <Text size="sm" c="dimmed">Show:</Text>
              <Select
                size="xs"
                value={String(limit || 10)}
                onChange={(value) => updateSearch({ limit: Number(value) })}
                data={[
                  { value: '10', label: '10' },
                  { value: '25', label: '25' },
                  { value: '50', label: '50' },
                  { value: '100', label: '100' },
                ]}
                w={70}
              />
            </Group>
          </Group>
        </Stack>

        {isLoading ? (
          <DataLoading rows={limit || 10} />
        ) : (
          <>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            {totalPages > 1 && (
              <Group justify="center" mt="md">
                <Pagination 
                  total={totalPages}
                  value={page || 1}
                  onChange={updatePage}
                  size="sm"
                />
              </Group>
            )}
          </>
        )}
      </Card>
    </Container>
  )
}