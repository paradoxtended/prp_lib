import { debugAlert } from './debug/alert';
import { debugContext } from './debug/context';
import { debugCustomNotification } from './debug/notification';
import { debugCircleProgressbar, debugProgressbar } from './debug/progress';
import { debugTextUI } from './debug/textui';

const Dev: React.FC = () => {
    return (
        <>
            <button onClick={() => debugAlert()}>
                Open alert dialog
            </button>
            <button onClick={() => debugContext()}>
                Open context menu
            </button>
            <button onClick={() => debugCustomNotification()}>
                Send notification
            </button>
            <button onClick={() => debugProgressbar()}>
                Activate progress bar
            </button>
            <button onClick={() => debugCircleProgressbar()}>
                Activate progress circle
            </button>
            <button onClick={() => debugTextUI()}>
                Show TextUI
            </button>
        </>
    )
}

export default Dev;