import { useCallback, useMemo, ChangeEvent, FC } from 'react';

type BoxedInputProps = {
    componentWidth: number,
    cellSize: number,
    currentWord: string,
    setCurrentWord: (e: ChangeEvent<HTMLInputElement>) => void,
    onSubmit: () => void,
}

const ENTER_BUTTON_VALUE = 13;

const BoxedInput: FC<BoxedInputProps> = ({
        componentWidth = 900,
        cellSize = 50,
        onSubmit,
        currentWord,
        setCurrentWord
    }) => {
    
    const computedStyle = useMemo(
        () => ({
            //TODO use image from local
            backgroundImage: 'url(http://3.bp.blogspot.com/-4oAWWCcNNz4/Tjr3nKNyVUI/AAAAAAAAPLU/Pouua-pNsEY/s1600/sq.gif)',
            width: `${Math.floor(componentWidth/cellSize)*cellSize + cellSize/2}px`,
            backgroundSize: `${cellSize}px`,
            border: 'none',
            fontFamily: 'monospace',
            fontSize: `${cellSize/2}px`,
            paddingLeft: `${cellSize * 0.3}px`,
            letterSpacing: `${cellSize * 0.7}px`,
            lineHeight: `${cellSize}px`
        }),
        [componentWidth, cellSize]
    );

    const handleButtonPressed = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            console.log(e);
            if(e.nativeEvent.inputType === "insertLineBreak") {
                onSubmit();
                e.preventDefault();
            } else {
                setCurrentWord(e);
            }
        },
        [onSubmit, setCurrentWord]
    );

    return <textarea
        type="text"
        id="fname"
        rows={4}
        style={computedStyle}
        name="fname"
        value={currentWord}
        onChange={handleButtonPressed}
    />
}

export  default BoxedInput;
