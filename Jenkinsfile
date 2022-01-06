pipeline{
  agent {
    label 'slave-acebet'
  }
  parameters {
    string(name: 'MERCHANT_NO', defaultValue: '', description: '商户号')
    booleanParam(name: 'IS_FULL', defaultValue: false, description: '全量更新(使用yml配置)')
  }
  environment {
    DEPLOYMENT_NAME = "frontend-h5"
    IS_FULL = "${params.IS_FULL}"
    MERCHANT_NO = "${params.MERCHANT_NO}"
    IMAGE_NAME = "369181834085.dkr.ecr.ap-east-1.amazonaws.com/acebet-h5:${MERCHANT_NO}-${BRANCH_NAME}.${BUILD_ID}"
    APOLLO_URL = credentials('apollo-url')
    APOLLO_AUTH = credentials('apollo-auth')
    CM_URL = credentials('k8s-cm-url')
    CM_AUTH = credentials('k8s-cm-auth')
  }
  stages {
    stage('Full deploy to AWS') {
      when {
        environment name: 'IS_FULL', value: "true"
      }
      steps {
        sh '''
        echo "Full deploy to AWS"
        mkdir ./cm
        curl -u ${CM_AUTH} ${CM_URL} -o ./cm/code.zip -s
        unzip ./cm/code.zip -d ./cm
        sed -i s#branchname#${BRANCH_NAME}#g ./cm/merchant/frontend/h5.yml
        kubectl -n merchant-${MERCHANT_NO} apply -f ./cm/merchant/frontend/h5.yml
        rm -rf ./cm
        '''
      }
    }
    stage('Build dist') {
      steps {
        sh '''
        echo "---Build dist---"
        curl -u ${APOLLO_AUTH} ${APOLLO_URL}/acebet.frontend/${MERCHANT_NO}/application,h5 -o .env.production -s
        sed -i s#{projectname}#h5#g .env.production
        sed -i s#{jumptype}#m#g .env.production
        npm install
        npm run build
        '''
      }
    }
    stage('Sync to BOS') {
      steps {
        sh '''
        echo "Sync to BOS"
        merchant_hash=$(echo -n "${MERCHANT_NO}"|md5sum |cut -d" " -f1)
        bce bos sync dist bos:/acebet-assets/${merchant_hash}/h5 --exclude './*.html' --exclude './*.htm' --yes
        '''
      }
    }
    stage('Push image to AWS') {
      steps {
        sh '''
        echo "---Push image to AWS---"
        docker build -t $IMAGE_NAME .
        docker push $IMAGE_NAME
        docker rmi -f $IMAGE_NAME
        '''
      }
    }
    stage('Deploy to AWS') {
      steps {
        sh '''
        echo "Deploy to AWS"
        kubectl -n merchant-${MERCHANT_NO} set image deployment ${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=${IMAGE_NAME}
        '''
      }
    }
  }

  post {
    always {
      script {
        cid="19:d986e0d86fb54b738248982214f44006@thread.skype"
        if (currentBuild.currentResult == 'SUCCESS') {
          status="1"
        } else {
          status="0"
        }
        url="${NOTIFY_URL}?cid=${cid}&name=${JOB_NAME}&no=${currentBuild.number}&merchant_no=${params.MERCHANT_NO}&lang=${currentBuild.duration}&url=${BUILD_URL}&status=${status}"
        if (IS_FULL == 'true') {
          url="${url}&full"
        }
        sh "curl '${url}' -s"
      }
    }
  }

}
