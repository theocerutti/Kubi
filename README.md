# Required

minikube

# Getting started

```bash
minikube start --static-ip=192.168.49.2
eval $(minikube docker-env) # will push image to minikube docker registry
cd scripts/build-service-docker-images.sh
cd ..
kubectl apply -R -f K8s

echo -e "$(minikube ip) api.minikube.com" | sudo tee -a /etc/hosts
echo -e "$(minikube ip) minikube.com" | sudo tee -a /etc/hosts
```

# TODO

voir dans tous les projets si il manque pas des variables d'environnement
Github actions + private registry
namespace cohérent
