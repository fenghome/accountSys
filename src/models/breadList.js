export default {

    namespace : 'breadList',

    state : {
        list:['首页','',
                ['入库','/show',
                    [
                        ['新增','/show/add'],['编辑','/show/edit'],['显示','/show/details']
                    ]
                ]
            ]
    },

    subscriptions : {
        setup({dispatch, history}) { // eslint-disable-line
            history.listen(({pathname}) => {
                if (false) {
                    dispatch({type: 'initProducts'});
                }
            })
        }
    },

    effects : {
        *init(action, {call, put}) {}
    },

    reducers : {
        initState(state, action) {
            return {
                ...state
            };
        }
    }
};
