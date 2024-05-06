const get_market_data = async () => {

    const api_endpoint = "https://f68370a9-1a80-4b78-b83c-8cb61539ecd6.mock.pstmn.io/api/v1/get_market_data/";

    try {
        const response = await fetch(api_endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Fetch error: ' + error.message);
    }
};

export default get_market_data;