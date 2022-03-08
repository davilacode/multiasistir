import React, { useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const WorkWithUsForm = () => {

    const { executeRecaptcha } = useGoogleReCaptcha()

    const { register, handleSubmit, reset, formState: { errors }, clearErrors, setValue, setError } = useForm();

    const [validate, setValidate] = useState()

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
                
                document.getElementById('workWithUs').submit()

                // const formData = new FormData();

                // Object.keys(data).map(key => {
                //   if (key === 'file') {
                //     for (const file of data[key]) {
                //       formData.append(key, file, file.name)
                //     }
                //   } else {
                //     formData.append(key, data[key])
                //   }
                // })

                // axios.post(`https://formspree.io/f/meqnknkk`, formData, {
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'multipart/form-data',
                //    } 
                // }).then((response) => {
                //     if(response.data.success){
                //         setValidate(false);
                //         reset({ name: '', phone: '', email: '', profession: '', messages: '', file: '' });
                //     }
                // })
            }else{
                setValidate(true);
            }
        })
        
    }


    return (
        <>
            <div className="mw-600">
            <form id="workWithUs" onSubmit={handleSubmit(onSubmit)} method="post" encType="multipart/form-data" action="https://getform.io/f/721d02cd-c1ea-4f8c-8e06-d37adf891d2f">
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
                    <div className="mb-3 col-md-8 mx-auto">
                        <label className="form-label" htmlFor="file"><strong>Adjunta tu hoja de vida: </strong>(pdf)</label>
                        <input type="file" className={`form-control ${errors.file ? 'is-invalid' : ''}`}  id="file" {...register("file", { required: true })}
                            onChange={(e) => {
                                console.log(e.target.files[0])
                                if(e.target.files[0] && e.target.files[0].type !== 'application/pdf'){
                                    setError('file', {type: 'type'})
                                    setValue('file', null)
                                }
                                if(e.target.files[0] && e.target.files[0].size > 2000000){
                                    setError('file', {type: 'size'})
                                    setValue('file', null)
                                }
                            }}
                            onClick={() => clearErrors('file')}
                        />
                        { errors.file && errors.file.type === "required" && <div className="form-text">Campo requerido</div>}
                        { errors.file && errors.file.type === "type" && <div className="form-text">Sólo se acepta PDF</div>}
                        { errors.file && errors.file.type === "size" && <div className="form-text">Peso máximo de archivo 2Mb</div>}
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary btn-link mx-auto">Enviar</button>
                    </div>
                </div>
            </form>
            {/* <div className={`form-response ${loading || error || data ? 'show' : ''} ${error || data ? 'message' : ''}`}>
                {loading && <div className="spinner-grow" role="status"><span className="visually-hidden">Loading...</span></div>}
                {error || validate ? <div className="error"><p>Error al enviar, por favor inténtelo nuevamente.</p>{console.log(error)}</div> : ''}
                {data && <div className="ok">¡Gracias por escribirnos! <br /> Pronto nos pondremos en contacto.{console.log(data)}</div>}
            </div>
            <div className="d-none">{data || error || validate ? setTimeout(function(){ document.querySelector('.form-response').classList.remove("show") }, 5000) : ''}</div> */}
            </div>
        </>
    )
}


export default WorkWithUsForm