import Card from "../card/card";
import './cards.css'

const Cards =({juego})=>{
    return(
        <div className="cards-container">
            <Card
            id={juego.id}
            name={juego.name}
            image={juego.image}
            genres={juego.genres}
            />
        </div>
    )
}

export default Cards;