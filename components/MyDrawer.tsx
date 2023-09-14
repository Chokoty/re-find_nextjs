import React from 'react';
import Link from 'next/link';
import NextImage from 'next/image';

import { Box, Button, Image, Collapse } from '@chakra-ui/react';
import { AiFillExperiment, AiFillHome } from 'react-icons/ai';
import { FaTwitter, FaYoutube } from 'react-icons/fa';
import { InfoIcon, BellIcon } from '@chakra-ui/icons';
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
          top={props.isOpen ? '108px' : '-420px'}
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
              <li>
                <Link href="/" legacyBehavior>
                  <a className="list-item">
                    <AiFillHome className="icon" />
                    Home
                  </a>
                </Link>
              </li>
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
              <li>
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
              </li>
            </ul>
            <Box
              className="menu-footer"
              position="absolute"
              bottom="20px"
              width="100%"
              padding="10px 0"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
            >
              <Button
                href="https://twitter.com/rerurureruru"
                as="a"
                target="_blank"
                width="32px"
                mr="2"
                p="0"
                colorScheme="twitter"
                bg="#1DA1F2"
                shadow="md"
              >
                <FaTwitter />
              </Button>
              <Button
                width="32px"
                p="0"
                mr="2"
                href="https://cafe.naver.com/steamindiegame"
                colorScheme="green"
                // bg="#03CF35"
                bg="#FFFFFF"
                as="a"
                target="_blank"
                shadow="md"
              >
                <Image
                  boxSize="20px"
                  objectFit="cover"
                  src="static/icons/naver-cafe-logo2.gif"
                  alt="naver-cafe-logo"
                />
              </Button>
              <Button
                width="32px"
                p="0"
                mr="2"
                href="https://www.youtube.com/@waktaverse"
                colorScheme="red"
                bg="#FF0000"
                as="a"
                target="_blank"
                shadow="md"
              >
                <FaYoutube color="white" />
              </Button>
              <Button
                width="32px"
                p="0"
                mr="2"
                href="https://github.com/re-find-WAKTAVERSE"
                bg="#eee"
                as="a"
                target="_blank"
                shadow="md"
              >
                {/* <Image
                            boxSize="20px"
                            objectFit="cover"
                            src="static/icons/github.svg"
                            alt="github-logo"
                        /> */}
              <svg
                aria-hidden="true"
                className="octicon octicon-mark-github"
                height="24"
                version="1.1"
                viewBox="0 0 16 16"
                width="24"
                color="#333"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
MyDrawer.displayName = 'MyDrawer';

export default MyDrawer;

const GithubIcon = () => (
  <Box
    width="36px"
    height="36px"
    backgroundImage="url('/static/icons/search-icon.svg')"
    backgroundPosition="center"
    backgroundSize="contain"
  />
);
