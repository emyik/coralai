import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams, Link } from 'react-router-dom';
import './map.css';
import { fetchAverageTemperature, fetchBleachedCoralDataId, fetchBleachedCoralStatus, fetchPastImages, getStream, startStream, stopStream } from './api';

const MarkerInfo = () => {
    const [averageTempData, setAverageTempData] = useState({});
    const [bleachedCoralData, setBleachedCoralData] = useState({});
    const [bleachedPrediction, setBleachedPrediction] = useState({});
    const [zoomedImage, setZoomedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for slideshow
    let { id } = useParams();
    const [images, setImages] = useState([]);
    const [frame, setFrame] = useState(null)


    const img = require.context('../public/images', true);

    useEffect(() => {
        // Function to update the state
        // Function to handle incoming stream messages
        const handleIncomingData = (data) => {
            setFrame(`data:image/jpeg;base64,${data}`);
            console.log(1)
        };

        const closeStream = getStream(handleIncomingData, id); // Establish the WebSocket connection

        const fetchData = async () => {
            try {

                try {
                    const fetchedImages = await fetchPastImages(id);
                    console.log(fetchedImages);
                    setImages(fetchedImages.map(x => img(`./${x.split('/')[1]}`)))

                }
                catch (e) {

                }


                let tempData = [];
                let temp = (await fetchAverageTemperature(id))['running_average_temperatures'];

                console.log(temp)
                for (let i = temp.length - 1; i >= 0; i--) {
                    tempData.push({ timestep: i, value: temp[i] })
                }

                // Process temperature data into Highcharts format
                const processedTemp = {
                    chart: {
                        backgroundColor: 'transparent',
                    },
                    title: {
                        text: 'Average Temperature Over Time',
                        style: {
                            color: '#FFFFFF',
                            fontWeight: 'bold'
                        }
                    },
                    xAxis: {

                        title: {
                            text: 'Time',
                            style: {
                                color: '#FFFFFF',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            align: 'right',
                            style: {
                                color: '#FFFFFF',
                                fontWeight: 'bold'
                            }
                        },
                        lineColor: '#FFFFFF',
                        tickColor: '#FFFFFF'
                    },
                    yAxis: {
                        title: {
                            text: 'Temperature (°C)',
                            style: {
                                color: '#FFFFFF',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            style: {
                                color: '#FFFFFF',
                                fontWeight: 'bold'
                            }
                        },
                        gridLineColor: 'rgba(255, 255, 255, 0.2)',
                        lineColor: '#FFFFFF',
                        tickColor: '#FFFFFF'
                    },
                    series: [{
                        name: 'Temperature',
                        data: tempData.map(item => [item.timestep, item.value]),
                        type: 'line',
                        color: '#d46b16',
                        tooltip: {
                            valueSuffix: ' °C',
                        },
                        lineWidth: 5,
                        marker: {
                            lineColor: '#FFFFFF'
                        }
                    }],
                    tooltip: {
                        shared: true,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        style: {
                            color: '#333'
                        }
                    },
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: true,
                                fillColor: '#FFFFFF'
                            }
                        }
                    }
                };

                setAverageTempData(processedTemp);

                // Dummy coral bleached status data
                // const coralBleachedData = [
                //     { date: '2023-09-01', value: 0, status: 'Healthy' },
                //     { date: '2023-09-02', value: 1, status: 'Bleached' },
                //     { date: '2023-09-03', value: 1, status: 'Bleached' },
                //     { date: '2023-09-04', value: 0, status: 'Healthy' },
                //     { date: '2023-09-05', value: 1, status: 'Bleached' },
                //     { date: '2023-09-06', value: 1, status: 'Bleached' },
                //     { date: '2023-09-07', value: 0, status: 'Healthy' },
                // ];


                const coralBleachedData = await fetchBleachedCoralDataId(id);


                // for (let i = temp.length - 1; i >= Math.max(0, temp.length - 1 - 6); i--) {
                //     coralBleachedData.push({ date: sampleDates[6 - (temp.length - 1 - i)].date, value: temp[i].value })
                // }


                // Process coral bleached data into Highcharts format
                const processedCoralBleached = {
                    chart: {
                        backgroundColor: 'transparent',
                    },
                    title: {
                        text: 'Coral Bleaching Over Time',
                        style: {
                            color: '#FFFFFF',
                            fontWeight: 'bold'
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Time',
                            style: {
                                color: '#FFFFFF',
                                fontWeight: 'bold'
                            }
                        },
                        labels: {
                            align: 'right',
                            style: {
                                color: '#FFFFFF',
                                fontWeight: 'bold'
                            }
                        },
                        lineColor: '#FFFFFF',
                        tickColor: '#FFFFFF'
                    },
                    yAxis: {
                        title: {
                            text: 'Bleaching Status',
                            style: {
                                color: '#FFFFFF',
                                fontWeight: 'bold'
                            }
                        },
                        gridLineColor: 'rgba(255, 255, 255, 0.2)',
                        categories: ['Healthy', 'Bleached'],
                        min: 0,
                        max: 1,
                        labels: {
                            style: {
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                            },
                        },
                    },
                    series: [{
                        name: 'Bleaching Status',
                        fontWeight: 'bold',
                        color: '#d46b16',
                        data: coralBleachedData.map(item => [item.timestep, item.bleaching > 750 ? 1 : 0]),
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



                const prediction = { bleached: coralBleachedData[coralBleachedData.length - 1].bleaching > 750 }


                setBleachedPrediction(prediction);

            } catch (error) {
                console.error('Failed to fetch images:', error);
            }


        }
        fetchData();
        return () => {
            closeStream(); // Call the function to close the WebSocket
        };
    }, [id]);

    // Handle image click to zoom
    const handleImageClick = (imageSrc) => {
        setZoomedImage(imageSrc);
    };

    // Close zoomed image
    const closeZoomedImage = () => {
        setZoomedImage(null);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
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
            ></Link>

            {/* Dashboard Container */}
            <div
                style={{
                    width: '35%',
                    overflowY: 'auto',
                    padding: '10px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundImage: "url('bg.png')",
                }}
            >
                <h1 style={{ margin: '30px 0 0 0', color: '#FFFFFF' }}>Marker {id} Information</h1>
                <h3 style={{ margin: '10px 0', fontSize: '20px', fontWeight: 'normal', color: '#FFFFFF' }}>
                    Most Recent Status:
                    <span style={{ color: bleachedPrediction['bleached'] ? 'red' : 'green', fontWeight: 'bold' }}>
                        {bleachedPrediction['bleached'] ? ' Bleached' : ' Healthy'}
                    </span>
                </h3>
                {/* Images */}
                <div>
                    <h2 style={{ margin: '10px 0', color: '#FFFFFF' }}>Recent Images</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button onClick={prevImage}>&#10094;</button>
                        {images.length > 0 ? (
                            <img
                                src={images[currentImageIndex]}
                                alt={`Slide ${currentImageIndex + 1}`}
                                style={{ width: '100%', cursor: 'pointer' }}
                                onClick={() => handleImageClick(images[currentImageIndex])}
                            />
                        ) : (
                            <p style={{ color: '#FFFFFF' }}>Loading images...</p>
                        )}
                        <button onClick={nextImage}>&#10095;</button>
                    </div>
                </div>
                {/* Coral Bleached Status Chart */}
                <div style={{ width: '95%', marginBottom: '30px', height: '350px' }}>
                    <HighchartsReact highcharts={Highcharts} options={bleachedCoralData} />
                </div>
                {/* Temperature Chart */}
                <div style={{ width: '95%', marginTop: '20px', marginBottom: '30px', height: '350px' }}>
                    <HighchartsReact highcharts={Highcharts} options={averageTempData} />
                </div>


            </div>

            {/* Fixed Video Container */}
            <div
                style={{
                    width: '65%',
                    padding: '10px',
                    boxSizing: 'border-box',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                <div>
                    {frame ? (
                        <img src={frame} alt="Streaming frame" style={{ width: '100%' }} />
                    ) : (
                        <p>Waiting for video stream...</p>
                    )}
                </div>

            </div>

            {/* Zoomed Image Modal */}
            {zoomedImage && (
                <div
                    onClick={closeZoomedImage}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        cursor: 'pointer',
                    }}
                >
                    <img
                        src={zoomedImage}
                        alt="Zoomed"
                        style={{ maxWidth: '90%', maxHeight: '90%', border: '5px solid white' }}
                    />
                </div>
            )}
        </div>
    );
};

export default MarkerInfo;