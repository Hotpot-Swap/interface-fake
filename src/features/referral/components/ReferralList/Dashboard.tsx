import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
// images
const TOTAL_FRIENDS_IMG = '/images/total-friends.svg';
const TOTAL_EARNED = '/images/tokenstand.svg';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.referalCardBg};
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 32px 24px;
  margin-bottom: 40px;
  
  @media screen and (min-width: 768px) {
    padding: 40px;
    margin-bottom: 66px;
  }
`;

const Heading = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text1};
  margin: 0;
  
  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  
  @media screen and (min-width: 992px) {
    flex-direction: row;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    padding: 32px 0 0;

    > div {
      flex-basis: 50%;
      margin-bottom: 12px;
  
      @media screen and (min-width: 768px) {
        margin-bottom: 16px;
      }

      h3 {
        white-space: nowrap;
        color: ${({ theme }) => theme.primaryText3};
        font-size: 12px;
        margin-bottom: 0;
        
        @media screen and (min-width: 768px) {
          font-size: 17px;
        }
      }

      p {
        color: ${({ theme }) => theme.text1};
        font-size: 16px;
        margin: 0;
        font-weight: 600;
        
        @media screen and (min-width: 768px) {
          font-size: 24px;
        }
      }
    }
  }

  .total {
    background: rgba(114, 191, 101, 0.1);
    border: 1px solid #72BF65;
    border-radius: 20px;
    padding: 24px;
    width: 100%;
    margin-top: 16px;

    @media screen and (min-width: 992px) {
      padding: 32px 40px;
      width: 370px;
      margin-top: 0;
    }

    &__item {
      display: flex;
      align-items: center;

      &:first-child {
        margin-bottom: 32px;
      }
    }

    &__description {
      margin-left: 16px;
    }

    &__label {
      white-space: nowrap;
      color: ${({ theme }) => theme.primaryText2};
      font-size: 12px;
      margin-bottom: 0;
      font-weight: 500;
      
      @media screen and (min-width: 768px) {
        font-size: 14px;
      }
    }

    &__value {
      color: #72BF65;
      font-size: 16px;
      margin: 0;
      font-weight: 600;
      
      @media screen and (min-width: 768px) {
        font-size: 24px;
      }
    }
  }
`;

const Dashboard: React.FC = () => {
  return (
    <Wrapper>
      <Heading>Dashboard</Heading>

      <Content>
        <div className="items">
          <div>
            <h3>Total Farms Friends</h3>
            <p>0</p>
          </div>
          <div>
            <h3>Total Referral Friends</h3>
            <p>0</p>
          </div>
          <div>
            <h3>Total Farms Earned</h3>
            <p>0.000 STAND</p>
          </div>
          <div>
            <h3>Total Referral Earned</h3>
            <p>0.000 STAND</p>
          </div>
        </div>

        <div className="total">
          <div className="total__item">
            <Image
              src={TOTAL_FRIENDS_IMG}
              alt="total-friends"
              width="50"
              height="50"
              layout="fixed"
            />
            <div className="total__description">
              <h4 className="total__label">Active Friends/ Total Friends</h4>
              <p className="total__value">0/0</p>
            </div>
          </div>
          <div className="total__item">
            <Image
              src={TOTAL_EARNED}
              alt="total-friends"
              width="50"
              height="50"
              layout="fixed"
            />
            <div className="total__description">
              <h4 className="total__label">Total Earned</h4>
              <p className="total__value">0.000 STAND</p>
            </div>
          </div>
        </div>
      </Content>
    </Wrapper>
  );
};

export default Dashboard;
