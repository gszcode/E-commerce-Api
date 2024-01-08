import jwt from 'jsonwebtoken'

const generateAccessToken = (user: string, expiresIn: string) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn
  })

  return token
}

export default generateAccessToken
