
# Note Management System

This is a note management system built with Flask and React, using TawilCSS for styling. The system allows users to create, edit, and delete notes, as well as group them into categories and search for specific notes.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, edit, and delete notes
- Group notes into categories
- Search for specific notes by title or content
- Responsive design using TawilCSS
- redis for caching data (required)

## Installation

To install and run the system, follow these steps:

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/your-username/note-management-system
   ```
2. Install the necessary dependencies for the Flask backend:
   ```
   cd note-management-system/backend
   pip install -r requirements.txt
   `````
3. Start the Flask backend server:
  (mycase name will be not same)
   ```
   python app.py 
   ````
- install redis than run
   ```
    redis-server
   ```
   
4. Install the necessary dependencies for the React frontend:
   (mycase package json not exists do it yourself )
   ````
   cd ../frontend
   npm install
   ````
6. Start the React frontend server:
   ````
   npm start
   ````
7. Open your web browser and navigate to `http://localhost:3000`

## Usage

To use the system, follow these steps:

1. Create an account or login with an existing account (working on it)
2. Create a new note by clicking the "New Note" button
3. Edit or delete a note by clicking on it and selecting the appropriate option
4. Group notes into categories by clicking the "New Category" button and dragging notes into the category
5. Search for specific notes by typing a keyword into the search bar

## Contributing

We welcome contributions from the community. To contribute to the project, follow these steps:

1. Fork the repository to your GitHub account
2. Clone the forked repository to your local machine
3. Create a new branch for your changes:
   ````
   git checkout -b feature-branch-name
   ````
4. Make your changes and commit them:
   ````
   git commit -m "Description of changes"
   ````
5. Push the changes to your forked repository:
   ````
   git push origin feature-branch-name
   ````
6. Create a pull request from your forked repository to the main repository

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

