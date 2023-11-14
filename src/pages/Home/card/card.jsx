import './card.css'
import { Link } from 'react-router-dom'

const Card=({id,name,image,genres})=>{
    return(
        <div >
            <button className='boton-card'>
            <Link to={`/detail/${id}`} className="LinkNoUnderline">
                <img className='card-imagen' src={image} alt="" />
                    <h2 className='card-name'>{name}</h2>
                <div className='genres'>
                    {genres && genres.map((genres)=>(
                        <h2 key={genres.name}className='card-h2'>
                        Generos:{genres.name}
                        </h2>
                    ))}
                </div>
                </Link>
            </button>
        </div>
    )
}

export default Card