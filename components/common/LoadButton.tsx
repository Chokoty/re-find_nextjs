import { Button, Tooltip } from '@chakra-ui/react';
import { FaArrowDown } from 'react-icons/fa6';

type Prop = {
  loadData: () => void;
};

export default function LoadButton({ loadData }: Prop) {
  return (
    <Tooltip label="수동으로 불러오기">
      <Button
        onClick={loadData}
        borderRadius="3rem"
        w="3rem"
        h="3rem"
        mt="2rem"
      >
        <FaArrowDown
          style={{
            // color: '#5C5F6B',
            // position: 'relative',
            // top: '0.1rem',
            width: '1.2rem',
            height: '1.2rem',
          }}
        />
      </Button>
    </Tooltip>
  );
}
