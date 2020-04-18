# SUPERORCH

A chat where people can play electronic music together

## Development

Store Mongo DB password inside a `.env` file:

```shell
MONGO_PASSWORD=yourpassword
```

Create API with docker:

```shell
docker-compose up
```

Verify that the service is working by going to http://localhost:5000/graphql

Move inside app directory:

```shell
cd app
```

Install dependencies:

```shell
yarn install
```

Finally launch application:

```shell
yarn start
```

After a few seconds a desktop app should pop up.

## Deploy

Deployments are handled with Github Actions.
Every time a commit is pushed to the master branch the [deploy.yml](https://github.com/lorenzorivosecchi/superorch/blob/master/.github/workflows/deploy.yml) workflow will:

- Test the api Build
- Push a docker image on the Google Container Registry.
- Launch a script on the remote server to roll the update.
