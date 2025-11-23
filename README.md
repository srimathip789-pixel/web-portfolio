# Web Portfolio

This project is a web portfolio designed to showcase personal projects, skills, and experience. It is built using HTML, CSS, and TypeScript, providing a modern and responsive user interface.

## Project Structure

```
web-portfolio
├── src
│   ├── index.html          # Main HTML document
│   ├── styles              # Contains CSS files
│   │   └── main.css        # Main stylesheet
│   ├── scripts             # Contains TypeScript files
│   │   ├── main.ts         # Main TypeScript file
│   │   └── utils.ts        # Utility functions
│   ├── components          # Reusable HTML components
│   │   ├── header.html     # Header component
│   │   ├── footer.html     # Footer component
│   │   └── project-card.html # Project card component
│   └── data               # Data files
│       └── cv.json        # CV data in JSON format
├── public
│   └── CNAME              # Custom domain configuration
├── package.json           # npm configuration file
├── tsconfig.json          # TypeScript configuration file
├── .gitignore             # Files to ignore in version control
└── README.md              # Project documentation
```

## Features

- Responsive design that adapts to different screen sizes.
- Dynamic content loading using TypeScript.
- Modular components for easy maintenance and updates.
- Custom domain support.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd web-portfolio
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Build the TypeScript files:
   ```
   npm run build
   ```

5. Open `src/index.html` in a web browser to view the portfolio.

## Usage

- The portfolio showcases various projects, skills, and experiences.
- Each project is displayed as a card, providing a brief overview and links to more details.
- The header and footer components are included in every page for consistent navigation.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.