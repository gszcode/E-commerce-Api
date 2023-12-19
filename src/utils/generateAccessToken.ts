import jwt from 'jsonwebtoken'

const generateAccessToken = (user: string) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn: '1d'
  })

  return token
}

export default generateAccessToken
