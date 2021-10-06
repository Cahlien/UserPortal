node {
  stage('SCM Checkout') {
    checkout scm
  }

  stage('Test') {
    sh 'npm install'
    sh 'npm bugs test'
    sh 'CI=true npm run build'
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
