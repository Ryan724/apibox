var project = require('./project');
function api (request) {
	var pro = {
		name:"zpj",
		desc:"帅"
	};
	addProject(pro);
}
function addProject(pro){
	project.add(pro)
}
module.exports = api;