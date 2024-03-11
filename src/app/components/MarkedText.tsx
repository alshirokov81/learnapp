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
                            return <s>{textVal}</s>;
                    }                    
                }
            )}
        </p>
    );
}

export default MarkedText;
