import {Word} from '../types/index';
import WordsList from './WordsList';
import WordEditor from './WordEditor';
import useWordsList from '../hooks/useWordsList';
import styles from '../page.module.css';

type AddEditWordProps = {
    wordsList: Word[],
    saveWord: (word: Word) => void,
    deleteWord: (word: Word) => void,
}
  

const AddEditWord = ({wordsList, saveWord, deleteWord}: AddEditWordProps) => {
    const {activeWord, onItemClicked} = useWordsList(wordsList);

    return(
        <div>
            <WordsList wordsList={wordsList} onItemClicked={onItemClicked}/>
            <WordEditor saveWord={saveWord} deleteWord={deleteWord} currWord={activeWord} />
        </div>
    );
};

export default AddEditWord;