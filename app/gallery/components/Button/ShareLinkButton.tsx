import { Button, Text, useColorModeValue } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { MdShare } from 'react-icons/md';

import styles from '@/app/gallery/components/Button/ShareLinkButton.module.scss';
import { darkMode, lightMode } from '@/lib/theme';

export default function ShareLinkButton() {
  const highlightColor = useColorModeValue(
    lightMode.highlight,
    darkMode.highlight
  );

  const handleCopyLink = () => {
    // 복사하려는 링크를 여기에 입력하세요.
    // const linkToCopy = `https://re-find.xyz/gallery/${value}`;
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('갤러리 링크 복사됨');
    });
  };

  return (
    <Button
      className={styles.button}
      style={{ background: highlightColor, borderRadius: '80px' }}
      variant="solid"
      onClick={handleCopyLink}
    >
      <Text className={styles.text} color="white">
        <span className={styles.gallery}>갤러리</span> 공유하기
      </Text>
      <MdShare className={styles.icon} color="white" />
    </Button>
  );
}
