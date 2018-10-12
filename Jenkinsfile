library 'researchgate@v1'

withDocker('node:8') {
  withNotifications('Stargazer Kind of Internal But Not Really') {
    stage('Prepare') {
      sh 'node --version'
      sh 'yarn --version'
      sh 'yarn'
    }

    stage('Lint') {
      sh 'yarn lint'
    }

    stage('Test') {
      sh 'yarn test'
    }
  }
}
