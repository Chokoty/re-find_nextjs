import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import { Soop, Waksplorer, Wakzoo } from '@/lib/images';

const XButton = () => (
  <Link
    href="https://twitter.com/RE_FIND_XYZ"
    target="_blank"
    className="flex size-10 items-center justify-center rounded-lg bg-blackAlpha-900 shadow-md"
  >
    <FaXTwitter className="size-5 text-white dark:size-7" />
  </Link>
);

const SoopButton = () => (
  <Link
    href="https://ch.sooplive.co.kr/ecvhao"
    target="_blank"
    className="flex size-10 items-center justify-center  rounded-lg bg-custom-dark shadow-md"
  >
    <Image
      className="size-9"
      width={30}
      height={30}
      quality={90}
      src={Soop}
      alt="soop"
    />
  </Link>
);
const WakzooButton = () => (
  <Link
    href="https://cafe.naver.com/steamindiegame"
    target="_blank"
    className="size-10 rounded-lg bg-whiteAlpha-900 shadow-md"
  >
    <Image
      width={60}
      height={60}
      quality={90}
      src={Wakzoo}
      alt="naver-cafe-logo"
    />
  </Link>
);

const YoutubeButton = () => (
  <Link
    href="https://www.youtube.com/@waktaverse"
    target="_blank"
    className="flex size-10 items-center justify-center rounded-lg bg-[#FF0000] shadow-md"
  >
    <FaYoutube className="size-5 text-white" />
  </Link>
);

const WaksplorerButton = () => (
  <Link
    href="https://waktaver.se/"
    target="_blank"
    className="rounded-lg bg-whiteAlpha-900 shadow-md"
  >
    <Image
      className="size-10"
      width={30}
      height={30}
      quality={90}
      src={Waksplorer}
      alt="waksplorer"
    />
  </Link>
);

export default function LinkBtns() {
  return (
    <div className="flex items-center justify-center gap-2 py-2.5">
      <WakzooButton />
      <SoopButton />
      <YoutubeButton />
      <WaksplorerButton />
      <XButton />
    </div>
  );
}
