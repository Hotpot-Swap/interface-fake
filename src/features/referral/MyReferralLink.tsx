import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import { notification } from "antd";
import axios from "axios";
import { chain } from "lodash";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { CheckCircle } from "react-feather";
import styled from "styled-components";
import { useActiveWeb3React } from "../../hooks";
import { useWalletModalToggle } from "../../state/application/hooks";
import { useIsDarkMode } from "../../state/user/hooks";
import { theme } from "../../theme";

const ReferralLinkContain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${isMobile ? `` : `gap:56px;`}
  justify-content: center;
  align-items: center;
  width: 100%;
  ${isMobile &&
  ` flex-direction: column-reverse;
  display: flex;
  `}
`;

const ReferralBlock = styled.div`
  background: rgba(114, 191, 101, 0.1);
  padding: ${isMobile ? "24px" : "32px 40px"};
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.primary1};
  width: 100%;
`;

const Text = styled.div`
  font-weight: 700;
  font-size: ${isMobile ? "18px" : "24px"};
  line-height: 126.5%;
  letter-spacing: 0.015em;
  color: ${({ theme }) => theme.textMyReferral};
`;

const LinkBlock = styled.div`
  padding: ${isMobile ? "11px 12px" : "19px 24px"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.bgReferralLink};
  border-radius: 8px;
  margin: 16px 0;
  .copy-link {
    cursor: pointer;
    svg { 
      width: 19px;
    }
 }
  .referral-link {
    color: ${({ theme }) => theme.text6};
    font-weight: 500;
    font-size: ${isMobile ? "14px" : "17px"};
    line-height: 126.5%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 450px;

    @media (max-width: 1380px) {
      width: 212px;
  }
`;

const ShareBlock = styled.div`
  display: flex;
  font-weight: 500;
  font-size: ${isMobile ? "14px" : "17px"};
  line-height: 126.5%;
  color: ${({ theme }) => theme.primaryText2};

  .text-share {
    margin-right: 42px;
  }

  img {
    margin-right: 26px;
    cursor: pointer;
    ${isMobile && `width: 21px;`}
    :hover {
      opacity: 0.6;
    }
  }
`;

const IntroBlock = styled.div`
  width: 100%;
  ${(props) => props.account && isMobile && `margin-bottom:40px;`}
  u {
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    a {
      color: ${({ theme }) => theme.text9};
    }
  }
`;

const TextLarge = styled.div`
  font-weight: 700;
  font-size: ${isMobile ? "24px" : "40px"};
  line-height: 126.5%;
  color: ${({ theme }) => theme.primaryText2};
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-size: ${isMobile ? "14px" : "17px"};
  line-height: 126.5%;
  color: ${({ theme }) => theme.text6};
  margin: ${isMobile ? "16px 0px" : "24px 0px"};
`;

const ButtonConnect = styled.button`
  background: ${({ theme }) => theme.greenButton};
  border-radius: 8px;
  color: ${({ theme }) => theme.white};
  min-height: 40px;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  padding: 16px;
  margin-bottom: 56px;

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 12px;
    margin-bottom: 24px;
  }
`;

const TransactionStatusText = styled.span`
  font-size: ${isMobile ? "10px" : "15px"};
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: ${({ theme }) => theme.text9};
  justify-content: center;
  svg {
    margin-right: 4px;
    width: 16px;
    @media (max-width: 640px) {
      width: 12px;
    }
  }
`;

const MyReferralLink = ({}) => {
  const darkMode = useIsDarkMode();
  const { account, chainId } = useActiveWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const [isCopy, setCopy] = useState(false);
  const [myRef, setMyRef] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(myRef);
    setCopy(true);
  };

  useEffect(() => {
    isCopy &&
      setTimeout(() => {
        setCopy(false);
      }, 800);
  }, [isCopy]);

  const getMyRef = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_REFERRAL}/api/user-info`,
      { params: { userId: account, chainId: chainId } }
    );
    const myref = `${process.env.NEXT_PUBLIC_DOMAIN}/?ref=${res.data.refer_code}`;
    setMyRef(myref);
  };
  useEffect(() => {
    account && getMyRef();
  }, [account, chainId]);

  return (
    <ReferralLinkContain>
      {account && (
        <ReferralBlock>
          <Text>My Referral Link</Text>
          <LinkBlock>
            <div className="referral-link ">{myRef}</div>
            {isCopy ? (
              <TransactionStatusText>
                <CheckCircle />
                <div>Copied</div>
              </TransactionStatusText>
            ) : (
              <div className="copy-link" onClick={handleCopy}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM15 5H8C6.9 5 6.01 5.9 6.01 7L6 21C6 22.1 6.89 23 7.99 23H19C20.1 23 21 22.1 21 21V11L15 5ZM8 21V7H14V12H19V21H8Z"
                    fill={darkMode ? "white" : "#667795"}
                  />
                </svg>
              </div>
            )}
          </LinkBlock>
          <ShareBlock>
            <div className="text-share">Share</div>
            <a
              title="Share on Telegram"
              href={`https://telegram.me/share/url?url=${myRef}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={`/images/telegram-${darkMode}.svg`} alt="telegram" />
            </a>

            <a
              title="Share on twitter"
              href={`https://twitter.com/intent/tweet?url=${myRef}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={`/images/twitter-${darkMode}.svg`} alt="twitter" />
            </a>
          </ShareBlock>
        </ReferralBlock>
      )}
      <IntroBlock account={account}>
        <TextLarge>Invite Your Friends. Earn Cryptocurrency Together</TextLarge>

        <TextSmall>
          Earn a certain commission reward from your friends swap on TokenStand
          and 5% from their earnings on Farms
        </TextSmall>

        {account ? (
          <u>
            <a>Read more</a>
          </u>
        ) : (
          <ButtonConnect onClick={toggleWalletModal}>
            {i18n._(t`Invite Friends`)}
          </ButtonConnect>
        )}
      </IntroBlock>
    </ReferralLinkContain>
  );
};

export default MyReferralLink;
