import styles from './page.module.scss';
import { KanjiCard } from '@jp-wotd/wotd/next';

export default async function Index() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              idk what to put here 👋
            </h1>
          </div>
          <KanjiCard />
        </div>
      </div>
    </div>
  );
}
