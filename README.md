# Express local deployment in Minikube

This deploys a local Express.js server in 3 pods cluster within a local Kubernetes.

## Considerations

Make sure to have [minikube](https://minikube.sigs.k8s.io/docs/start/) and [docker](https://www.docker.com/products/docker-desktop) installed.

I have used Express.js to create a NodeJS API which only has one `GET` endpoint `/search`. 
This endpoint will return data from theCatApi, with the following example structure:

```json
{
    "breeds": [],
    "id": "c0s",
    "url": "https://cdn2.thecatapi.com/images/c0s.jpg",
    "width": 896,
    "height": 620
}
```

This app can be dockerized in a container/image.
Furthermore, we can run minikube as a local Kubernetes to run this image in 3 pods, which then will be contained in a cluster using a service deployment.
Finally, we can expose this service, which we will be able to hit with [Postman](https://www.postman.com/) or with a curl.

If you want to solely run a docker application, I have added a docker-compose (`docker-compose up -d`)
.

## How to run it

If you want to run locally, remember to install dependencies with `npm i`.

To deploy and run in k8s I mainly use the terminal, so make sure to have a terminal open at the root of this project.

1. Ensure all the necessary technologies ([minikube](https://minikube.sigs.k8s.io/docs/start/) and [docker](https://www.docker.com/products/docker-desktop)) are installed.
1. Run minikube `minikube start`.
1. If you are in a Windows environment, run `@FOR /f "tokens=* delims=^L" %i IN ('minikube docker-env') DO %i` otherwise run `eval $(minikube docker-env)`.
1. Make sure you are the root of the project and then run `docker build -t catapp .`. This creates the image of the express app.
1. Run `kubectl apply -f ./deployment.yaml`. The command `kubectl` should have been installed with minikube, but if it has not make sure to install it from [Kubernetes](https://kubernetes.io/docs/reference/kubectl/kubectl/). This will run the deployment yaml I have specified to create the 3 pods.
1. With `kubectl describe deployment catapp-deployment` you should be able to see the deployment we have just created.
1. And with `kubectl get pods -l app=catapp` you should be able to see 3 pods in, hopefully, a running state.
1. Run `kubectl expose deployment catapp-deployment --type=NodePort --name=catapp-service` to create the service that will hold the pods.
1. Similar to above, with `kubectl describe services catapp-service` we will be able to see the service we have just created.
1. Finally, run `minikube service --url catapp-service`. Take note that in a Windows environment you will have to keep this terminal opened to make requests. This command will return an IP that we will be able to hit with Postman.
1. Make sure to append `/search` to the IP address that we have just obtained, and perform a GET in Postman, you should get a response following the format specified above.

If at any point during this process you would want to visualize the kubernetes dashboard, you can run `minikube dashboard`.

## How to test it

You can run the battery of integration and unit tests running `npm test`. If you want to run either of them, you can use `npm test integration` 
for the integration tests and `npm test unit` for the unit tests.

## Authors

* **José Manuel Medrano Martínez** - jmmedranomm@gmail.com