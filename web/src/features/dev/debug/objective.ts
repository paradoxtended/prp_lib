import type { ObjectiveProps } from "../../../typings/objective";
import { debugData } from "../../../utils/debugData";

export const debugObjective = () => {
    debugData<ObjectiveProps>([
        {
            action: 'showObjective',
            data: {
                title: 'Wait for client',
                content: 'Wait for client\'s offer. You\'ll recieve an offer soon.'
            }
        }
    ])
}