import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { fetchCommandData } from '../services/dataService';
import './Terminal.css';

const Terminal = () => {
    const [output, setOutput] = useState('');
    const [currentTheme, setCurrentTheme] = useState('dark');
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [commandData, setCommandData] = useState({});
    const [availableCommands, setAvailableCommands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCommandData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchCommandData();
                setCommandData(data);
                setAvailableCommands(Object.keys(data).map(cmd => `list ${cmd}`));
            } catch (error) {
                console.error('Failed to fetch', error);
                setOutput("Failed to load command data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        loadCommandData();
    }, []);

    const commands = useMemo(() => ({
        help: () => `Available commands: ${availableCommands.join(", ")}, help, clear, theme [dark, light]`,
        clear: () => { print('', true); return ""; },
        list: (args) => {
            const category = args[0];
            return category in commandData
                ? formatList(commandData[category])
                : "Invalid list command. Use 'list email', 'list skills', 'list languages', 'list jobs', or 'list education'.";
        },
        theme: (args) => {
            const theme = args[0];
            if (['dark', 'light'].includes(theme)) {
                setCurrentTheme(theme);
                return `Switched to ${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme.`;
            }
            return "Invalid theme command. Use 'theme dark' or 'theme light'.";
        }
    }), [availableCommands, commandData]);

    const formatList = (data) => {
        return Array.isArray(data) ? '- ' + data.join('\n- ') : data;
    };

    const showHelp = useCallback(() => {
        const result = commands.help();
        print(`${result}\n`);
    }, [commands]);

    useEffect(() => {
        if (availableCommands.length > 0) {
            showHelp();
        }
    }, [availableCommands, showHelp]);

    useEffect(() => {
        document.body.className = `${currentTheme}-theme`;
    }, [currentTheme]);

    const print = (content, clear = false) => {
        setOutput((prevOutput) => clear ? `${content}\n` : `${prevOutput}${content}\n`);
    };

    const handleInput = useCallback((e) => {
        if (e.key === "Enter") {
            const inputValue = e.target.value.trim();
            const [command, ...args] = inputValue.split(" ");
            const result = commands[command] ? commands[command](args) : `Command not found: ${command}`;
            print(`> ${inputValue}\n${result}\n`);
            e.target.value = "";
        }
    }, [commands]);

    return (
        <div id="terminal" className={`${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}>
            <div id="title-bar">
                <div id="title">Terminal - Resume Fabio Mezzomo</div>
                <div id="close-btn" onClick={() => setOutput('')}><i className="fas fa-times"></i></div>
                <div id="minimize-btn" onClick={() => setIsMinimized(!isMinimized)}><i className="fas fa-minus"></i></div>
                <div id="maximize-btn" onClick={() => setIsMaximized(!isMaximized)}><i className="fas fa-square"></i></div>
            </div>
            {isLoading ? <div>Loading...</div> : (
                <div id="terminal-body">
                    <div id="output">{output}</div>
                    <div id="input-line">
                        <span id="prompt">$</span>
                        <input id="input" onKeyDown={handleInput} />
                    </div>
                </div>
            )}
            <div id="theme-toggle">
                <button id="dark-theme-btn" onClick={() => setCurrentTheme('dark')}>Dark</button>
                <button id="light-theme-btn" onClick={() => setCurrentTheme('light')}>Light</button>
            </div>
        </div>
    );
};

export default Terminal;