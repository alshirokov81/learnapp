import {MouseEvent} from 'react';
import styles from '../page.module.css';

type HashTagItemProps = {
    hashTag: string,
    isSelected: boolean,
    onItemClicked: (e: MouseEvent<HTMLButtonElement>) => void
}

const HashTagItem = ({hashTag, isSelected, onItemClicked}: HashTagItemProps)  => {
    return (
        <button
            id={hashTag}
            onClick={onItemClicked}
            className={`${isSelected? styles.hashTagSelected : ''} ${styles.hashTag}`}
        >
            <span>#{hashTag}</span>
        </button>
    );
}

export default HashTagItem;
