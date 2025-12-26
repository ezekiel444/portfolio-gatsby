pnpm store prune
Remove-Item -Recurse -Force node_modules
Remove-Item pnpm-lock.yaml
pnpm install
