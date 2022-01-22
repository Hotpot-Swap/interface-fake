import React, { useState } from "react";
import Layout from "../../layouts/DefaultLayout";
import Head from "next/head";
import Container from "../../components/Container";
import TabsReferral from "../../features/referral/components/TabsReferral";
import ReferralFarm from "../../features/referral/components/ReferralFarm";
import ReferralAbout from "../../features/referral/components/ReferralAbout";
import AboutTab from "../../features/referral/AboutTab";
import ReferralList from "../../features/referral/components/ReferralList";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import ClaimCard from "../../features/referral/ClaimCard";
import MyReferralLink from "../../features/referral/MyReferralLink";
import { useActiveWeb3React } from "../../hooks";

const ClaimReward = styled.div`
  display: grid;
  grid-template-columns: ${isMobile ? "1fr" : "1fr 1fr"};
  gap: ${isMobile ? "24px" : "56px"};
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BlockTop = styled.div`
  background: ${({ theme }) => theme.bgReferral};
  padding-top: ${isMobile ? "100px" : "130px"};
`;

export default function Referral(): JSX.Element {
  const [tabIndex, setTabIndex] = useState(0);
  const { account } = useActiveWeb3React();

  const getTabPanel = () => {
    switch (tabIndex) {
      case 1:
        return <ReferralFarm />;
      case 2:
        return <AboutTab />;
      default:
        return <ReferralList />;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Referral | TokenStand</title>
        <meta name="description" content="Referral" />
      </Head>
      <Container maxWidth="full" className="grid h-full mx-auto gap-9">
        <BlockTop
          className={`grid h-full mx-auto ${
            isMobile ? " gap-6 px-4" : " gap-20 px-24"
          }`}
        >
          <MyReferralLink />
          {account && (
            <>
              <ClaimReward>
                <ClaimCard heading={"Farm Referral Reward"} />
                <ClaimCard heading={"Friends Referral Reward"} />
              </ClaimReward>
              <TabsReferral
                tabIndex={tabIndex}
                onTabSelect={(index) => setTabIndex(index)}
              />
            </>
          )}
        </BlockTop>
        <div className={isMobile ? "px-4" : "px-24"}>
          {account ? getTabPanel() : <AboutTab />}
        </div>
      </Container>
    </Layout>
  );
}
