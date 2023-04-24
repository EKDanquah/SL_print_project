import { filter } from 'lodash';
import React, { useContext } from 'react';

// material-ui
import { Box, Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material';

// third-party
import { SearchContext } from '../../pages/agent/searchContext';
import { AgentType, CustomerType, FeedbackType, PrintJobsType } from '../../schema/schema';
import { TableDataType } from '../types';
import TableHeader, { TaleHeadLabelsType, TaleHeadLabelType } from './tableHeader';

// project import

function createData(trackingNo: number, name: string, fat: number, carbs: number, protein: number) {
    return { trackingNo, name, fat, carbs, protein };
}

const rows = [
    createData(84564564, 'Camera Lens', 40, 2, 40570),
    createData(98764564, 'Laptop', 300, 0, 180139),
    createData(98756325, 'Mobile', 355, 1, 90989),
    createData(98652366, 'Handset', 50, 1, 10239),
    createData(13286564, 'Computer Accessories', 100, 1, 83348),
    createData(86739658, 'TV', 99, 0, 410780),
    createData(13256498, 'Keyboard', 125, 2, 70999),
    createData(98753263, 'Mouse', 89, 2, 10570),
    createData(98753275, 'Desktop', 185, 1, 98063),
    createData(98753291, 'Chair', 100, 0, 14001)
];

function descendingComparator(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


type DataType = CustomerType[] | AgentType[] | PrintJobsType[] | FeedbackType[];

type AdvanceTable = {
    DATALIST: DataType
    DataType: TableDataType
}
export default function AdvanceTable({ DATALIST, DataType }: AdvanceTable) {

    const { page,
        order,
        selected,
        orderBy,
        filterName,
        rowsPerPage,
        setPage,
        setOrder,
        setSelected,
        setOrderBy,
        setFilterName,
        setRowsPerPage,
        handleRequestSort } = useContext(SearchContext);

    // const [page, setPage] = useState(0);

    // const [order, setOrder] = useState<"asc" | "desc">('asc');

    // const [selected, setSelected] = useState<string[]>([]);

    // const [orderBy, setOrderBy] = useState('name');

    // const [filterName, setFilterName] = useState('');

    // const [rowsPerPage, setRowsPerPage] = useState(5);



    // const handleRequestSort = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, property: string) => {
    //     const isAsc = orderBy === property && order === 'asc';
    //     setOrder(isAsc ? 'desc' : 'asc');
    //     setOrderBy(property);
    // };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.checked) {

            switch (DataType) {
                case 'CustomerType': {
                    const newSelecteds = (DATALIST as CustomerType[]).map((n) => n.id);
                    setSelected(newSelecteds as string[]);
                    return;
                }
                case 'AgentType': {

                    const newSelecteds = (DATALIST as AgentType[]).map((n) => n.id);
                    setSelected(newSelecteds as string[]);
                    return;
                }
                case 'PrintJobsType': {
                    const newSelecteds = (DATALIST as PrintJobsType[]).map((n) => n.id);
                    setSelected(newSelecteds as string[]);
                    return;
                }
                case 'FeedbackType': {
                    const newSelecteds = (DATALIST as FeedbackType[]).map((n) => n.id);
                    setSelected(newSelecteds as string[]);
                    return;
                }
            }

        }
        setSelected([]);
    };

    function SwitchTaleData() {
        switch (DataType) {
            case 'CustomerType': {
                const newFilterData = (filteredData as CustomerType[]);
                return newFilterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d, id) => {
                    let userLocation = d.location;

                    const selectedUser = selected.indexOf(d.id as string) !== -1;
                    // full_Name
                    // sex
                    // phoneNumber
                    // email
                    // region
                    // town
                    // street_no
                    // totalPlay
                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            aria-checked={selectedUser}
                            tabIndex={-1}
                            selected={selectedUser}
                            key={d.id}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, d.id as string)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                <Typography variant="subtitle2" noWrap>
                                    {d.name}
                                </Typography>
                            </TableCell>

                            <TableCell align="left">{d.sex}</TableCell>
                            <TableCell align="left">{d.phoneNumber}</TableCell>
                            <TableCell align="left">{d.email}</TableCell>
                            <TableCell align="left">{userLocation.region}</TableCell>
                            <TableCell align="left">{userLocation.town}</TableCell>

                            <TableCell align="left">{userLocation.streetNO + " " + userLocation.street}</TableCell>
                            <TableCell align="left">{d.usePrintJobsTokenCount}</TableCell>

                        </TableRow>
                    );
                })
            }
            case 'AgentType': {

                const newFilterData = (filteredData as AgentType[]);
                return newFilterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d, id) => {
                    let userLocation = d.location;

                    const selectedUser = selected.indexOf(d.id as string) !== -1;
                    // full_Name
                    // sex
                    // phoneNumber
                    // region
                    // town
                    // street_no
                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            aria-checked={selectedUser}
                            tabIndex={-1}
                            selected={selectedUser}
                            key={id}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, d.id as string)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="subtitle2" noWrap>
                                        {d.name}
                                    </Typography>
                                </Stack>
                            </TableCell>

                            <TableCell align="left">{d.sex?.toLowerCase()}</TableCell>
                            <TableCell align="left">{d.phoneNumber}</TableCell>
                            <TableCell align="left">{d.email}</TableCell>

                            <TableCell align="left">{userLocation.region}</TableCell>
                            <TableCell align="left">{userLocation.town}</TableCell>

                            <TableCell align="left">{userLocation.streetNO + " " + userLocation.street}</TableCell>
                        </TableRow>
                    );
                })
            }
            case 'PrintJobsType': {
                const newFilterData = (filteredData as PrintJobsType[]);
                return newFilterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d, id) => {

                    const selectedUser = selected.indexOf(d.id as string) !== -1;

                    return (
                        <TableRow

                            hover
                            role="checkbox"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            aria-checked={selectedUser}
                            tabIndex={-1}
                            selected={selectedUser}
                            key={d.id}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, d.id as string)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    {/* <Avatar alt={name} src={avatarUrl} /> */}
                                    <Typography variant="subtitle2" noWrap>
                                        {d.rafflePromoName}
                                    </Typography>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    );
                })

            }
            case 'FeedbackType': {
                const newFilterData = (filteredData as FeedbackType[]);
                return newFilterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d, id) => {
                    const selectedUser = selected.indexOf(d.id as string) !== -1;

                    return (
                        <TableRow

                            hover
                            role="checkbox"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            aria-checked={selectedUser}
                            tabIndex={-1}
                            selected={selectedUser}
                            key={d.id}>
                            <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    {/* <Avatar alt={name} src={avatarUrl} /> */}
                                    <Typography variant="subtitle2" noWrap>
                                        {d.title}
                                    </Typography>
                                </Stack>
                            </TableCell>

                            <TableCell align="left"> {d.attachedType}</TableCell>

                        </TableRow>
                    );
                })
            }
            default:
                return <TableRow></TableRow>;
        }

    }

    const handleClick = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };



    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - DATALIST.length) : 0;

    const filteredData = applySortFilter(DATALIST, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredData.length && !!filterName;



    function applySortFilter(array: DataType, comparator: (order: "asc" | "desc", orderBy: string) => void, query: string) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        //    @ts-ignore
        stabilizedThis.sort((a, b) => {
            //    @ts-ignore
            const order = comparator(a[0], b[0]);
            //    @ts-ignore
            if (order !== 0) return order;
            //    @ts-ignore
            return a[1] - b[1];
        });

        if (query) {

            switch (DataType) {
                case 'CustomerType': {
                    let _array = array as CustomerType[];
                    return filter(_array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
                }
                case 'AgentType': {
                    let _array = array as AgentType[];
                    return filter(_array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
                }
                case 'PrintJobsType': {
                    let _array = array as PrintJobsType[];
                    return filter(_array, (_ref) => _ref.rafflePromoName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
                }
                case 'FeedbackType': {
                    let _array = array as FeedbackType[];
                    return filter(_array, (_feedback) => _feedback.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
                }
            }

        }
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order: "asc" | "desc", orderBy: string) {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    function createHeader(): TaleHeadLabelsType {
        switch (DataType) {
            case 'CustomerType': {
                // const newSelecteds = (DATALIST as CustomerType[])
                // let arr = Object.keys(newSelecteds[0]).map((key) => {
                //     return { id: key, label: key, alignRight: false } as TaleHeadLabelType;
                // });
                // arr.push({ id: '' })
                // return arr;

                return ([
                    { id: 'full_Name', label: "Full Name", alignRight: false },
                    { id: 'sex', label: "Sex", alignRight: false },
                    { id: 'phoneNumber', label: "Phone Number", alignRight: false },
                    { id: 'email', label: "Email", alignRight: false },
                    { id: 'region', label: "Region", alignRight: false },
                    { id: 'town', label: "Town", alignRight: false },
                    { id: 'street_no.', label: "Street No.", alignRight: false },
                    { id: 'totalPlay', label: "Total Plays", alignRight: false },
                ]) as TaleHeadLabelsType
            }
            case 'AgentType': {



                return ([
                    { id: 'full_Name', label: "Full name", alignRight: false },
                    { id: 'sex', label: "Sex", alignRight: false },
                    { id: 'phoneNumber', label: "Phone number", alignRight: false },
                    { id: 'email', label: "Email", alignRight: false },
                    { id: 'region', label: "Region", alignRight: false },
                    { id: 'town', label: "Town", alignRight: false },
                    { id: 'street_no.', label: "Street No.", alignRight: false },

                ]) as TaleHeadLabelsType
            }
            case 'PrintJobsType': {
                const newSelecteds = (DATALIST as PrintJobsType[])
                let arr = Object.keys(newSelecteds[0]).map((key) => {
                    return { id: key, label: key, alignRight: false } as TaleHeadLabelType;
                });
                arr.push({ id: '' })
                return arr;
            }
            case 'FeedbackType': {
                const newSelecteds = (DATALIST as FeedbackType[])
                let arr = Object.keys(newSelecteds[0]).map((key) => {
                    return { id: key, label: key, alignRight: false } as TaleHeadLabelType;
                });
                arr.push({ id: '' })
                return arr;
            }
        }



    }

    return (
        <Box>


            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        // '& .MuiTableCell-root:first-child': {
                        '& .MuiTableCell-root:first-of-type': {

                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <TableHeader
                        order={order}
                        orderBy={orderBy}
                        headLabel={createHeader()}
                        // headLabel={TABLE_HEAD} 
                        rowCount={DATALIST.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody> {
                        emptyRows > 0 ? (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        ) :
                            SwitchTaleData()
                    }
                    </TableBody>

                    {isNotFound && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={DataType === "AgentType" ? 7 : 6}>

                                    <Typography variant="h6" paragraph>
                                        Not found
                                    </Typography>

                                    <Typography variant="body2">
                                        No results found for &nbsp;
                                        <strong>&quot;{filterName}&quot;</strong>.
                                        <br /> Try checking for typos or using complete words.
                                    </Typography>

                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={DATALIST.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </TableContainer>
        </Box >
    );
}
