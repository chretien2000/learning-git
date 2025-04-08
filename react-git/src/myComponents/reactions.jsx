import {useDispatch} from 'react-redux'
import {countReactions} from '../storeApp/postSlice.js'
export default function Reactions({id,reaction}){
    const dispatch=useDispatch()
const reactions={like:'👍',
                 love:'💓',
                 angry:'💔',
                 rocket:'🚀'}
const myReact=Object.entries(reactions).map(([react,emoji])=>{
return <button key={emoji}
 onClick={()=>dispatch(countReactions({reaction:react,id:id}))}>{emoji} {reaction[react]} </button>
})

return(<div>{myReact}</div>)

}