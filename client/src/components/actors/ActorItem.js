import React from 'react';

const ActorItem = ({ actor, update, remove }) => {
  return (
    <tr>
      <td>{ actor.name }</td>
      <td>{ actor.description }</td>
      <td><button className='button is-warning' onClick={() => update(actor) }>Edit</button></td>
      <td>
        <button className='button is-danger' onClick={() => remove(actor) }>Remove</button>
      </td>
    </tr>
  );
};

export default ActorItem;
