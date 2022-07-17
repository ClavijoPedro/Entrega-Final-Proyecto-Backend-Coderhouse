# Entrega Final Proyecto Backend - eCommerce

## Consigna

● La aplicación de servidor debe tener sus capas MVC bien definidas y en archivos separados. Debe existir la capa de ruteo, el controlador, la capa de lógica de negocio con los casos de uso y las validaciones y la capa de persistencia con los DAOs/DTOs o Repositories necesarios para soportar el o los sistemas de persistencia elegidos. En caso de ser más de uno, utilizar una factory para que podamos elegir el sistema de almacenamiento al inicio del servidor.

● El servidor debe disponer de configuraciones mediante variables de entorno, que permitan crear un ambiente para desarrollo y otro para producción, elegibles desde la variable de environment NODE_ENV al desplegar la aplicación. Como variables de configuración deberían estar el puerto de escucha del servidor, la persistencia elegida, el string de conexión a la base de datos (si hubiera varios sistemas de persistencia en base de datos considerar todos los casos y sus diferencias), API keys y todo lo que sea necesario que esté en un archivo protegido fuera del código del servidor. Pensar en utilizar bases de datos y servidores locales para la configuración de desarrollo.

● El hecho de incorporar un caso más de uso en la lógica del servidor debe ser un proceso de
agregar código y no de modificar el existente.

● Al agregar un sistema más de persistencia, debería agregarse sólo el módulo nuevo y reformar la factory, mientras que resto del proyecto: router, controlador, lógica de negocio, validaciones y otros sistemas de persistencia no deberían sufrir modificaciones para soportar la nueva función.

● El código debe quedar bien tabulado, legible, ordenado y comentado ni por exceso ni por defecto.

● Las funciones o clases que se por sí solas expliquen su misión, no necesitan ser explicadas (salvo que amerite por complejidad).

● Subir el desarrollo completo a Heroku o algún PASS de preferencia, seleccionando la configuración a producción de modo de utilizar los parámetros adecuados de funcionamiento y la persistencia en la nube a través de bases de datos como servicio (DBaaS).
##

# Desarrollo

## Persistencia
Se utilizó MongDB Atlas como servicio de persistencia en la nube y como segunda opción persistencia en archvo mediante Filesystem. 

##
## Autenticación
Se implementó Passport-Local y Json Web Token en las rutas Login y Registro.

##
## Tests 
Se realizó test de carga mediante archivo con los siguientes parámetros: 

     artillery quick --count 50 -n 20 "http://localhost:5000/api/productos" > test_result-products-fork.txt


##
## Motores de plantillas
Se utlizó para las vistas requeridas los siguientes motores de plantillas:

- Pug
- Ejs
- Handlebars

##
## Chat
Se utlizó Soket.Io para transferencia de datos en tiempo real. 

##
## Deploy

**Click** [aquí](https://coder-tech-ecommerce-final.herokuapp.com/).

##
El proyecto cuenta solo con vistas de acceso para prueba de autenticacion y vista de info del servidor:
- **User:**

          /chat  

- **Info server (admin)**

          /info

##
## Funcionalidad
Se utilizó POSTMAN para el testeo de las rutas de usuario y administrador.
(Export de rutas POSTMAN en directorio raíz - "Coder -Entrega Final Proyecto.postman_collection.json" )

#### Rutas Autenticación:

- **GET** Log-in usuario
     
          /login

- **GET** Registro usuario
     
          /register

- **GET** Log-out 

          /logout

##
#### Rutas Productos: 

- **GET** Listar Productos

          /api/productos

- **GET** Listar un producto por su id
     
          /api/productos/:id

- **GET** Listar productos por su categoria

          api/productos/categoria/:category


##
#### Rutas Carrito: 

- **POST** Crear un carrito
     
          /api/carrito 

- **DELETE** Elimina carrito por su id
     
          /api/carrito/:cart_id 

- **GET** Listar productos por id de carrito
     
          /api/carrito/:cart_id/productos 

- **DELETE** Eliminar producto en carrito por su id    
     
          /api/carrito/:cart_id/productos/:id 

- **POST** Enviar orden de compra por id de carrito

          /api/carrito/:cart_id/orden 

##
#### Rutas ordenes de compra:

- **GET** Listar ordenes de compra usuario
     
          /api/orden 
     
##
#### Rutas Chat:

- **GET** Chat usario & admin

          /api/chat

- **GET** Listar mensajes por email de usuario

          /api/chat/:email

##
#### Rutas ADMIN:

- **POST** Agregar un producto a DB

          /api/productos/

- **PUT** Actuaizar un prodcuto por su id

          /api/productos/:id

- **DELETE** Eliminar un producto por su id
     
          /api/productos/:id

- **GET** Mostrar Info Servidor

          /info

##
## Ejecución

**Instalación**

     - git clone https://github.com/ClavijoPedro/Entrega-Final-Proyecto-Backend-Coderhouse.git
     - npm install


**Scripts ejecución**

     - npm run dev   --->  modo develpoment
     - npm run prod  --->  modo producción

##
## Muestras

**Vista previa sesión usuario**

![ecommerce-user-session](https://user-images.githubusercontent.com/87502452/179416336-b4295323-9591-4fe0-91b6-d8a8d883660a.gif)

##
**Vista previa  usuario (productos)**

![ecommerce-user-session-products](https://user-images.githubusercontent.com/87502452/179416363-f86452ab-4eee-4a95-9b92-8bbd2f52b43a.gif)

##
**Vista previa usuario (carrito)**

![ecommerce-user-session-cart](https://user-images.githubusercontent.com/87502452/179416368-c8274e1f-4cfd-4569-98b0-baafcd5f1de8.gif)

##
**Vista previa sesión administrador**

![ecommerce-user-session-admin](https://user-images.githubusercontent.com/87502452/179416376-bb6251ea-9a57-48de-b16a-41cfee731471.gif)

##
**Vista previa Errores autenticación y rutas**

![ecommerce-user-session-auth](https://user-images.githubusercontent.com/87502452/179420353-e0e4284d-316b-4ab8-9dd2-ab08e76b6d4d.gif)

##

![ecommerce-user-session-auth2](https://user-images.githubusercontent.com/87502452/179420374-3ef5d530-be02-415b-857a-119b1363b08d.gif)

##

![ecommerce-user-session-404](https://user-images.githubusercontent.com/87502452/179420425-595c81fe-f200-44b6-ae9c-c9528fc28790.gif)

##
**Vista previa chat usuario y administrador**

![ecommerce-user-session-chat](https://user-images.githubusercontent.com/87502452/179420400-4c2393f9-2f8e-4835-87a2-e65642b279cf.gif)


