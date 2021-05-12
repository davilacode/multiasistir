const axios = require('axios')

exports.handler = async function (event) {

    var res = JSON.parse(event.body)
    var data

    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GATSBY_RECAPTCHA_SECRET_KEY}&response=${res.result}`, {}, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            } 
        }
    )
    return {
        statusCode: 200,
        body: JSON.stringify(response.data),
    };
};