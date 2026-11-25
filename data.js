/**
 * ============================================================================
 * LA RUTA DEL CÓNDOR: EXPLORADORES DEL ECUADOR (5.º EGB)
 * Banco Curricular de Estudios Sociales y Configuración
 * ============================================================================
 * 
 * CONFIGURACIÓN DE LA ENCUESTA (SURVEY_URL):
 * Para enlazar su propia encuesta (Google Forms, Microsoft Forms, etc.),
 * reemplace el enlace de abajo en SURVEY_URL o defínalo en Netlify en window.__ENV__.SURVEY_URL
 */

(function (app) {
  // Ponga aquí el enlace a su encuesta de Google Forms o Microsoft Forms:
  const SURVEY_URL = window.__ENV__?.SURVEY_URL || 'https://forms.gle/encuesta-ruta-del-condor-ejemplo';

  const REGIONS = [
  {
    id: 'costa',
    order: 1,
    name: 'Región Costa',
    subtitle: 'Litoral del Pacífico, playas y valles fértiles',
    badgeName: 'Guardián del Litoral',
    questions: [
      {
        id: 'costa_q1',
        stationNumber: 1,
        stationTitle: 'Playas de Manabí',
        prompt: 'Lea con atención: ¿Cuál de las siguientes provincias pertenece a la Región Costa del Ecuador y es famosa por sus playas y su gastronomía?',
        options: [
          'Provincia de Manabí',
          'Provincia de Tungurahua',
          'Provincia de Pastaza'
        ],
        correctIndex: 0,
        hint: 'Pista pedagógica: Esta provincia se ubica frente al océano Pacífico y su capital es Portoviejo.',
        culturalFact: 'En Manabí y Esmeraldas se elaboran deliciosos platos con plátano verde, maní y mariscos frescos del océano Pacífico.'
      },
      {
        id: 'costa_q2',
        stationNumber: 2,
        stationTitle: 'Llanuras del Litoral',
        prompt: 'Identifique la característica principal del relieve de la Región Costa ecuatoriana:',
        options: [
          'Volcanes cubiertos de nieve permanente',
          'Llanuras extensas, playas y elevaciones bajas',
          'Islas volcánicas en medio del océano'
        ],
        correctIndex: 1,
        hint: 'Pista pedagógica: Piense en el terreno cercano al nivel del mar donde crecen cultivos de banano y cacao.',
        culturalFact: 'Gracias a sus fértiles llanuras y ríos como el Guayas, la Costa es gran productora mundial de banano y cacao fino de aroma.'
      },
      {
        id: 'costa_q3',
        stationNumber: 3,
        stationTitle: 'Marimba y Tradición',
        prompt: 'Seleccione una tradición cultural representativa de la Región Costa del Ecuador:',
        options: [
          'La música de marimba esmeraldeña y el rodeo montubio',
          'La caminata por los nevados de los Andes',
          'La ceremonia amazónica de la guayusa'
        ],
        correctIndex: 0,
        hint: 'Pista pedagógica: Es una expresión alegre de música afroecuatoriana y costumbres del campo costeño.',
        culturalFact: 'La marimba esmeraldeña fue declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO.'
      }
    ]
  },
  {
    id: 'sierra',
    order: 2,
    name: 'Región Sierra',
    subtitle: 'Cordillera de los Andes, volcanes y valles interandinos',
    badgeName: 'Explorador Andino',
    questions: [
      {
        id: 'sierra_q1',
        stationNumber: 4,
        stationTitle: 'Cumbres Andinas',
        prompt: 'Lea con atención: ¿Qué gran cadena montañosa atraviesa de norte a sur la Región Sierra del Ecuador?',
        options: [
          'La Cordillera de los Andes',
          'El Archipiélago de Colón',
          'La Llanura Amazónica'
        ],
        correctIndex: 0,
        hint: 'Pista pedagógica: En ella se encuentran majestuosos volcanes como el Cotopaxi y el Chimborazo.',
        culturalFact: 'El volcán Chimborazo, ubicado en la Sierra ecuatoriana, es el punto de la Tierra más cercano al Sol medido desde el centro del planeta.'
      },
      {
        id: 'sierra_q2',
        stationNumber: 5,
        stationTitle: 'Valles de Pichincha',
        prompt: 'Identifique cuál de estas provincias se encuentra en la Región Sierra:',
        options: [
          'Provincia de Esmeraldas',
          'Provincia de Pichincha',
          'Provincia de Sucumbíos'
        ],
        correctIndex: 1,
        hint: 'Pista pedagógica: En esta provincia andina se ubica Quito, la capital del Ecuador.',
        culturalFact: 'El Centro Histórico de Quito, en la provincia de Pichincha, conserva iglesias, plazas y tradiciones de gran valor histórico.'
      },
      {
        id: 'sierra_q3',
        stationNumber: 6,
        stationTitle: 'Fiesta del Inti Raymi',
        prompt: 'Seleccione la fiesta tradicional andina que agradece a la Tierra por las cosechas en la Sierra:',
        options: [
          'El Inti Raymi o Fiesta del Sol',
          'La regata de balsas del río Guayas',
          'El festival de la tortuga marina'
        ],
        correctIndex: 0,
        hint: 'Pista pedagógica: Su nombre proviene del idioma kichwa y significa literalmente "Fiesta del Sol".',
        culturalFact: 'Durante el Inti Raymi en junio, las comunidades andinas celebran con música, danzas coloridas y comida compartida llamada pambamesa.'
      }
    ]
  },
  {
    id: 'amazonia',
    order: 3,
    name: 'Región Amazonía',
    subtitle: 'Selva tropical, ríos caudalosos y biodiversidad',
    badgeName: 'Protector de la Selva',
    questions: [
      {
        id: 'amazonia_q1',
        stationNumber: 7,
        stationTitle: 'Río y Provincia Napo',
        prompt: 'Lea con atención: ¿Cuál de las siguientes provincias pertenece a la Región Amazónica del Ecuador?',
        options: [
          'Provincia de Napo',
          'Provincia de Azuay',
          'Provincia de Santa Elena'
        ],
        correctIndex: 0,
        hint: 'Pista pedagógica: Lleva el nombre de uno de los ríos más importantes y caudalosos del oriente ecuatoriano.',
        culturalFact: 'La Amazonía ecuatoriana alberga parques nacionales de enorme riqueza natural, como el Parque Nacional Yasuní.'
      },
      {
        id: 'amazonia_q2',
        stationNumber: 8,
        stationTitle: 'Selva Tropical',
        prompt: 'Identifique el elemento natural que caracteriza principalmente al paisaje de la Amazonía:',
        options: [
          'Desiertos secos con poca vegetación',
          'Selvas húmedas tropicales y ríos caudalosos',
          'Acantilados marinos y playas de arena blanca'
        ],
        correctIndex: 1,
        hint: 'Pista pedagógica: Es una región con lluvias frecuentes, árboles muy altos y gran variedad de aves y monos.',
        culturalFact: 'En los bosques amazónicos viven miles de especies de plantas medicinales, orquídeas, guacamayos y delfines rosados de río.'
      },
      {
        id: 'amazonia_q3',
        stationNumber: 9,
        stationTitle: 'Saberes Amazónicos',
        prompt: 'Seleccione una práctica tradicional de las nacionalidades indígenas amazónicas (como kichwas y shuar):',
        options: [
          'Compartir infusión de guayusa al amanecer y elaborar artesanías con semillas',
          'Construir barcos pesqueros de alta mar',
          'Pastorear ovejas en páramos helados'
        ],
        correctIndex: 0,
        hint: 'Pista pedagógica: Es una bebida energética natural de hojas de la selva acompañada de relatos familiares.',
        culturalFact: 'Las nacionalidades amazónicas transmiten sus conocimientos sobre el cuidado del bosque de abuelos a nietos.'
      }
    ]
  },
  {
    id: 'galapagos',
    order: 4,
    name: 'Región Galápagos',
    subtitle: 'Archipiélago volcánico y patrimonio natural del mundo',
    badgeName: 'Centinela de Galápagos',
    questions: [
      {
        id: 'galapagos_q1',
        stationNumber: 10,
        stationTitle: 'Origen Volcánico',
        prompt: 'Lea con atención: ¿Cómo se formaron las islas de la Región Insular o Galápagos?',
        options: [
          'Por erupciones volcánicas en el océano Pacífico',
          'Por el deshielo de ríos andinos',
          'Por excavaciones realizadas por seres humanos'
        ],
        correctIndex: 0,
        hint: 'Pista pedagógica: Bajo el océano hubo actividad de volcanes que emergieron sobre el agua.',
        culturalFact: 'El archipiélago de Galápagos está compuesto por 13 islas grandes, islas menores y numerosos islotes de origen volcánico.'
      },
      {
        id: 'galapagos_q2',
        stationNumber: 11,
        stationTitle: 'Fauna Encantada',
        prompt: 'Identifique una especie animal única y emblemática de las Islas Galápagos:',
        options: [
          'La tortuga gigante de Galápagos y la iguana marina',
          'El oso polar del Ártico',
          'El canguro australiano'
        ],
        correctIndex: 0,
        hint: 'Pista pedagógica: Son reptiles famosos que viven protegidos en estas islas ecuatorianas.',
        culturalFact: 'Las iguanas marinas de Galápagos son los únicos lagartos del mundo capaces de nadar y alimentarse en el mar.'
      },
      {
        id: 'galapagos_q3',
        stationNumber: 12,
        stationTitle: 'Guardianes Insulares',
        prompt: 'Seleccione la acción más importante que debemos practicar al visitar o estudiar Galápagos:',
        options: [
          'Proteger la naturaleza, no dejar basura y respetar la distancia con los animales',
          'Llevarse piedras volcánicas y conchas de recuerdo',
          'Alimentar a las aves silvestres con golosinas'
        ],
        correctIndex: 0,
        hint: 'Pista pedagógica: El Parque Nacional Galápagos cuida que el ecosistema permanezca limpio y seguro.',
        culturalFact: 'En 1978, la UNESCO declaró a las Islas Galápagos como el primer Patrimonio Natural de la Humanidad.'
      }
    ]
  }
];

  const STATIONS = REGIONS.flatMap(region =>
    region.questions.map((question, indexInRegion) => ({
      stationNumber: question.stationNumber,
      stationTitle: question.stationTitle,
      regionId: region.id,
      regionOrder: region.order,
      regionName: region.name,
      regionSubtitle: region.subtitle,
      badgeName: region.badgeName,
      indexInRegion,
      question
    }))
  );

  app.data = {
    SURVEY_URL,
    REGIONS,
    STATIONS
  };
})(window.RutaCondor = window.RutaCondor || {});
