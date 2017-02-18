import React from 'react';

const UsecaseItem = ({ usecase }) => {
  return (
    <tr>
      <td>{ usecase.name }</td>
      <td>{ usecase.description }</td>
    </tr>
  );
};

export default UsecaseItem;
