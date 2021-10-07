node {
  stage('SCM Checkout') {
    checkout scm
  }

  stage('Test') {
    nodejs(nodeJSInstallationName: 'NPM') {
                  sh "npm install"
                  sh 'npm test --coverage --watchAll -u'
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
                  sh 'npx browserslist@latest --update-db'
                }
            
        }

    stage('Push to S3') {
    withAWS(region:'us-east-2', credentials:'nathanael_access_key') {
      s3Delete(bucket:'mc.userportal.beardtrust', 
      workingDir:'src', path:'**/*')

      s3Upload(bucket:'mc.userportal.beardtrust', 
      workingDir:'src', includePathPattern:'**/build/*') // primary bucket
    }

    withAWS(region:'us-east-1', credentials:'nathanael_access_key') {
      s3Delete(bucket:'userportal.beardtrust.xyz', 
      workingDir:'src', path:'**/*') 
      
      s3Upload(bucket:'userportal.beardtrust.xyz', 
      workingDir:'src', includePathPattern:'**/build/*') // backup bucket
    }
    }
}
