node {
  stage('SCM Checkout') {
    checkout scm
  }

  stage('Test') {
    nodejs(nodeJSInstallationName: 'NPM') {
                  sh "npm install"
                //  sh 'npm test'
                }
    echo "test"
  }

  stage('SonarQube Analysis') {
    def scannerHome = tool 'Qube'
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }

  stage('Build') {
                nodejs(nodeJSInstallationName: 'NPM') {
                  sh "npm install"
                  sh 'npm run build'
                }
            
        }

    stage('Push to S3') {
    withAWS(region:'us-east-2', credentials:'nathanael_access_key') {
      s3Delete(bucket:'mc.userportal.beardtrust', 
      workingDir:'src', path:'**/*') 
      s3Upload(bucket:'mc.userportal.beardtrust', 
      workingDir:'src', includePathPattern:'**/*') // primary bucket
    }
    withAWS(region:'us-east-1', credentials:'nathanael_access_key') {
      s3Delete(bucket:'userportal.beardtrust.xyz', 
      workingDir:'src', path:'**/*') 
      s3Upload(bucket:'userportal.beardtrust.xyz', 
      workingDir:'src', includePathPattern:'**/*') // backup bucket
    }
    }
}
