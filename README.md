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

# TODO

créer le Dockerfile du backend
ajouter/wrap le serveur http du back avec des metrics prometheus
voir dans tous les projets si il manque pas des variables d'environnement
Github actions + private registry
namespace cohérent