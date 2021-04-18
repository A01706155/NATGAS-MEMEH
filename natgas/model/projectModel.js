

class ProjectClass
{
    static project_list = [];

    constructor(id
                , name
                , description
                , state)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.creatDate = Date.now();
        this.state = state;
    }

    static create(id
                    , name
                    , description = ''
                    , state = 0)
    {
        let project = new ProjectClass(id
                                    , name
                                    , description
                                    , state);
        this.project_list.push(project);

        return project;
    }

    static getEmpty()
    {
        return    new ProjectClass(0
                                , ''
                                , ''
                                , 0);
    }

    static getById(id)
    {
        let returnProject = null;

        for(project of this.project_list)
        {
            if(project.id == id)
            {
                returnProject = project;
                break;
            }
        }

        return returnProject;
    }

    static getList()
    {
        return this.project_list;
    }
}

module.exports = ProjectClass;