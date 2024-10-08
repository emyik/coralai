// api.js
const BASE_URL = 'http://ec2-54-208-48-146.compute-1.amazonaws.com:8000'; // Replace with your actual API URL

// Function to fetch average temperature data
export const fetchAverageTemperature = async (markerId) => {
    try {
        const response = await fetch(`${BASE_URL}/markers/${markerId}/average-temperature`);
        if (!response.ok) {
            throw new Error(`Error fetching average temperature: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to fetch bleached coral status
export const fetchBleachedCoralStatus = async (markerId) => {
    try {
        const response = await fetch(`${BASE_URL}/markers/${markerId}/recent-bleach-readingt`);
        if (!response.ok) {
            throw new Error(`Error fetching bleached coral status: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to fetch bleached coral status
export const fetchBleachedCoralDataId = async (markerId) => {
    try {
        const response = await fetch(`${BASE_URL}/markers/${markerId}/bleached-status`);
        if (!response.ok) {
            throw new Error(`Error fetching bleached coral status: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
// Function to fetch recent markers data
export const fetchVideoURL = async (markerId) => {
    try {
        const response = await fetch(`${BASE_URL}/markers/${markerId}/stream-url`);
        if (!response.ok) {
            throw new Error(`Error fetching stream: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



// Function to fetch coral bleaching data
export const fetchCoralBleachingData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/bleaching-data`);
        if (!response.ok) {
            throw new Error(`Error fetching bleached coral data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to fetch average temperature data
export const fetchAverageTemperatureData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/temperature-data`);
        if (!response.ok) {
            throw new Error(`Error fetching avg temp data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to fetch recent markers data
export const fetchRecentMarkers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/markers/`);
        if (!response.ok) {
            throw new Error(`Error fetching recent markers: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to fetch recent markers data
export const fetchAlerts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/alerts/`);
        if (!response.ok) {
            throw new Error(`Error fetching alerts: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



// Function to fetch recent markers data and process the base64 images
export const fetchPastImages = async (markerId) => {
    try {
        const response = await fetch(`${BASE_URL}/past-images/${markerId}`);
        if (!response.ok) {
            throw new Error(`Error fetching past images: ${response.statusText}`);
        }

      

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


// Function to fetch recent markers data and process the base64 images
export const startStream = async (markerId) => {
    try {
        const response = await fetch(`${BASE_URL}/startstream/${markerId}`);
        if (!response.ok) {
            throw new Error(`Error fetching stream: ${response.statusText}`);
        }

      

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


// Function to fetch recent markers data and process the base64 images
export const stopStream = async () => {
    try {
        const response = await fetch(`${BASE_URL}/stopstream/}`);
        if (!response.ok) {
            throw new Error(`Error fetching stream: ${response.statusText}`);
        }

      

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to fetch recent markers data and process the base64 images
export const getStream = (onMessage, id) => {
    var b = `ws://ec2-54-208-48-146.compute-1.amazonaws.com:8000/ws/stream?id=${id}`
    const socket = new WebSocket(b);

    // WebSocket event listeners
    socket.onopen = () => {
        console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
        // Call the provided callback function with the received data
        console.log(event.data);
        // const data = JSON.parse(event.data);
        onMessage(event.data); // Process the incoming data
    };

    socket.onerror = (error) => {
        console.error(`WebSocket error: ${error.message}`);
    };

    socket.onclose = (event) => {
        console.log(`WebSocket connection closed: ${event.reason}`);
    };

    // Return a function to close the WebSocket connection
    return () => {
        socket.close();
    };
};