deploy:
	vercel --prod
deploy-product:
	yarn build
	rsync -a .  ubuntu@18.162.143.209:tokenstand-interface

deploy-testing:
	yarn build
	rsync -a .  ubuntu@18.162.155.9:tokenstand-interface

