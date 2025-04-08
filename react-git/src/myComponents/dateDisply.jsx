import { formatDistanceToNow} from 'date-fns'

export default function DateDisplay({date}){
const currentDate=Date.parse(date)
console.log(currentDate)

const formatedDate=formatDistanceToNow(currentDate,
    {addSuffix:true,includeSeconds:true})
    return(
        <span className='date'>{formatedDate}</span>
    )
}