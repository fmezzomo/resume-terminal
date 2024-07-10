
# Terminal Resume

This project is a simulation of a terminal using HTML, CSS, and JavaScript, which allows users to view my resume interactively and stylishly, similar to a command line terminal.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Available Commands](#available-commands)
- [Themes](#themes)
- [Contribution](#contribution)
- [License](#license)

## Overview

This project allows you to navigate through your resume information, such as skills, work experience, and education, by typing commands in the simulated terminal. It includes features to switch between light and dark themes and to minimize and maximize the terminal window.

## Features

- Command navigation: View different parts of the resume using commands.
- Theme switching: Toggle between light and dark themes.
- Minimize and Maximize: Control the terminal window size.
- Interactivity: Help and clear terminal commands.

## Installation

1. Clone this repository:
    ```sh
    git clone https://github.com/fmezzomo/terminal-resume.git
    ```
2. Navigate to the project directory:
    ```sh
    cd terminal-resume
    ```

## Usage

1. Open the `index.html` file in your browser.
2. Use the input field to type commands and explore the resume content.

## Available Commands

- `help`: Shows all available commands.
- `list [category]`: Lists information for the specified category. Available categories are:
  - `email`
  - `skills`
  - `languages`
  - `jobs`
  - `education`
- `clear`: Clears the terminal.
- `theme [dark/light]`: Changes the terminal theme.

## Themes

You can switch between light and dark themes using the provided buttons or by typing commands in the terminal.

### Example Usage

```sh
> help
Available commands: help, list [email, skills, languages, jobs, education], clear, theme [dark, light]

> list skills
Here are my skills...

> theme light
Switched to Light Theme.

> clear
```

## Contribution

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
