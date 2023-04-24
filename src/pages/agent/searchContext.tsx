import { createContext, ReactElement, useMemo, useState } from "react";


type ContextType = {
    page: number,
    order: "asc" | "desc",
    selected: string[],
    orderBy: string,
    filterName: string,
    rowsPerPage: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    setOrderBy: React.Dispatch<React.SetStateAction<string>>,
    setFilterName: React.Dispatch<React.SetStateAction<string>>,
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
    handleRequestSort: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, property: string) => void,
    handleFilter: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const SearchContext = createContext<ContextType>({
    page: 0,
    order: 'asc',
    selected: [],
    orderBy: 'name',
    filterName: '',
    rowsPerPage: 5,
    setPage: () => {},
    setOrder: () => {},
    setSelected: () => {},
    setOrderBy: () => {},
    setFilterName: () => {},
    setRowsPerPage: () => {},
    handleRequestSort: () => {},
    handleFilter: (_) => {}
});

export function SearchContextProvider({ children }: { children: ReactElement | ReactElement[] }) {


    const [page, setPage] = useState(0);

    const [order, setOrder] = useState<"asc" | "desc">('asc');

    const [selected, setSelected] = useState<string[]>([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);





    return (<SearchContext.Provider
        value={useMemo(() => {
            function handleRequestSort(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, property: string) {
                const isAsc = orderBy === property && order === 'asc';
                setOrder(isAsc ? 'desc' : 'asc');
                setOrderBy(property);
            };
            function handleFilter(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
                
                setPage(0);
                setFilterName(event.target.value);
            };
            return {
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
                handleRequestSort,
                handleFilter
            }
        }, [filterName, order, orderBy, page, rowsPerPage, selected])}
    >
        {children}
    </SearchContext.Provider>)
}

export const SearchContextConsumer = SearchContext.Consumer;