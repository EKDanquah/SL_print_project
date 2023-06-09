import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, SortDirection, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import Dot from '../../components/@extended/Dot';

// project import

function createData(trackingNo: number, name: string, fat: number, carbs: number, protein: number) {
    return { trackingNo, name, fat, carbs, protein };
}

const rows = [
    // createData(84564564, 'Camera Lens', 40, 2, 40570),
    createData(98764564, 'Laptop', 300, 0, 50),
    createData(98756325, 'Mobile', 355, 1, 40),
    createData(98652366, 'Handset', 50, 1, 18),
    createData(13286564, 'Computer Accessories', 100, 1, 60),
    createData(86739658, 'TV', 99, 0, 120),
    // createData(13256498, 'Keyboard', 125, 2, 70999),
    // createData(98753263, 'Mouse', 89, 2, 10570),
    createData(98753275, 'Desktop', 185, 1, 22),
    // createData(98753291, 'Chair', 100, 0, 14001)
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

function getComparator(order: SortDirection, orderBy: string) {
    return order === 'desc' ? (a: any, b: any) => descendingComparator(a, b, orderBy) : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any[], comparator: (a: any, b: any) => any) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells: {
    id: string;
    align: "left" | "right" | "inherit" | "center" | "justify" | undefined;
    disablePadding: boolean;
    label: string;
}[] = [
        {
            id: 'trackingNo',
            align: 'left',
            disablePadding: false,
            label: 'Product No.'
        },
        {
            id: 'name',
            align: 'left',
            disablePadding: true,
            label: 'Product Name'
        },
        {
            id: 'fat',
            align: 'right',
            disablePadding: false,
            label: 'Total Items'
        },
        {
            id: 'carbs',
            align: 'left',
            disablePadding: false,

            label: 'Status'
        },
        {
            id: 'protein',
            align: 'right',
            disablePadding: false,
            label: 'Total Wins'
        }
    ];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }: OrderTableHeadPropTypes) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

type OrderTableHeadPropTypes = {
    order?: SortDirection,
    orderBy: string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }: { status: number }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};



// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
    const [order] = useState<SortDirection>('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState<number[]>([]);

    const isSelected = (trackingNo: number) => selected.indexOf(trackingNo) !== -1;

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
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.trackingNo);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.trackingNo}
                                    selected={isItemSelected}
                                >
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Link color="secondary" component={RouterLink} to="">
                                            {row.trackingNo}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="left">
                                        <OrderStatus status={row.carbs} />
                                    </TableCell>
                                    <TableCell align="right">
                                        {<NumberFormat value={row.protein} displayType="text" thousandSeparator prefix=" " />}
                                        {/* intial $ sign in prefix */}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
