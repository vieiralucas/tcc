import React from 'react';

import UsecaseItem from './UsecaseItem';

const UsecasesList = ({ usecases }) => {
  return (
    <section className='section'>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          { usecases.map(u => <UsecaseItem key={u._id} usecase={u} />) }
        </tbody>
      </table>
    </section>
  );
};

export default UsecasesList;
