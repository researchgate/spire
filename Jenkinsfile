#!/usr/bin/env groovy
library 'researchgate@v1'

withDocker('nexus3.rgoffice.net:8143/researchgate/docker-node-base') {
  // withNotifications('Team Stargazer') {
    stage('Prepare') {
      sh 'echo "//nexus3.rgoffice.net/repository/npm-internal/:_authToken=$NPM_TOKEN" >> ~/.npmrc'
      sh 'node --version'
      sh 'yarn --version'
      sh 'yarn'
    }

    stage('Release as @next') {
      sh 'yarn release-next'
    }
  // }
}
