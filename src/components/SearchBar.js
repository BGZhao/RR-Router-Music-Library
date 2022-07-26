import { useContext } from 'react'
import { SearchContext } from '../context/searchContext'
import Button  from 'react-bootstrap/Button'

function SearchBar() {

    const {term, handleSearch} = useContext(SearchContext)

    return (
        <form>

            <input ref={term} type="text" placeholder="Search here" />

            <Button variant='success' onClick={ (e) => handleSearch(e, term.current.value) } >Submit</Button>

        </form>
    )
}

export default SearchBar