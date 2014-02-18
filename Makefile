test:
	./node_modules/mocha/bin/mocha -u bdd

component:
	component build -o ./

.PHONY: test
