# Microservices Example Project

Microservices application using Node.js, Express, Typescript, Next.js, NATS Streaming Server. Local development uses Docker, Skaffold, and Kubernetes.

## Getting Started

1. Install Docker/Kubernetes
2. Install Skaffold
3. Create Kubernetes secrets
   `kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<sk_your_stripe_key>`
   `kubectl create secret generic jwt-key --from-literal=JWT_KEY=<some_jwt_secret>`
   `kubectl create secret generic jwt-key --from-literal=JWT_KEY=<some_jwt_secret>`
   `kubectl create secret generic auth-mongo-uri-secret --from-literal=AUTH_MONGO_URI=<mongo_connection_string_to_individual_database>`
   `kubectl create secret generic orders-mongo-uri-secret --from-literal=ORDERS_MONGO_URI=<mongo_connection_string_to_individual_database>`
   `kubectl create secret generic payments-mongo-uri-secret --from-literal=PAYMENTS_MONGO_URI=<mongo_connection_string_to_individual_database>`
   `kubectl create secret generic tickets-mongo-uri-secret --from-literal=TICKETS_MONGO_URI=<mongo_connection_string_to_individual_database>`
4. Run `skaffold dev` in project root
