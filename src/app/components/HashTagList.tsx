import {MouseEvent} from 'react';
import HashTagItem from './HashTagItem';
import styles from '../page.module.css';

type HashTagListProps = {
    hashTagObj: {[key: string]: boolean},
    onItemClicked: (e: MouseEvent<HTMLButtonElement>) => void
}
  

const HashTagList = ({hashTagObj, onItemClicked}: HashTagListProps) => (
    <div className={styles.hashTagList}>
        {
            Object.entries(hashTagObj)
            .sort(([_hashTag, val],[_hashTag1, val1]) =>  (+ val1) - (+ val))
            .map(([hashTag, isSelected]) => <HashTagItem
                key={hashTag}
                isSelected={isSelected}
                hashTag={hashTag}
                onItemClicked={onItemClicked}
            />)
        }
    </div>
);

export default HashTagList;
