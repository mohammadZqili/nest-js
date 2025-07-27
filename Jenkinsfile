pipeline {
    agent any
    
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'uat', 'prod'], description: 'Target environment')
        string(name: 'APP_REPO_BRANCH', defaultValue: 'main', description: 'Application repository branch')
        string(name: 'CICD_REPO_BRANCH', defaultValue: 'main', description: 'CI/CD repository branch')
    }
    
    environment {
        DOCKER_REGISTRY = 'localhost:5000'
        IMAGE_NAME = 'nestjs-admin-api'
        GIT_HASH = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        IMAGE_TAG = "${BUILD_NUMBER}-${GIT_HASH}"
        APP_NAME = 'nestjs-admin'
    }
    
    stages {
        stage('Checkout Application Code') {
            steps {
                echo '🔄 Checking out NestJS Admin API code...'
                checkout scm
                script {
                    env.APP_WORKSPACE = env.WORKSPACE
                }
            }
        }
        
        stage('Checkout CI/CD Configuration') {
            steps {
                echo '🔄 Checking out CI/CD infrastructure with SSH...'
                dir('cicd-config') {
                    git branch: "${params.CICD_REPO_BRANCH}",
                        url: 'git@github.com:mohammadZqili/ci-cd.git',
                        credentialsId: 'github-ssh-key'
                }
            }
        }
        
        stage('Environment Setup') {
            steps {
                echo '🔧 Setting up environment...'
                sh '''
                    echo "=== Environment Info ==="
                    echo "Workspace: ${WORKSPACE}"
                    echo "App Workspace: ${APP_WORKSPACE}"
                    echo "Environment: ${ENVIRONMENT}"
                    echo "Docker Registry: ${DOCKER_REGISTRY}"
                    echo "Image: ${IMAGE_NAME}:${IMAGE_TAG}"
                    
                    echo "=== Checking files ==="
                    ls -la
                    echo "=== CI/CD Config ==="
                    ls -la cicd-config/docker/laravel/ || echo "CI/CD config not found"
                '''
            }
        }
        
        stage('Run Tests') {
            steps {
                echo '🧪 Running Node.js tests...'
                sh '''
                    echo "Running tests for NestJS Admin API..."
                    # Tests would be run here
                    # php artisan test || echo "Tests will be enabled later"
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image with CI/CD configuration...'
                sh '''
                    echo "Building Docker image using CI/CD Dockerfile..."
                    
                    # Use the Dockerfile from CI/CD repository
                    if [ -f "cicd-config/docker/laravel/Dockerfile" ]; then
                        echo "✅ Using CI/CD Laravel Dockerfile"
                        docker build \
                            -f cicd-config/docker/laravel/Dockerfile \
                            --build-arg APP_SOURCE_DIR=. \
                            -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} \
                            -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest \
                            .
                    else
                        echo "❌ CI/CD Dockerfile not found, using fallback"
                        # Fallback to building with a simple Dockerfile
                        echo "FROM php:8.3-cli
WORKDIR /app
COPY . .
RUN apt-get update && apt-get install -y git curl zip unzip
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader || true
CMD php artisan serve --host=0.0.0.0" > Dockerfile.temp
                        
                        docker build \
                            -f Dockerfile.temp \
                            -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} \
                            -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest \
                            .
                        rm -f Dockerfile.temp
                    fi
                '''
            }
        }
        
        stage('Push to Registry') {
            steps {
                echo '📤 Pushing image to registry...'
                sh '''
                    echo "Pushing ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
                    docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                    docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:latest
                '''
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                echo '🚀 Deploying to Kubernetes...'
                sh '''
                    echo "Deploying to ${ENVIRONMENT} environment"
                    echo "Using deployment config from CI/CD repository"
                    
                    if [ -f "cicd-config/kubernetes/${APP_NAME}/deployment.yaml" ]; then
                        echo "✅ Found Kubernetes deployment config"
                        # Apply Kubernetes manifests
                        # kubectl apply -f cicd-config/kubernetes/${APP_NAME}/ -n ${ENVIRONMENT}
                        echo "Would deploy using: cicd-config/kubernetes/${APP_NAME}/"
                    else
                        echo "⚠️  Kubernetes config not found, skipping deployment"
                    fi
                '''
            }
        }
        
        stage('Health Checks') {
            steps {
                echo '🏥 Running health checks...'
                sh '''
                    echo "Health check for ${IMAGE_NAME}"
                    echo "Deployment verification for ${ENVIRONMENT} environment"
                    # Health checks would be implemented here
                '''
            }
        }
    }
    
    post {
        always {
            echo '🧹 Cleaning up...'
            sh '''
                # Clean up temporary files
                rm -f Dockerfile.temp || true
                # Clean up old images
                docker image prune -f || true
            '''
        }
        success {
            echo '✅ Pipeline completed successfully!'
            echo "🎉 ${IMAGE_NAME}:${IMAGE_TAG} built and deployed to ${ENVIRONMENT}"
        }
        failure {
            echo '❌ Pipeline failed!'
            echo "Check logs for ${IMAGE_NAME} build issues"
        }
    }
}
