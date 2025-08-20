import {
  Card,
  Group,
  Text,
  Badge,
  Avatar,
  ActionIcon,
  Stack,
} from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import type { User } from '@/schemas/user'

interface UserCardProps {
  user: User
  onEdit?: (userId: string) => void
  onDelete?: (userId: string) => void
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'inactive':
        return 'red'
      case 'suspended':
        return 'yellow'
      default:
        return 'gray'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'red'
      case 'moderator':
        return 'blue'
      case 'user':
        return 'gray'
      default:
        return 'gray'
    }
  }

  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <Avatar size={50} src={user.avatar} radius={50}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Stack gap={4}>
            <Text fw={500} size="lg">
              {user.name}
            </Text>
            <Text size="sm" c="dimmed">
              {user.email}
            </Text>
          </Stack>
        </Group>
        
        <Group gap="xs">
          {onEdit && (
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => onEdit(user.id)}
              aria-label="Edit user"
            >
              <IconPencil size="1rem" stroke={1.5} />
            </ActionIcon>
          )}
          {onDelete && (
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(user.id)}
              aria-label="Delete user"
            >
              <IconTrash size="1rem" stroke={1.5} />
            </ActionIcon>
          )}
        </Group>
      </Group>

      <Group justify="space-between" mt="md">
        <Badge color={getRoleColor(user.role)} variant="light" size="sm">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </Badge>
        <Badge color={getStatusColor(user.status)} variant="filled" size="sm">
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </Badge>
      </Group>

      <Text size="xs" c="dimmed" mt="sm">
        Created: {new Date(user.createdAt).toLocaleDateString()}
      </Text>
    </Card>
  )
}