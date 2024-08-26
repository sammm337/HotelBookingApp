import React from 'react'

function Error(message) {
  
  return (
    <div class="alert alert-danger" role="alert">
{message.error}
</div>
  )
}

export default Error