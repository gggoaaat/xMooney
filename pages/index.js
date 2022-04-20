import { Button, Text, Flex, Box, TabList, Tabs, Tab, TabPanel, TabPanels, IdProvider } from "@chakra-ui/react";
import Head from "next/head";
import { useMoralis } from "react-moralis"
import Balance from "../components/Balance";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import NFT from "../components/NFT";
import Profile from "../components/Profile";
import Send from "../components/Send";
import Transactions from "../components/Transactions";

export default function Home() {

  const { isAuthenticated, authenticate, user, logout, isLoggingOut, isWeb3Enabled, isWeb3EnableLoading, enableWeb3  } = useMoralis();
  // 

  // useEffect(() => {
    
  //   const connectorId = window.localStorage.getItem('connectorId') //as MoralisType.Web3ProviderType
  //   if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
  //     enableWeb3({ provider: connectorId }) }
  // }, [isAuthenticated, isWeb3Enabled])

  //window.location.reload();
  //sessionStorage.clear();

  //console.log(isAuthenticated);

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | Dashboard</title>
        </Head>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
          bgGradient="linear(to-br, white.400, blackAlpha.300)"

        >
          <Text fontSize="5xl" fontWeight="bold" color="black">{process.env.title}</Text>
          <Button colorScheme="blackAlpha" size="lg" mt="6" onClick={() => authenticate(
            {
              signingMessage: "Sign to login to xMooney",
              provider: "walletconnect"
            }
          )} >Login with Walletconnect</Button>
          <Button colorScheme="blackAlpha" size="lg" mt="6" onClick={() => authenticate(
            { signingMessage: "Sign to login to xMooney" }
          )} >Login with Metamask</Button>
        </Flex>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>{process.env.title}</title>
      </Head>
      <Flex direction="column" width="100vw" height="100vh">
        <Header user={user} logout={logout}> isLoggingOut={isLoggingOut}</Header>
        <Box flex="1" bg="blackAlpha.100" px="44" py="20">
          <Tabs size="lg" colorScheme="blackAlpha" align="left" variant="enclosed">
            <TabList>
              <Tab fontWeight="bold">Profile</Tab>
              <Tab fontWeight="bold">Balance</Tab>
              <Tab fontWeight="bold">Transactions</Tab>
              <Tab fontWeight="bold">NFTs</Tab>
              <Tab fontWeight="bold">Send ETH</Tab>
            </TabList>
            <TabPanels>
              <TabPanel><Profile user={user}></Profile></TabPanel>
              <TabPanel><Balance user={user}></Balance></TabPanel>
              <TabPanel><Transactions user={user}></Transactions></TabPanel>
              <TabPanel><NFT user={user}></NFT></TabPanel>
              <TabPanel><Send user={user}></Send></TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  )
}
