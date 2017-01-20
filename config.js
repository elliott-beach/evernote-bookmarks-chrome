config = {
	develop: "http://localhost:5000",
	production: "https://arcane-mountain-77715.herokuapp.com",
	test: false,
}
config.HOSTNAME = config.test ? config.develop : config.production;
