# Required

minikube

# Getting started

```bash
minikube start
eval $(minikube docker-env) # will push image to minikube docker registry
cd scripts/build-service-docker-images.sh
cd ..
kubectl apply -R -f K8s
```
