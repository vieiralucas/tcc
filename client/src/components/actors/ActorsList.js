import React from 'react';

import ActorItem from './ActorItem';

const ActorsList = ({ actors, update, remove }) => {
  const toActorItem = u =>
    <ActorItem key={u._id} actor={u} update={update} remove={remove} />

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
        { actors.map(toActorItem) }
      </tbody>
    </table>
  );
};

export default ActorsList;
