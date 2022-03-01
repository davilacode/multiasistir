import React, { useState } from "react"
import gql from "graphql-tag"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Mutation } from "react-apollo"
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const WorkWithUsForm = () => {

    const { executeRecaptcha } = useGoogleReCaptcha()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [validate, setValidate] = useState()

    const SEND_MAIL_MUTATION = gql`
        mutation SEND_EMAIL(
            $clientMutationId: String!,
            $to: String!,
            $from: String!,
            $subject: String!,
            $body: String!
        ) {
            sendEmail(
            input: {
                to: $to,
                from: $from,
                subject: $subject,
                body: $body,
                clientMutationId: $clientMutationId
            }
            ) {
            origin
            sent
            message
            }
        }
    `

    return (
        <Mutation mutation={SEND_MAIL_MUTATION}>
            {(sendEmail, { loading, error, data }) => {
                
                const onSubmit = async (data) => {

                    if (!executeRecaptcha) {
                        return
                    }

                    const result = await executeRecaptcha('contact')
                    
                    axios.post(`/api/recaptcha`, {
                        result: result
                    }, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "content-type": "application/json",
                        } 
                    }
                    ).then((response) => {
                        if(response.data.success){
                            sendEmail({ 
                                variables: {
                                    clientMutationId: "workWithUsForm",
                                    to: "siau@multiasistir.com",
                                    from: "no-reply@multiasistir.com",
                                    subject: `HV Multiasistir - ${data.name}`,
                                    body: `
                                        <h1>HV Multiasistir</h1>
                                        <p><strong>Nombre:</strong> ${data.name}</p>
                                        <p><strong>Teléfono:</strong> ${data.phone}</p>
                                        <p><strong>Email:</strong> ${data.email}</p>
                                        <p><strong>Profesión:</strong> ${data.profession}</p>
                                        <p><strong>Descripción del perfil:</strong> ${data.messages}</p>
                                    `
                                }
                            })
                            setValidate(false);
                            reset({ name: '', phone: '', email: '', profession: '', messages: '' });
                        }else{
                            setValidate(true);
                        }
                    })
                    
                }

                return (
                    <>
                    <div className="mw-600">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="form-floating mb-3 col-md-6">
                                <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" placeholder="Nombre" {...register("name", { required: true })}/>
                                <label className="fw-bold" htmlFor="name">Nombre completo</label>
                                { errors.name && errors.name.type === "required" && <div className="form-text">Campo requerido</div>}
                            </div>
                            <div className="form-floating mb-3 col-md-6">
                                <input type="tel" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} id="phone" placeholder="Teléfono" {...register("phone", { required: true, pattern: /^\d{7,14}$/, minLength: 7, maxLength: 14})}/>
                                <label className="fw-bold" htmlFor="phone">Teléfono</label>
                                { errors.phone && errors.phone.type === "required" && <div className="form-text">Campo requerido</div>}
                                { errors.phone && errors.phone.type === "pattern" && <div className="form-text">Teléfono no válido</div>}
                                { errors.phone && errors.phone.type === "maxLength" && <div className="form-text">Máximo 10 caracteres</div>}
                            </div>
                            <div className="form-floating mb-3 col-md-6">
                                <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" placeholder="Correo Electrónico" {...register("email", { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })}/>
                                <label className="fw-bold" htmlFor="email">Correo Electrónico</label>
                                { errors.email && errors.email.type === "required" && <div className="form-text">Campo requerido</div>}
                                { errors.email && errors.email.type === "pattern" && <div className="form-text">Correo no válido</div>}
                            </div>
                            <div className="form-floating mb-3 col-md-6">
                                <input type="text" className={`form-control ${errors.profession ? 'is-invalid' : ''}`} id="profession" placeholder="Profesión" {...register("profession", { required: true })}/>
                                <label className="fw-bold" htmlFor="profession">Profesión</label>
                                { errors.profession && errors.profession.type === "required" && <div className="form-text">Campo requerido</div>}
                            </div>
                            <div className="mb-3 col-md-8 mx-auto">
                                <label className="form-label" htmlFor="messages"><strong>Describe tu perfil en pocas palabras: </strong>(Máximo 2000 caracteres)</label>
                                <textarea className={`form-control ${errors.messages ? 'is-invalid' : ''}`} id="messages" placeholder="Mensaje" {...register("messages", { required: true, maxLength: 2000 })}></textarea>
                                { errors.messages && errors.messages.type === "required" && <div className="form-text">Campo requerido</div>}
                                { errors.messages && errors.messages.type === "maxLength" && <div className="form-text">Máximo 2000 caracteres</div>}
                            </div>
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary btn-link mx-auto">Enviar</button>
                            </div>
                        </div>
                    </form>
                    <div className={`form-response ${loading || error || data ? 'show' : ''} ${error || data ? 'message' : ''}`}>
                        {loading && <div className="spinner-grow" role="status"><span className="visually-hidden">Loading...</span></div>}
                        {error || validate ? <div className="error"><p>Error al enviar, por favor inténtelo nuevamente.</p>{console.log(error)}</div> : ''}
                        {data && <div className="ok">¡Gracias por escribirnos! <br /> Pronto nos pondremos en contacto.{console.log(data)}</div>}
                    </div>
                    <div className="d-none">{data || error || validate ? setTimeout(function(){ document.querySelector('.form-response').classList.remove("show") }, 5000) : ''}</div>
                    </div>
                    </>
                )
            }}
        </Mutation>
    )
}


export default WorkWithUsForm