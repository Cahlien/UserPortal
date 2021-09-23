node {
  
  stage('SCM Checkout') {
    checkout scm
  }
  
   stage('SonarQube Analysis') {
    def scannerHome = tool 'Qube';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
  stage('Build') {
        steps {
            bat 'mvn clean compile' 
        }
    }
    stage('Release to aws') {
        steps {
            withAWS(region:'us-east-2', credentials:'nathanael_access_key'){
                s3Upload(bucket:"arn:aws:s3:::mc.userportal.beardtrust", workingDir:'target', includePathPattern:'**/*'); // pick your jar or whatever you need
            }
        }
     }
}