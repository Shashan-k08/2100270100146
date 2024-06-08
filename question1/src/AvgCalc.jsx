import React, { useState } from 'react';

const AvgCalc = () => {
    const [numberId, setNumberId] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`http://localhost:9876/numbers/${numberId}`);
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }
            const data = await res.json();
            setResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='main-box'>
            <form onSubmit={handleSubmit} className='submit-box'>
                <label>
                    Number ID:
                    <input
                        type="text"
                        value={numberId}
                        onChange={(e) => setNumberId(e.target.value)}
                        required
                        style={
                            {borderColor:'Black',borderRadius:"10px"}
                        }
                    />
                </label>
                <button  style={
                            {borderColor:'white',borderRadius:"0px", backgroundColor:"blue"}
                        } type="submit">Fetch Numbers</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {response && (
                <div>
                    <h2>Results</h2>
                    <p>Window Previous State: {response.windowPrevState.join(', ')}</p>
                    <p>Window Current State: {response.windowCurrState.join(', ')}</p>
                    <p>Fetched Numbers: {response.numbers.join(', ')}</p>
                    <p>Average: {response.avg.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default AvgCalc;
