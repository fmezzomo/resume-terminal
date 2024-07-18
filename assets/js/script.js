document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const closeBtn = document.getElementById("close-btn");
    const minimizeBtn = document.getElementById("minimize-btn");
    const maximizeBtn = document.getElementById("maximize-btn");
    const darkThemeBtn = document.getElementById("dark-theme-btn");
    const lightThemeBtn = document.getElementById("light-theme-btn");
    const output = document.getElementById("output");

    let currentTheme = "dark"; // Initialize with the dark theme
    let isMaximized = false;
    let isMinimized = false;

    let commandData = {};
    let availableCommands = [];

    const commands = {
        help: () => `Available commands: ${availableCommands.join(", ")}, clear, theme [dark, light]`,
        clear: () => { print('', true); return ""; },
        list: (args) => {
            const category = args[0];
            if (commandData.hasOwnProperty(category)) {
                return formatList(commandData[category]);
            } else {
                return "Invalid list command. Use 'list email', 'list skills', 'list languages', 'list jobs', or 'list education'.";
            }
        },
        theme: (args) => {
            const theme = args[0];
            switch (theme) {
                case "dark":
                    if (currentTheme !== "dark") {
                        applyDarkTheme();
                        return "Switched to Dark Theme.";
                    } else {
                        return "Already using Dark Theme.";
                    }
                case "light":
                    if (currentTheme !== "light") {
                        applyLightTheme();
                        return "Switched to Light Theme.";
                    } else {
                        return "Already using Light Theme.";
                    }
                default:
                    return "Invalid theme command. Use 'theme dark' or 'theme light'.";
            }
        }
    };

    function formatList(data) {
        if (Array.isArray(data)) {
            return '- ' + data.join('\n- ');
        }
        return data;
    }

    function applyDarkTheme() {
        terminal.style.backgroundColor = "#2b2b2b";
        terminal.style.color = "#d4d4d4"; // Text color for dark theme
        currentTheme = "dark";
    }

    function applyLightTheme() {
        terminal.style.backgroundColor = "#ffffff";
        terminal.style.color = "#000000"; // Text color for light theme
        currentTheme = "light";
    }

    // Initialize with the dark theme and light text
    applyDarkTheme();

    // Function to execute the help command on startup
    function showHelp() {
        const result = commands.help();
        print(`${result}\n`);
    }

    function print(content, clear = false) {
        if (clear) {
            output.innerHTML = `${content}\n`;
        } else {
            output.innerHTML += `${content}\n`;
        }
    }

    // Function to load data from the JSON file
    function loadCommandData() {
        fetch('data/data.json')
            .then(response => response.json())
            .then(data => {
                commandData = data;
                availableCommands = Object.keys(commandData).map(cmd => `list ${cmd}`);
                // Execute the help command on startup after loading the data
                showHelp();
            })
            .catch(error => {
                console.error("Failed to load command data:", error);
                print("Failed to load command data.\n", true);
            });
    }

    loadCommandData();

    closeBtn.addEventListener("click", () => {
        terminal.style.display = "none";
    });

    minimizeBtn.addEventListener("click", () => {
        if (!isMinimized) {
            terminal.classList.add("minimized");
            isMinimized = true;
            isMaximized = false;
        }
        output.scrollTop = output.scrollHeight;
    });

    maximizeBtn.addEventListener("click", () => {
        if (!isMaximized) {
            terminal.classList.remove("minimized");
            terminal.classList.add("maximized");
            isMaximized = true;
            isMinimized = false;
        } else {
            terminal.classList.remove("maximized");
            isMaximized = false;
        }
        output.scrollTop = output.scrollHeight;
    });

    darkThemeBtn.addEventListener("click", () => {
        if (currentTheme !== "dark") {
            applyDarkTheme();
        }
    });

    lightThemeBtn.addEventListener("click", () => {
        if (currentTheme !== "light") {
            applyLightTheme();
        }
    });

    const input = document.getElementById("input");

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const inputValue = input.value.trim();
            const [command, ...args] = inputValue.split(" ");

            if (commands.hasOwnProperty(command) && typeof commands[command] === "function") {
                const result = commands[command](args);
                print(`> ${inputValue}\n${result}\n`);
            } else {
                print(`> ${inputValue}\nCommand not found: ${command}\n`);
            }

            input.value = "";
            output.scrollTop = output.scrollHeight;
        }
    });
});