const express = require('express');
const path = require('path');
const router = express.Router();
const storyControl = require('../controller/storyControl.js');

/*
const task_array = [new TaskObj(1234, 'Task A')
                            , new TaskObj(5678, 'Task B')
                            , new TaskObj(9012, 'Task C')
                            , new TaskObj(3456, 'Task D')];

const test_array = [new TestObj(1234, 'Test A')
                            , new TestObj(5678, 'Test B')
                            , new TestObj(9012, 'Test C')
                            , new TestObj(3456, 'Test D')];                            

function TaskObj(id, name)
{
    this.id = id;
    this.name = name;
}

function TestObj(id, name)
{
    this.id = id;
    this.name = name;
}


router.use('/', (request, response, next) => {
    response.render('story', {task_list: task_array,
                                test_list: test_array});
});*/

router.get('/new', storyControl.new);
router.post('/submit', storyControl.submit);
router.get('/', storyControl.get);

module.exports = router;


