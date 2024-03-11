import {MouseEvent} from 'react';
import {Word} from '../types/index';
import WordItem from './WordItem';
import styles from '../page.module.css';

type WordsListProps = {
    wordsList: Word[],
    onItemClicked: (e: MouseEvent<HTMLButtonElement>) => void
}
  

const WordsList = ({wordsList, onItemClicked}: WordsListProps) => (
    <div className={styles.wordsList}>
        {
            wordsList.map((word) => <WordItem word={word} key={word.val} onItemClicked={onItemClicked} />)
        }
    </div>
);

export default WordsList;
