import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useIsDarkMode } from "../../state/user/hooks";
import { isMobile } from "react-device-detect";

const Wapper = styled.div`
  background: ${({ theme }) => theme.bgCardClaim};
  border: 1px solid rgba(114, 191, 101, 0.5);
  box-sizing: border-box;
  border-radius: 20px;
  width: 100%;
`;
const WapperContainer = styled.div`
  padding: ${isMobile ? "15px 8px" : "15px 0"};
`;
const ClaimContainer = styled.div`
  padding: ${isMobile ? "0px 8px" : "0px 40px"};
  display: flex;
  justify-content: space-between;
`;
const ClaimLogo = styled.div`
  // margin-top: -18px;
`;
const ClaimContent = styled.div`
  padding: ${isMobile ? "6.5px 0px" : "17px 0px"};
  width: fit-content;
`;
const GroupButton = styled.div`
  margin-top: ${isMobile ? "33.5px" : "41px"};
  display: flex;
  button {
    line-height: 20px;
    letter-spacing: 0.015em;
    font-family: SF UI Display;
    font-style: normal;
    font-size: ${isMobile ? "14px" : "17px"};
    border-radius: 30px;
    height: ${isMobile ? "40px" : "48px"};
  }
  .button-claim {
    width: 108px;
    padding: ${isMobile ? "12px 24px 11px" : "14px 32px"};
    font-weight: 500;
    line-height: 20px;
    color: #72bf65;
    background-color: rgba(114, 191, 101, 0.15);
  }
  .button-history {
    display: flex;
    width: 122px;
    justify-content: space-evenly;
    align-items: center;
    font-weight: 500;
    background: ${({ theme }) => theme.bgHistory};
    border-radius: 30px;
    color: ${({ theme }) => theme.primaryText3};
    margin-left: ${isMobile ? "8px" : "16px"};
    svg {
      path {
        fill: ${({ theme }) => theme.primaryText2};
      }
    }
  }
`;
const Heading = styled.div`
  // width: ${isMobile ? "350px" : "300px"};
  height: ${isMobile ? "40px" : "56px"};
  display: flex;
  .heading-content-container {
    font-family: SF UI Display;
    align-items: center;
    letter-spacing: 0.015em;
    margin-left: 12px;
  }
  .heading {
    color: ${({ theme }) => theme.primaryText3};
    font-size: ${isMobile ? "12px" : "17px"};
    line-height: 20px;
  }
  .amount {
    color: ${({ theme }) => theme.text1};
    font-size: ${isMobile ? "16px" : "24px"};
    font-weight: 600;
    line-height: 29px;
    margin-top: ${isMobile ? "-18px" : "-5px"};
  }
`;

const ClaimCard = ({ heading }) => {
  const darkMode = useIsDarkMode();
  return (
    <Wapper>
      <WapperContainer>
        <ClaimContainer>
          <ClaimContent>
            <Heading>
              <Image
                className="rounded-full z-10"
                src={"/icons/tokenstand_circle_logo.png"}
                width={isMobile ? "40px" : "56px"}
                height={isMobile ? "40px" : "56px"}
              />
              <div className="heading-content-container">
                <p className="heading">{heading}</p>
                <div className="amount">1000.000 STAND</div>
              </div>
            </Heading>
            <GroupButton>
              <button className="button-claim">Claim</button>
              <button className="button-history">
                <svg
                  width={"21px"}
                  height={"18px"}
                  viewBox="0 0 21 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0C9.61305 0 7.32387 0.948211 5.63604 2.63604C3.94821 4.32387 3 6.61305 3 9H0L3.89 12.89L3.96 13.03L8 9H5C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9C19 12.87 15.87 16 12 16C10.07 16 8.32 15.21 7.06 13.94L5.64 15.36C6.47341 16.198 7.46449 16.8627 8.55606 17.3158C9.64764 17.769 10.8181 18.0015 12 18C14.3869 18 16.6761 17.0518 18.364 15.364C20.0518 13.6761 21 11.3869 21 9C21 6.61305 20.0518 4.32387 18.364 2.63604C16.6761 0.948211 14.3869 3.55683e-08 12 0ZM11 5V10L15.25 12.52L16.02 11.24L12.5 9.15V5H11Z"
                    fill="white"
                    fillOpacity="0.87"
                  />
                </svg>
                History
              </button>
            </GroupButton>
          </ClaimContent>
          <ClaimLogo>
            <img
              src={`${
                darkMode
                  ? "./icons/tokenstand-shield-shape.png"
                  : "./icons/tokenstand-shield-shape2.png"
              }`}
              alt=""
              height={isMobile && "120,89px"}
              width={isMobile && "94,49"}
            />
          </ClaimLogo>
        </ClaimContainer>
      </WapperContainer>
    </Wapper>
  );
};
export default ClaimCard;
