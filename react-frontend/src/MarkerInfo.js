import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams, Link } from 'react-router-dom';

const MarkerInfo = () => {
    const [averageTempData, setAverageTempData] = useState({});
    const [bleachedCoralData, setBleachedCoralData] = useState({});
    const [bleachedPrediction, setBleachedPrediction] = useState({});
    let { id } = useParams();

    useEffect(() => {
        // Dummy temperature data for the specific marker
        const tempData = [
            { date: '2023-09-01', value: 25 },
            { date: '2023-09-02', value: 26 },
            { date: '2023-09-03', value: 27 },
            { date: '2023-09-04', value: 28 },
            { date: '2023-09-05', value: 27 },
            { date: '2023-09-06', value: 29 },
            { date: '2023-09-07', value: 30 },
        ];

        // Process temperature data into Highcharts format
        const processedTemp = {
            title: { text: 'Average Temperature Over Time' },
            xAxis: {
                type: 'datetime',
                title: { text: 'Date' },
                tickInterval: 24 * 3600 * 1000, // One day
                dateTimeLabelFormats: { day: '%m-%d' },
                labels: { rotation: -45, align: 'right' },
            },
            yAxis: { title: { text: 'Temperature (°C)' } },
            series: [{
                name: 'Temperature',
                data: tempData.map(item => [new Date(item.date).getTime(), item.value]),
                type: 'line',
                tooltip: { valueSuffix: ' °C' },
            }],
            tooltip: { shared: true },
            plotOptions: {
                series: {
                    marker: { enabled: true },
                },
            },
        };

        setAverageTempData(processedTemp);

        // Dummy coral bleached status data
        const coralBleachedData = [
            { date: '2023-09-01', value: 0, status: 'Healthy' },
            { date: '2023-09-02', value: 1, status: 'Bleached' },
            { date: '2023-09-03', value: 1, status: 'Bleached' },
            { date: '2023-09-04', value: 0, status: 'Healthy' },
            { date: '2023-09-05', value: 1, status: 'Bleached' },
            { date: '2023-09-06', value: 1, status: 'Bleached' },
            { date: '2023-09-07', value: 0, status: 'Healthy' },
        ];

        // Process coral bleached data into Highcharts format
        const processedCoralBleached = {
            title: { text: 'Coral Bleached Over Time' },
            xAxis: {
                type: 'datetime',
                title: { text: 'Date' },
                tickInterval: 24 * 3600 * 1000, // One day
                dateTimeLabelFormats: { day: '%m-%d' },
                labels: { rotation: -45, align: 'right' },
            },
            yAxis: {
                title: { text: 'Bleached Status' },
                categories: ['Healthy', 'Bleached'], // Use categories instead of numbers
                min: 0,
                max: 1,
            },
            series: [{
                name: 'Temperature',
                data: coralBleachedData.map(item => [new Date(item.date).getTime(), item.value]),
                type: 'scatter',
            }],
            tooltip: { enabled: false },
            plotOptions: {
                series: {
                    marker: { enabled: true, radius: 6 },
                },
            },
        };

        setBleachedCoralData(processedCoralBleached);
        const prediction = { bleached: 1, confidence: 0.98 };
        setBleachedPrediction(prediction);
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
            {/* Floating Back Button with SVG */}
            <Link
                to="/map"
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    textDecoration: 'none',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <svg
                    fill="#000000"
                    height="40px" // Adjust size as needed
                    width="40px" // Adjust size as needed
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 26.676 26.676"
                    xmlSpace="preserve"
                >
                    <g>
                        <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59 c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815 C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029 c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562 C26.18,21.891,26.141,21.891,26.105,21.891z"></path>
                    </g>
                </svg>
            </Link>

            {/* Dashboard Container */}
            <div
                style={{
                    width: '35%',
                    backgroundColor: '#f4f4f4',
                    padding: '10px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h2 style={{ fontSize: '24px', margin: '0 0' }}>
                    Marker {id} Information
                </h2>
                <h3 style={{ margin: '10px 0', fontSize: '20px', fontWeight: 'normal' }}>
                    Status:
                    <span style={{ color: bleachedPrediction['bleached'] ? 'red' : 'green', fontWeight: 'bold' }}>
                        {bleachedPrediction['bleached'] ? ' Bleached' : ' Healthy'}
                    </span>
                </h3>
                <p style={{ margin: 0, fontSize: '16px', marginBottom: "20px" }}>
                    Confidence: <span style={{ fontWeight: 'bold' }}>{bleachedPrediction['confidence']}</span>
                </p>
                <div style={{ width: '100%', height: '50%' }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={averageTempData}
                        containerProps={{ style: { height: '90%' } }}
                    />
                </div>
                <div style={{ width: '100%', height: '50%' }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={bleachedCoralData}
                        containerProps={{ style: { height: '90%' } }}
                    />
                </div>
            </div>

            {/* Video Container */}
            <div
                style={{
                    width: '65%', // Use the remaining width
                    height: '100vh',
                    backgroundColor: '#000',
                    position: 'relative',
                }}
            >
                <iframe
                    src="https://your-custom-stream-url.com/live-stream"
                    width="100%"
                    height="100%"
                    style={{
                        border: 0,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default MarkerInfo;
