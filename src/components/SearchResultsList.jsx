import React, {useState} from 'react'
import { SearchResult } from './SearchResult'

export const SearchResultsList = ({results}) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
      setIsVisible(false);
    }
    

 
  return (
    <div className='result-list'>
        {
            results.map((result) =>{
                return <SearchResult key={result} result={result} />
            })
        }
    </div>
  )
}
