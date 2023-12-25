import MenuItem from './MenuItem'
const Category = ({ products }) => {

  
  return (
  //  
  <ul>
      {products.map((item) => {
        return <MenuItem key={item.id} item={item} />
})}
    </ul>
  )
}

export default Category 