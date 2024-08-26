import React from 'react'

function Success(message) {
 
  return (
    <div class="alert alert-secondary" role="alert">
  
 Welcome {message.message.firstName} {message.message.lastName}
</div>
  )
}

export default Success