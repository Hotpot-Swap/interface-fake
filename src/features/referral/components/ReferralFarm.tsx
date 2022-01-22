import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { shortenAddress } from "../../../functions";
import { useReferralFarmFetch } from "../hooks/useReferralFarmFetch";
import { Spin } from "antd";
import FooterTable from "../../../components/FooterTable";
import { isMobile } from "react-device-detect";
import SearchBar from "./SearchBar";
// images
const NoDataImage = "/icons/icon-stand.svg";

const Wrapper = styled.div`
  background: transparent;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  @media screen and (min-width: 768px) {
    margin-bottom: 41px;
    flex-direction: row;
    align-items: center;
  }

  h2 {
    font-weight: 600;
    font-size: 18px;
    color: ${({ theme }) => theme.primaryText2};
    margin-bottom: 16px;
    
    @media screen and (min-width: 768px) {
      font-size: 24px;
      margin-bottom: 0px;
    }
  }
  }
`;

const TableWrapper = styled.div`
  background: ${({ theme }) => theme.referralTableBg};
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  position: relative;
  padding: 0 10px 15px;

  @media screen and (min-width: 768px) {
    padding: 0 38px 23px;
  }

  table {
    width: 100%;

    thead {
      th {
        color: ${({ theme }) => theme.referralTableHeader};
        text-align: left;
        font-weight: 500;
        padding: 15px 2.5px;
        font-size: 12px;

        @media screen and (min-width: 768px) {
          padding: 17px 10px 24px;
          font-size: 17px;
        }
      }
    }

    tbody {
      .table-row {
        border-bottom: 1px solid ${({ theme }) => theme.borderItem};
      }
      .address {
        ${isMobile && `padding-bottom: 37px`};
      }

      td {
        color: ${({ theme }) => theme.referralTableBody};
        padding: 14.5px 3px;
        font-weight: 500;
        font-size: 12.3px;

        @media screen and (min-width: 768px) {
          font-size: 17px;
          padding: 10px;
        }
      }
    }
  }
`;

const Loading = styled.div`
  position: absolute;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.referralTableBg};
  border-radius: 20px;

  span i {
    background-color: ${({ theme }) => theme.text9};
  }

  div {
    color: ${({ theme }) => theme.text9};
    font-weight: 500;
    font-size: 16px;
  }
`;

const NoData = styled.div`
  margin: 0 0 9px 0;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 100px 0;

  img,
  .text {
    visibility: ${({ loading }) => (loading ? "hidden" : "visible")};
  }

  .text {
    font-weight: 500;
    font-size: 14px;
    color: ${({ theme }) => theme.referralTableHeader};
    margin-top: 16px;

    @media screen and (min-width: 768px) {
      font-size: 17px;
    }
  }

  img {
    opacity: 0.4;
    width: 53px;
    height: 68px;

    @media screen and (min-width: 768px) {
      width: 78px;
      height: 100px;
    }
  }
`;

const ReferralFarm: React.FC = () => {
  const {
    account,
    chainId,
    tableOptions,
    userReferralFarmList,
    loading,
    setSearchTerm,
    setTableOptions,
  } = useReferralFarmFetch();

  const formatAmount = (amount: string) => {
    if (isNaN(Number(amount))) {
      return "0.000";
    }

    return Number(amount).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
  };

  const getTableBody = () => {
    if (!userReferralFarmList.length) {
      return (
        <NoData loading={loading}>
          <Image src={NoDataImage} alt="icon-nodata" width="79" height="100" />
          <div className="text">No Data</div>

          {loading && (
            <Loading>
              <Spin tip="Loading..." />
            </Loading>
          )}
        </NoData>
      );
    }

    return (
      <table>
        <thead>
          <tr>
            {!isMobile && <th>Datetime</th>}
            <th>Wallet</th>
            <th>Farm Claimed Reward</th>
            <th>Total Earn</th>
          </tr>
        </thead>
        <tbody>
          {userReferralFarmList.map((userReferralFarm) => (
            <tr className="table-row" key={userReferralFarm.id}>
              {!isMobile && <td>06/19/21, 5:24:08 PM</td>}
              <td className="address">
                {shortenAddress(userReferralFarm.wallet, isMobile ? 2 : 4)}
              </td>
              <td>
                <div>
                  {formatAmount(userReferralFarm.totalEarnedStand)} STAND
                </div>
                <div className="amount-eth">0.000 ETH</div>
              </td>
              <td>
                <div>
                  {formatAmount(userReferralFarm.totalEarnedStand)} STAND
                </div>
                <div className="amount-eth">0.000 ETH</div>
              </td>
            </tr>
          ))}
          {loading && (
            <Loading>
              <Spin tip="Loading..." />
            </Loading>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <Wrapper>
      <Header>
        <h2>Farm Referral Reward List</h2>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Header>

      <TableWrapper>{getTableBody()}</TableWrapper>

      {(userReferralFarmList.length && (
        <FooterTable
          dataSource={userReferralFarmList}
          tableOptions={tableOptions}
          setTableOptions={setTableOptions}
          dataTotal={tableOptions.totalResults}
        />
      )) ||
        null}
    </Wrapper>
  );
};

export default ReferralFarm;
