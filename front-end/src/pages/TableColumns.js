import { convertLength } from "@mui/material/styles/cssUtils";
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

//helper methods to turn cvss and epss numerical score into level

const getSeverityClass = (cvss) => {
    if (cvss > 0 && cvss < 4) {
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
    else {
        return "n-a";
    }

};
export const COLUMNS = [
    {
      Header: 'CVE',
      accessor: 'cve_id',
      Cell: ({ value }) => (
        <Link to={`/learn-more/${value}`}>{value}</Link>
      ),
      width: 160,
    },
    {
      Header: 'Summary',
      accessor: 'summary',
      Cell: ({ value }) => {
        return <span className="truncate-two-lines">{value}</span>;
      }
    },
    {
      Header: 'Published',
      accessor: 'publish_date',
      Cell: ({row}) => {
        let rawDate = row.original.publish_date;
        let publishDate = rawDate ? rawDate.substring(0, 10) : "N/A";
        return publishDate;
      }
    },
    {
      Header: 'Updated',
      accessor: 'update_date',
      Cell: ({row}) => {
        let rawDate = row.original.update_date;
        let updateDate = rawDate ? rawDate.substring(0, 10) : "N/A";
        return updateDate;
      }
    },
    {
      Header: 'Vendor',
      accessor: 'vendor.name'
    },
    {
      Header: 'CVSS',
      accessor: 'max_cvss_base_score',
      Cell: ({ row }) => {
        const cvss = row.original.max_cvss_base_score || "N/A";
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
      accessor: 'epss_percentile',
      Cell: ({ row }) => {
        let epss = row.original.epss_percentile;
        if (epss != null && epss != undefined && !isNaN(epss)) {
          epss = parseFloat(epss).toFixed(2);
        }
        else {
          epss = "N/A";
        }
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
  ];
