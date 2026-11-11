# WEEK 6:Asynchronous JavaScript
## Author
- **Name:** Stacy Otieno
- **Github** [@Stacy-JOtieno] (https://github.com/Stacy-JOtieno
)
- **Date:** November 11, 2026

## Project Description
A weather dashboard that lets you search for any city and see its current weather, using the OpenWeatherMap API. I built it to practise asynchronous JavaScript: fetching data with async/await, handling loading and error states, and saving recent searches in the browser. The app is deployed with GitHub Actions, and the API key is kept out of the repository.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+, async/await, Fetch API)
- OpenWeatherMap API
- localStorage for recent searches
- Git and GitHub
- GitHub Actions and GitHub Pages (deployment)

## Project Structure

\`\`\`
iyf-s12-week-03-yourusername/
├── .github\workflows/
│   └── deploy.ml
├── task12.2
│   └── index.html
|   └── script.js
|   └── styles.css
├── task12.3
│   └── index.html
|   └── script.js
|   └── styles.css
├── task12.4
│   └── index.html
|   └── script.js
|   └── styles.css
├── .gitignore
├── 11.1.js
├── 11.2.js
├── 11.3.js
├── 11.4.js
├── 11.exercise.md
├── 12.1.js
├── app.js
├── config.example.js
├── config.js
├── daily-challenge-1.js
├── daily-challenge-2.js
├── daily-challenge-3.js
├── daily-challenge-4.js
├── daily-challenge-5.js
├── index.html
├── README.md
└── styles.css
\`\`\`

## Features
- Search by city name (works with spaces, e.g. "Dar es Salaam")
- Shows city, weather icon, temperature (°C), description, feels like, humidity, wind speed and pressure
- Loading state while the data is fetched
- Clear error messages for an unknown city, an API key that is not active yet, and network problems
- Handles HTTP errors and network failures.
- Displays API results in the browser.
- Logs request results in the browser console.

## How to Run
1. Clone this repository:
`git clone https://github.com/Stacy-JOtieno`
2. Navigate into the project directory:
`cd iyf-s12-week-06-Stacy-JOtieno`
3. OPen the project in Visual Studio Code
`Code .`
4. Open index.html in your browser or use the VS Code Live Server extension.
5. Ensure you have an active internet connection to access the API endpoints.

## Lessons Learned
- How async/await with try/catch/finally keeps loading and error handling in one readable place.
fetch does not reject on a 404 or 401, so response.ok has to be checked manually. Only a network failure makes it reject.
- How to store and read a list in localStorage with JSON.stringify and JSON.parse, and how to cap it at 5 items without duplicates.
- Text typed by a visitor (the city names in the history) is inserted with textContent, not innerHTML.
- API keys do not belong in git history. I used a git-ignored config.js locally and a repository secret with GitHub Actions for the deployed site.

## Challenges Faced
- **Wrong workflow path:** when I created deploy.yml on GitHub, the folder path was typed twice, so it would have been created at .github/workflows/.github/workflows/deploy.yml, where Actions never looks. I cancelled, recreated it with the path .github/workflows/deploy.yml in the file name box, and replaced GitHub's starter template with my own workflow.
- **Rejected push:** git push failed because the remote had a commit I did not have locally (the workflow file created on the website). I fixed it with git pull --rebase origin main and then pushed again.
- **API key setup:** the key needed to stay out of git but still work on the live site. I solved it with .gitignore, config.example.js, and a GitHub Actions secret that writes config.js at deploy time.

## Live Demo
(https://stacy-jotieno.github.io/iyf-s12-week-06-Stacy-JOtieno/)
