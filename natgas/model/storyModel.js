

class StoryClass
{
    static story_list = [];

    constructor(id
                , project_id
                , name
                , description
                , purpose
                , comment
                , stakeholder
                , ap
                , state)
    {
        this.id = id;
        this.project_id = project_id;
        this.name = name;
        this.description = description;
        this.purpose = purpose;
        this.comment = comment;
        this.stakeholder = stakeholder;
        this.ap = ap;
        this.creatDate = Date.now();
        this.state = state;
    }

    static create(id
                    , project_id
                    , name
                    , description = ''
                    , purpose = ''
                    , comment = ''
                    , stakeholder = 0
                    , ap = 0
                    , state = 0)
    {
        let story = new StoryClass(id
                                , project_id
                                , name
                                , description
                                , purpose
                                , comment
                                , stakeholder
                                , ap
                                , state);
        this.story_list.push(story);

        return story;
    }

    static getById(id)
    {
        let returnStory = null;

        for(story of this.story_list)
        {
            if(story.id == id)
            {
                returnStory = story;
                break;
            }
        }

        return returnStory;
    }

    static getByProject(project_id)
    {
        let returnStory_list = [];

        for(story of this.story_list)
        {
            if(story.project_id == project_id)
            {
                returnStory_list.push(story);
            }
        }

        return returnStory_list;        
    }

    static getList()
    {
        return this.story_list;
    }
}

module.exports = StoryClass;