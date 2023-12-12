import {
  Link,
} from "react-router-dom"

const MenuItem = ({ item }) => {
  console.log(item)
  console.log(item.assests.imgUrl)
  return (
    
    <li> 
    <Link className='flex items-center gap-4 p-2'to={`/product/${item.name}`}>
      <img className='rounded-full flex-initial w-24' width="100" height="100" src={item.assests.imgUrl}></img>
      <span className='flex-initial w-72 font-bold text-xl justify-self-end'>
      {item.name}
      </span>
      </Link>
    </li>
   
  )
}

export default MenuItem 