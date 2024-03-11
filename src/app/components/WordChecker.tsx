"use client";
import {useCallback, FormEvent, ChangeEvent, FC} from 'react';
import {PromptInfo} from '../types/index';

import styles from '../page.module.css';
import useWordsTrainer from '../hooks/useWordsTrainer';
import MarkedText from '../components/MarkedText';

//TODO refactor type und import function types from types
type WordCheckerProps = {
  check: () => void,
  currentWord: string,
  setCurrentWord: (e: ChangeEvent<HTMLInputElement>) => void,
  description: PromptInfo | undefined,
}


const WordChecker: FC<WordCheckerProps> = ({check, currentWord, setCurrentWord, description}) => {
    //const [check, currentWord, setCurrentWord, description,] = useWordsTrainer();
    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            check();
        },
        [check]
    );
    if (!description) return null;
    const {hint, correctWord, correctedWordArr, mark} = description;
    return (
        <div>
          <p>
            WordChecker!
          </p>
          <p className={styles.textBox}>
            {hint} Your mark = {mark}
          </p>
          <p className={styles.textBox}>
            {correctWord}
          </p>
          <MarkedText markedTextArr={correctedWordArr} />
          <form onSubmit={onSubmit}>
            {/*
            <label>Bedeutung auf Deutsch:</label>
            */}
            <input
              type="text"
              id="fname"
              className={styles.textBox}
              name="fname"
              value={currentWord}
              onChange={setCurrentWord}
            />
            {/*
            <button
              type="button"
              value="Check"
              onClick={check}
            >
                Check
            </button>
            */}
           </form>
        </div>
    )
}

export default WordChecker;
