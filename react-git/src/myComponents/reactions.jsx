
import {useCountReactionsMutation} from '../storeApp/postSlice.js'
export default function Reactions({id,reaction}){
    const [countReactions]=useCountReactionsMutation()
async function count(react){
    try{
        const reactions={...reaction,[react]:reaction[react]+1}
        await countReactions({id:id,reactions:reactions}).unwrap()
    }
    catch(err){
        console.log('could not update reactions',err)
    }
}

const reactions={"thumbsup": '👍',
                 "wow": '🤷‍♂️',
                  "heart": '💓',
                 "rocket":'🚀',
                  "coffee": '🍵'}
const myReact=Object.entries(reactions).map(([react,emoji])=>{
return <button key={emoji}
 onClick={()=>count(react)}>{emoji} {reaction[react]} </button>
})

return(<div>{myReact}</div>)

}