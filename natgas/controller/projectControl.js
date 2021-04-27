const path = require('path');
const storyModel = require('../model/storyModel.js');
const projectAssignModel = require('../model/projectAssignModel.js');
const projectModel = require('../model/projectModel.js');
const optionModel = require('../model/optionModel.js');
const url = require('url');


exports.get = (request, response, next) => {
    console.log('get project');

    const queryObj = url.parse(request.url, true).query;
    console.log(queryObj);

    let project_obj = projectModel.getById(queryObj.id);

    if(!project_obj)
    {
        project_obj = projectModel.getEmpty();
    }

    console.log('state');
    console.log((projectModel.getList())[0].state);

    response.render('project', {project: project_obj,
                                story_list: storyModel.getByProject(project_obj.id),
                                user_list: projectAssignModel.getByProject(project_obj.id),
                                state: optionModel.getWorkState()});
}

exports.new = (request, response, next) => {
    console.log('new project');

    project_obj = projectModel.getEmpty();

    response.render('project', {project: project_obj,
                                story_list: storyModel.getByProject(project_obj.id),
                                user_list: projectAssignModel.getByProject(project_obj.id),
                                state: optionModel.getWorkState()});
}

exports.submit = (request, response, next) => {
    /*update project*/
    console.log("Set Project");
    console.log(request.body);

    let id = request.body.id;
    if(request.body.id == 0)
    {/*New Project*/
        id = projectModel.getList().length + 1;
        console.log('new');
        projectModel.create(id, request.body.name, request.body.description, request.body.state);
    }
    else
    {/*Modify Project*/
        console.log('modify');
        projectModel.modify(id, request.body.name, request.body.description, request.body.state);
    }

    console.log(`id is ${id}`);

    response.redirect(`/project/?id=${id}`);
}