import React from 'react';

import UsecaseItem from './UsecaseItem';

const UsecasesList = ({ usecases, update, remove }) => {
  const toUsecaseItem = u =>
    <UsecaseItem key={u._id} usecase={u} update={update} remove={remove} />

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody>
        { usecases.map(toUsecaseItem) }
      </tbody>
    </table>
  );
};

export default UsecasesList;
