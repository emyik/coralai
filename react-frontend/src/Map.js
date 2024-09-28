import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Highcharts, { Options } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

// Define the default icon for Leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const ExternalLinkIcon = () => `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / External_Link"> <path id="Vector" d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
`;

const Map = () => {
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [bleachedCoralData, setBleachedCoralData] = useState([]);
  const [averageTempData, setAverageTempData] = useState([]);
  const [recentMarkers, setRecentMarkers] = useState([]);

  useEffect(() => {
    // Clean up existing map instances
    const container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }

    // Initialize the Leaflet map without zoom controls
    const map = L.map("map", {
      zoomControl: false, // Disable zoom controls
    }).setView([51.505, -0.09], 6);

    // Add a tile layer using Mapbox styles
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoidGFyLWhlbCIsImEiOiJjbDJnYWRieGMwMTlrM2luenIzMzZwbGJ2In0.RQRMAJqClc4qoNwROT8Umg",
      }
    ).addTo(map);

    // Set the default icon for all markers
    L.Marker.prototype.options.icon = DefaultIcon;

    // Fetch marker data
    const fetchData = async () => {
      try {
        // Dummy data for bleached coral detection over time
        const coralData = [
          { date: "2023-09-01", value: 50 },
          { date: "2023-09-02", value: 55 },
          { date: "2023-09-03", value: 70 },
          { date: "2023-09-04", value: 80 },
          { date: "2023-09-05", value: 60 },
          { date: "2023-09-06", value: 90 },
          { date: "2023-09-07", value: 85 },
        ];

        const processedCoral = {
          title: {
            text: 'Coral Bleached Over Time',
          },
          xAxis: {
            type: 'datetime',
            title: {
              text: 'Date',
            },
            tickInterval: 24 * 3600 * 1000, // One day
            dateTimeLabelFormats: {
              day: '%m-%d', // Format for the day
            },
            labels: {
              rotation: -45, // Rotate labels for better visibility
              align: 'right', // Align labels to the right
            },
          },
          yAxis: {
            title: {
              text: '% Bleached',
            },
          },
          series: [{
            name: '% Bleached',
            data: coralData.map(item => [new Date(item.date).getTime(), item.value]),
            type: 'line',
            tooltip: {
              valueSuffix: '%',
            }
          }],
          tooltip: {
            shared: true,
          },
          plotOptions: {
            series: {
              marker: {
                enabled: true,
              }
            }
          }
        };

        setBleachedCoralData(processedCoral);

        // Dummy data for average temperature over time
        const tempData = [
          { date: "2023-09-01", value: 25 },
          { date: "2023-09-02", value: 26 },
          { date: "2023-09-03", value: 27 },
          { date: "2023-09-04", value: 28 },
          { date: "2023-09-05", value: 27 },
          { date: "2023-09-06", value: 29 },
          { date: "2023-09-07", value: 30 },
        ];
        const processedTemp = {
          title: {
            text: 'Average Coral Temperature Over Time',
          },
          xAxis: {
            type: 'datetime',
            title: {
              text: 'Date',
            },
            tickInterval: 24 * 3600 * 1000, // One day
            dateTimeLabelFormats: {
              day: '%m-%d', // Format for the day
            },
            labels: {
              rotation: -45, // Rotate labels for better visibility
              align: 'right', // Align labels to the right
            },
          },
          yAxis: {
            title: {
              text: 'Temperature (°C)',
            },
          },
          series: [{
            name: 'Temperature',
            data: tempData.map(item => [new Date(item.date).getTime(), item.value]),
            type: 'line',
            tooltip: {
              valueSuffix: ' °C',
            }
          }],
          tooltip: {
            shared: true,
          },
          plotOptions: {
            series: {
              marker: {
                enabled: true,
              }
            }
          }
        };
        setAverageTempData(processedTemp);

        // Dummy data for recent markers
        const markersData = [
          { id: 1, name: "Bleached Coral A", lat: 51.505, lng: -0.09, classification: 1 },
          { id: 2, name: "Bleached Coral B", lat: 51.51, lng: -0.1, classification: 0 },
          { id: 3, name: "Bleached Coral C", lat: 51.52, lng: -0.08, classification: 1 },
          { id: 4, name: "Bleached Coral D", lat: 51.54, lng: -0.08, classification: 1 },
        ];
        setRecentMarkers(markersData);

        // Add markers to the map
        markersData.forEach((markerData) => {
          const { lat, lng, name, classification } = markerData;
          const marker = L.marker([lat, lng], {
            icon: L.icon({
              iconUrl: classification
                ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
                : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
            }),
          }).addTo(map);

          const markerInfoLink = `/marker/${markerData.id}`; // Link to your component

          const popupContent = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: bold;">${name}</span>
              <a href="${markerInfoLink}" target="_blank" style="text-decoration: none; color: inherit;">
                ${ExternalLinkIcon()}
              </a>
            </div>
            <iframe 
              src="https://your-custom-stream-url.com/live-stream" 
              width="300" 
              height="200" 
              frameborder="0" 
              allowfullscreen
              style="border:0;"
            ></iframe><br>
          `;

          // Bind the popup with the customized content
          marker.bindPopup(popupContent);
        });
      } catch (error) {
        console.error("Error fetching marker data:", error);
      }
    };

    // Fetch markers
    fetchData();

    // Cleanup map on component unmount
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  // Toggle the visibility of the dashboard
  const toggleDashboard = () => {
    setIsDashboardVisible((prev) => !prev);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isDashboardVisible ? "row" : "row-reverse",
      }}
    >
      {/* Dashboard Container */}
      {isDashboardVisible && (
        <div
          style={{
            width: "35%",
            height: "100vh",
            backgroundColor: "#f4f4f4",
            padding: "10px",
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Horizontally center the content
          }}
        >
          <h2 style={{ textAlign: "center", width: "100%", marginBottom: "30px" }}>Quoral Dashboard</h2>
          <div style={{ width: "100%", height: "100%", }}>
            <HighchartsReact highcharts={Highcharts} options={bleachedCoralData} containerProps={{ style: { height: "90%" } }}/>
          </div>
          <div style={{ width: "100%", height: "100%"}}>
            <HighchartsReact highcharts={Highcharts} options={averageTempData} containerProps={{ style: { height: "90%" } }}/>
          </div>

          {/* Recent Markers Section */}
          <div style={{ width: "100%", overflowY: "auto", maxHeight: "200px" }}>
            <h3>Recent Markers</h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {recentMarkers.map(marker => (
                <li key={marker.id} style={{ margin: "5px 0" }}>
                  <b>{marker.name}</b> - Lat: {marker.lat}, Lng: {marker.lng}, Classification: {marker.classification}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div
        id="map"
        style={{
          height: "100vh",
          width: isDashboardVisible ? "70%" : "100%", // Adjust width based on dashboard visibility
        }}
      ></div>

      {/* Hamburger Toggle Button */}
      <div
        onClick={toggleDashboard}
        style={{
          position: "fixed", // Keep hamburger fixed to the viewport
          top: "20px",
          left: "20px", // Always stay on the left side
          zIndex: 1000,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "30px",
          height: "22px",
          padding: "5px",
          backgroundColor: "#fff",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Hamburger Lines */}
        <span
          style={{
            height: "3px",
            width: "100%",
            backgroundColor: "#333",
            borderRadius: "2px",
          }}
        ></span>
        <span
          style={{
            height: "3px",
            width: "100%",
            backgroundColor: "#333",
            borderRadius: "2px",
          }}
        ></span>
        <span
          style={{
            height: "3px",
            width: "100%",
            backgroundColor: "#333",
            borderRadius: "2px",
          }}
        ></span>
      </div>
    </div>
  );
};

export default Map;
