'use client';
import useSWR, { Fetcher } from 'swr';
import styles from './KanjiCard.module.scss';
import { KanjiCharacter } from '@jp-wotd/shared/wotd/types';

export default function KanjiCard() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  const fetcher: Fetcher<KanjiCharacter, string> = (url) =>
    fetch(url).then((r) => r.json());
  const {
    data: kanjiData,
    error: kanjiError,
    isLoading: kanjiIsLoading,
  } = useSWR('/api/kanji', fetcher);
  if (kanjiError) console.log(kanjiError);
  if (kanjiIsLoading) return <div>Loading...</div>;
  return (
    <div className={styles['card']}>
      <div className={styles['card__kanji']}>
        <h1>{kanjiData?.kanji}</h1>
      </div>
      <div className={styles['card__text']}>
        <h3>
          <span>Onyomi: </span>
          {kanjiData?.onyomi.join(', ')}
        </h3>
        <h3>
          <span>Kunyomi: </span>
          {kanjiData?.kunyomi.join(', ')}
        </h3>
        <h3>
          <span>Meaning: </span>
          {kanjiData?.meaning.join(', ')}
        </h3>
        <h3>
          <span>Stroke Count: </span>
          {kanjiData?.strokeCount}
        </h3>
        <h3>
          <span>JLPT: </span>
          {kanjiData?.jlptLevel}
        </h3>
      </div>
    </div>
  );
}
