# News Aggregator

News Aggregator is a web application that aggregates news articles from multiple sources. The application fetches news articles from various APIs and displays them in a unified interface.

## Sources

The application uses the following news sources:
- News API
- The Guardian
- New York Times

The sources are defined in the `consts.ts` file.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:
```
NEWS_API_API_KEY=YOUR_NEWS_API_KEY
THE_GUARDIAN_API_KEY=YOUR_THE_GUARDIAN_API_KEY
NEW_YORK_TIMES_API_KEY=YOUR_NEW_YORK_TIMES_API_KEY
```

## Building and Running the Project using Docker

1. **Build the Docker image**

   Open your terminal and navigate to the root of your project. Then run the following command:

   ```bash
   docker-compose build
   ```

2. **Run the Docker container**

    After building the Docker image, run the following command to start the container:
    
    `docker-compose up`

The application should now be running inside a Docker container and accessible at `http://localhost:3000.`
Usage.

The application fetches news articles from the configured sources and displays them in a masonry grid layout.
You can filter the news articles using the filter bar.

## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.