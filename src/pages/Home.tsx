import { useState } from 'react';

function Home() {
    const [serverState, setServerState] = useState('off');

    function handleServerToggle() {
        if (serverState === 'off') {
            // start the server
            setServerState('on');
        } else {
            // stop the server
            setServerState('off');
        }
    }

    return (
        <div>
        <button onClick={handleServerToggle}>
            {serverState === 'off' ? 'Start Server' : 'Stop Server'}
        </button>
        </div>
    );
}

export default Home;
