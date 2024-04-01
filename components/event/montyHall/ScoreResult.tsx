import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, Text, useColorModeValue } from '@chakra-ui/react';

import { darkMode, lightMode } from '@/styles/theme';
import styles from '@/styles/WaktyHallDoor.module.scss';

type Props = {
  score: number;
  gamesPlayed: number;
  switched: number;
};

export default function ScoreResult({ score, gamesPlayed, switched }: Props) {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );
  return (
    <div className={styles.table}>
      {!score && !gamesPlayed ? (
        <div className={styles.description}>
          <Link
            color={highlightColor}
            // className="link-to-wakzoo"
            href={'https://youtu.be/9ZJf2M6ZoGU?si=j2dYhcLeUe33Ydnm'}
            isExternal
          >
            링크: 몬티홀의 역설을 아십니까? - 왁굳의 노가리
            <ExternalLinkIcon mx="2px" />
          </Link>
          <Text textAlign="start">
            <br />
            여기 3개의 문이 있습니다. 3개의 문 뒤에는 2개의 꽝인 팬아트가 있고
            1개의 문 뒤에 기대되는 팬아트가 있습니다. <br />
            왁티 홀(진행자)은 문 중 하나를 열어 꽝 팬아트를 공개하면서 다시
            선택할 기회를 줍니다.
          </Text>
          <Text textAlign="start" pt="1rem">
            이때 여러분은 선택한 문을 바꿔야 할까요?
          </Text>
        </div>
      ) : null}
      {score || gamesPlayed ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <table className={styles.score}>
            <caption style={{ marginBottom: '1rem' }}>결과</caption>
            <thead>
              <tr>
                <th>{gamesPlayed}번째 게임</th>
                <th>횟수</th>
                <th>확률</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>정답</th>
                <td>{score}</td>
                <td>
                  {gamesPlayed === 0
                    ? '0.00'
                    : ((score / gamesPlayed) * 100).toFixed(2)}
                  %
                </td>
              </tr>
              <tr>
                <th>변경</th>
                <td>{switched}</td>
                <td>
                  {' '}
                  {gamesPlayed === 0
                    ? '0.00'
                    : // : ((switched / gamesPlayed) * 100).toFixed(2)}
                      ((score / switched) * 100).toFixed(2)}
                  %
                </td>
              </tr>
              <tr>
                <th>유지</th>
                <td>{gamesPlayed - switched}</td>
                <td>
                  {' '}
                  {gamesPlayed === 0
                    ? '0.00'
                    : ((score / (gamesPlayed - switched)) * 100).toFixed(2)}
                  {/* : (((gamesPlayed - switched) / gamesPlayed) * 100).toFixed(
                        2
                      )} */}
                  %
                </td>
              </tr>
            </tbody>
          </table>
          {/* <p>{`변경시 승리 확률: ${score === 0 ? 0 : ((score / switched) * 100).toFixed(2)}%`}</p>
          <p>{`유지시 승리 확률: ${score === 0 ? 0 : ((score / (gamesPlayed - switched)) * 100).toFixed(2)}%`}</p> */}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
