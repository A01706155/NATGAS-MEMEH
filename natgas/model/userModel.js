

class UserClass
{
    static user_list = [];

    constructor(id
                , name
                , costcenter
                , psw)
    {
        this.id = id;
        this.name = name;
        this.costcenter = costcenter;
        this.creatDate = Date.now();
        this.psw = psw;
    }

    static create(id
                , name
                , costcenter = 0
                , psw = '')
    {
        user = new UserClass(id
                            , name
                            , costcenter
                            , psw);
        this.user_list.push(user);

        return user;
    }

    static getById(id)
    {
        returnUser = null;

        for(user of this.user_list)
        {
            if(user.id == id)
            {
                returnUser = user;
                break;
            }
        }

        return returnUser;
    }

    static getByName(name)
    {
        returnUserList = [];

        for(user of this.user_list)
        {
            if(user.name.includes(name))
            {
                returnUserList.push(user);
            }
        }

        return returnUserList
    }

    static getList()
    {
        return this.user_list;
    }
}

module.exports = UserClass;