import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState(null);

	const apiKey = 'f110553c';

	const handleSubmit = async (e) => {
		e.preventDefault(); // prevent page from refreshing
		if (!searchTerm) return; // if search term is empty, return
		console.log(searchTerm);

		try{
			// API call to fetch movie data based on user input
			const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`);
			setResults(response.data); // store the data in state
			console.log(response.data);
		} catch(error) {
			console.error("Error fetching data:", error); // display error in console
		}
	};

	return (
		<div className="App">
			<h1>Movie search app</h1>
			<p>Use this app to find out more information about your favorite movies!</p>

			<form onSubmit={handleSubmit}>
				<label htmlFor="search">Movie title:</label>
				<input
					type="text"
					name="search"
					id="searchTerm"
					placeholder="Enter movie title..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button type="submit">Search</button>
			</form>

			{results && results.Response === "True" ? (
				<div className="results">
					<div className="movie-details">
						<h2>Movie title: { results.Title}</h2>
						<ul>
							<li>Released: {results.Released}</li>
							<li>Rating: {results.Rated}</li>
							<li>Genre: {results.Genre}</li>
							<li>Actors: {results.Actors}</li>
						</ul>
					</div>
					<div className="imdb-details">
						<ul>
							<li>iMDB Rating: {results.imdbRating}</li>
							<li>Other Ratings:</li>
							<li>iMDB Votes: {results.imdbVotes}</li>
						</ul>
					</div>
					<div className="poster">
						<img src={results.Poster} alt={results.Title} />
						<p>{results.Plot}</p>
					</div>
				</div>
			)
			: (
				results && <p>{results.Error}</p> // error message from ODMB API
			)}
		</div>
	);
}

export default App;
