library 'voyager@v1'

voyager {
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