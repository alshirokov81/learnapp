"use client";
import { useState, useMemo, useCallback, useEffect, Dispatch, SetStateAction, ChangeEvent, ReactNode, MouseEvent } from 'react';

import { Word, PromptInfo, MarkedTextBlock, wordTrainer } from '../types/index';
import { loadWords, saveWordApi, saveWords, deleteWordApi, saveWordsToFile, loadTextFromFile } from '../api/api';

//TRODO remove type duplication
interface MergeObj {
    [key: string]: Word
}

const HOW_MUCH_TIMES_REPEAT_WORDS = 2;

const analyzeWord = (correctWord: string, wordToCheck: string): Array<MarkedTextBlock> => {
    let rez: Array<MarkedTextBlock>  = [];
    console.log(`analyzeWord0 ${rez}`);
    for (let i = 0; i < correctWord.length; i++) {
        if (correctWord[i] === wordToCheck[i]) {
            rez.push({textVal: correctWord[i], markType: 'p'});
        }
        else {
            rez.push({textVal: wordToCheck.substring(i), markType: 's'});
            break;
        }
    };
    rez.push({textVal: wordToCheck.substring(correctWord.length), markType: 's'});
    console.log(`analyzeWord ${rez}`)
    return rez;
}

const useWordsTrainer: wordTrainer = () => {
    const newWords = loadWords();
    const [words, setWords] = useState(newWords);
    const [currentWord, setCurrentWord] = useState('');
    const [hashTagsObj, setHashTagObj] = useState({});

    const onWordInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setCurrentWord(e.target.value),
        [setCurrentWord]
    );

    const filteredWords = useMemo(
        () => {
            const filteredWords: Array<Word> = [];
            let areThereActiveTags = false;
            const tagOnOffValues = Object.values(hashTagsObj);
            for(const tagOnOffVal of tagOnOffValues)
                {
                    if (tagOnOffVal) {
                        areThereActiveTags = true;
                        break;
                    }
                }
            if (!areThereActiveTags) {
                return [...words];
            }
            words.forEach(
                (word) => {
                    const {hashTag} = word;
                    if (!!hashTag) {
                        const tagsArr = hashTag.split('#');
                        for (const tag of tagsArr) {
                            if (hashTagsObj[tag]) {
                                filteredWords.push(word);
                                break;
                            }
                        }
                    }
                }
            );
            return filteredWords;
        },
        [words, hashTagsObj]
    );

    const promptInfo: PromptInfo | undefined = useMemo(
        () => {
            if (filteredWords.length === 0) {
                return;
            }
            const {val, translation, mark = 0, shouldBeRepeated = false, lastErrorInText} = filteredWords[0];
            console.log(`promptInfo ${lastErrorInText}`);
            const hint =  translation;
            const correctWord = shouldBeRepeated || mark < 1 ? val: '' ;
            const correctedWordArr = lastErrorInText ? analyzeWord(correctWord, lastErrorInText) : [];

            return {hint, correctWord, correctedWordArr, mark};
        },
        [filteredWords]
    );

    useEffect(
        () => {
            const newHashTagObj = words.reduce(
                (acc: {[key: string]: boolean}, {hashTag}) => {
                    if (!!hashTag) {
                        const wordsArr = hashTag.split('#');
                        wordsArr.forEach(
                            word => {
                                if (word && !acc[word]) {
                                    acc[word] = hashTagsObj[word] || false;
                                };
                            }
                        );
                    }
                    return acc;
                },
                {} 
            );
            setHashTagObj(newHashTagObj);
        },
        [words, setHashTagObj]
    );

    const onHashTagClicked = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            const itemId = e.target.id || e.target.parentElement.id || '' as string;

            if (hashTagsObj.hasOwnProperty(itemId)) {
                const newHashTagsObj = {...hashTagsObj};
                newHashTagsObj[itemId] = !newHashTagsObj[itemId];
                setHashTagObj(newHashTagsObj);
            }
        },
        [hashTagsObj, setHashTagObj]
    );

    const check = useCallback(
        () => {
            const newWords = [...words]
            .map(
                (word, ind) => {
                    const {val, translation, mark = 0, successfullGuesses = 0, unsuccessfullGuesses = 0} = word;
                    if (val === filteredWords[0].val) {
                        const currWordTrimmed = currentWord.trimStart().trimEnd();
                        console.log(`currWordTrimmed ${currWordTrimmed}`);
                        const isCorrect = currWordTrimmed === val;
                        const changedWord = {
                            ...word,
                            val,
                            translation,
                            mark: isCorrect ? mark + 1  : mark - HOW_MUCH_TIMES_REPEAT_WORDS,
                            shouldBeRepeated: !isCorrect,
                            lastErrorInText: isCorrect ? undefined : currWordTrimmed,
                            successfullGuesses: isCorrect ? successfullGuesses + 1 : successfullGuesses,
                            unsuccessfullGuesses: isCorrect ? unsuccessfullGuesses : unsuccessfullGuesses +1,
                        };
                        saveWordApi(changedWord);
                        return changedWord;
                    }
                    return word;
                }
            )
            .sort(
                ({mark: markA = 0}, {mark: markB = 0}) => markA - markB
            );
            setWords(newWords);
            setCurrentWord('');
            console.log(words);
            console.log('***************');
            console.log(newWords);
        },
        [words, filteredWords, setWords, currentWord, setCurrentWord]
    );


    const learn = (isRepeat = false) => {
        if (words.length === 0) {
            throw( new Error('Empty list'))
        }

        const wordToLearn = words.sort(({mark: markA = 0}, {mark: markB = 0}) => markA - markB)[0];
        console.log(JSON.stringify(words));
        const {val, translation, mark = 0} = wordToLearn;
        const prompTitle = isRepeat || mark < 1? ` ${val} ${translation} (${mark})` : `${translation} (${mark})` ;
        const answer = window.prompt(prompTitle) || '';
        if (answer === '@') {
            return;
        }
        const isCorrect = answer.trimStart().trimEnd() === val;
        wordToLearn.mark =  isCorrect ? mark + 1  : mark - HOW_MUCH_TIMES_REPEAT_WORDS;
        learn(!isCorrect);
    };

    const loadWordsFromTheFile = useCallback(
        async () => {
            const text = await loadTextFromFile();
            const wordsObj = JSON.parse(text) as unknown;
            //TODO create separate validation function, check approaches and rewrite and extend logic.
            if (Object.prototype.toString.call(wordsObj) === "[object Object]") {
                const wordsArr = Object.values(wordsObj as MergeObj);
                if (Array.isArray(wordsArr)){
                    wordsArr.forEach(
                        (val) => {
                            if (Object.prototype.toString.call(val) !== "[object Object]") {
                                alert('incorrect array element format');
                                return;
                            }
                            if (!val.hasOwnProperty('val') || !val.hasOwnProperty('translation')) {
                                alert('incorrect object format');
                                return;
                            } else if (!val.val || !val.translation) {
                                alert('empty value');
                                return;
                            }
                        }
                    );
                } else {
                    alert('incorrect array');
                    return;
                }
            } else {
                alert('incorrect first level object format');
                return;
            }
            saveWords(wordsObj as MergeObj);
            setWords(Object.values(wordsObj as MergeObj));
        },
        [setWords]
    );

    const saveWordsToTheFile = useCallback(
        () => {
            saveWordsToFile();
        },
        []
    );

    const saveWord = useCallback(
        (newWord: Word, oldWordKey?: string) => {
            setWords(
                (wordsState: Word[]) => ([
                    ...wordsState.filter(word => word.val !== newWord.val),
                    {...wordsState.find(word => word.val === newWord.val), ...newWord}
                ])
            );
            saveWordApi(newWord, oldWordKey);
        },
        [setWords]
    );

    const deleteWord = useCallback(
        (word: Word) => {
            setWords(
                (wordsState: Word[]) => (
                    wordsState.filter(
                        ({val}) => val !== word.val
                    )
                )
            );
            deleteWordApi(word);
        },
        [setWords]
    );




    return { 
        check,
        currentWord,
        onWordInputChange,
        promptInfo,
        loadWordsFromTheFile,
        saveWordsToTheFile,
        words: filteredWords,
        hashTagsObj,
        onHashTagClicked,
        saveWord,
        deleteWord
    };
}
export default useWordsTrainer;
