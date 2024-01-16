import { Testimonial } from "../models/Testimoniales.js"

const guardarTestimonial = async (req,res)=>{
    //validar campos del formulario
    const {nombre,correo,mensaje} = req.body
    const errores = []
    if(nombre.trim() === ''){
        errores.push({error:'El nombre está vacío'})
    }
    if(correo.trim() === ''){
        errores.push({error:'El correo está vacío'})
    }
    if(mensaje.trim() === ''){
        errores.push({error:'El mensaje está vacío'})
    }
    
    //mostar la vista con errores
    if(errores.length > 0){
        //consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales',{
            pagina : 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else {
        //almacenar el testimonial en la base de datos
        try {
           await Testimonial.create({
            nombre,
            correo,
            mensaje
           })
           res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonial,
}