import React from 'react';

const UsecaseItem = ({ usecase, update, remove }) => {
  return (
    <tr>
      <td>{ usecase.name }</td>
      <td>{ usecase.description }</td>
      <td><button className='button is-warning' onClick={() => update(usecase) }>Edit</button></td>
      <td>
        <button className='button is-danger' onClick={() => remove(usecase) }>Remove</button>
      </td>
    </tr>
  );
};

export default UsecaseItem;
