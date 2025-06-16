import Notifications from './features/notifications/NotificationWrapper';
import CircleProgressbar from './features/progress/CircleProgressbar';
import Progressbar from './features/progress/Progressbar';
import TextUI from './features/textui/TextUI';
import ContextMenu from './features/menu/context/ContextMenu'
import AlertDialog from './features/dialog/alertDialog/AlertDialog'
import InputDialog from './features/dialog/inputDialog/InputDialog'
import { createTheme, MantineProvider } from '@mantine/core';
import Dev from './features/dev';
import { isEnvBrowser } from './utils/misc';

const theme = createTheme({
    fontFamily: 'Montserrat, sans-serif',
    primaryColor: 'lime'
});

const App: React.FC = () => {
    return (
        <MantineProvider theme={theme} forceColorScheme='dark'>
            <Progressbar />
            <CircleProgressbar />
            <Notifications />
            <TextUI />
            <ContextMenu />
            <AlertDialog />
            <InputDialog />
            {isEnvBrowser() && <Dev />}
        </MantineProvider>
    )
}

export default App