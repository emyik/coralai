import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const MarkerInfo = () => {
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [averageTempData, setAverageTempData] = useState({});

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

    // Prepare the Highcharts options
    const processedTemp = {
      title: {
        text: 'Average Temperature Over Time',
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
        tickInterval: 24 * 3600 * 1000, // One day
        dateTimeLabelFormats: {
          day: '%m-%d',
        },
        labels: {
          rotation: -45,
          align: 'right',
        },
      },
      yAxis: {
        title: {
          text: 'Temperature (°C)',
        },
      },
      series: [
        {
          name: 'Temperature',
          data: tempData.map((item) => [
            new Date(item.date).getTime(),
            item.value,
          ]),
          type: 'line',
          tooltip: {
            valueSuffix: ' °C',
          },
        },
      ],
      tooltip: {
        shared: true,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
          },
        },
      },
    };

    setAverageTempData(processedTemp);
  }, []);

  // Toggle the visibility of the dashboard
  const toggleDashboard = () => {
    setIsDashboardVisible((prev) => !prev);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isDashboardVisible ? 'row' : 'row-reverse',
      }}
    >
      {/* Dashboard Container */}
      {isDashboardVisible && (
        <div
          style={{
            width: '35%',
            height: '100vh',
            backgroundColor: '#f4f4f4',
            padding: '10px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2 style={{ textAlign: 'center', width: '100%', marginBottom: '30px' }}>
            Marker Information
          </h2>
          <div style={{ width: '100%', height: '100%' }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={averageTempData}
              containerProps={{ style: { height: '90%' } }}
            />
          </div>
        </div>
      )}

      {/* Video Container */}
      <div
        style={{
          width: isDashboardVisible ? '65%' : '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}
      >
        <iframe
          src="https://your-custom-stream-url.com/live-stream"
          width="90%"
          height="90%"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      </div>

      {/* Hamburger Toggle Button */}
      <div
        onClick={toggleDashboard}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '30px',
          height: '22px',
          padding: '5px',
          backgroundColor: '#fff',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Hamburger Lines */}
        <span
          style={{
            height: '3px',
            width: '100%',
            backgroundColor: '#333',
            borderRadius: '2px',
          }}
        ></span>
        <span
          style={{
            height: '3px',
            width: '100%',
            backgroundColor: '#333',
            borderRadius: '2px',
          }}
        ></span>
        <span
          style={{
            height: '3px',
            width: '100%',
            backgroundColor: '#333',
            borderRadius: '2px',
          }}
        ></span>
      </div>
    </div>
  );
};

export default MarkerInfo;
