import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {
  //consultar 3 viajes del modelo viaje y 3 testimoniales
  //como la consulta hacia las entidades no dependen del resultado de la otra 
  //se crea un array de promesas para que ambas arranquen al mismo tiempo
  const promiseDB = []
  promiseDB.push(Viaje.findAll({limit:3}))
  promiseDB.push(Testimonial.findAll({limit:3}))
  try {

    const resultado = await Promise.all(promiseDB)
    
    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes:resultado[0],
      testimoniales:resultado[1]
    });
  } catch (error) {
    console.log(error)
  }
  
};

const paginaNosotros = (req, res) => {
  res.render("nosotros", {
    pagina: "Nosotros",
  });
};

const paginaViajes = async (req, res) => {
  //consulatar DB
  const viajes = await Viaje.findAll();

  res.render("viajes", {
    pagina: "Próximos viajes",
    viajes,
  });
};

//mostrar un vieaje por su slug
const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params;
  try {
    const viaje = await Viaje.findOne({ where: { slug } });
    res.render("viaje", {
      pagina: "Infromación viaje",
      viaje,
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaTesimoniales = async (req, res) => {
  try {
    //consultar testimoniales en DB
    const testimoniales = await Testimonial.findAll();

    res.render("testimoniales", {
      pagina: "Testimoniales",
      testimoniales,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTesimoniales,
  paginaDetalleViaje,
};
