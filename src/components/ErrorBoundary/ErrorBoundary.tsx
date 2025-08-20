import { Component, type ReactNode, type ErrorInfo } from 'react'
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Paper,
  Group,
  Alert,
  Code,
  Collapse,
  ActionIcon,
} from '@mantine/core'
import { 
  IconAlertTriangle,
  IconRefresh,
  IconHome,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react'
import { useState } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Call optional error handler
    this.props.onError?.(error, errorInfo)

    // Log to console in development
    if (import.meta.env.DEV) {
      console.group('🚨 Error Boundary Caught Error')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.groupEnd()
    }

    // TODO: Report to error tracking service
    // reportError(error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return <ErrorFallback 
        error={this.state.error}
        errorInfo={this.state.errorInfo}
        onReset={this.handleReset}
        onGoHome={this.handleGoHome}
      />
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error: Error | null
  errorInfo: ErrorInfo | null
  onReset: () => void
  onGoHome: () => void
}

function ErrorFallback({ error, errorInfo, onReset, onGoHome }: ErrorFallbackProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getErrorMessage = (error: Error | null) => {
    if (!error) return 'An unexpected error occurred'
    
    // Network errors
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return 'Network connection error. Please check your internet connection and try again.'
    }
    
    // Validation errors
    if (error.message.includes('validation') || error.message.includes('schema')) {
      return 'Data validation error. The received data format is invalid.'
    }
    
    // Auth errors
    if (error.message.includes('unauthorized') || error.message.includes('authentication')) {
      return 'Authentication error. Please log in and try again.'
    }
    
    return error.message || 'An unexpected error occurred'
  }

  const getErrorType = (error: Error | null) => {
    if (!error) return 'Unknown Error'
    
    if (error.name) return error.name
    if (error.message.includes('fetch')) return 'Network Error'
    if (error.message.includes('validation')) return 'Validation Error'
    if (error.message.includes('unauthorized')) return 'Authentication Error'
    
    return 'Application Error'
  }

  return (
    <Container size="sm" py="xl">
      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" gap="lg">
          <IconAlertTriangle size={64} color="var(--mantine-color-red-6)" />
          
          <Stack align="center" gap="sm">
            <Title order={2} ta="center">
              Oops! Something went wrong
            </Title>
            <Text c="dimmed" ta="center" size="lg">
              {getErrorMessage(error)}
            </Text>
          </Stack>

          <Group>
            <Button
              leftSection={<IconRefresh size="1rem" />}
              onClick={onReset}
              variant="filled"
            >
              Try Again
            </Button>
            <Button
              leftSection={<IconHome size="1rem" />}
              onClick={onGoHome}
              variant="outline"
            >
              Go Home
            </Button>
          </Group>

          {import.meta.env.DEV && error && (
            <Stack w="100%">
              <Group justify="space-between">
                <Text fw={500} size="sm">
                  Error Details ({getErrorType(error)})
                </Text>
                <ActionIcon
                  variant="subtle"
                  onClick={() => setShowDetails(!showDetails)}
                  aria-label="Toggle error details"
                >
                  {showDetails ? <IconChevronUp size="1rem" /> : <IconChevronDown size="1rem" />}
                </ActionIcon>
              </Group>
              
              <Collapse in={showDetails}>
                <Alert color="red" variant="light">
                  <Stack gap="sm">
                    <Text size="sm" fw={500}>
                      Error Message:
                    </Text>
                    <Code block>
                      {error.message}
                    </Code>
                    
                    {error.stack && (
                      <>
                        <Text size="sm" fw={500}>
                          Stack Trace:
                        </Text>
                        <Code block style={{ fontSize: '0.75rem', maxHeight: '200px', overflow: 'auto' }}>
                          {error.stack}
                        </Code>
                      </>
                    )}
                    
                    {errorInfo?.componentStack && (
                      <>
                        <Text size="sm" fw={500}>
                          Component Stack:
                        </Text>
                        <Code block style={{ fontSize: '0.75rem', maxHeight: '200px', overflow: 'auto' }}>
                          {errorInfo.componentStack}
                        </Code>
                      </>
                    )}
                  </Stack>
                </Alert>
              </Collapse>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Container>
  )
}