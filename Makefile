build:
	docker compose up -d --build

up:
	docker compose up -d

down:
	docker compose down

migrate:
	yarn prisma migrate dev --name init

generate:
	yarn prisma generate