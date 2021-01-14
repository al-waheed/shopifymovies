import React from 'react'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';


const Nominated = ({ nominated, removedMovies }) => {

	const nominatedList = nominated.length ? (
		nominated.map((nominate,i) =>{
		return (
          <div key={i} className='nominate-card'>
		   <div className='movie'>
		   <img src={nominate.Poster} alt="pics" className="nominate-pics"/>
		   <div className="nominate-title">{nominate.Title} ({nominate.Year})</div>
		  <button onClick={()=>{removedMovies(nominate.imdbID)
		  ToastsStore.error("Hey, you just removed your nominated movie!")
		}} className='nominate-btn'><i class="fa fa-close"></i> Remove</button>
		  </div>
		  <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
		  </div>
		)
		})
	):(
	<div className='nominateText'>No movie nominated yet</div>
	)
	return (
		<div className='nominate-container'>
			{nominatedList}
		</div>
	)
}

export default Nominated

