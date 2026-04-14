pipeline {
    agent any
    
    environment {
        NODE_HOME = 'C:\\Program Files\\nodejs'
        PATH = "${env.PATH};${NODE_HOME}"
    }

    stages {
        stage('Verify Environment') {
            steps {
                echo 'Verifying Env Setup...'
                bat 'node -v'
                bat 'npm -v'
                bat 'git --version'
            }
        }

        stage('Clean JSON Reports') {
            steps {
                bat 'del /S /Q *.json'
            }
        }
        stage('Checkout Code') {
            steps {
                echo 'Checking out code from Github...'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name:   '*/main']],
                    userRomteConfigs: [[
                        url: 'https://github.com/Estou-maker/stocky_automatisation_g28',
                        credentialsId: 'AUTOG28'
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Project Dependencies'
                bat 'npm install'
            }
        }

        stage('Create Reports Directories') {
            steps {
                echo 'Ensuring Reports Dir exists...'
                bat '''
                if not exist "cypress\\reports\\.json" mkdir "cypress\\reports\\.jsons"
                if not exist "cypress\\reports\\html_reports" mkdir "cypress\\reports\\html_reports"
                '''
            }
        }
        stage('Run Cypress Tests') {
            steps (
                echo 'Running Tests in headless Mode'
                bat 'npx cypress run --headless --browser chrome'
            )
        }


    }
}
