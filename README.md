# SUPERORCH

A chat where people can play electronic music together

## Installation

Create API with docker:

```
docker-compose up
```

You can verify that the service is working by going to http://localhost:5000/graphql

Move inside app directory:

```
cd app
```

Install dependencies:

```
yarn install
```

Finally launch application:

```
yarn start
```

After a few seconds a desktop app should pop up.

## Deploy

Deployments are handled with Github Actions.
Every time a commit is pushed to the master branch the [deploy.yml]() workflow will:

- Test the api Build
- Push a docker image on the Google Container Registry.
- Launch a script on the remote server to roll the update.
