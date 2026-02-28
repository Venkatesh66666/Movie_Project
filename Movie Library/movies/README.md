# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Private Visitor Analytics (Owner Only)

This project supports Google Analytics 4 (GA4) page-visit tracking.

### 1. Create your GA4 property

1. Go to Google Analytics and create a property.
2. Create a Web Data Stream for your site.
3. Copy the Measurement ID (format: `G-XXXXXXXXXX`).

### 2. Configure your local environment

Create/update `.env` in the project root:

```env
REACT_APP_TMDB_KEY=your_tmdb_key
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Run/build the app

- Dev: `npm start`
- Production build: `npm run build`

Note:
- Analytics events are enabled in production mode only.
- If `REACT_APP_GA_MEASUREMENT_ID` is missing, no analytics script is loaded.

### 4. See visitor data

Open your Google Analytics dashboard (your account only).  
Visitors cannot see this dashboard unless you share access.

## Free Deployment (Done Setup)

This project is now pre-configured for Netlify deployment:

- `netlify.toml` added
- `public/_redirects` added for React Router refresh support
- `.env.example` added for required keys

### Step-by-step (Netlify)

1. Push this `movies` folder to GitHub.
2. Open Netlify: https://app.netlify.com
3. `Add new site` -> `Import an existing project` -> select your repo.
4. Build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `build`
5. In Netlify project settings -> Environment variables, add:
   - `REACT_APP_TMDB_KEY`
   - `REACT_APP_GA_MEASUREMENT_ID` (optional)
6. Click `Deploy site`.

Example:

- Repo: `https://github.com/yourname/acx-movie-library`
- Deployed URL: `https://acx-movie-library.netlify.app`

### Important

- Do not commit your real `.env` file.
- Use `.env.example` as reference.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
