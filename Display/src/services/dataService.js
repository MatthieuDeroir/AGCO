// dataService.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const getSettings = async () => {
    try {
        const response = await fetch(` ${API_BASE_URL}/api/settings`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching settings:', error);
    }
}

const getTrucks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/camions`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching trucks:', error);
    }
};

const getMedias = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/media-management/`);


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