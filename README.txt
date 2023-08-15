POST
/auth/en principio po : para registrar un nuevo usuario ✓

GET
/auth/me: retorna los datos del usuario logeado ✓

POST
/auth/login: logea un usuario ✓


-----------------------------------------------------------------------
POST
/combos: para crear un combo ✓

GET
/combos/id: para obtener un combo mediante el id ✓

DELETE
/combos/id: para eliminar un combo mediante el id ✓

PUT 
/combos/id: para actualizar un combo mediante el id ✓

GET
/combos: para obtener todos los combos ✓


-----------------------------------------------------------------------
POST
/comments: para crear un comentario

GET
/comments/id: para obtener un comentario mediante el id

DELETE
/comments/id: para eliminar un comentario mediante el id

PUT
/comments/id: para actualizar un comentario mediante el id

GET
/comments: para obtener todos los comentarios

-----------------------------------------------------------------------
POST
/news: para crear una noticia ✓

GET
/news/id: para obtener una noticia mediante el id ✓

DELETE
/news/id: para eliminar una noticia mediante el id ✓

PUT
/news/id: para actualizar una noticia mediante el id ✓

GET
/news: para obtener todos las noticias ✓

-----------------------------------------------------------------------

POST
/roles: para crear un rol

GET
/news: para obtener todos los roles

DELETE
/roles/id: para eliminar un rol mediante el id

registro de usuario: String usuario ,email,password


login :String email, password

-----------------------------------------------------------------------

combos : String name, description, price, image

combo = {
    name: editName.value,
    description: editDesc.value.split('\n'),
    price: parseFloat(editPrice.value),
    image: URL.createObjectURL(changeImg.files[0])
}

{
    "name": "Versión imantada",
    "description": ["+ 30% de descuento", "+ Packaging con manual", "+ Cartas de los personajes", "+ Acceso al Discord de la comunidad"],
    "price": "2.000",
    "image": "combo1.jpg"
},

-----------------------------------------------------------------------

comentarios : String cuerpo

-----------------------------------------------------------------------
noticias String nombre, contenido



https://chakruk-production.up.railway.app/combos



///////////////////////////////////////////////////////////

El precio de combos se deben cargar como strings, solo el numero, sin centavos y con punto de miles:

'7.000'

si se coloca un texto, ej: 'Valor sujeto cantidad', sedebe colocar el simbolo '&' al comienzo, sin espacios:

'&Valor sujeto cantidad'

///////////////////////////////////////////////////////////

En la seccion novedades, si se desea resaltar alguna parte del texto debera ser escrita entre las etiquetas <span></span>:

<span>Hola</span>

///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////


