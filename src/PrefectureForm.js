import React from 'react';

import Minimumichiran from './minimumichiran.js';

export default function PrefectureForm(props) {

  function handleChange(e){
    props.changer(e.target.value);
  };


  const items = [];
  for (let key in Minimumichiran) {
    items.push(
        <option key={key} value={key}>{key}</option>
    )
  }

  return(
    <select onChange={handleChange}>
      {items}
    </select>
  );
}
