node {
  stage('SCM Checkout') {
    checkout scm
  }

  stage('SonarQube Analysis') {
    def scannerHome = tool 'Qube'
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
    stage('Release to aws') {
    withAWS(region:'us-east-2', credentials:'nathanael_access_key') {
      s3Upload(bucket:'mc.userportal.beardtrust', 
      workingDir:'target', includePathPattern:'**s3://mc.userportal.beardtrust*') // pick your jar or whatever you need
    }
    }
}
