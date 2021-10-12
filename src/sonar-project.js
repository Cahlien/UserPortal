const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'http://sonarqube.fosstechnix.info/',
       options : {
       'sonar.sources': '.',
       'sonar.inclusions' : 'src/**' 
       },
}, () => {});