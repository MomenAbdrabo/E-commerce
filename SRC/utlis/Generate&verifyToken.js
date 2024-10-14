import jwt from 'jsonwebtoken'


export const generateToken = ({ payload = {}, signature = process.env.signatureToken, expiresIn = 60 * 60 } = {}) => {
    const token = jwt.sign(payload, signature, { expiresIn: parseInt(expiresIn) });
    return token
}

export const verifyToken = ({ token, signature = process.env.TOKEN_SIGNATURE } = {}) => {
    try {
        const decoded = jwt.verify(token, signature);
        return decoded
    } catch (err) {

        return { error: err };
    }
}