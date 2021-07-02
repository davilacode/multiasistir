import axios from "axios"

export default async function recaptcha(req, res) {

    var data = req.body
    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GATSBY_RECAPTCHA_SECRET_KEY}&response=${data.result}`, {}, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                } 
            }
        )
        return res.send(response.data)
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
};