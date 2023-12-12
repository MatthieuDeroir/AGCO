// dataService.js

const API_BASE_URL = 'http://192.1:4000/api';

const getSettings = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/settings`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching settings:', error);
    }
}

const getTrucks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/camions`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching trucks:', error);
    }
};

const getMedias = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/media-management/`);
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