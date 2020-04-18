# SUPERORCH

A chat where people can play electronic music together

## Development

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

Before pushing, make sure to have the following variables in the repository settings:

- DEPLOY_HOST - IP address of your remote server
- DEPLOY_USER - User of the remote server
- DEPLOY_SSHKEY - Private Key used for SSH
- GCLOUD_KEY - Access token of Google Container Registry (JSON format)

Copy to contents of your local secrets folder on your remote server.
The folder should contain a file called `api-db-password.txt`. If you don't have it, create it and paste a secure password.

Then, copy the file on your remote server:

```shell
scp -r secrets <user>@<host>:/path/to/app/directory
```
