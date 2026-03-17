import { useParams } from 'react-router-dom'

export default function Products() {
  const { category } = useParams()
  return (
    <div className="text-white p-10">
      Collections {category ? `— ${category}` : ''}
    </div>
  )
}
