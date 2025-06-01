import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RatingsByRestaurant() {
  const { id } = useParams();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/restaurants/${id}/ratings`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Virhe ladattaessa arvioita');
        }
        return response.json();
      })
      .then(data => setRatings(data))
      .catch(error => console.error('Virhe haettaessa arvioita:', error));
  }, [id]);

  return (
    <div>
      <h2>Arviot ravintolalle (ID: {id})</h2>
      {ratings.length === 0 ? (
        <p>Ei arvioita saatavilla.</p>
      ) : (
        ratings.map(rating => (
          <div key={rating.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <p><strong>Arvosana:</strong> {rating.rating} / 5</p>
            <p><strong>Kommentti:</strong> {rating.comment}</p>
            <p><strong>Päivämäärä:</strong> {new Date(rating.date).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RatingsByRestaurant;
