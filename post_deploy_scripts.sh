#!/usr/bin/env bash
# STAGING POST DEPLOY PIPELINE
set -ex

# VARIABLES AND FUNCTIONS
# -----------------------
# edit the following ones according to your setup
BITBUCKET_REPO_SLUG='%%BITBUCKET_REPO_SLUG%%'
BITBUCKET_DEPLOYMENT_ENVIRONMENT='%%BITBUCKET_DEPLOYMENT_ENVIRONMENT%%'
DEPLOY_DIRECTORY="/root/$BITBUCKET_REPO_SLUG"

# Compiled variables
NGINX_CONTAINER=$(docker network inspect --verbose "${BITBUCKET_REPO_SLUG}_default" |
                  jq --raw-output  ".[0]|.Services|.${BITBUCKET_REPO_SLUG}_nginx|.Tasks|.[0]|.Name" -)
NGINX_NETWORKS=$(docker container inspect "$NGINX_CONTAINER" |
                 jq ".[0]|.NetworkSettings|.Networks" - | jq 'keys')
NETWORK_NAME="${BITBUCKET_REPO_SLUG}_${BITBUCKET_DEPLOYMENT_ENVIRONMENT}"

# Functions
nginx_is_in_staging_network(){
  printf '%s\n' "${NGINX_NETWORKS[@]}" | grep -q -P "\"$NETWORK_NAME\""
}