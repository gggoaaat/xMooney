import { useTable, usePagination } from "react-table";

import {
    Button, Divider, FormControl, FormLabel, Input, Link, Text, Table,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Flex,
    Tooltip,
    IconButton,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";

import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon
} from "@chakra-ui/icons";

import { useMemo, useState, useEffect } from "react";

import { useERC20Balances, useMoralis, useMoralisWeb3Api } from "react-moralis";

import Moralis from "moralis";
import Moment from 'react-moment';
// import ReactTimeAgo from "react-time-ago"
import Web3 from "web3";
import CustomContainer from "./CustomContainer";

export default function XMooneyTransactions({ user }) {

    const Web3Api = useMoralisWeb3Api();

    const BASE_URL = process.env.blockExplorerURL;
    const [xMTransactions, setxMTransactions] = useState([]);
    const [rawBalance, setRawBalance] = useState("0");
    const [rebasedBalance, setRebasedBalance] = useState("0");
    let transactionBalance = 0

    const options = { chain: process.env.NEXT_PUBLIC_CHAIN, address: process.env.tokenContractAddress }

    const fetchTransactions = async () => {
        const fromAddy = new Moralis.Query("BscTokenTransfers");
        fromAddy.equalTo("token_address", process.env.tokenContractAddress.toLowerCase());
        fromAddy.equalTo("to_address", user.get('ethAddress'));
        fromAddy.greaterThan("value", "0");

        const toAddy = new Moralis.Query("BscTokenTransfers");
        toAddy.equalTo("token_address", process.env.tokenContractAddress.toLowerCase());
        toAddy.equalTo("from_address", user.get('ethAddress'));
        toAddy.greaterThan("value", "0");

        const query = new Moralis.Query.or(fromAddy, toAddy);
        query.descending("block_timestamp");
        const xMTransfers = await query.find();

        let theseTransfers = [];

        transactionBalance = 0;
        setRawBalance("0");

        xMTransfers.forEach(
            function (d) {
                let thisTrans = {};
                thisTrans["direction"] = d.attributes["from_address"] == user.get('ethAddress') ? "OUT" : "IN";
                thisTrans["from_address"] = d.attributes["from_address"];
                thisTrans["to_address"] = d.attributes["to_address"];
                thisTrans["block_timestamp"] = d.attributes["block_timestamp"];
                thisTrans["transaction_hash"] = d.attributes["transaction_hash"];
                thisTrans["value"] = d.attributes["value"];
                transactionBalance = (thisTrans["direction"] == "IN" ? (transactionBalance += +thisTrans["value"]) : (transactionBalance -= +thisTrans["value"]));
                theseTransfers.push(thisTrans);
            }
        );
        setRawBalance(transactionBalance)
        setxMTransactions(theseTransfers);
    }

    const { fetchERC20Balances, data } = useERC20Balances();

    useEffect(() => {
        fetchTransactions();
        fetchERC20Balances({
            params: {
                chain: process.env.NEXT_PUBLIC_CHAIN,
                address: user.get('ethAddress')
            }
        });
        getContractToken()
    });

    const getContractToken = async () => {

        const localEnv = {
            NEXT_PUBLIC_CHAIN: process.env.NEXT_PUBLIC_CHAIN,
            NEXT_PUBLIC_SYMBOL: process.env.NEXT_PUBLIC_SYMBOL
        }

        const options = {
            chain: localEnv.NEXT_PUBLIC_CHAIN,
            address: user.get('ethAddress')
        };

        const balances = await Moralis.Web3API.account.getTokenBalances(options);

        let contractTokenBalance;
        let thisObject = {}
        balances && balances.forEach(function (e) {
            if (e.symbol == localEnv.NEXT_PUBLIC_SYMBOL) {
                try {
                    setRebasedBalance(e.balance);
                    throw BreakException;
                } catch (e) {

                }
            }
        })
    }

    function CustomTable({ columns, data }) {
        // Use the state and functions returned from useTable to build your UI
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            page, // Instead of using 'rows', we'll use page,
            // which has only the rows for the active page

            // The rest of these things are super handy, too ;)
            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,
            state: { pageIndex, pageSize }
        } = useTable(
            {
                columns,
                data,
                initialState: { pageIndex: 0 }
            },
            usePagination
        );

        // Render the UI for your table
        return (
            <>
                {/* <pre>
                    <code>
                        {JSON.stringify(
                            {
                                pageIndex,
                                pageSize,
                                pageCount,
                                canNextPage,
                                canPreviousPage
                            },
                            null,
                            2
                        )}
                    </code>
                </pre> */}
                <TableContainer>
                    <Flex justifyContent="space-between" m={4} alignItems="center">
                        <Flex>
                            <Tooltip label="First Page">
                                <IconButton
                                    onClick={() => gotoPage(0)}
                                    isDisabled={!canPreviousPage}
                                    icon={<ArrowLeftIcon h={3} w={3} />}
                                    mr={4}
                                />
                            </Tooltip>
                            <Tooltip label="Previous Page">
                                <IconButton
                                    onClick={previousPage}
                                    isDisabled={!canPreviousPage}
                                    icon={<ChevronLeftIcon h={6} w={6} />}
                                />
                            </Tooltip>
                        </Flex>

                        <Flex alignItems="center">
                            <Text flexShrink="0" mr={8}>
                                Page{" "}
                                <Text fontWeight="bold" as="span">
                                    {pageIndex + 1}
                                </Text>{" "}
                                of{" "}
                                <Text fontWeight="bold" as="span">
                                    {pageOptions.length}
                                </Text>
                            </Text>
                            <Text flexShrink="0">Go to page:</Text>{" "}
                            <NumberInput
                                ml={2}
                                mr={8}
                                w={28}
                                min={1}
                                max={pageOptions.length}
                                onChange={(value) => {
                                    const page = value ? value - 1 : 0;
                                    gotoPage(page);
                                }}
                                defaultValue={pageIndex + 1}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <Select
                                w={32}
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </Select>
                        </Flex>

                        <Flex>
                            <Tooltip label="Next Page">
                                <IconButton
                                    onClick={nextPage}
                                    isDisabled={!canNextPage}
                                    icon={<ChevronRightIcon h={6} w={6} />}
                                />
                            </Tooltip>
                            <Tooltip label="Last Page">
                                <IconButton
                                    onClick={() => gotoPage(pageCount - 1)}
                                    isDisabled={!canNextPage}
                                    icon={<ArrowRightIcon h={3} w={3} />}
                                    ml={4}
                                />
                            </Tooltip>
                        </Flex>
                    </Flex>
                    <Table variant='striped' colorScheme="blackAlpha" {...getTableProps()}>
                        <Thead>
                            {headerGroups.map((headerGroup) => (
                                <Tr key={headerGroup.id}  {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <Th key={column.id} {...column.getHeaderProps()}>{column.render("Header")}</Th>
                                    ))}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <Tr key={i} {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <Td key={cell.id} {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                                            );
                                        })}
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </>
        );
    }

    const columns = useMemo(
        () => [
            {
                Header: "xM Transactions",
                columns: [
                    {
                        Header: "transaction_hash",
                        accessor: "transaction_hash",
                        Cell: function (e) {
                            const thisValue = e.value;
                            return <Link href={`${BASE_URL}tx/${thisValue}`} target="_blank">{thisValue.substr(0, thisValue.length - 50)}...</Link>
                        }
                    },
                    {
                        Header: "Age",
                        accessor: "block_timestamp",
                        Cell: function (currentRow) {
                            return <Moment date={currentRow.value} format="yyyy-MM-DD hh:mm:ss"></Moment>
                        }
                    },
                    {
                        Header: "From",
                        accessor: "from_address",
                        Cell: function (e) {
                            const thisValue = e.value;
                            const partial = e.value ? thisValue.substr(0, thisValue.length - 30) : e.value;
                            return <Link href={`${BASE_URL}address/${thisValue}`} target="_blank">{partial}...</Link>
                        }
                    },
                    {
                        Header: "To",
                        accessor: "to_address",
                        Cell: function (e) {
                            const thisValue = e.value;
                            const partial = e.value ? thisValue.substr(0, thisValue.length - 30) : e.value;
                            return <Link href={`${BASE_URL}address/${thisValue}`} target="_blank">{partial}...</Link>
                        }
                    },
                    // {
                    //     Header: "token_address",
                    //     accessor: "token_address",
                    //     Cell: function (e) {
                    //         const thisValue = e.value;
                    //         const partial = e.value ? thisValue.substr(0, thisValue.length - 30) : e.value;
                    //         return <Link href={`${BASE_URL}token/${thisValue}`} target="_blank">{partial}...</Link>
                    //     }
                    // },
                    {
                        Header: "Direction",
                        accessor: "direction"
                    },
                    {
                        Header: "Quantity",
                        accessor: "value",
                        Cell: function (e) {
                            const thisValue = e.value;
                            return <Text>{Web3.utils.fromWei(thisValue, "gwei")} xM</Text>
                        }
                    }
                ]
            }
        ],
        [BASE_URL]
    );

    const data1 = xMTransactions; //useMemo(() => xMTransactions, []);

    return (
        <CustomContainer>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>IN/OUT: {(Web3.utils.fromWei(rawBalance.toString(), "gwei")).toString().replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',')} xM</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='#'>REBASE: {(Web3.utils.fromWei(rebasedBalance.toString(), "gwei")).toString().replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',')} xM</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#'>REFLECTIONS: {(Web3.utils.fromWei((rebasedBalance - rawBalance).toString(), "gwei")).toString().replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',')} xM</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>            
            <CustomTable columns={columns} data={data1} />
        </CustomContainer>
    )
}