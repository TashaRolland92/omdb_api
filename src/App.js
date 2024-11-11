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
		<div className="App container max-w-screen-xl mx-auto px-4">
			<header className="w-full flex flex-col justify-center lg:flex-row lg:justify-between items-center mb-4">
				<h1 className="
					logo
					pt-6 pb-0
					font-anton
					colour-transparent inline-block bg-gradient-to-r from-primary-content to-secondary-content bg-clip-text
					text-6xl
					whitespace-nowrap
					text-transparent
					">
					T-iMDB</h1>
				<img
					src="/images/squad1.webp"
					alt="Deadshot, Harlequinn & Joker. Suicide Squad Character Street Art."
					className="relative top-0 right-0 -z-1 squad-image"
				/>
			</header>
			<section className="intro text-center lg:text-left mb-4">
				<p className="text-primary-content text-lg pb-2">Use the search below to find out more information on your favourite movies!</p>
			</section>

			<form onSubmit={handleSubmit} className="bg-transparent" autoComplete="off">
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
							min-h-12
							px-4 mb-4
							opacity-100
							shadow-lg shadow-white
							w-full lg:w-96
							focus:border-primary-content focus:outline-none focus:shadow-white"
						placeholder="Enter movie title..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button type="submit" aria-label="Search button" className="
						uppercase
						rounded-3xl
						bg-secondary-color
						text-md
						text-secondary-content
						hover:bg-secondary-light
						transition ease duration-300
						min-h-12
						px-2
						w-full lg:w-48
						focus:border-0 focus:outline-none
						lg:ml-4">Search</button>
				</div>
			</form>

			{results && results.Response === "True" ? (
				<div className="results mt-10 pt-10 grid md:grid-cols-2 border-t-2 border-secondary-content">
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
						<ul className="other-ratings text-primary-content text-lg mb-4">
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
					<div className="poster-plot-container flex flex-col mb-6">
						<img src={results.Poster} alt={results.Title} className="mb-4 l" />
						<div className="plot">
							<h3 className="font-anton text-secondary-content text-2xl mb-4 underline">Synopsis</h3>
							<p class="text-secondary-content text-lg">{results.Plot}</p>
						</div>
					</div>
				</div>
			)
			: (
				results &&
					<div className="flex items-center">
						<h4 className="mt-4 mx-auto flex
							font-anton text-xl uppercase
							text-primary-content
							whitespace-nowrap
							text-transparent">{results.Error}
							{/* // error message from ODMB API */}
						</h4>
					</div>
			)}
		</div>
	);
}

export default App;
