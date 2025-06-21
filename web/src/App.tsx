import '@mantine/core/styles.css'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <ColorSchemeScript />
      <MantineProvider
        theme={{
          components: {
            DatePicker: {
              defaultProps: {
                nextIcon: <IconChevronRight size={16} />,
                previousIcon: <IconChevronLeft size={16} />,
              },
            },
            DateTimePicker: {
              defaultProps: {
                nextIcon: <IconChevronRight size={16} />,
                previousIcon: <IconChevronLeft size={16} />,
              },
            },
          },
        }}
      >
        <ModalsProvider>
          <RedwoodApolloProvider>
            <Routes />
          </RedwoodApolloProvider>
        </ModalsProvider>
      </MantineProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
