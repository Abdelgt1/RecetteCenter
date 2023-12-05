import React from 'react'

export default function Auth() {
  return (
    <div class="form-container">
   <form action="" method="post">
      <h3>login now</h3>
      <input type="email" name="email" required placeholder="enter your email"></input>
      <input type="password" name="password" required placeholder="enter your password"></input>
      <input type="submit" name="submit" value="login now" class="form-btn"></input>
   </form>
   <div className="sign">
            <a href="##"><p>Mot de passe oublier ?</p></a>
            <a href={`/registre`}><p>Crier un nouveau compte ?</p></a>
   </div>

</div>
  )
}
