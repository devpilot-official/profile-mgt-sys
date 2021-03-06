NAME := ${REGISTRY}/${APP_NAME}
ifeq (${CIRCLE_BRANCH}, master)
	TAG := latest-${CIRCLE_SHA1}
	REPLICA_COUNT := 2
else
	TAG := ${CIRCLE_BRANCH}
	REPLICA_COUNT := 1
endif
IMG := ${NAME}:${CIRCLE_SHA1}
LATEST := ${NAME}:${TAG}
HELM_ARGS := --set image.repository=${NAME},image.tag=${TAG},app.node_env=${APP_ENV},replicaCount=${REPLICA_COUNT}

# Push built image to ACR
.PHONY: push
push: login build
	@echo "Pushing image"
	@docker push ${LATEST}

# Login to ACR
.PHONY: login
login:
	@echo ${SP_PASSWORD} | docker login ${REGISTRY} --username ${SP_ID} --password-stdin

# Build and tag image
.PHONY: build
build:
	@echo "Building and tagging image"
	@docker build -t ${IMG} .
	@docker tag ${IMG} ${LATEST}

# Deploy to k8s cluster via helm
.PHONY: deploy
deploy: init-helm
	@echo "Installing app in K8s cluster"
	@helm repo add random-guys https://random-guys.github.io/pro-charts
	@helm repo update
	@helm upgrade ${APP_NAME} random-guys/${APP_NAME} --install --debug ${HELM_ARGS} --tiller-namespace ${APP_ENV} --namespace ${APP_ENV}

# Initialize Helm Client
.PHONY: init-helm
init-helm:
	@echo "Initializing Helm"
	@helm init --client-only

# Clean deployment resources
.PHONY: clean
clean: 
	@echo "Cleaning up workspace"
	@rm -f ./kubeconfig