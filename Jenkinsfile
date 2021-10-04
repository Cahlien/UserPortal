node {
  stage('SCM Checkout') {
    checkout scm
  }

  stage('Test') {

        sh 'node -v'
        sh 'npm prune'
        sh 'npm install'

        //sh 'npm install -g jest'

        sh 'npm test --verbose'
  }

  stage('SonarQube Analysis') {
    def scannerHome = tool 'Qube'
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
    stage('Push to S3') {
    withAWS(region:'us-east-2', credentials:'nathanael_access_key') {
      s3Upload(bucket:'mc.userportal.beardtrust', 
      workingDir:'/', includePathPattern:'**s3://mc.userportal.beardtrust*') // pick your jar or whatever you need
    }
    }
}
