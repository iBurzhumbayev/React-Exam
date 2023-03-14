import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:3001'
});

apiClient.interceptors.response.use((response) => {
    console.log('API: ', response)
    return response;
    }, 
    (error) => {
        console.log('API ERROR: ', error)
        return Promise.reject(error);
    }
)

const getResource = async (url: string) => {
    try {
        const response = await apiClient.get(url);
    
        if (response.status !== 200) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { apiClient, getResource };