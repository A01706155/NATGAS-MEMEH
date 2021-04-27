const path = require('path');
const taskModel = require('../model/taskModel.js');
const testModel = require('../model/testModel.js');
const storyAssignModel = require('../model/storyAssignModel.js');
const storyModel = require('../model/storyModel.js');
const url = require('url');


exports.get = (request, response, next) => {
    console.log('get story');

    const queryObj = url.parse(request.url, true).query;
    console.log(queryObj);

    let story = storyModel.getByCopyId(queryObj.id);

    if(!story)
    {
        story = storyModel.getEmpty();
    }
    response.render('story', {story: story,
                                task_list: storyModel.getByStory(story.id),
                                test_list: testModel.getByStory(story.id)});
}

exports.new = (request, response, next) => {
    console.log('new story');

    story = storyModel.getEmpty();

    response.render('story', {story: story,
                                task_list: storyModel.getByStory(story.id),
                                test_list: testModel.getByStory(story.id)});
}

exports.submit = (request, response, next) => {
    /*update story*/
    console.log("Set Story");
    console.log(request.body);

    let id = request.body.id;
    if(request.body.id == 0)
    {/*New Story*/
        id = storyModel.getList().length + 1;
        console.log('new');
        storyModel.create(id
                            , request.body.name
                            , request.body.description
                            , request.body.purpose
                            , request.body.comment
                            , request.body.stakeholder
                            , request.body.ap
                            , request.body.state);
    }
    else
    {/*Modify Project*/
        projectModel.modify(id
                            , request.body.name
                            , request.body.description
                            , request.body.purpose
                            , request.body.comment
                            , request.body.stakeholder
                            , request.body.ap
                            , request.body.state);
    }

    console.log(`id is ${id}`);

    response.redirect(`/project/?id=${id}`);
}