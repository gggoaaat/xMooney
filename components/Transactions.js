import {
    Button, Divider, FormControl, FormLabel, Input, Link, Text, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from "@chakra-ui/react";
import { m } from "framer-motion";
import Moralis from "moralis";
import { useState, useEffect } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import Moment from 'react-moment';
import Web3 from "web3";
import CustomContainer from "./CustomContainer";

export default function Transactions({ user }) {

    const Web3Api = useMoralisWeb3Api();
    const BASE_URL = process.env.blockExplorerURL;
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const data = await Web3Api.account.getTransactions({
            chain: process.env.NEXT_PUBLIC_CHAIN,
            address: user.get('ethAddress'),
            limit: 25
        }).catch(e => console.log(e));
        if (data && data.result) {
            setTransactions(data.result);
            // console.log(transactions)
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <CustomContainer>
            <Text mb="6" fontSize="xl" fontWeight="bold" size='sm'><b>&nbsp; MY Last Transactions:</b></Text>
            <TableContainer>
                <Table variant='striped' colorScheme="blackAlpha">
                    <Thead>
                        <Tr>
                            <Th>
                                Txn Hash
                            </Th>
                            <Th>
                                Age
                            </Th>
                            <Th>
                                From
                            </Th>
                            <Th>
                                To
                            </Th>
                            <Th>
                                Quantity
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {transactions && transactions.map(transaction => (
                            <Tr key={transaction.hash}>
                                <Td>
                                    <Link href={`${BASE_URL}tx/${transaction.hash}`}>{transaction.hash.substr(transaction.hash.length - 10)}...</Link>
                                </Td>
                                <Td>
                                    <Moment date={transaction.block_timestamp} format="yyyy-MM-DD hh:mm:ss" ></Moment>
                                </Td>
                                <Td>
                                    <Link href={`${BASE_URL}address/${transaction.from_address}`}>{transaction.from_address.substr(transaction.from_address.length - 10)}...</Link>
                                </Td>
                                <Td>
                                    <Link href={`${BASE_URL}address/${transaction.to_address}`}>{transaction.to_address ? transaction.to_address.substr(transaction.to_address.length - 10) : transaction.to_address}</Link>
                                </Td>
                                <Td>
                                    {Web3.utils.fromWei(transaction.value, "ether")} BNB
                                </Td>
                                {/* <Divider></Divider> */}
                            </Tr>

                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </CustomContainer >
    )
}