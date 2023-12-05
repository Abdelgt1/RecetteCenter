import React from 'react'

export default function Register() {
  return (
    <div>
    <form>
      <label>
        Prénom:
        <input
          type="text"
          name="firstName"
          placeholder='Achraf'
        />
      </label>
      <br />

      <label>
        Nom de famille:
        <input
          type="text"
          name="lastName"
          placeholder='BOUA'
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          placeholder="exemple@exemple.com"
        />
      </label>
      <br />

      <label>
        Mot de passe:
        <input
          type="password"
          name="password"
          placeholder="xxxxxxxx"
        />
      </label>
      <br />

      <button type="submit">S'inscrire</button>
    </form>
    <div className="sign">
            <a href={`/`}><p>Acceuil </p></a>
          </div>
    </div>
  )
}
