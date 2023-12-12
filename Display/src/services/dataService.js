// dataService.js

const API_BASE_URL = process.env.DISPLAY_URL;

const getSettings = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/settings`);
        console.log("response", response)
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching settings:', error);
    }
}

const getTrucks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/camions`);
        console.log("response", response)

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching trucks:', error);
    }
};

const getMedias = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/media-management/`);
        console.log("response", response)

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching medias:', error);
    }
};

// Export all methods under a single dataService object
const dataService = {
    getSettings,
    getTrucks,
    getMedias
};

export default dataService;