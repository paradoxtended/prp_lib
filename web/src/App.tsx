import Notifications from './features/notifications/NotificationWrapper';
import CircleProgressbar from './features/progress/CircleProgressbar';
import Progressbar from './features/progress/Progressbar';
import TextUI from './features/textui/TextUI';
import ContextMenu from './features/menu/context/ContextMenu'
import AlertDialog from './features/dialog/alertDialog/AlertDialog'
import Dev from './features/dev';
import { isEnvBrowser } from './utils/misc';

const App: React.FC = () => {
    return (
        <>
            <Progressbar />
            <CircleProgressbar />
            <Notifications />
            <TextUI />
            <ContextMenu />
            <AlertDialog />
            {isEnvBrowser() && <Dev />}
        </>
    )
}

export default App