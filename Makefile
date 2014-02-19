test:
	./node_modules/mocha/bin/mocha -u bdd

component:
	component build -o ./

standalone:
	component build --standalone jsFront -o ./

.PHONY: test
