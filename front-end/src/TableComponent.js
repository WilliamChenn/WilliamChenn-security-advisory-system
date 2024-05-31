import React from 'react';
import './TableComponent.css';

const TableComponent = () => {
  // Step 2: Prepare the Data
  const data = [
    { title: "Improper Input Validation", date: "22 MAY 2024", severity: "Low", cve: "2024-29946", },
    { title: "Authentication Bypass", date: "22 MAY 2024", severity: "Critical", cve: "2024-29946",},
    { title: "Uncontrolled Resource Consumption", date: "22 MAY 2024", severity: "Low", cve: "2024-29946",},
    {title: "Insufficient Session Expiration", date: "22 MAY 2024", severity: "Medium", cve: "2024-29946",},
    {title: "SQL Injection", date: "22 MAY 2024", severity: "Low", cve: "2024-29946"},
    {title: "Cross-site Scripting(XSS)", date: "22 MAY 2024", severity: "Medium", cve: "2024-29946",},
    {title: "Uncontrolled Resource Consumption", date: "22 MAY 2024", severity: "Low", cve: "2024-29946",},
    {title: "Open Redirect", date: "22 MAY 2024", severity: "Medium", cve: "2024-29946"},
    {title: "Memory Leak", date: "22 MAY 2024", severity: "Low", cve: "2024-29946"},
  ];

  return (
    // Step 3: Create the Table Structure
    <table>
      <thead>
        <tr>
          <th>TITLE</th>
          <th>DATE</th>
          <th>SEVERITY</th>
          <th>CVE</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.title}>
            <td>{item.title}</td>
            <td>{item.date}</td>
            <td>{item.severity}</td>
            <td>{item.cve}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;