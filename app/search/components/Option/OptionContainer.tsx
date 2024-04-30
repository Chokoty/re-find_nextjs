'use client';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import MainOptions from '@/app/search/components/Option/MainOptions';
import Accordion, {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@/components/Accordion';

export default function OptionContainer() {
  return (
    <Accordion>
      <AccordionItem hasBorder={false}>
        {({ isExpanded }) => (
          <>
            <div className="flex w-full items-center justify-end">
              <AccordionButton type="filter">
                {isExpanded ? (
                  <>
                    필터 접기
                    <IoIosArrowUp size="17" />
                  </>
                ) : (
                  <>
                    필터 더보기
                    <IoIosArrowDown size="17" />
                  </>
                )}
              </AccordionButton>
            </div>
            <AccordionPanel>
              <MainOptions />
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
