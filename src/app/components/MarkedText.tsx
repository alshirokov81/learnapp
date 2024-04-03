import { MarkedTextBlock } from '../types/index';
import styles from '../page.module.css';

const MarkedText = ({markedTextArr}: {markedTextArr: Array<MarkedTextBlock>}) => {
    return (
        <p className={styles.textBox}>
            {markedTextArr.map(
                ({textVal, markType}) => {
                    switch (markType) {
                        case 'b':
                            return <b>{textVal}</b>;
                        case 'p':
                            return <span>{textVal}</span>;
                        case 's':
                            return <span className={styles.checkedTextError}>{textVal}</span>;
                        case 'g':
                            return <span className={styles.checkedTextUndefined}>{textVal}</span>;
                    }                    
                }
            )}
        </p>
    );
}

export default MarkedText;
