#!/usr/bin/env bash
# DEPLOY PIPELINE

set -e
BITBUCKET_REPO_SLUG='%%BITBUCKET_REPO_SLUG%%'
DEPLOY_DIRECTORY="/root/${BITBUCKET_REPO_SLUG}"

echo "${BITBUCKET_REPO_SLUG} deploy process has started."
cd $DEPLOY_DIRECTORY
# Using --with-registry-auth because we are using Google Container Registry
# https://github.com/moby/moby/issues/31534#issuecomment-285485666
docker stack deploy --with-registry-auth \
--compose-file docker-compose.default.yml \
--compose-file docker-compose.staging.yml \
--compose-file docker-compose.production.yml \
"${BITBUCKET_REPO_SLUG}"

echo "${BITBUCKET_REPO_SLUG} deploy process is complete."