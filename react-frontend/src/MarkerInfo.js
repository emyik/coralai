import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams, Link } from 'react-router-dom';
import './map.css';

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
            chart: {
                backgroundColor: 'transparent', // Make the background transparent
              },
            title: { text: 'Average Temperature Over Time',
                style: {
                    color: '#FFFFFF', // Make title text white
                    fontWeight: 'bold'
                  }
            },
            xAxis: {
                type: 'datetime',
                title: { text: 'Date',
                    style: {
                        color: '#FFFFFF', // Make X-axis title white
                        fontWeight: 'bold'
                      }
                },
                tickInterval: 24 * 3600 * 1000, // One day
                dateTimeLabelFormats: { day: '%m-%d' },
                labels: { rotation: -45, align: 'right', style: {
                    color: '#FFFFFF', // Make X-axis labels white
                    fontWeight: 'bold'
                  }},
                  lineColor: '#FFFFFF', // Make X-axis line white
                  tickColor: '#FFFFFF'  // Make X-axis ticks white
            },
            yAxis: { title: { text: 'Temperature (°C)',
                style: {
                    color: '#FFFFFF', // Make X-axis title white
                    fontWeight: 'bold'
                  }
            },
            labels: { 
                 style: {
                    color: '#FFFFFF', // Make X-axis labels white
                    fontWeight: 'bold'
                  }
             },
             gridLineColor: 'rgba(255, 255, 255, 0.2)', // Optionally, make gridlines subtle white
             lineColor: '#FFFFFF', // Make X-axis line white
             tickColor: '#FFFFFF'  // Make X-axis ticks white
        },
            series: [{
                name: 'Temperature',
                data: tempData.map(item => [new Date(item.date).getTime(), item.value]),
                type: 'line',
                color: '#d46b16', // Make the line white
                tooltip: {
                valueSuffix: ' °C',
                },
                lineWidth: 5,
                marker: {
                lineColor: '#FFFFFF' // Make marker outline white
                }
            }],
            tooltip: {
                shared: true,
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Optional: Adjust tooltip background color
                style: {
                  color: '#333' // Optional: Adjust tooltip text color
                }
              },
              plotOptions: {
                series: {
                  marker: {
                    enabled: true,
                    fillColor: '#FFFFFF' // Make marker fill white
                  }
                }
              }
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
            chart: {
                backgroundColor: 'transparent', // Make the background transparent
              },
            title: { 
                text: 'Coral Bleached Over Time' ,
                style: {
                    color: '#FFFFFF', // Make title text white
                    fontWeight: 'bold'
                  }
            },
            xAxis: {
                type: 'datetime',
                title: { text: 'Date',
                    style: {
                        color: '#FFFFFF', // Make X-axis title white
                        fontWeight: 'bold'
                    }},
                tickInterval: 24 * 3600 * 1000, // One day
                dateTimeLabelFormats: { day: '%m-%d' },
                labels: { 
                    rotation: -45,
                     align: 'right',
                     style: {
                        color: '#FFFFFF', // Make X-axis labels white
                        fontWeight: 'bold'
                      }
                 },
                 lineColor: '#FFFFFF', // Make X-axis line white
                 tickColor: '#FFFFFF'  // Make X-axis ticks white
            },
            yAxis: {
                title: { text: 'Bleached Status' ,
                    style: {
                        color: '#FFFFFF', // Make X-axis title white
                        fontWeight: 'bold'
                      }
                },
                gridLineColor: 'rgba(255, 255, 255, 0.2)', // Optionally, make gridlines subtle white
                categories: ['Healthy', 'Bleached'], // Use categories instead of numbers
                min: 0,
                max: 1,
                labels: {
                    style: {
                        color: '#FFFFFF', // Make category labels white
                        fontWeight: 'bold', // Optionally make the labels bold
                    },
                },
            },
            series: [{
                name: 'Temperature',
                fontWeight: 'bold',
                color: '#d46b16',
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
            </Link>

            {/* Dashboard Container */}
            <div
                style={{
                    width: '35%',
                    BackgroundImage: "url('bg.png')",
                    // backgroundColor: '#f4f4f4',
                    padding: '10px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h2 style={{ fontSize: '24px', margin: '0 0', color: "#FFFFFF"}}>
                    Marker {id} Information
                </h2>
                <h3 style={{ margin: '10px 0', fontSize: '20px', fontWeight: 'normal', color: "#FFFFFF"}}>
                    Status:
                    <span style={{ color: bleachedPrediction['bleached'] ? 'red' : 'green', fontWeight: 'bold' }}>
                        {bleachedPrediction['bleached'] ? ' Bleached' : ' Healthy'}
                    </span>
                </h3>
                <p style={{ margin: 0, fontSize: '16px', marginBottom: "20px", color: "#FFFFFF"}}>
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
