node {
  stage('SCM Checkout') {
    checkout scm
  }

  stage('Test') {
    sh 'npm install'
    sh 'CI=true npm test'
    echo "test"
  }

  stage('SonarQube Analysis') {
    def scannerHome = tool 'Qube'
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }

    stage('Push to S3') {
      sh "npm install"
    withAWS(region:'us-east-1', credentials:'nathanael_access_key') {
      s3Upload(bucket:'userportal.beardtrust.xyz', 
      workingDir:'src', includePathPattern:'**/*') // pick your jar or whatever you need
    }
    }
}
