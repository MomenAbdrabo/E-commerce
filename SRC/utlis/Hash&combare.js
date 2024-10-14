import bcrypt from 'bcryptjs'

export const hash = ({ planText = '', saltRound = process.env.SALT_ROUND }) => {

   const match = bcrypt.hashSync(planText, parseInt(saltRound))
   return match
}
export const compare = ({ planText = '', hashtext = '' }) => {

   const result = bcrypt.compareSync(planText, hashtext)
   return result
}