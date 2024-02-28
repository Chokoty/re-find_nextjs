'use client';

import { BellIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, Collapse } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { AiFillExperiment } from 'react-icons/ai';
import { BiSupport } from 'react-icons/bi';

type MyDrawerProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

const MyDrawer = React.forwardRef(
  (props: MyDrawerProps, ref: React.Ref<any>) => {
    return (
      <Collapse in={props.isOpen} animateOpacity>
        <Box
          className={`my-drawer ${props.isOpen ? 'open' : ''}`}
          ref={ref}
          w="260px"
          h="420px"
          position="absolute"
          top={props.isOpen ? '80px' : '-420px'}
          right="0"
          visibility={props.isOpen ? 'visible' : 'hidden'}
          color="#000"
          backgroundColor="#fff"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
          borderRadius="1rem"
          sx={{
            ul: {
              listStyle: 'none',
              padding: '16px',
              margin: '0',
              li: {
                '&:hover': {
                  fontWeight: 'bold',
                },
                '&:active': {
                  color: '#aaaaaa',
                  fontWeight: 'normal',
                },
              },
            },
          }}
        >
          <Box
            className="drawer-content"
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            sx={{
              '.list-item': {
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                padding: '5px 10px',
                marginRight: '20px',
                '.icon': {
                  marginRight: '10px',
                },
              },
            }}
          >
            <ul>
              {/* <li>
                <Link href="/" legacyBehavior>
                  <a className="list-item">
                    <AiFillHome className="icon" />
                    Home
                  </a>
                </Link>
              </li> */}
              <li>
                <Link href="/notice" legacyBehavior>
                  <a className="list-item">
                    <BellIcon className="icon" />
                    Notice
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about" legacyBehavior>
                  <a className="list-item">
                    <InfoIcon className="icon" />
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/support" legacyBehavior>
                  <a className="list-item">
                    <BiSupport className="icon" />
                    Support
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href="https://cafe.naver.com/steamindiegame/9524252"
                  legacyBehavior
                >
                  <a
                    className="list-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiFillExperiment
                      className="icon"
                      style={{
                        width: '20px',
                        height: '20px',
                        padding: '0',
                        marginRight: '0.5rem',
                      }}
                    />
                    <p
                      style={{
                        marginLeft: '0.5rem',
                      }}
                    >
                      (beta)이세돌 팬아트를 키워드로 찾아주는 AI
                    </p>
                  </a>
                </Link>
              </li>
              {/* <li>
                <Link href="https://waktaver.se/" legacyBehavior>
                  <a
                    className="list-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <NextImage
                      src="/static/icons/waksplorer-logo.png"
                      width={20}
                      height={20}
                      alt="waksplorer-logo"
                      style={{
                        marginRight: '0.5rem',
                      }}
                    />
                    왁스플로러 바로가기
                  </a>
                </Link>
              </li> */}
            </ul>
            {/* <LinkBtns /> */}
          </Box>
        </Box>
      </Collapse>
    );
  }
);
MyDrawer.displayName = 'MyDrawer';

export default MyDrawer;
