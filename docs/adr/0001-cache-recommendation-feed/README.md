# Cache recommendation

- Status: accepted
- Deciders: [davidNHK](https://github.com/davidNHK)
- Date: 2021-09-25

Technical Story: [Issues 1491](https://github.com/davidNHK/spotify-music-player/issues/1491)

## Context and Problem Statement

The [API endpoint](https://developer.spotify.com/console/get-recommendations) currently used for quires front page
list of album will get difference result every time.

As user point of view, it feels like every time move forward/back or refresh page
it would get difference result again.

Let say I saw two new Albums `Led Zeppelin III` and `Machine Head` in front page
and wanna to tried listen. it is awful UX because when I click `Machine Head` to start listen and back to home page
then `Led Zeppelin III` is gone.

It can solve by cache recommendations result with period, within the cached period it should always result same result.

## Decision Drivers

- Invalidate Cache invalidate easily
- Is cache within Browser?
- Solution have skills grown on contributor

## Considered Options

- Cache in client side [local storage](https://react-query.tanstack.com/plugins/persistQueryClient)
- Serverless functions for wrap Spotify endpoint
- HTTP API for wrap Spotify endpoint

## Decision Outcome

Chosen option: **HTTP API for wrap Spotify endpoint**, because it less restriction .

## Pros and Cons of the Options <!-- optional -->

### Cache in client side localstorage

Using [react-query](https://react-query.tanstack.com/plugins/persistQueryClient) build-in strategy

- Good, because less effort
- Bad, because not much skill grown
- Bad, because cache only with in same browser

### Serverless functions for wrap Spotify endpoint

Use [Netlify functions](https://www.netlify.com/products/functions/) to host the backend

- Good, because cross browser will work
- Good, because deployment easily
- Bad, because configuration / setup must follow vendor convention
- Bad, because connecting with external storage can be complex.

### HTTP API for wrap Spotify endpoint

Setup Backend API server to serve custom endpoint
and place caching within that endpoint.

- Good, because future prove for more features
- Good, because free to use any stack / configuration
- Bad, because complex deployment config
- Bad, because deployment options is very limited. as written only `GCP` can deploy docker pay as you consume

## Links

### Deployment options

- [Netlify functions](https://www.netlify.com/products/functions/)
- [GCP Cloud Run](https://cloud.google.com/run)
- [AWS App Runner](https://aws.amazon.com/apprunner/?nc1=h_ls)
