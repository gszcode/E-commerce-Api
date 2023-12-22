import jwt from 'jsonwebtoken'

const generateAccessToken = (user: string) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn: 60 * 15
  })

  return token
}

export default generateAccessToken
