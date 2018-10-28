# Node-Rabbit-Ecom

A toy project that uses Node.js, Express and RabbitMQ. This project was created solely for the sake of my own interest in and learning about RabbitMQ and Docker (Compose). It was created with nothing more than a couple hours' worth of work, and I would not write a production application in this way.

## Getting Started

### Without Docker

1. Ensure you have a local instance of RabbitMQ running.
    - I am not currently utilizing environment variables, so you'll need to change each occurrence of `amqp://messaging` with `amqp://localhost` (or whatever the host name is for your RabbitMQ instance).
2. Start each of the services (in no particular order)
    - shopping-cart
    - orders-processor
    - orders-api

### With Docker Compose

1. All you need to do is initialize the application with docker-compose. This is how I do it:
    - `docker-compose down -v && docker-compose up --build`
    - You can omit the first (`down`) command if you haven't already started it

### Using the API Endpoints

1. Placing an order
    - GET `http://localhost:4000/products`
        - Retrieves a list of available products (note the `id` property)
    - POST `http://localhost:4000/add-to-cart`
        - `{ "productId": "{YourProductId}" }`
        - This will create a new cart, and it will return the cart id
        - Repeat this command with the cartId parameter to add another product to the cart
    - POST `http://localhost:4000/place-order`
        - `{ "cartId": "{YourCartId}" }`
        - This will send a message to the orders-processor service via RabbitMQ
    - Check the logs for the orders-processor service
        - If running without Docker, it will log to the console
        - If running with Docker, you can view the container logs (`docker container logs {name}`)
    - Also check the logs for the orders-api service
    - GET `http://localhost:4002/orders`
        - This will contain a new order object once it has been "processed"