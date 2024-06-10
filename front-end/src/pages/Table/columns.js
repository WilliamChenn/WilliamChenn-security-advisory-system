import { convertLength } from "@mui/material/styles/cssUtils";
import Tooltip from '@mui/material/Tooltip';

const getSeverityClass = (cvss) => {
    if (cvss < 4) {
        return "Low-severity";
    }
    else if (cvss >= 4 && cvss < 7) {
        return "Medium-severity";
    }
    else if (cvss >= 7 && cvss < 9) {
        return "High-severity";
    }
    else if (cvss >= 9 && cvss <= 10) {
        return "Critical-severity";
    }
    else {
        return "n-a";
    }
};

const getEpssClass = (epss) => {
    if (epss < 0.05) {
        return "Low-probability";
    }
    else if (epss >= 0.05 && epss < 1) {
        return "Medium-probability";
    }
    else if (epss >= 1 && epss < 10) {
        return "High-probability";
    }
    else if (epss >= 10 && epss <= 100) {
        return "Very-high-probability";
    }

};

export const COLUMNS = [
    {
        Header: 'CVE',
        accessor: 'cve',
        Cell: ({ value }) => (
            <a href="#">{value}</a>
        )
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
        Header: 'CVSS',
        accessor: 'cvss',
        Cell: ({ row }) => {
            const cvss = row.original.cvss;
            return (
                <div className="severityCell">
                    <Tooltip title="Severity of security vulnerabilities (scale of 1-10)" placement="top" arrow>
                        <span className="tooltip-target">CVSS:</span>
                    </Tooltip>
                    <button id={getSeverityClass(cvss)}>
                        <Tooltip title={getSeverityClass(cvss)} placement="top" arrow>
                            <span className="tooltip-target">{cvss}</span>
                        </Tooltip>
                    </button>
                </div>
            );
        },
    },
    {
        Header: 'EPSS',
        accessor: 'epss',
        Cell: ({ row }) => {
            const epss = row.original.epss;
            return (
                <div className="severityCell">
                    <Tooltip title="Likelihood of the vulnerability being exploited in the wild within the next 30 days" placement="top" arrow>
                        <span className="tooltip-target">EPSS:</span>
                    </Tooltip>
                    <button id={getEpssClass(epss)}>
                        <Tooltip title={getEpssClass(epss)} placement="top" arrow>
                            <span className="tooltip-target">{epss}</span>
                        </Tooltip>
                    </button>
                </div>
            );
        },
    }
    // {
    //     Header: 'Criticality',
    //     accessor: row => `${row.cvss} - ${row.epss}`, // Custom accessor to combine cvss and epss
    //     Cell: ({ row }) => {
    //         const cvss = row.original.cvss;
    //         const epss = row.original.epss;
    //         return (
    //             <div className="severityCell">
    //                 <Tooltip title="Severity of security vulnerabilities (scale of 1-10)" placement="top" arrow>
    //                     <span className="tooltip-target">CVSS:</span>
    //                 </Tooltip>
    //                 <button id={getSeverityClass(cvss)}>
    //                     <Tooltip title={getSeverityClass(cvss)} placement="top" arrow>
    //                         <span className="tooltip-target">{cvss}</span>
    //                     </Tooltip>
    //                 </button>
    //                 <Tooltip title="Likelihood of the vulnerability being exploited in the wild within the next 30 days" placement="top" arrow>
    //                     <span className="tooltip-target">EPSS:</span>
    //                 </Tooltip>
    //                 <button id={getEpssClass(epss)}>
    //                     <Tooltip title={getEpssClass(epss)} placement="top" arrow>
    //                         <span className="tooltip-target">{epss}%</span>
    //                     </Tooltip>
    //                 </button>
    //             </div>
    //         );
    //     }
    // }
];
