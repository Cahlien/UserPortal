node {
  stage('SCM Checkout') {
    checkout scm
  }

  stage('Test') {
    sh 'npm install'
    //sh 'npm test'
    echo "test"
  }

  stage('SonarQube Analysis') {
    def scannerHome = tool 'Qube'
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }

    stage('Push to S3') {
    withAWS(region:'us-east-2', credentials:'nathanael_access_key') {
      s3Upload(bucket:'ng.test.bucket', 
      workingDir:'src', includePathPattern:'**/*') // pick your jar or whatever you need
    }
    }
}
