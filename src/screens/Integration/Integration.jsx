import React, { useState } from 'react'
import styles from './integration.module.css'
import { useNavigate } from 'react-router-dom';

export const Integration = () => {

  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError('')
    const URL_integration = '/integration'
    e.preventDefault()
    const domain = e.target[0].value;
    const clientId = e.target[1].value;
    const clientSecret = e.target[2].value;
    const clientCode = e.target[3].value;
    const redirectUri = e.target[4].value;
    const response = await fetch(URL_integration, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        domain,
        clientId,
        clientSecret,
        clientCode,
        redirectUri,
      })
    })
    if(response.ok) {
      return navigate("/");
    }
    const json = await response.json()
    setError(json.message)
    console.log(json);
  }

  return (
    <main className={styles.formContainer}>
      <div className={styles.wrapper}>
        <h1 className='h1'>Integration</h1>
        {error ?
        <div className={styles.errorDiv}>
          {error}
        </div>
        :
        ''
        }
        <form onSubmit={handleSubmit} className='form'>
          <div className={styles.formDiv}>
            <label htmlFor="domain">Ваш домен: https://<b>your_domain</b>.amocrm.ru</label>
            <input type="text" name="domain" id="domain" required/>
            <label htmlFor="clientId">ID инеграции:</label>
            <input type="text" name="clientId" id="clientId" required/>
            <label htmlFor="clientSecret">Секретный ключ:</label>
            <input type="text" name="clientSecret" id="clientSecret" required/>
            <label htmlFor="clientCode">Код вторизации:</label>
            <input type="text" name="clientCode" id="clientCode" required/>
            <label htmlFor="redirectUri">Ссылка перенаправления: </label>
            <input type="text" name="redirectUri" id="redirectUri" required/>
            <button type="submit">Отправить</button>
          </div>
        </form>
      </div>
    </main>
  )
}
