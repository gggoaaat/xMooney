import { useTable, usePagination } from "react-table";

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
import { useMoralisWeb3Api } from "react-moralis";
import Moment from 'react-moment';
// import ReactTimeAgo from "react-time-ago"
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
            // limit: 25
        }).catch(e => console.log(e));
        if (data && data.result) {
            setTransactions(data.result);
            // console.log(transactions)
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

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
                                <Tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
                                    ))}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <Tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
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
                Header: "Wallet Transactions",
                columns: [
                    {
                        Header: "Txn Hash",
                        accessor: "hash",
                        Cell: function (e) {
                            const thisValue = e.value;
                            return <Link href={`${BASE_URL}tx/${thisValue}`} target="_blank">{thisValue.substr(0,thisValue.length - 40)}...</Link>
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
                            const partial = e.value ? thisValue.substr(0,thisValue.length - 30) : e.value;
                            return <Link href={`${BASE_URL}address/${thisValue}`} target="_blank">{partial}...</Link>
                        }
                    },
                    {
                        Header: "To",
                        accessor: "to_address",
                        Cell: function (e) {
                            const thisValue = e.value;
                            const partial = e.value ? thisValue.substr(0,thisValue.length - 30) : e.value;
                            return <Link href={`${BASE_URL}address/${thisValue}`} target="_blank">{partial}...</Link>
                        }
                    },
                    {
                        Header: "Quantity",
                        accessor: "value",
                        Cell: function (e) {
                            const thisValue = e.value;
                            return <Text>{Web3.utils.fromWei(thisValue, "ether")} BNB</Text>
                        }
                    }
                ]
            }
        ],
        []
    );

    const data = transactions; //useMemo(() => transactions, []);

    return (
        <CustomContainer>
            <CustomTable columns={columns} data={data} />
        </CustomContainer>
    )
}