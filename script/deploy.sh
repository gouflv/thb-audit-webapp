#!/bin/bash;

# Build
export VUE_APP_API_BASE=/
pnpm build

# Deploy to branch
rm -rf ../thb-audit-webapp--deploy/*
cp -R ./dist/* ../thb-audit-webapp--deploy

cd ../thb-audit-webapp--deploy
git add .
git commit -m 'update'
git push

