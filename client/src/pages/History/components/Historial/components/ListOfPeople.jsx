import React from 'react'
import ItemPeople from './ItemPeople'

const ListOfPeople = ({ personas }) => {
  return (
    <div className='col-span-5 p-0 bg-white'>

      {personas.map(persona => (
        <ItemPeople key={persona.id} persona={persona} />
      ))}

    </div>
  )
}

export default ListOfPeople