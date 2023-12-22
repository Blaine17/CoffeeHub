import MenuItem from './MenuItem'
const Category = ({ products }) => {

  
  return (
  //  
  <ul className="m-4">
      {products.map((item) => {
        return <MenuItem key={item.id} item={item} />
})}
    </ul>
  )
}

export default Category 