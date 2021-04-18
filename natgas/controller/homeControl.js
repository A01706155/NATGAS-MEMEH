const projectModel = require('../model/projectModel.js');

exports.get = (request, response, next) =>
{
    console.log(projectModel.getList().length);
    response.render('home', {project_list: projectModel.getList()});
}

