import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { Lead } from '../components/Lead';
import { NoResults } from '../components/NoResults';
import SearchInput from '../components/SearchInput';
import { useNavigate } from 'react-router-dom';

function MainBoard() {

  const server_URL = '/api'
  const [data, setData] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  async function getServerData() {
    const response = await fetch(server_URL)
    const json = await response.json()
    if (response.status === 500) {
      return navigate('/integration')
    }
    setData(json)
    setIsLoading(false)
    console.log(json);
  }

  useEffect(() => {
    getServerData()
  }, [])

  return (
    <div className="App">
      <div className="wrapper-search">
        <h3><Link to="/integration">CRM Integration</Link></h3>
        <SearchInput setData={setData} setIsLoading={setIsLoading}/>
      </div>
      <div>
        {isLoading && <div className="loader-container"><ReactLoading className='loader' type={'bubbles'} color={'#019ce4'} height={'100px'} width={'100px'} /></div>}
        {data
        ?
        <table className='table'>
          <colgroup>
            <col style={{width: '50px'}}/>
            <col style={{width: '400px'}} />
            <col style={{width: '150px', minWidth: '150px'}}/>
            <col style={{ minWidth: '150px'}}/>
            <col style={{ minWidth: '150px'}}/>
            <col style={{ minWidth: '100px'}}/>
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th>Название</th>
              <th>Статус</th>
              <th>Ответственный</th>
              <th>Дата создания</th>
              <th>Бюджет</th>
            </tr>
          </thead>
          <tbody>
          {data?._embedded?.leads.map(lead => {
            return (
            <Lead lead={lead} key={lead.id} />
              )
          })}
          </tbody>
        </table>
        :
        <NoResults />
        }
      </div>
    </div>
  );
}

export default MainBoard;
