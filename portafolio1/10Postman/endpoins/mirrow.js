 const mirrow = (req, res) => { 
    const metodos = [ 
{
        method: 'POST',
        hasBody: true,
        purpouse : "El metodo post se utiliza para enviar una entidad a un recurso especifico, generalmente para crear o actualizar un recurso."
 },
 {      method: 'PUT',
        hasBody: true,
        purpouse : "El metodo put reemplaa todas las rpesentaciones actuales del recurso de destino con la carga util de la solicitud."
 },
 {
        metohd: 'PATCH',
        hasBody: true,
        purpouse : "El metodo patch se utiliza para aplicar modificaciones parciales a un recurso."     
 },
 {
        method: 'HEAD',
        hasBody: false,
        purpouse : "El metodo head solicita una respuesta identica a la de una solicitud get, pero sin el cuerpo de la respuesta."
 },
 {
        method: 'GET ',
        hasBody: false,
        purpouse : "El metodo get se utiliza para solicitar datos de un recurso especifico, las peticiones que usa el metodo get solo deben recuperar datos y no tener otros efectos."
 },
 {
        method: 'DELETE',
        hasBody: false,
        purpouse : "El metodo delete elimina el recurso especificado."
 }
];

const requestMethod = metodos.find(m => m.method === req.method) || {
    method: req.method,
    hasBody: false,
    purpouse: "No se tiene informacion sobre este metodo"
}; 
requestMethod.purpouse = requestMethod.hasBody ? "Tiene cuerpo" : "No tiene cuerpo";
if ( requestMethod.hasBody ) {
    req.body; // JS dene de parsear mediante un json el objeto necesario
    res.json({...requestMethod.body, ruta_comsumida:
        req.route.path, ...requestMethod});
    } else {
    res.json({ruta_comsumida:
        req.originalUrl, ...requestMethod});
} 

 };

 module.exports =  mirrow ;
 