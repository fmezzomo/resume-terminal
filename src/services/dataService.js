// services/dataService.js
export const fetchCommandData = async () => {
    const response = await fetch('/data/data.json');
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return await response.json();
};
