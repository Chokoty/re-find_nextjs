import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';

type Props = {
  type?: 'button' | 'link';
  url?: string;
  handleClick?: () => void;
};

export default function MoreButton({
  type = 'button',
  url = '',
  handleClick = () => {},
}: Props) {
  const commonClassName = 'flex flex-col items-center justify-center gap-1';
  return (
    <div className="flex items-center justify-center">
      {type === 'button' ? (
        <button className={commonClassName} onClick={handleClick}>
          <CiCirclePlus size="100" />
          <p>더보기</p>
        </button>
      ) : (
        <Link href={url} className={commonClassName}>
          <CiCirclePlus size="100" />
          <p>더보기</p>
        </Link>
      )}
    </div>
  );
}
