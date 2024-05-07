import Link from 'next/link';
import { LuExternalLink } from 'react-icons/lu';

type CountResult = {
  changeWin: number;
  changeLose: number;
  keepWin: number;
  keepLose: number;
};

type Props = {
  score: number;
  gamesPlayed: number;
  resultCount: CountResult;
};

const URL_SOURCE = 'https://cafe.naver.com/steamindiegame/9859159';

export default function ScoreResult({
  score,
  gamesPlayed,
  resultCount,
}: Props) {
  const { changeWin, changeLose, keepWin, keepLose } = resultCount;
  const getChangeWinProbabilityInGame = () => {
    return gamesPlayed === 0
      ? 0
      : (((changeWin + keepLose) / gamesPlayed) * 100).toFixed(2);
  };
  const getKeepWinProbabilityInGame = () => {
    return gamesPlayed === 0
      ? 0
      : (((keepWin + changeLose) / gamesPlayed) * 100).toFixed(2);
  };

  return (
    <div className="mt-[30px] flex justify-center">
      {!score && !gamesPlayed ? (
        <div className="m-auto w-1/2">
          <Link
            className="flex items-center text-green-highlight transition hover:underline dark:text-pink-highlight"
            href={URL_SOURCE}
            target="_blank"
          >
            링크: 몬티홀의 역설을 아십니까? - 왁굳의 노가리
            <LuExternalLink className="ml-1 hidden 2xs:block" />
          </Link>
          <p className="text-start">
            <br />
            여기 3개의 문이 있습니다. 3개의 문 뒤에는 2개의 꽝인 팬아트가 있고
            1개의 문 뒤에 기대되는 팬아트가 있습니다. <br />
            왁티 홀(진행자)은 문 중 하나를 열어 꽝 팬아트를 공개하면서 다시
            선택할 기회를 줍니다.
          </p>
          <p className="pt-4 text-start">
            이때 여러분은 선택한 문을 바꿔야 할까요?
          </p>
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
          <table className="min-w-[300px]">
            <caption className="mx-0.5 mb-4 h-8 text-center text-2xl font-bold">
              결과
            </caption>
            <thead>
              <tr>
                <th className="h-8 w-16 border-base border-gray-500 bg-gray-300 text-center text-gray-900">
                  {gamesPlayed}번째 게임
                </th>
                <th className="h-8 w-16 border-base border-gray-500 bg-gray-300 text-center text-gray-900">
                  횟수
                </th>
                <th className="h-8 w-16 border-base border-gray-500 bg-gray-300 text-center text-gray-900">
                  확률
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="h-8 w-16 border-base border-gray-500 bg-gray-300 text-center text-gray-900">
                  변경시 이김
                </th>
                <td className="h-8 w-16 border-base border-gray-500 text-center">
                  {changeWin}
                </td>
                <td className="h-8 w-16 border-base border-gray-500 text-center">
                  {gamesPlayed === 0 ? '0.00' : getChangeWinProbabilityInGame()}
                  %
                </td>
              </tr>
              <tr>
                <th className="h-8 w-16 border-base border-gray-500 bg-gray-300 text-center text-gray-900">
                  유지시 이김
                </th>
                <td className="h-8 w-16 border-base border-gray-500 text-center">
                  {keepWin}
                </td>
                <td className="h-8 w-16 border-base border-gray-500 text-center">
                  {gamesPlayed === 0 ? '0.00' : getKeepWinProbabilityInGame()}%
                </td>
              </tr>
              <tr>
                <th className="h-8 w-16 border-base border-gray-500 bg-gray-300 text-center text-gray-900">
                  정답
                </th>
                <td className="h-8 w-16 border-base border-gray-500 text-center">
                  {score}
                </td>
                <td className="h-8 w-16 border-base border-gray-500 text-center">
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
