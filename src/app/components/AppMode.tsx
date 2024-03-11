import {FC} from 'react';

import { OnKlickVoid } from '../types/index';

type AppModeProps = {
    switchMode: OnKlickVoid,
    buttonText: string
}

const AppMode: FC<AppModeProps> = ({switchMode, buttonText}) => {
    return (
        <div>
            <button
                type="button"
                onClick={switchMode}
            >
                {buttonText}
            </button>
        </div>
    );
}

export default AppMode