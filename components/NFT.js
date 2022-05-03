import { Box, Button, Divider, FormControl, FormLabel, Image, Input, Link, Text } from "@chakra-ui/react";
import { m } from "framer-motion";
import Moralis from "moralis";
import { useState, useEffect } from "react";
import { useERC20Balances, useMoralis, useMoralisWeb3Api, useNFTBalances } from "react-moralis";

import CustomContainer from "./CustomContainer";

export default function NFT({ user }) {

    const {getNFTBalances, data} = useNFTBalances();

    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const data = await Web3Api.account.getTransactions({
            chain: process.env.NEXT_PUBLIC_CHAIN,
            address: user.get('ethAddress'),
            limit: 5
        }).catch(e => console.log(e))
        if(data && data.balance)
        {
            setTransactions(Moralis.Units.FromWei(data.balance))            
        }
    }

    useEffect(() => {
        getNFTBalances({
            params: {
                chain: process.env.NEXT_PUBLIC_CHAIN,
                address: user.get('ethAddress')
            }
        })
    })
    
    return (
        <CustomContainer>
            <Text mb="6" fontSize="xl" fontWeight="bold"><b>&nbsp; MY NFTs:</b></Text>
            {data && data.result.map(nft => (
                <div key={nft.hash}>
                   <Box mt="4" px="2" py="2" borderWidth="1px" borderRadius="md" key={nft.token_uri}>
                       {nft.image && <Image src={nft.image} />}
                       <p>{nft.token_uri}</p>
                   </Box>
                </div>
                
            ))}
        </CustomContainer>
    )
}