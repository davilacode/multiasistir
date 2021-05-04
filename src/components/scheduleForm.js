import React from "react"
import { useForm } from "react-hook-form"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"

const ScheduleForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

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
                    sendEmail({ 
                        variables: {
                            clientMutationId: "contactForm",
                            to: "andersonfidel.14@gmail.com",
                            from: data.email,
                            subject: `Agendar Exámenes de Laboratorio  Multiasistir`,
                            body: `
                                <h1>Agendar Exámenes de Laboratorio Multiasistir</h1>
                                <p><strong>Paciente:</strong> ${data.name}</p>
                                <p><strong>Nro Documento:</strong> ${data.identity}</p>
                                <p><strong>Email:</strong> ${data.email}</p>
                                <p><strong>Teléfono:</strong> ${data.phone}</p>
                                <p><strong>Posible fecha y hora de atención:</strong> ${data.date}</p>
                            `
                        }
                    })
                }

                return (
                    <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-floating mb-3">
                            <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" placeholder="Pedro Pérez" {...register("name", { required: true })}/>
                            <label htmlFor="name">Nombre completo</label>
                            { errors.name && errors.name.type === "required" && <div className="form-text">Campo requerido</div>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className={`form-control ${errors.identity ? 'is-invalid' : ''}`} id="identity" placeholder="1234567" {...register("identity", { required: true, pattern: /^[a-zA-Z0-9]*$/, minLength: 3, maxLength: 15})}/>
                            <label htmlFor="identity">N° Identidad</label>
                            { errors.identity && errors.identity.type === "required" && <div className="form-text">Campo requerido</div>}
                            { errors.identity && errors.identity.type === "pattern" && <div className="form-text">Documento no válido</div>}
                            { errors.identity && errors.identity.type === "minLength" && <div className="form-text">Mínimo 3 caracteres</div>}
                            { errors.identity && errors.identity.type === "maxLength" && <div className="form-text">Máximo 15 caracteres</div>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="tel" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} id="phone" placeholder="3211234567" {...register("phone", { required: true, pattern: /^\d{7,14}$/, minLength: 7, maxLength: 14})}/>
                            <label htmlFor="phone">Teléfono</label>
                            { errors.phone && errors.phone.type === "required" && <div className="form-text">Campo requerido</div>}
                            { errors.phone && errors.phone.type === "pattern" && <div className="form-text">Teléfono no válido</div>}
                            { errors.phone && errors.phone.type === "maxLength" && <div className="form-text">Máximo 14 caracteres</div>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" placeholder="correo@ejemplo.com" {...register("email", { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })}/>
                            <label htmlFor="email">Correo Electrónico</label>
                            { errors.email && errors.email.type === "required" && <div className="form-text">Campo requerido</div>}
                            { errors.email && errors.email.type === "pattern" && <div className="form-text">Correo no válido</div>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className={`form-control ${errors.date ? 'is-invalid' : ''}`} id="date" placeholder="03-12-2020 10:00" {...register("date", { required: true})}/>
                            <label htmlFor="date">Posible fecha de atención</label>
                            { errors.date && errors.date.type === "required" && <div className="form-text">Campo requerido</div>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-link mx-auto">Enviar</button>
                    </form>
                    {loading && <p>Enviando...</p>}
                    {error && <p>Error...{console.log(error)}</p>}
                    {data && <p>{console.log(data)}</p>}
                    </>
                ) 
            }}
        </Mutation>
    )
}


export default ScheduleForm