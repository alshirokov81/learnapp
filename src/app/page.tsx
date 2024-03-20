"use client";
import Image from 'next/image';
import styles from './page.module.css';
import WordChecker from './components/WordChecker'
import DataManagement from './components/DataManagement';
import WordsList from './components/WordsList';
import WordEditor from './components/WordEditor';
import AddEditWord from './components/AddEditWord';
import AppMode from './components/AppMode';
import HashTagList from './components/HashTagList';

import useWordsTrainer from './hooks/useWordsTrainer';
import useAppMode from './hooks/useAppMode';

export default function Home() {
  const { 
    check,
    currentWord,
    onWordInputChange,
    promptInfo,
    loadWordsFromTheFile,
    saveWordsToTheFile,
    words,
    hashTagsObj,
    onHashTagClicked,
    saveWord,
    deleteWord
} = useWordsTrainer();
const {isLearnMode, switchMode, buttonName} = useAppMode();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <DataManagement 
          loadFunc={loadWordsFromTheFile}
          saveFunc={saveWordsToTheFile}
        />
        <AppMode switchMode={switchMode} buttonText={buttonName}/>
        <HashTagList hashTagObj={hashTagsObj} onItemClicked={onHashTagClicked}/>
        {isLearnMode ?
            <WordChecker
              check={check}
              currentWord={currentWord}
              setCurrentWord={onWordInputChange}
              description={promptInfo}
            />
          :
          <AddEditWord     wordsList={words} saveWord={saveWord} deleteWord={deleteWord} />
        }

        <p>
          Get started by editingg&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
    </main>
  )
}
