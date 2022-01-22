import React from "react";
import styled from "styled-components";
import { Spin } from "antd";
import Image from "next/image";
import FooterTable from "../../../../components/FooterTable";
import { shortenAddress } from "../../../../functions";
import { UserReferral } from "../../hooks/useReferralListFetch";
import SearchBar from "../SearchBar";
import { ChainId } from "@sushiswap/sdk";
import { isMobile } from "react-device-detect";
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
    // padding: 0 38px 23px;
    padding: 0 38px 23px 100px;
  }

  table {
    width: 100%;

    thead {
      th {
        color: ${({ theme }) => theme.referralTableHeader};
        text-align: left;
        font-weight: 500;
        padding: 15px 3.5px;
        font-size: 12px;

        @media screen and (min-width: 768px) {
          padding: 17px 10px 24px;
          font-size: 17px;
        }
      }
    }

    tbody {
      td {
        color: ${({ theme }) => theme.referralTableBody};
        font-weight: 500;
        font-size: 12.3px;
        padding: ${isMobile ? "10px 2.5px" : "2.5px"};

        @media screen and (min-width: 768px) {
          font-size: 17px;
          padding: 10px;
        }
      }
    }
  }
`;

const Status = styled.div`
  ${({ status }) => `
    color: ${status === StatusEnum.ACTIVE ? "#72BF65" : "#EC5656"};
    background: ${
      status === StatusEnum.ACTIVE
        ? "rgba(114, 191, 101, 0.2)"
        : "rgba(236, 86, 86, 0.2)"
    };
  `}
  display: inline-block;
  padding: 8px 10px;
  border-radius: 500px;
  font-size: 12px;

  @media screen and (min-width: 768px) {
    padding: 10px 16px;
    font-size: 17px;
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

enum StatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

const StatusLabels = {
  [StatusEnum.ACTIVE]: "Active",
  [StatusEnum.INACTIVE]: "Inactive",
};

type Props = {
  account: string;
  chainId: ChainId;
  tableOptions: any;
  userReferralList: UserReferral[];
  loading: boolean;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setTableOptions: React.Dispatch<React.SetStateAction<any>>;
};

const UserReferralList: React.FC<Props> = ({
  account,
  chainId,
  tableOptions,
  userReferralList,
  loading,
  setSearchTerm,
  setTableOptions,
}) => {
  const formatAmount = (amount: string) => {
    if (isNaN(Number(amount))) {
      return "$0.000";
    }

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });

    return formatter.format(Number(amount));
  };

  const getTableBody = () => {
    if (!userReferralList.length) {
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
            <th>Wallet</th>
            <th>Swap Amount</th>
            <th>Farm Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userReferralList.map((userReferral) => (
            <tr key={userReferral.id}>
              <td>{shortenAddress(userReferral.wallet, isMobile ? 2 : 4)}</td>
              <td>{formatAmount(userReferral.swapAmount)}</td>
              <td>{formatAmount(userReferral.earnAmount)}</td>
              <td>
                <Status status={userReferral.status}>
                  {StatusLabels[userReferral.status]}
                </Status>
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
        <h2>User Referral List</h2>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Header>

      <TableWrapper>{getTableBody()}</TableWrapper>

      {(userReferralList.length && (
        <FooterTable
          dataSource={userReferralList}
          tableOptions={tableOptions}
          setTableOptions={setTableOptions}
          dataTotal={tableOptions.totalResults}
        />
      )) ||
        null}
    </Wrapper>
  );
};

export default UserReferralList;
