import { AppShell, Container, Space } from '@mantine/core'

import { routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type LayoutProps = {
  title: string
  titleTo: keyof typeof routes
  buttonLabel: string
  buttonTo: keyof typeof routes
  children: React.ReactNode
}

const ScaffoldLayout = ({ children }: LayoutProps) => {
  return (
    <AppShell header={{ height: 0 }} padding="md">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <AppShell.Main>
        <Container size="lg">
          <Space h="md" />
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default ScaffoldLayout
