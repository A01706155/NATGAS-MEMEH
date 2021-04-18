const path = require('path');
const storyModel = require('../model/storyModel.js');
const projectAssignModel = require('../model/projectAssignModel.js');
const projectModel = require('../model/projectModel.js');


exports.get = (request, response, next) => {
    console.log('get project');
    let project = projectModel.getById(1234);

    if(!project)
    {
        project = projectModel.getEmpty();
    }
    response.render('project', {project: project,
                                story_list: storyModel.getByProject(project.id),
                                user_list: projectAssignModel.getByProject(project.id)});
}

exports.new = (request, response, next) => {
    console.log('new project');

    project = projectModel.getEmpty();

    response.render('project', {project: project,
                                story_list: storyModel.getByProject(project.id),
                                user_list: projectAssignModel.getByProject(project.id)});
}

exports.submit = (request, response, next) => {
    /*update project*/
 
}