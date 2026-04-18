.DEFAULT_GOAL := help
.PHONY: help install clean build lint typecheck test format check publish tag release ship

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## npm ci (clean install from lockfile)
	npm ci

clean: ## Remove build output
	npm run clean

build: ## Compile TypeScript to lib/
	npm run build

lint: ## Run ESLint
	npm run lint

typecheck: ## Run tsc --noEmit on sources + tests
	npm run typecheck

test: ## Run Jest test suite
	npm test

format: ## Run Prettier --write on src
	npm run format

check: lint typecheck test build ## Run lint + typecheck + tests + build (what CI runs)

publish: check ## Publish current version to npm (runs full check first)
	npm publish

tag: ## Create and push annotated tag v$(VERSION). Usage: make tag VERSION=1.2.3
	@[ -n "$(VERSION)" ] || { echo "VERSION is required (e.g. make tag VERSION=1.2.3)"; exit 1; }
	git tag -a v$(VERSION) -m "v$(VERSION)"
	git push origin v$(VERSION)

release: ## Create a GitHub release for v$(VERSION). Usage: make release VERSION=1.2.3
	@[ -n "$(VERSION)" ] || { echo "VERSION is required (e.g. make release VERSION=1.2.3)"; exit 1; }
	gh release create v$(VERSION) --title "v$(VERSION)" --generate-notes

ship: check publish tag release ## Full release: check + npm publish + git tag + GitHub release. Usage: make ship VERSION=1.2.3
	@echo "Shipped v$(VERSION)"
