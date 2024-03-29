"use client";

import WORDS_FIXED from '../emulationData/fixedWords';
import {Word} from '../types/index';

const win = typeof window !== "undefined" ? window : null;

const storage = win && win.localStorage;
interface MergeObj {
    [key: string]: Word
}
let wordsToLearnObj: MergeObj = {};

const loadWords = () => {
    //similating web
    //TODO create back und rewrite functionality
    const localCopyJSON = storage && storage.getItem('wordsToLearnObj');
    wordsToLearnObj = !!localCopyJSON && JSON.parse(localCopyJSON) as MergeObj || {};
/*
    Object.keys(wordsToLearnObj).forEach((key: string) => {
        if (wordsToLearnObj[key].translation === '') {
            delete wordsToLearnObj[key];
        }
    })
*/
/*
    const hardcodedWords =  WORDS_FIXED;
    hardcodedWords.forEach(
        (elem) => {
            const {val, translation} = elem;
            wordsToLearnObj[elem.val] = {...wordsToLearnObj[elem.val], val, translation};
        }
    );
    storage.setItem('wordsToLearnObj', JSON.stringify(wordsToLearnObj));
    */
    return Object.values(wordsToLearnObj);
    
}

const saveWordApi = (word: Word, oldWordKey?: string) => {
    //simulating web
    //TODO create back und functionality
    const newWordsToLearnObj = {...wordsToLearnObj};
    if (oldWordKey) {
        delete newWordsToLearnObj[oldWordKey];
    }
    wordsToLearnObj = { ...newWordsToLearnObj, [word.val]: word};
    storage && storage.setItem('wordsToLearnObj', JSON.stringify(wordsToLearnObj));
}

const deleteWordApi = (word: Word) => {
    //simulating web
    //TODO create back und functionality
    const wordsToLearnNewObj = { ...wordsToLearnObj };
    delete wordsToLearnNewObj[word.val];
    storage && storage.setItem('wordsToLearnObj', JSON.stringify(wordsToLearnNewObj));
}

const saveWords = (wordsToLearnObj: MergeObj) => {
    //simulating web
    //TODO create back und functionality
    storage && storage.setItem('wordsToLearnObj', JSON.stringify(wordsToLearnObj));
}

const saveWordsToFile = async () => {
    const fileContent = JSON.stringify(wordsToLearnObj);
    var blobToSave = new Blob([fileContent ], { type: 'text/plain' });
    const pickerOptions = {
      suggestedName: 'WordsToLearn.txt',
      types: [
        {
          description: 'Simple Text File',
          accept: {
            'text/plain': ['.txt'],
          },
        },
      ],
    };
    if (win) {
        const fileHandle = await win.showSaveFilePicker(pickerOptions as globalThis.SaveFilePickerOptions);
        const writableFileStream = await fileHandle.createWritable();
        await writableFileStream.write(blobToSave);
        await writableFileStream.close();
    }
};

const loadTextFromFile = async () => {
    if (win) {
        const [fileHandle] = await window.showOpenFilePicker();
        const file =  await fileHandle.getFile();
        const text = await file.text();
        return text;
    }
}

export {
    loadWords,
    saveWordApi,
    deleteWordApi,
    saveWords,
    saveWordsToFile,
    loadTextFromFile,
}
