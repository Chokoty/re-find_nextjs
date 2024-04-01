import { Text } from '@chakra-ui/react';

import styles from '@/styles/WaktyHallDoor.module.scss';

type CountResult = {
  changeWin: number;
  changeLose: number;
  keepWin: number;
  keepLose: number;
};

type Props = {
  score: number;
  gamesPlayed: number;
  switched: boolean;
  resultCount: CountResult;
};

export default function ScoreResult({
  score,
  gamesPlayed,
  switched,
  resultCount,
}: Props) {
  const { changeWin, changeLose, keepWin, keepLose } = resultCount;
  const getChangeWinProbabilityInGame = () => {
    return score === 0
      ? 0
      : (((changeWin + keepLose) / gamesPlayed) * 100).toFixed(2);
  };
  const getKeepWinProbabilityInGame = () => {
    return score === 0
      ? 0
      : (((keepWin + changeLose) / gamesPlayed) * 100).toFixed(2);
  };

  return (
    <div className={styles.table}>
      {!score && !gamesPlayed ? (
        <div className={styles.description}>
          <Text textAlign="start">
            세 개의 문이 제시됩니다. 두 개의 문 뒤에는 꽝인 팬아트가 있습니다.
            세 번째 뒤에는 기대되는 팬아트가 있습니다. <br />세 개의 문 중 어느
            문에 상품이 들어 있는지 추측해야 합니다. <br />
            몬티 홀(진행자)은 문 중 하나를 열어 꽝 팬아트를 드러냅니다. 원래
            문에 선택을 유지하거나 문 선택을 변경할 수 있는 옵션이 제공됩니다.
          </Text>
          <Text textAlign="start" pt="1rem">
            어느 쪽이 이길 가능성이 더 높을까요?
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
                <th>변경시 이김</th>
                <td>{changeWin}</td>
                <td>
                  {gamesPlayed === 0 ? '0.00' : getChangeWinProbabilityInGame()}
                  %
                </td>
              </tr>
              <tr>
                <th>유지시 이김</th>
                <td>{keepWin}</td>
                <td>
                  {gamesPlayed === 0 ? '0.00' : getKeepWinProbabilityInGame()}%
                </td>
              </tr>
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
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
