import React, { useState } from 'react'

export const Lead = ({lead}) => {

  const [isVisible, setisVisible] = useState(false)
  const [valueCollapser, setValueCollapser] = useState('+')

  const contactsHandler = (e) => {
    if(!isVisible) {
      setValueCollapser('-')
      setisVisible(true)
    } else {
      setValueCollapser('+')
      setisVisible(false)
    }
  }

  return (
    <>
      <tr>
        <td className="tbl-cell" >
          <span className="plus-container" onClick={contactsHandler}>{valueCollapser}</span>
        </td>
        <td className="tbl-cell text-left">{lead.name}</td>
        <td className="tbl-cell">
          <div className='status' style={{backgroundColor: lead.status.color }}>
          {lead.status.name}
          </div>
          </td>
        <td className="tbl-cell">
          <div className='responsible-person-container'>
            <img src="/noava.jpg" alt="avatar" className='avatar' />
            <span className='responsible-name'>{lead.responsible_user.name}</span>
          </div>
        </td>
        <td className="tbl-cell">{lead.created_time}</td>
        <td className="tbl-cell">{lead.price} ₽</td>
      </tr>
      <tr className={isVisible ? "contacts" : "contacts hidden" } >
        <td></td>
        <td colSpan='5'>
        {lead.contacts.map(contact => {
          return (
            <div className='contact-container' key={contact.id} >
              <img src="/noava.jpg" alt="avatar" className='avatar' />
              <span className='contact-name'>{contact.name} </span>
              <span>{contact.custom_fields_values.map(value => {
                return (
                  <span key={value.field_id}>
                    {value.values.map(thing => {
                    const number = parseInt(thing.value)
                    if(number) {
                      return (
                          <a href={'tel:+' + thing.value} key={thing.enum_id} className='tel-email'>📞</a>
                      )
                    }
                    else {
                      return (
                        <a href={'mailto:' + thing.value} key={thing.enum_id} className='tel-email'>✉</a>
                      )
                    }
                    })}
                  </span>
                )
              })}</span>
            </div>
          )
        })}
        </td>
      </tr>
    </>
  )
}
