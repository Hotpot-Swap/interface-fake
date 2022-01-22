import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

const initialTableOptions = {
  current: 1,
  pageSize: isMobile ? 5 : 10,
  totalPage: 0,
  totalResults: 0,
  itemStart: 1,
  itemEnd: isMobile ? 5 : 10,
};

export interface UserReferral {
  id: string;
  wallet: string;
  swapAmount: string;
  earnAmount: string;
  status: string;
}

export const useReferralListFetch = () => {
  const { account, chainId } = useWeb3React();
  const [userReferralList, setUserReferralList] = useState<UserReferral[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableOptions, setTableOptions] = useState(initialTableOptions);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchUserReferralList = async (page: number, limit: number, search = '') => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://61e519cf595afe00176e52f3.mockapi.io/api/referral-list',
        {
          params: {
            limit,
            page,
            search
          },
        }
      );

      const referralList = res.data;
      if (referralList) {
        setUserReferralList(referralList.data);
        setTableOptions((prev) => ({
          ...prev,
          totalResults: referralList.total,
          totalPage: Math.ceil(referralList.total / tableOptions.pageSize),
        }));
      }
      setLoading(false);
    } catch (error) {
      setUserReferralList([]);
      setLoading(false);
    }
  };

  // Search and initial
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }

    setTableOptions((prev) => ({
      ...prev,
      current: 1,
      itemStart: 1,
      itemEnd: prev.pageSize
    }));
    fetchUserReferralList(1, tableOptions.pageSize, searchTerm);
  }, [account, chainId, searchTerm]);

  // Table options
  useEffect(() => {
    if (isInitialLoad) {
      return;
    }

    fetchUserReferralList(tableOptions.current, tableOptions.pageSize, searchTerm);
  }, [account, chainId, tableOptions.current, tableOptions.pageSize]);

  return {
    account,
    chainId,
    tableOptions,
    userReferralList,
    loading,
    setSearchTerm,
    setTableOptions
  };
};
