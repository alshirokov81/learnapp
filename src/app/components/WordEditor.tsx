
import {Word} from '../types/index';
import styles from '../page.module.css';
import useEditorsForm from '../hooks/useEditorsForm';

type WordEditorProps = {
    currWord?: Word,
    saveWord: (word: Word) => void,
    deleteWord: (word: Word) => void,
}

const WordEditor = ({currWord, saveWord, deleteWord}: WordEditorProps) => {
    const {
        word,
        changeWord,
        translation,
        changeTranslation,
        hashTag,
        changeHashTag,
        onSave,
        onDelete
    } = useEditorsForm(saveWord, deleteWord, currWord);

    return (
        <div>
            <input
              type="text"
              className={styles.textBox}
              value={word}
              onChange={changeWord}
            />
            <input
              type="text"
              className={styles.textBox}
              value={translation}
              onChange={changeTranslation}
            />
            <input
              type="text"
              className={styles.textBox}
              value={hashTag}
              onChange={changeHashTag}
            />
            <button
                type="button"
                disabled={!word}
                onClick={onSave}
            >
                Save word
            </button>
            <button
                type="button"
                disabled={!currWord}
                onClick={onDelete}
            >
                Delete word
            </button>
        </div>
    );
}

export default WordEditor;
