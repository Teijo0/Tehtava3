import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function RatingsByRestaurant() {
  const { id } = useParams();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/restaurants/${id}/ratings`)
      .then(response => response.json())
      .then(data => setRatings(data))
      .catch(error => console.error("Virhe haettaessa arvioita:", error));
  }, [id]);

  // Poistofunktio
  const handleDelete = (ratingId) => {
    if (!window.confirm('Haluatko varmasti poistaa arvion?')) return;

    fetch(`http://127.0.0.1:8000/api/restaurants/${id}/ratings/{ratingId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Poisto epäonnistui');
        }
        // Päivitä ratings ilman poistettua arviota
        setRatings(ratings.filter(rating => rating.id !== ratingId));
      })
      .catch(error => {
        console.error('Virhe poistaessa arviota:', error);
        alert('Arvion poisto epäonnistui.');
      });
  };

  return (
    <div>
      <h2>Ravintolan {id} arviot</h2>
      {ratings.length === 0 ? (
        <p>Ei arvioita saatavilla.</p>
      ) : (
        ratings.map(rating => {
            console.log("Rating object:", rating);  // testi
          return (
            <div key={rating.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <p><strong>Arvosana:</strong> {rating.value} / 5</p>
              <p><strong>Kommentti:</strong> {rating.description}</p>
              <p><strong>Päivämäärä:</strong> {new Date(rating.date_rated).toLocaleString()}</p>
              <button onClick={() => handleDelete(rating.id)}>Poista arvio</button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default RatingsByRestaurant;
