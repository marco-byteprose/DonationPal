import axios from 'axios';
import { useState, useEffect } from 'react';
import useToken from './useToken';

function useDataFetcher(dataSource) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {token, setToken} = useToken();

    useEffect( () => {
        // Implement function which loads data from API
        const loadData = async (req, res) => {
            try {
                const response = await axios.get(dataSource);
                console.log(response.data);
                setData( (dataItems) => [...response.data]);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
                console.error(err);
            }
        };

        // Call implemented function
        setLoading(true);
        loadData();
    }, []);

    return [data, loading, error];
}

export default useDataFetcher;