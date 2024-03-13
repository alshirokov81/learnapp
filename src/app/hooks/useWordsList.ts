import {useState, useCallback, MouseEvent} from 'react';


import { Word } from '../types/index';


const useWordsList = (words: Word[]) => {
    const [activeWord, setActiveWord] = useState<Word | undefined>(undefined);

    const onItemClicked = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {

            const target = e.target as HTMLElement
            const itemId = target?.id || target?.parentElement?.id;
            console.log('itemId');
            const word = words.find((word) => word.val === itemId);
            if (word) {
                setActiveWord(word);
            }
            alert(JSON.stringify(word));
        },
        [setActiveWord, words]
    );

    return {
        activeWord,
        onItemClicked
    }
}

export default useWordsList;
