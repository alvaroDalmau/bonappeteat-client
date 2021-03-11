// import React, { useState } from 'react'
// import {FaStar} from 'react-icons/fa'

// function Rating () {
// const [rating, setRating] = useState(null)
// const [hover, setHover] = useState(null)

//         return (
//             <div>
//             {[...Array(5)].map((star, index)=>{
//                 const ratingValue= index + 1
//                 return (
//                   <label>
//                     <input
//                       type="radio"
//                       name="rating"
//                       style={{ display: "none" }}
//                       value={ratingValue}
//                       onClick={() =>setRating(ratingValue)}
//                     />
//                     <FaStar
//                       color={
//                         ratingValue <= hover || rating ? "#fcba03" : "#e4e5e9"
//                       }
//                       size={20}
//                       onMouseEnter={() => setHover(ratingValue)}
//                       onMouseLeave={() => setHover(null)}
//                     />
//                   </label>
//                 );
//             })}
//             </div>
//         )
//     }
// export default Rating


import React, { Component } from 'react'
import {FaStar} from 'react-icons/fa'

export default class Rating extends Component {
    state={
        rating: 0,
        hover: 0
    }

    render() {
        
        const{rating, hover}= this.state
        const {restaurantRating}= this.props

        return (
            <div>
            {
              [...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      style={{ display: "none" }}
                      value={ratingValue}
                      onClick={() => {
                        this.setState({
                          rating: ratingValue,
                        });
                      }}
                    />
                    <FaStar
                      color={ratingValue <= rating ? "#fcba03" : "#e4e5e9"}
                      size={20}
                    />
                  </label>
                );
              })
            }

            

            </div>
        )
    }
}
