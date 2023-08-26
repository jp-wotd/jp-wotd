import { KanjiCharacter } from '@jp-wotd/shared/wotd/types';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import useSWR, { Fetcher } from 'swr';

export default function KanjiCard() {
  const fetcher: Fetcher<KanjiCharacter, string> = (url) =>
    fetch(url).then((r) => r.json());
  const {
    data: kanjiData,
    error: kanjiError,
    isLoading: kanjiIsLoading,
  } = useSWR('http://localhost:3333/api/kanji', fetcher);
  // adb reverse tcp:3333 tcp:3333
  if (kanjiError) console.log(kanjiError);
  if (kanjiIsLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <View style={styles.card}>
      <View style={styles.cardTitle}>
        <Text style={[styles.textLg, styles.cardTitleText]}>
          {kanjiData?.kanji}
        </Text>
      </View>
      <View style={styles.cardInfo}>
        <Text style={[styles.textSm, styles.cardText]}>
          Onyomi: {kanjiData?.onyomi.join(', ')}
        </Text>
        <Text style={[styles.textSm, styles.cardText]}>
          Kunyomi: {kanjiData?.kunyomi.join(', ')}
        </Text>
        <Text style={[styles.textSm, styles.cardText]}>
          Meaning: {kanjiData?.meaning.join(', ')}
        </Text>
        <Text style={[styles.textSm, styles.cardText]}>
          Stroke Count: {kanjiData?.strokeCount}
        </Text>
        <Text style={[styles.textSm, styles.cardText]}>
          JLPT: {kanjiData?.jlptLevel}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textSm: {
    fontSize: 24,
  },
  textLg: {
    fontSize: 192,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#143055',
    padding: 36,
    marginBottom: 24,
    flex: 1,
    flexDirection: 'row',
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  cardTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  cardTitleText: {
    color: '#ffffff',
    marginLeft: 12,
  },
  cardText: {
    color: '#ffffff',
    marginVertical: 12,
  },
});
