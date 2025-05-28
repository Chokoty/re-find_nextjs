import { FaBookmark } from 'react-icons/fa';

type Prop = {
  num: number;
};

const connectUrl = (num: number) => {
  switch (num) {
    case 1:
      return 'first-gradient';
    case 2:
      return 'second-gradient';
    case 3:
      return 'third-gradient';
    default:
      return 'first-gradient';
  }
};

export default function RankingBadge({ num }: Prop) {
  return (
    <div
      className="absolute left-2 top-[-4px] z-[3] flex items-center justify-center min-[1460px]:left-4 min-[1460px]:top-[-11px] min-[1460px]:h-20 min-[1460px]:w-12"
      // className={styles.container}
      // filter="drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.20))"
    >
      {/* for gradient */}
      <svg width="0" height="0">
        <linearGradient id="first-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#FEE140" offset="0%" />
          <stop stopColor="#FA709A" offset="100%" />
        </linearGradient>
      </svg>
      <svg width="0" height="0">
        <linearGradient
          id="second-gradient"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop stopColor="#00F2FE" offset="0%" />
          <stop stopColor="#4FACFE" offset="100%" />
        </linearGradient>
      </svg>
      <svg width="0" height="0">
        <linearGradient id="third-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#38F9D7" offset="0%" />
          <stop stopColor="#43E97B" offset="100%" />
        </linearGradient>
      </svg>
      <FaBookmark
        className="size-10 min-[1100px]:h-[60px] min-[1100px]:w-12 min-[1460px]:h-[70px]"
        size="40"
        style={{ fill: `url(#${connectUrl(num)})` }}
      />
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white min-[1100px]:text-2xl min-[1460px]:text-3xl">
        {`0${num}`}
      </p>
    </div>
  );
}
