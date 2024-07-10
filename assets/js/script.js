document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const closeBtn = document.getElementById("close-btn");
    const minimizeBtn = document.getElementById("minimize-btn");
    const maximizeBtn = document.getElementById("maximize-btn");
    const darkThemeBtn = document.getElementById("dark-theme-btn");
    const lightThemeBtn = document.getElementById("light-theme-btn");
    const output = document.getElementById("output");

    let currentTheme = "dark"; // Inicializa com o tema dark
    let isMaximized = false;
    let isMinimized = false;

    const emailList = `
        fabiomezzomo.dev@gmail.com
    `;

    const skillsList = `
        Here are my skills:
        - PHP
        - JavaScript
        - HTML & CSS
        - Laravel
        - VueJs
        - WordPress Development
        - MySQL
        - RESTful APIs
        - Git & GitHub
    `;

    const languagesList = `
        Here are the languages I speak:
        - Portuguese (native)
        - English (fluent)
    `;

    const jobsList = `
        Here are some of my previous jobs:
        - WordPress Developer at Awesome Motive - West Palm Beach/US (Remote) [Sep 2023 — Jun 2024]
        - Software Engineer at Builderall - Orlando/US (Remote) [Nov 2021 — Sep 2023]
        - Developer Freelance - [Mar 2019 — Nov 2021]
        - Project Manager at Due Studio - Serafina Corrêa/Brazil [Apr 2009 — Mar 2019]
        - Full Stack Developer at W3 Informática - Caxias do Sul/Brazil [Apr 2005 — Dec 2007]
    `;

    const educationList = `
        Bachelor’s degree in Computer Science [2003 - 2009]
    `;

    const commands = {
        help: () => "Available commands: help, list [email, skills, languages, jobs, education], clear, theme [dark, light]",
        clear: () => { print('', true); return ""; },
        list: (args) => {
            const category = args[0];
            switch (category) {
                case "email":
                    return emailList;
                case "education":
                    return educationList;
                case "skills":
                    return skillsList;
                case "languages":
                    return languagesList;
                case "jobs":
                    return jobsList;
                default:
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

    // Inicializa com o tema dark e texto claro
    applyDarkTheme();

    // Função para executar o comando help ao iniciar
    function showHelp() {
        const result = commands.help();
        print( `${result}\n` );
    }

    function print( content, clear = false ) {
        if ( clear ) {
            output.innerHTML = `${content}\n`;
        } else {
            output.innerHTML += `${content}\n`;
        }
    }

    // Executa o comando help ao iniciar
    showHelp();

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
                print( `> ${inputValue}\n${result}\n` );
            } else {
                print( `> ${inputValue}\nCommand not found: ${command}\n` );
            }

            input.value = "";
            output.scrollTop = output.scrollHeight;
        }
    });
});
