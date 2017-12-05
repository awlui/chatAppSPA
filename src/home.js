import React from 'react';
const Home = ({location, extraProps}) => {
  return (
  <div>
    {extraProps} HERE
    <h2 className="home">Home</h2>
    
  </div>
)
}

export {
  Home as Component
}