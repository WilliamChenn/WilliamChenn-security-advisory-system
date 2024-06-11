import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CveDetail = () => {
    const { cveNumber } = useParams();
    const [cveDetail, setCveDetail] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/api/v1/cves/${cveNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCveDetail(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [cveNumber]);

    if (!cveDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{cveDetail.cve_number}</h1>
            <p>{cveDetail.summary}</p>
            <p>Published: {cveDetail.publish_date}</p>
            <p>Updated: {cveDetail.update_date}</p>
            <p>Vendor: {cveDetail.vendor}</p>
            <p>CVSS: {cveDetail.max_cvss_base_score}</p>
            <p>EPSS: {cveDetail.epss_percentile}</p>
            <p>Product: {cveDetail.product}</p>
        </div>
    );
};

export default CveDetail;
