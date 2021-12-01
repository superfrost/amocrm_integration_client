import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'

export default function SearchInput({setData, setIsLoading}) {

  const [searchValue, setSearchValue] = useState('')

  const handleChangeSearchValue = async (e) => {
    setSearchValue(e.target.value)
    if(e.target.value.length > 2 ) {
      setIsLoading(true)
      const data = await getSearchData(e.target.value)
      console.log(e.target.value);
      setData(data)
      setIsLoading(false)
    }
    if(!e.target.value) {
      setIsLoading(true)
      const data = await getSearchData(e.target.value)
      setData(data)
      setIsLoading(false)
    }
  }

  async function getSearchData(searchValue) {
    const url = `http://localhost:5000/api/?search=${searchValue}`
    const response = await fetch(url)
    if(response.ok) {
      const data = await response.json()
      return data
    }
  }

  const cleanSearchValue = () => {
    let e = {target: {value : ''}}
    handleChangeSearchValue(e)
  }

  return (
    <div className="search">
      <input type="text" name="search" id="search" value={searchValue} onChange={handleChangeSearchValue} placeholder="Поиск" />
      {searchValue
      ?
      <GrClose onClick={cleanSearchValue} className='search-cross'/>
      :
      <GrClose visibility='hidden' className='search-cross'/>
      }
      <FaSearch className='search-icon'/>
    </div>
  )
}
