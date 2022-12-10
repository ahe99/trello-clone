DC=docker-compose
all:start

SB_PORT_INT=6006
SB_PORT_EXT=6006

PROJ_PATH=/usr/src/app

# init: ## Init project
# 	@echo "INIT PROJECT"
# 	@echo "Copying .env.dist in .env"
# 	@cp .env.dist .env
# 	@echo ".env: \n"
# 	@cat .env
# 	@echo "\n"

build: ## Build the project stack
	@echo "build\n"
	$(DC) build

storybook: ## Build the project stack (ctrl + c will stop the project)
	@echo "Launch storybook\n"
	$(DC) up --build storybook

start: ## Build and launch the project in background
	@echo "Launch dettached projet and build\n"
	$(DC) up -d --build

stop: ## Stop the project stack
	$(DC) stop
clean: ## Stop and delete the project stack
	$(DC) down

logs: ## Attach to standard output of containers (to see logs)
	$(DC) -f docker-compose.yml logs -f page

logs-storybook: ## Attach to standard output of containers (to see logs)
	$(DC) -f docker-compose.yml logs -f storybook

tree: ## Tree view of your project files
	@tree | sed 's/├/\+/g; s/─/-/g; s/└/\\/g'

re: clean start ## clean and start

sh: ## Go inside container
	$(DC) -f docker-compose.yml exec sh
linter: ## Linter command by eslint
	$(DC) -f docker-compose.yml exec page $(PROJ_PATH)/node_modules/eslint/bin/eslint.js --fix src/

exec: ## Execute command inside api container, need to use command=                                                                                                                                                
	$(DC) exec page $(command)

help: ## Help command
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m- %-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install-dc: ## Install Docker
	curl https://get.docker.com | sh -

install-dcc: ## Install Docker Compose
	COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
	sh -c "curl -L https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose"
	chmod +x /usr/local/bin/docker-compose
	sh -c "curl -L https://raw.githubusercontent.com/docker/compose/${COMPOSE_VERSION}/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose"

	docker-compose -v

.PHONY: all init dev build start stop clean tree logs re
