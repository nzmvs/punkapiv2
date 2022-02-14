# punkapiv2
## Running the service
### Locally
```
node index.js
```
### Docker
Build the docker image:
`docker build . --network=host -t apoex_api:latest`

Run the image:
`docker run -d --rm -p 3000:3000 apoex_api`

Test the api:
`curl http://localhost:3000/_ping`

## Using the service
### Client
Go to `http://localhost:3000`, type in a search term and press ENTER. Click PREV/NEXT to change pages. Only three results per page.
### API
cUrl the api with your query (see [official documentation](https://www.punkapi.com/documentation/v2)):
```
curl http://localhost:3000/api/v1/beer/search?beer_name=beer&per_page=20
```
