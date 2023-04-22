import { useEffect, useState } from 'react';
import { startServer, stopServer, isServerRunning } from '../utils/server-controller';

function Home() {
    const [serverState, setServerState] = useState('off');

    async function handleServerToggle() {
        if (serverState === 'off') {
            try {
                await startServer();
                setServerState('on');
            } catch (err) {
                console.error('Error starting server:', err);
            }
        } else {
            try {
                await stopServer();
                setServerState('off');
            } catch (err) {
                console.error('Error stopping server:', err);
            }
        }
    }

    async function checkServerState() {
        try {
            const running = await isServerRunning();
            setServerState(running ? 'on' : 'off');
        } catch (err) {
            console.error('Error checking server state:', err);
        }
    }

    useEffect(() => {
        checkServerState();
    }, []);

    return (
        <div>
        <button onClick={handleServerToggle}>
            {serverState === 'off' ? 'Start Server' : 'Stop Server'}
        </button>
        </div>
    );
}

export default Home;
