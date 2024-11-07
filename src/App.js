import React, { useState } from "react";
import axios from "axios";

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
		<div className="App container mx-auto">
			<h1 className="text-primary-content text-4xl py-4">T-iMDB</h1>
			<p className="text-primary-content text-base">Use the search below to find out more information about your favourite movies!</p>

			<form onSubmit={handleSubmit} className="bg-transparent">
				<input
					type="text"
					name="search"
					id="searchTerm"
					className="search bg-transparent border-transparent"
					placeholder="Enter movie title..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button type="submit" className="rounded-md bg-primary-content">Search</button>
			</form>

			{results && results.Response === "True" ? (
				<div className="results">
					<div className="movie-details">
						<h2>{ results.Title}</h2>
						<ul>
							<li>Released: {results.Released}</li>
							<li>Rating: {results.Rated}</li>
							<li>Genre: {results.Genre}</li>
							<li>Actors: {results.Actors}</li>
						</ul>
					</div>
					<div className="imdb-details">
						<ul>
							<li>iMDB Rating: <span className="font-bold">{results.imdbRating}</span></li>
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
