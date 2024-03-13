import { ChangeEvent, MouseEventHandler, ReactHTMLElement, MouseEvent} from 'react';

export type Word = {
    val: string,
    translation: string,
    mark?: number,
    shouldBeRepeated?: boolean,
    lastErrorInText?: string,
    successfullGuesses?: number,
    unsuccessfullGuesses?: number,
    hashTag?: string,
};

export type HashTagsObj = {
    [key: string]: boolean
}

export type OnKlickVoid = (e: MouseEvent<HTMLButtonElement>) => void;

export type PromptInfo = {hint: string, correctWord: string, correctedWordArr: Array<MarkedTextBlock>, mark: number};
export type MarkedTextBlock = {textVal: string, markType: 's' | 'p' | 'b'};
export type wordTrainer = () => 
{
    check: () => void
    currentWord: string,
    onWordInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    promptInfo:   PromptInfo | undefined,
    loadWordsFromTheFile: OnKlickVoid,
    saveWordsToTheFile: OnKlickVoid,
    words: Word[],
    hashTagsObj: HashTagsObj,
    onHashTagClicked: (e: MouseEvent<HTMLButtonElement>) => void,
    saveWord: (word: Word) => void,
    deleteWord: (word: Word) => void,
};