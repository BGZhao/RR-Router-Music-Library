import { useEffect, useState, useRef, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import {SearchContext} from './context/searchContext'
import { createResource as fetchData } from './helper'
import Spinner from './components/Spinner'
import './App.css'

function App() {
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState(null)
    
    let searchInput = useRef('')

	const API_URL = 'https://itunes.apple.com/search?term='

    const handleSearch = (e, term) => {
        e.preventDefault()
            if (term) {
                setData(fetchData(term))
            }
        
    }
	
	// const handleSearch = (e, term) => {
    //     e.preventDefault()
    //     const fetchData = async () => {
    //         document.title = `${term} Music`
    //         const response = await fetch(API_URL + term)
    //         const resData = await response.json()
    //         if (resData.results.length > 0) {
    //             setData(resData.results) 
    //             setMessage("Search for Music!")
                
    //         } else {
    //             return setMessage('Not Found.')
    //         }
    //     }
    //     fetchData()
        
    // }

    const renderGallery = () => {
        if (data) {
            return (
                <Suspense fallback={<Spinner/>}>
				    <Gallery />
                </Suspense>
            )
        }
    }

   

	return (
		<div className='App'>
            <h1>Music Library</h1>
            <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
                <SearchBar/>
            </SearchContext.Provider>
			{message}
			<DataContext.Provider value={data}>
                {renderGallery()}
			</DataContext.Provider>
		</div>
  	);
}

export default App;