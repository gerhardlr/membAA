pipeline {
    agent { docker { image 'node:6.3' } }
    stages {
        stage('build') {
            steps {
            	sh 'echo "Attempting to install application"'
                sh 'npm install'
            }
        }
    }
}