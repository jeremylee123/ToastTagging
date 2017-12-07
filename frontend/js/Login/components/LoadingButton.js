import React from 'react';
import LoadingIndicator from './LoadingIndicator';

function LoadingButton(props) {
  return(
    <a href="#" className={props.className + " btn btn--loading"} disabled="true">
      <LoadingIndicator />
    </a>
  )
}

export default LoadingButton;
