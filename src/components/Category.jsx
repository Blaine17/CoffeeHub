import MenuItem from './MenuItem'
const Category = ({ products }) => {

  console.log(products)
  
  return (
  //  
  <ul className="m-4">
      {products.map((item) => {
        console.log(item)
        return <MenuItem key={item.id} item={item} />
})}
    </ul>
  )
}

export default Category 