import React, {  useEffect, useState } from 'react'
import classes from './foodpage.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../../services/foodService';
import Tags from '../../Tags/Tags';
import Price from '../../Price/Price';
import { useCart } from '../../../Hooks/useCart';
import NotFound from '../../NotFound/NotFound';
export default function FoodPage() {
    const [food, setFood] = useState({});
    const { id } = useParams();
    const {addToCart}=useCart();
    const navigate=useNavigate();
  const handleaddtocart =()=>
  {
    addToCart(food);
    navigate('/cart')

  }
    useEffect(() => {
      getById(id).then(setFood);
    }, [id]);
  
    return (
      <>
        {!food ? <NotFound message="Food Not Found" linkText="Back To Homepage" /> :(
          <div className={classes.container}>
            <img
              className={classes.image}
              src={`/foods/${food.imageUrl}`} // Removed unnecessary single quotes around the template literal
              alt={food.name}
            />
            <div className={classes.details}>
                <div className={classes.header}>
                    <span className={classes.name}>{food.name}</span>
                    <span className={`${classes.favorite} ${food.favorite ? '' :classes.not}`}>♥</span>
                </div>
                <div className={classes.origins}>
                    {food.origins?.map(origin=>(<span key={origin}>{origin}</span>))}
                </div>
                <div className={classes.tags}>
  {food.tags && (
    <Tags tags={food.tags.map(tag => ({ name: tag }))} forfoodpage={true} />
  )}
</div>
<div className={classes.cooktime}>
    <spaan>Time to cook about <strong>{food.cookTime}</strong> minutes</spaan>
</div>
<div className={classes.price}>
    <Price price={food.price} />
    
</div><button onClick={handleaddtocart}>Add to cart</button>
            </div>
          </div>
        )}
      </>
    );
  }
  
