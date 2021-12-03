import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import useDebounce from '../hooks/useDebouce'

export default function SearchInput({setData, setIsLoading}) {

  const [searchValue, setSearchValue] = useState('')
  const searchDebounce = useDebounce(getSearchData, 500)

  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value)
    if(e.target.value.length > 2 ) {
      searchDebounce(e.target.value)
    }
    if(!e.target.value) {
      searchDebounce()
    }
  }

  async function getSearchData(searchValue = '') {
    setIsLoading(true)
    const url = `/api/?search=${searchValue}`
    const response = await fetch(url)
    let data = ''
    if(response.ok) {
      data = await response.json()
    }
    setData(data)
    setIsLoading(false)
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
