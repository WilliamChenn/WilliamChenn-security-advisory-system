import { convertLength } from "@mui/material/styles/cssUtils";

export const COLUMNS = [
    {
        Header: 'CVE',
        accessor: 'cve'
    },
    {
        Header: 'Summary',
        accessor: 'summary',
    },
    {
        Header: 'Published',
        accessor: 'publishDate'
    },
    {
        Header: 'Updated',
        accessor: 'updateDate'
    },
    {
        Header: 'Affected Product',
        accessor: 'product'
    },
    {
        Header: 'Criticality',
        accessor: 'cvss',
        accessor: 'epss'
    }
]