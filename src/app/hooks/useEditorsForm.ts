import {useState, useCallback, ChangeEvent, useEffect} from 'react';


import { Word } from '../types/index';


const useEditorsForm  = (saveWord: (word: Word, oldWordKey?: string) => void, deleteWord: (word: Word) => void, editedWord?: Word) => {
    const [oldWordKey, setOldWordKey] = useState('');
    const [word, setWord] = useState(editedWord?.val || '');
    const [translationText, setTranslationText] = useState(editedWord?.translation || '');
    const [hashTag, setHashTag] = useState(editedWord?.hashTag || '');


    useEffect(
        () => {
            setOldWordKey(editedWord?.val || '');
            setWord(editedWord?.val || '');
            setTranslationText(editedWord?.translation || '');
            setHashTag(editedWord?.hashTag || '');
        },
        [editedWord]
    );

    const onWordInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value),
        [setWord]
    );

    const onTranslationInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setTranslationText(e.target.value),
        [setTranslationText]
    );

    const onHashTagInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setHashTag(e.target.value),
        [setHashTag]
    );


    const onSave = useCallback(
        () => {
            saveWord(
                {
                    val: word,
                    translation: translationText,
                    hashTag
                },
                oldWordKey
            );
            setWord('');
            setTranslationText('');
            setHashTag('');
            setOldWordKey('');
        },
        [word, translationText, hashTag]
    )  

    const onDelete = () => {
        deleteWord(
            {
                val: word,
                translation: translationText
            }
        );
    }

    return {
        word,
        changeWord: onWordInputChange,
        translation: translationText,
        changeTranslation: onTranslationInputChange,
        hashTag,
        changeHashTag: onHashTagInputChange,
        onSave,
        onDelete,
    }
}

export default useEditorsForm;
