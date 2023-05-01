import React from 'react'

export const SearchResult = ({result, onClick}) => {
  return (
    <div className='search-result' onClick={onClick}>{result.StudentId}</div>
  )
}
