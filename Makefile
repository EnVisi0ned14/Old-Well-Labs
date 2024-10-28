start: ## Start the docker containers
	@echo "Starting the docker containers"
	@docker compose up -d
	@echo "Containers started - http://localhost:80"

stop: ## Stop Containers
	@docker compose down

restart: stop start ## Restart Containers

build: ## Build Containers
	@docker compose up -d --build

backend-shell:
	@docker exec -it api bash

frontend-shell:
	@docker exec -it app bash