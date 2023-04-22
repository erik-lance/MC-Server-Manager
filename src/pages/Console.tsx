import { useState, useEffect } from "react";

function Console() {
    const [consoleOutput, setConsoleOutput] = useState("");

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:5173"); // Replace with your WebSocket URL

        socket.onmessage = (event) => {
            setConsoleOutput((prevOutput) => prevOutput + event.data);
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
        <pre>{consoleOutput}</pre>
        </div>
    );
}

export default Console;
