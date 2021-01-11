# Microservices Example Project

Microservices application using Node.js, Express, Typescript, Next.js, NATS Streaming Server. Local development uses Docker, Skaffold, and Kubernetes.

## Getting Started Locally

> Note: This project relies on a common NPM module with project-specific code (event definitions, middlewares, etc). Found [here](https://github.com/ldcaponi/ticketing-common-module). The steps below will run locally just fine, but any new project will have to clone and implement its own project-specific common module.

1. Install Docker/Kubernetes
2. Install [Skaffold](https://skaffold.dev/)
3. Deploy ingress-nginx load balancer to local kubernetes cluster. Instructions [here](https://kubernetes.github.io/ingress-nginx/deploy/)
4. Modify your machine's host file (`/etc/hosts`) with this line `127.0.0.1 ticketing.dev` or whatever domain you'd like. It must match the domain in `infra/k8s-dev/ingress-srv.yml`.
5. Create Kubernetes secrets
   - `kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<sk_your_stripe_key>`
   - `kubectl create secret generic jwt-key --from-literal=JWT_KEY=<some_jwt_secret>`
   - `kubectl create secret generic auth-mongo-uri-secret --from-literal=AUTH_MONGO_URI=<mongo_connection_string_to_individual_database>`
   - `kubectl create secret generic orders-mongo-uri-secret --from-literal=ORDERS_MONGO_URI=<mongo_connection_string_to_individual_database>`
   - `kubectl create secret generic payments-mongo-uri-secret --from-literal=PAYMENTS_MONGO_URI=<mongo_connection_string_to_individual_database>`
   - `kubectl create secret generic tickets-mongo-uri-secret --from-literal=TICKETS_MONGO_URI=<mongo_connection_string_to_individual_database>`
6. Run `skaffold dev` in project root
