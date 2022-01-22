import React from 'react';
import styled from 'styled-components';
import { useReferralListFetch } from '../../hooks/useReferralListFetch';
import Dashboard from './Dashboard';
import UserReferralList from './UserReferralList';

const Wrapper = styled.div`
  margin-top: 12px;
`;

const ReferralList: React.FC = () => {
  const  {
    account,
    chainId,
    tableOptions,
    userReferralList,
    loading,
    setSearchTerm,
    setTableOptions
  } = useReferralListFetch();

  return (
    <Wrapper>
      <Dashboard />
      <UserReferralList
        account={account}
        chainId={chainId}
        tableOptions={tableOptions}
        userReferralList={userReferralList}
        loading={loading}
        setSearchTerm={setSearchTerm}
        setTableOptions={setTableOptions}
      />
    </Wrapper>
  );
};

export default ReferralList;
