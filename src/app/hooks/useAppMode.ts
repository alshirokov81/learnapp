import {useState, useCallback, useMemo, MouseEvent} from 'react';


const useAppMode = () => {
    const [isLearnMode, setIsLearnMode] = useState(true);
    const switchMode = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            setIsLearnMode((stateVal) => !stateVal);
        },
        [setIsLearnMode]
    );
    const buttonName = useMemo(
        () => isLearnMode ? 'Add words' : 'Learn words',
        [isLearnMode]
    );
        return {isLearnMode, switchMode, buttonName};
}

export default useAppMode;