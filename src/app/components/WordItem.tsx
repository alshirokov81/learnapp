import {MouseEvent} from 'react';
import {Word} from '../types/index';
import styles from '../page.module.css';

type WordsListProps = {
    word: Word,
    onItemClicked: (e: MouseEvent<HTMLButtonElement>) => void
}

const WordItem = ({word: {val, translation, successfullGuesses, unsuccessfullGuesses, mark }, onItemClicked}: WordsListProps)  => {
    return (
        <button id={val} onClick={onItemClicked} className={styles.wordButton}>
            <span>{val}</span>
            <span> - </span>
            <span>{translation}</span>
            <span>       {`${successfullGuesses}/${unsuccessfullGuesses}`}</span>
            <span>       {`${mark}`}</span>
        </button>
    );
}

export default WordItem;
