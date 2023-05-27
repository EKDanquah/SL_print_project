import { filter } from 'lodash';
import React, { useContext } from 'react';

// material-ui
import { Box, Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material';

// third-party
import { SearchContext } from '../../pages/agent/searchContext';
import { PrintType, InstitutionType, InstitutionUsersType } from '../../schema/schema';
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

type DataType = PrintType[] | InstitutionType[] | InstitutionUsersType[];

type AdvanceTable = {
    DATALIST: DataType;
    DataType: TableDataType;
};
export default function AdvanceTable({ DATALIST, DataType }: AdvanceTable) {
    const {
        page,
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
        handleRequestSort
    } = useContext(SearchContext);

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
                case 'PrintType': {
                    const newSelecteds = (DATALIST as PrintType[]).map((n) => n.objectId);
                    setSelected(newSelecteds as string[]);
                    return;
                }
                case 'InstitutionType': {
                    const newSelecteds = (DATALIST as InstitutionType[]).map((n) => n.objectId);
                    setSelected(newSelecteds as string[]);
                    return;
                }
                case 'InstitutionUsersType': {
                    const newSelecteds = (DATALIST as InstitutionUsersType[]).map((n) => n.objectId);
                    setSelected(newSelecteds as string[]);
                    return;
                }
            }
        }
        setSelected([]);
    };

    function SwitchTaleData() {
        switch (DataType) {
            case 'PrintType': {
                const newFilterData = filteredData as PrintType[];
                return newFilterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d, id) => {
                    const selectedUser = selected.indexOf(d.objectId as string) !== -1;

                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            sx={{ 
                                cursor:"pointer", 
                                '&:last-child td, &:last-child th': { border: 0 } }}
                            aria-checked={selectedUser}
                            tabIndex={-1}
                            selected={selectedUser}
                            key={d.objectId}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, d.objectId as string)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                <Typography variant="subtitle2" noWrap>
                                    {d.title}
                                </Typography>
                            </TableCell>

                            <TableCell
                                align="left"
                                sx={{
                                    maxHeight: '3em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {d.instruction}
                            </TableCell>
                            <TableCell align="left">{d.printActivities}</TableCell>
                            <TableCell align="left">{d.printColor}</TableCell>

                            <TableCell align="left">{d.printFileURL.length}</TableCell>
                            <TableCell align="left">{d.quantity}</TableCell>
                            <TableCell
                                sx={{
                                    maxHeight: '3em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                                align="left"
                            >
                                {JSON.stringify(d.printFileType)?.replace('[', '')?.replace(']', '')}
                            </TableCell>
                            <TableCell
                                sx={{
                                    maxHeight: '3em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                                align="left"
                            >
                                {JSON.stringify(d.printFileSizes)?.replace('[', '')?.replace(']', '')}
                            </TableCell>
                        </TableRow>
                    );
                });
            }
            case 'InstitutionType': {
                const newFilterData = filteredData as InstitutionType[];
                return newFilterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d) => {
                    const selectedUser = selected.indexOf(d.objectId as string) !== -1;

                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            aria-checked={selectedUser}
                            tabIndex={-1}
                            selected={selectedUser}
                            key={d.objectId}
                        >
                            {/* <TableCell padding="checkbox">
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

                            <TableCell align="left">{userLocation.streetNO + " " + userLocation.street}</TableCell> */}
                        </TableRow>
                    );
                });
            }
            case 'InstitutionUsersType': {
                const newFilterData = filteredData as InstitutionUsersType[];
                return newFilterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d) => {
                    const selectedUser = selected.indexOf(d.objectId as string) !== -1;

                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            aria-checked={selectedUser}
                            tabIndex={-1}
                            selected={selectedUser}
                            key={d.objectId}
                        >
                            {/* <TableCell padding="checkbox">
                                <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, d.id as string)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                     <Typography variant="subtitle2" noWrap>
                                        {d.rafflePromoName}
                                    </Typography>
                                </Stack>
                            </TableCell> */}
                        </TableRow>
                    );
                });
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

    function applySortFilter(array: DataType, comparator: (order: 'asc' | 'desc', orderBy: string) => void, query: string) {
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
                case 'PrintType': {
                    let _array = array as PrintType[];
                    return filter(_array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
                }
                case 'InstitutionType': {
                    let _array = array as InstitutionType[];
                    return filter(_array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
                }
                case 'InstitutionUsersType': {
                    let _array = array as InstitutionUsersType[];
                    return filter(_array, (_ref) => _ref.phoneNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1);
                }
            }
        }
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order: 'asc' | 'desc', orderBy: string) {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    function createHeader(): TaleHeadLabelsType {
        switch (DataType) {
            case 'PrintType': {
                return [
                    { id: 'title', label: 'Title', alignRight: false },
                    { id: 'instruction', label: 'Instruction', alignRight: false },
                    { id: 'printActivities', label: 'Activity', alignRight: false },
                    { id: 'printColor', label: 'Color', alignRight: false },
                    { id: 'files', label: 'No. Files', alignRight: false },
                    { id: 'quantity', label: 'Quantity', alignRight: false },
                    { id: 'filesType.', label: 'Files Type', alignRight: false },
                    { id: 'filesSizes', label: 'Files Sizes', alignRight: false }
                ] as TaleHeadLabelsType;
            }
            case 'InstitutionType': {
                return [
                    { id: 'full_Name', label: 'Full name', alignRight: false },
                    { id: 'sex', label: 'Sex', alignRight: false },
                    { id: 'phoneNumber', label: 'Phone number', alignRight: false },
                    { id: 'email', label: 'Email', alignRight: false },
                    { id: 'region', label: 'Region', alignRight: false },
                    { id: 'town', label: 'Town', alignRight: false },
                    { id: 'street_no.', label: 'Street No.', alignRight: false }
                ] as TaleHeadLabelsType;
            }
            case 'InstitutionUsersType': {
                const newSelecteds = DATALIST as InstitutionUsersType[];
                let arr = Object.keys(newSelecteds[0]).map((key) => {
                    return { id: key, label: key, alignRight: false } as TaleHeadLabelType;
                });
                arr.push({ id: '' });
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
                    <TableBody>
                        {' '}
                        {emptyRows > 0 ? (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        ) : (
                            SwitchTaleData()
                        )}
                    </TableBody>

                    {isNotFound && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={DataType === 'PrintType' ? 7 : 6}>
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
        </Box>
    );
}
