// here we're gonna make our reducer, which is a function that takes the state and action and returns a state
// Passing some dummy data so that we can play around with the state with components

const initState={

    posts:[
        
        {id:'1',title:'Squirtle laid an egg',body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic porro ratione iusto? Numquam, quis distinctio, earum quibusdam, officia dignissimos ea ratione facilis ipsum alias id perferendis laboriosam voluptate natus debitis?'},
        {id:'2',title:'Charmander laid an egg',body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic porro ratione iusto? Numquam, quis distinctio, earum quibusdam, officia dignissimos ea ratione facilis ipsum alias id perferendis laboriosam voluptate natus debitis?'},
        {id:'3',title:'A helix fossil was found',body:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic porro ratione iusto? Numquam, quis distinctio, earum quibusdam, officia dignissimos ea ratione facilis ipsum alias id perferendis laboriosam voluptate natus debitis?'}

    ]

}
// Inside the reducer we have a change to state that fires when the dispatched action is Delete post
// and filters through all the posts, eliminating those that have the id we want, then returning all the other states and the new update state
const rootReducer=(state=initState,action)=>{

    if (action.type=='DELETE_POST'){

        let newPosts= state.posts.filter(post=>{

            return action.id!==post.id
        });

        return{

            ...state,
            posts:newPosts
        }

    }
    return state;

}

export default rootReducer