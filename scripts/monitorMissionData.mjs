export const missionData = {
    missions: [
        {
            id: "1",
            title: "La familia de Adán y Eva",
            subtitle: "Resolución de conflictos",
            childrenPlatform: "Caín y Abel no pudieron resolver sus problemas y enfrentaron las consecuencias. Para completar este desafío, dirígete a una de las mesas de 'Amigos del Bosque', un juego sobre cómo resolver conflictos.",
            icon: "images/icons/1.png",
            secretLetter: "U", // J-E-S-U-C-R-I-S-T-O
            prepGuide: {
                materials: ["Tres copias del juego de mesa 'Amigos del Bosque'", "Fichas", "Dados", "Cartas de juego normales", "Cartas de pistas"],
                setup: "Prepara tres mesas con los tableros, dados y fichas. Ten las cartas normales y las de pistas barajadas."
            },
            monitorScript: {
                intro: "¡Bienvenidos al comienzo! Después de salir del Edén, la familia de Adán y Eva creció, pero pronto aprendieron que vivir juntos requiere amor y paciencia. Dos de sus hijos, Caín y Abel, tuvieron un gran conflicto porque uno dejó que la ira ganara. Ambos llevaron ofrendas a Dios. Dios aceptó la de Abel con agrado, pero no la de Caín (porque el corazón de Caín no era recto). Caín se puso tan celoso y enojado que mató a su hermano. Hoy aprenderán sobre la resolución de conflictos. Diríjanse a una de las mesas de 'Amigos del Bosque', elijan una ficha y muévanse por el tablero. Resuelvan los conflictos usando uno de los cuatro modos disponibles: pedir ayuda a un adulto, soluciones creativas, hablar y escuchar, negociar o tomarse un tiempo fuera, dependiendo de las cartas en su mazo.",
                scripture: "Génesis 4:1-12",
                tips: "Pregúntales: '¿Cómo manejas el enojo en casa?'. Enfatiza que resolver problemas nos hace más fuertes y nos ayuda a crecer como personas."
            }
        },

        {
            id: "2",
            title: "El Arca de Noé",
            subtitle: "Juego de Memoria",
            childrenPlatform: "Noé puso una pareja de cada animal en el arca. Juega al juego de memoria emparejando los animales. Cuando encuentres una pareja, llévala al arca que está en la mesa del monitor.",
            icon: "images/icons/2.png",
            secretLetter: "S",
            prepGuide: {
                materials: ["Cartas de memoria de animales", "Cartas de pistas (tantas como equipos haya)"],
                setup: "Baraja las cartas de animales y las de pistas juntas, luego colócalas boca abajo en el suelo formando una cuadrícula."
            },
            monitorScript: {
                intro: "En los tiempos de Noé, el mundo se había llenado de violencia y tristeza. Noé era el único que aún caminaba con Dios. Dios le dijo que construyera un Arca porque venía un diluvio. ¡Noé trabajó en ella durante 120 años! Salvó a su familia y a dos de cada animal. ¡Ahora es su turno de ayudar! En el suelo encontrarán parejas de animales boca abajo. Jueguen al memorice para encontrar las parejas. ¡Una vez que encuentren una, tráiganla rápido al Arca que está en mi mesa!",
                scripture: "Génesis 6 y 7",
                tips: "Pon sonidos de selva o agua de fondo para crear ambiente."
            }
        },

        {
            id: "3",
            title: "La Torre de Babel",
            subtitle: "Ladrillos de Idiomas",
            childrenPlatform: "El Señor confundió las lenguas de la gente en Babel como castigo por su orgullo, ¡pero gracias a eso nacieron muchos idiomas nuevos! Busca la torre de vasos en el idioma asignado por el monitor. Usa los vasos para construir la frase oculta.",
            icon: "images/icons/3.png",
            secretLetter: "J",
            prepGuide: {
                materials: ["Vasos desechables", "Tiras de papel con las palabras de la frase: 'Mira ahora los cielos, y cuenta las estrellas' en tantos idiomas como equipos haya", "Etiquetas con los nombres de los idiomas"],
                setup: "Pega una tira de papel en cada vaso. Luego, sepáralos por idioma y monta torres de vasos en las mesas (una torre por idioma, una mesa por torre). Pega las etiquetas de los idiomas en las mesas correspondientes."
            },
            monitorScript: {
                intro: "Imaginen un mundo donde todos hablaran el mismo idioma; así era la vida de la gente de Babel. Después del diluvio, las personas se mudaron a una llanura llamada Sinar. En lugar de esparcirse para llenar la tierra como Dios pidió, se quedaron en un solo lugar. Usaron ladrillos y asfalto para construir una torre para 'hacerse un nombre'. Querían llegar al cielo bajo sus propios términos. ¡Para detener su orgullo, el Señor confundió sus lenguas! De repente, nadie se entendía y nacieron muchos idiomas nuevos. Para completar esta misión, deben usar Google Lens en su teléfono. Elijan una torre de vasos; ¡cada una está en un idioma diferente! Tradúzcanlas para encontrar las palabras ocultas.",
                scripture: "Génesis 11:1-9",
                tips: "Si sabes otro idioma, háblales a los participantes en ese idioma cuando entren a la sala para mostrarles lo confuso que fue. Recuérdales que la verdadera grandeza viene de la humildad."
            },
        },

        {
            id: "4",
            title: "El Convenio Abrahámico",
            subtitle: "Todas las Naciones de la Tierra",
            childrenPlatform: "El Señor le prometió a Abraham que todas las naciones de la tierra serían bendecidas a través de su familia. Encuentra solo una bandera de cada una de las naciones escondidas por la sala. Ordénalas numéricamente usando los números de la esquina inferior derecha. Luego, alumbra a través de ellas con la linterna de tu teléfono.",
            icon: "images/icons/4.png",
            secretLetter: "E",
            prepGuide: {
                materials: ["Tiras con palabras", "Tiras con banderas", "Pegamento"],
                setup: "Pega cada tira de palabra al reverso de una bandera para que la palabra quede oculta. Luego, esconde estas banderas por toda la sala."
            },
            monitorScript: {
                intro: "¡Miren al cielo! ¿Pueden contar las estrellas? Eso fue lo que Dios le preguntó a Abraham. Él prometió que su familia sería tan numerosa como las estrellas y que todas las naciones serían bendecidas por medio de él. ¡Ustedes son parte de esa promesa! Escondidas por esta sala hay banderas de muchas naciones. Deben encontrar solo UNA bandera de cada nación. Una vez que las tengan, ordénenlas numéricamente y miren a través de ellas usando la linterna de su celular.",
                scripture: "Génesis 15:5 y 22:17-18",
                tips: "Si es posible, realiza esta actividad en una sala oscura iluminada con velas LED o guirnaldas de luces."
            }
        },

        {
            id: "5",
            title: "José de Egipto",
            subtitle: "Una historia de doce hermanos",
            childrenPlatform: "José enfrentó muchos desafíos a lo largo de su vida, pero al final, su fuerza para superarlos bendijo a toda su familia y a todo Egipto. Busca la caja con tu nombre y usa los materiales del interior para crear una obra de arte sobre la parte de la historia escrita en tu caja. Cuando tu obra esté lista, muéstrasela a tu monitor.",
            icon: "images/icons/5.png",
            secretLetter: "I",
            prepGuide: {
                materials: ["Cajas (tantas como equipos haya)", "Materiales de arte", "Lienzos o cartulinas"],
                setup: "Prepara mesas con las cajas que contienen los suministros de arte y los lienzos. Prepara tantas mesas como partes en las que desees dividir la historia de José de Egipto."
            },
            monitorScript: {
                intro: "José era el menor de 12 hermanos y su padre lo amaba profundamente. Le regaló una hermosa túnica de muchos colores, lo que hizo que sus hermanos tuvieran celos y lo vendieran como esclavo. ¡Incluso en una prisión egipcia, Dios nunca lo abandonó! José finalmente salvó a todo Egipto del hambre y a toda su familia. Para honrar su historia, busquen la caja con el nombre de su equipo. Dentro encontrarán una parte de la vida de José. ¡Usen los materiales de arte para crear una obra maestra que cuente esa parte de la historia!",
                scripture: "Génesis 37 y 45",
                tips: "Enfócate en la resiliencia. Diles: 'José convirtió sus pruebas en bendiciones'."            
            }
        },

        {
            id: "6",
            title: "Las Diez Plagas",
            subtitle: "Dios liberó a Su pueblo",
            childrenPlatform: "Los niños ven la primera adivinanza.",
            icon: "images/icons/6.png",
            secretLetter: "O",
            prepGuide: {
                materials: ["No se requieren materiales"],
                setup: "Prepara sillas para cada participante."
            },
            monitorScript: {
                intro: "Durante 400 años, Israel estuvo esclavizado en Egipto y Dios escuchó sus lamentos. Envió a Moisés ante el Faraón con un mensaje: '¡Deja ir a mi pueblo!'. Como el Faraón era terco, ocurrieron 10 señales poderosas. ¡Hoy ustedes son los detectores! Abran su aplicación y resuelvan los acertijos sobre las 10 plagas.",
                scripture: "Éxodo 7 al 12",
                tips: "Si es posible, decora la sala con pergaminos egipcios o imágenes que sirvan como pistas sobre las plagas. No las menciones en voz alta, pero siéntete libre de pegarlas en las paredes. También puedes poner música ambiental egipcia."            
            }
        },

        {
            id: "7",
            title: "Los Diez Mandamientos",
            subtitle: "Rompecabezas de Piedra",
            childrenPlatform: "El Señor le dio a Moisés tablas de piedra en el Monte Sinaí con los 10 mandamientos más importantes para que Su pueblo los siguiera. Cuando Moisés bajó, encontró al pueblo adorando a un becerro de oro. Moisés se enojó mucho; rompió las tablas y destruyó el becerro. El Señor le pidió entonces a Moisés que hiciera nuevas tablas de piedra y dio nuevas promesas a Su pueblo. Arma el rompecabezas de los 10 Mandamientos pegando las piezas en la lámina de plástico.",
            icon: "images/icons/7.png",
            secretLetter: "C",
            prepGuide: {
                materials: ["Fundas protectoras de hojas", "Rompecabezas impresos de las tablas de los Mandamientos (uno por equipo). Deben ser por ambos lados: la imagen del rompecabezas por uno y una imagen de diamante por el otro (cada diamante debe ser único dentro del puzzle)."],
                setup: "Prepara una mesa con una funda protectora y las piezas del rompecabezas para cada equipo."
            },
            monitorScript: {
                intro: "En el Monte Sinaí, Dios habló al pueblo con truenos y relámpagos. Le dio a Moisés dos tablas de piedra escritas con el 'dedo de Dios'. Allí recibió los 10 Mandamientos que el pueblo de Israel debía seguir. Cuando Moisés bajó de la montaña, encontró al pueblo adorando a un becerro de oro. Se puso furioso, destruyó al becerro y rompió las tablas de piedra. El Señor le dijo entonces a Moisés que fabricara un nuevo juego de tablas. ¡Su misión es, al igual que Moisés, restaurar la ley! Tomen las piezas del rompecabezas y péguenlas en la lámina de plástico. ¡Asegúrense de que los mandamientos estén en el lugar correcto!",
                scripture: "Éxodo 20 y 34",
                tips: "Explica que los mandamientos son como un 'mapa' para ayudarnos a mantenernos a salvo en el desierto de la vida."            
            }
        },

        {
            id: "8",
            title: "Las Doce Piedras Preciosas",
            subtitle: "El Pectoral de Oro",
            childrenPlatform: "El pueblo de Israel llevaba el Tabernáculo con ellos mientras viajaban por el desierto. El Tabernáculo era como un 'templo móvil' que iba delante de ellos. El Sumo Sacerdote usaba un pectoral de oro con 12 piedras preciosas que representaban a las 12 tribus de Israel. ¡Busca una de las 12 bolsas con una piedra de color en su interior, ábrela y dásela a tu monitor!",
            icon: "images/icons/8.png",
            secretLetter: "R",
            prepGuide: {
                materials: ["12 bolsas pequeñas", "12 piedras de colores", "12 tiras de papel con la pista de la siguiente misión", "Un pectoral de cartón pintado de dorado"],
                setup: "Coloca una piedra y una tira con la pista dentro de cada bolsa. Luego, escóndelas repartiéndolas por toda la sala."
            },
            monitorScript: {
                intro: "Dios dio instrucciones específicas para el Tabernáculo (el Templo portátil). El Sumo Sacerdote (Aarón) usaba un 'Pectoral del Juicio'. Tenía 4 filas de 3 piedras (Sardio, Topacio, Carbunclo, Esmeralda, Zafiro, Diamante, Jacinto, Ágata, Amatista, Berilo, Onice y Jaspe). ¡Dios literalmente llevaba a Su pueblo sobre Su corazón! Por la sala hay 12 bolsitas escondidas. Deben encontrar una bolsa con una piedra de color. ¡Una vez que la encuentren, abran la bolsa y denme la piedra!",
                scripture: "Éxodo 28:15-21",
                tips: "Muestra tu pectoral de cartón con orgullo. Diles que, al igual que esas piedras, ellos son 'tesoros especiales' para Dios."            
            }
        },

        {
            id: "9",
            title: "El Censo de Israel",
            subtitle: "¿Cuántos son?",
            childrenPlatform: "Los participantes ven la primera pregunta del censo.",
            icon: "images/icons/9.png",
            secretLetter: "S",
            prepGuide: {
                materials: ["Pergaminos con la tabla de información del censo ficticio."],
                setup: "Prepara sillas para cada participante."
            },
            monitorScript: {
                intro: "El libro de Números se llama así porque Dios quería saber exactamente quiénes estaban en el viaje, así que comienza y termina con un censo. ¡Cada persona era importante! Tengo aquí los pergaminos con la información del censo. Deben tomar una hoja y responder las preguntas en su aplicación. ¡Tendrán que mirar los números con cuidado para asegurarse de contar a todos!",
                scripture: "Números 1 y 26",
                tips: "Hazlos sentir como importantes oficiales del censo. '¡La precisión es clave para la organización del campamento!'."
            }
        },

        {
            id: "10",
            title: "El Camino",
            subtitle: "No olvides de dónde vienes",
            childrenPlatform: "Moisés le recordó a su pueblo todo el viaje que habían recorrido, los desafíos que enfrentaron y cómo los superaron. Les recordó todo lo que habían aprendido. ¡Ahora, recuerda lo que recibiste en cada una de tus misiones!",
            icon: "images/icons/10.png",
            secretLetter: "T",
            prepGuide: {
                materials: ["No se requieren materiales"],
                setup: "Prepara una atmósfera acogedora y tranquila para recibir a los equipos. Puedes ambientar con luces tenues, mantas, cojines, etc."
            },
            monitorScript: {
            intro: "Hemos llegado al final de nuestro viaje con Moisés. Al final de su vida, le dijo al pueblo: 'No olvides las cosas que tus ojos han visto'. Ahora tienen la oportunidad de mirar todo lo que han recibido en sus misiones.",
            scripture: "Deuteronomio 4:9 y 8:2",
            tips: "Baja la voz para crear un ambiente pacífico y reflexivo. Este es el momento en que se dan cuenta de que todas las letras secretas forman una palabra."
            }
        }
    ]
};