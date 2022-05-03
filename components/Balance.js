import {
    Button, Divider, FormControl, FormLabel, Input, Link, Text, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon
  } from "@chakra-ui/icons";
import { m } from "framer-motion";
import Moralis from "moralis";
import { useState, useEffect } from "react";
import { useERC20Balances, useMoralis, useMoralisWeb3Api } from "react-moralis";


import CustomContainer from "./CustomContainer";

export default function Balance({ user }) {

    const Web3Api = useMoralisWeb3Api();
    const { fetchERC20Balances, data } = useERC20Balances();
    const [ethBalance, setEthBalance] = useState(0);

    const fetchNativeBalance = async () => {
        const result = await Web3Api.account.getNativeBalance({
            chain: process.env.NEXT_PUBLIC_CHAIN,
            address: user.get('ethAddress')
        }).catch(e => console.log(e))

        if (result.balance) {
            // console.log("Native Balance");
            // console.log(user.get('ethAddress'));
            // console.log(result);
            setEthBalance(Number(Moralis.Units.FromWei(result.balance)).toFixed(4))
        }
    }

    useEffect(() => {
        fetchNativeBalance();
        fetchERC20Balances({
            params: {
                chain: process.env.NEXT_PUBLIC_CHAIN,
                address: user.get('ethAddress')
            }
        })
    })

    // console.log(data)

    return (
        <CustomContainer>
            {/* <Text mb="6" fontSize="xl" fontWeight="bold"><b>&nbsp; MY ETH Balance:</b></Text> */}
          
            <Divider></Divider>
            <TableContainer>
                <Table variant='striped' colorScheme="blackAlpha">
                    <Thead>
                        <Tr>
                            <Th> Token
                            </Th>
                            <Th>Amount</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ethBalance ? <><Tr key="BNB">
                            <Td width="200px">
                                <b>BNB</b>
                            </Td>
                            <Td>
                                <Text>{ethBalance}</Text>
                            </Td>
                        </Tr></> : <></>
                        }

                        { data && data.map(token => (
                            <Tr key={token.symbol}>
                                <Td width="200px">
                                    <b>{token.symbol}</b>
                                </Td>
                                <Td>
                                    <Text>{Number(Moralis.Units.FromWei(token.balance, token.decimals)).toFixed(4).toString().replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',')}</Text>
                                </Td>
                            </Tr>
                        ))} 
                    </Tbody>
                </Table>
            </TableContainer>
        </CustomContainer>
    )
}