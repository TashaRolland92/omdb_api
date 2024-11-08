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
			<header className="w-full flex justify-between mb-4">
				<h1 className="
					logo
					py-6
					font-anton
					inline-block
					bg-gradient-to-r from-secondary-content via-secondary-color to-secondary-dark
					bg-clip-text
					text-6xl
					text-transparent
					">
					T-iMDB</h1>
				<img
					src="/images/squad1.webp"
					alt="Deadshot, Harley Quinn & Joker. Suicide Squad Character Street Art."
					className="relative top-0 right-0 -z-1 squad-image w-3/4"
				/>
			</header>
			<section className="intro mb-4">
				<p className="text-primary-content text-lg pb-2">Use the search below to find out more information about your favourite movies!</p>
			</section>

			<form onSubmit={handleSubmit} className="bg-transparent">
				<div className="bg-transparent">
					<input
						type="text"
						name="search"
						id="searchTerm"
						className="
							search
							border-solid border-2 border-primary-content
							text-primary-content
							text-lg
							rounded-3xl
							min-h-12 min-w-96
							px-4
							opacity-100
							shadow shadow-white
							focus:border-primary-content focus:outline-none focus:shadow-lg"
						placeholder="Enter movie title..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button type="submit" className="uppercase rounded-3xl bg-secondary-color text-md text-secondary-content hover:bg-secondary-light transition ease duration-150 min-h-12 px-2 min-w-32 ml-4">Search</button>
				</div>
			</form>

			{results && results.Response === "True" ? (
				<div className="results mt-10 pt-10 grid grid-cols-2 border-t-2 border-secondary-content">
					<div className="movie-details-container mr-2">
						<h2 className="text-primary-content font-anton text-3xl mb-4 underline">{ results.Title}</h2>
						<ul className="movie-details text-primary-content text-lg mb-4">
							<li><span className="font-bold">Released:</span>	{results.Released}</li>
							<li><span className="font-bold">Rating:</span> {results.Rated}</li>
							<li><span className="font-bold">Genre:</span> {results.Genre}</li>
							<li><span className="font-bold">Actors:</span> {results.Actors}</li>
						</ul>
						<ul className="imdb-details text-primary-content text-lg mb-6">
							<li><span className="font-bold">iMDB Rating:</span> <span className="text-secondary-content">{results.imdbRating}</span></li>
							<li><span className="font-bold">iMDB Votes:</span> <span className="text-secondary-content">{results.imdbVotes}</span></li>
						</ul>
						<h3 className="font-anton text-secondary-content underline text-2xl mb-4">Other Ratings</h3>
						<ul className="other-ratings text-primary-content text-lg">
							{results.Ratings && results.Ratings.length > 0 ? (
								results.Ratings.map((rating, index) => (
									<li key={index}>
										<span className="text-secondary-content font-bold">{rating.Source}:</span> {rating.Value}
									</li>
								))
							) : (
								<li>No other ratings available</li>
							)}
						</ul>
					</div>
					<div className="poster-plot-container flex flex-col align-end mb-6">
						<img src={results.Poster} alt={results.Title} className="mb-4" />
						<div className="plot">
							<h3 className="font-anton text-secondary-content text-2xl mb-4 underline">Synopsis</h3>
							<p class="text-secondary-content text-lg">{results.Plot}</p>
						</div>
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
