import { BlogPost, Pillar } from "./types";

export const CONSEJOS_DIARIOS = [
  "Hoy, intenta escuchar sin interrumpir. La escucha activa es el primer paso del amor.",
  "¿Cuándo fue la última vez que agradeciste un detalle pequeño? El agradecimiento fortalece el vínculo.",
  "El amor no es solo un sentimiento, es una decisión diaria de buscar el bien del otro.",
  "Dedica 10 minutos hoy a hablar de sueños futuros, no solo de tareas pendientes.",
  "Un lenguaje de amor diferente no significa falta de amor, significa una oportunidad de aprendizaje."
];

export const PILARES: Pillar[] = [
  { 
    id: 'comunicacion', 
    name: 'Comunicación Asertiva', 
    icon: 'MessageCircle', 
    color: 'bg-blue-500', 
    levels: 5,
    description: 'Aprende a expresar tus necesidades sin atacar.',
    challenges: [
      'Identifica un "obstáculo" en tu comunicación (celular, ruido, cansancio). ¿Cómo lo eliminarás hoy para escuchar mejor?',
      'Practica la validación emocional: antes de dar tu opinión, repite lo que entendiste de lo que tu pareja expresó.',
      'Explica una necesidad personal usando la fórmula: "Yo me siento... cuando tú haces... porque necesito...".',
      '¿Cómo aplicarías la "Donación de sí mismo" en un conflicto de horarios o tareas pendientes?',
      'Reflexiona: ¿En qué momentos tu comunicación deja de ser un diálogo y se vuelve un monólogo para tener la razón?'
    ]
  },
  { 
    id: 'confianza', 
    name: 'Confianza y Seguridad', 
    icon: 'Heart', 
    color: 'bg-rose-500', 
    levels: 4,
    description: 'La base sólida de toda relación duradera.',
    challenges: [
      'Define qué significa para ti la "lealtad" en los pequeños detalles cotidianos de la convivencia.',
      'Comparte una vulnerabilidad o un miedo personal que no hayas contado antes para fortalecer la transparencia.',
      'Perdón y Donación: ¿Hay algo del pasado que debas soltar hoy para poder entregarte plenamente al presente?',
      'Diseña un "ritual de acogida" para cuando se reencuentren al final del día (físico o verbal).'
    ]
  },
  { 
    id: 'intimidad', 
    name: 'Intimidad Emocional', 
    icon: 'Sparkles', 
    color: 'bg-purple-500', 
    levels: 6,
    description: 'Conéctate a un nivel más profundo.',
    challenges: [
      'Alteridad: Menciona una cualidad de tu pareja que sea totalmente distinta a ti y que hoy decidas admirar.',
      'Corporeidad: ¿De qué manera tu lenguaje no verbal expresa amor sin necesidad de palabras (gestos, cercanía)?',
      'Planifica 30 minutos de conversación profunda sobre "quiénes son hoy", sin temas de trabajo o logística.',
      'Espiritualidad del vínculo: ¿Qué valores o ideales superiores comparten que les dan un sentido de unidad?',
      'Admiración: Escribe o dile a tu pareja 3 razones por las que es una "Persona" única e irrepetible en tu vida.',
      'Donación total: ¿Cómo puedes ser el "mejor regalo" para tu pareja hoy, sin esperar absolutamente nada a cambio?'
    ]
  },
  { 
    id: 'proposito', 
    name: 'Proyecto de Vida', 
    icon: 'Trophy', 
    color: 'bg-amber-500', 
    levels: 3,
    description: 'Caminando hacia un mismo horizonte.',
    challenges: [
      'Horizonte común: ¿Dónde se ven como equipo en 5 años a nivel personal, profesional y espiritual?',
      'Arquitectura de valores: ¿Cómo refleja el manejo de su tiempo y dinero sus verdaderas prioridades de vida?',
      'Legado: Si hoy tuvieran que definir la "misión" de su relación, ¿cuál sería el impacto que quieren dejar en otros?'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  { 
    id: "persona-pareja",
    title: "El concepto de Persona en la Pareja", 
    excerpt: "Desde la antropología, cada miembro es una unidad irrepetible...", 
    content: `La antropología personalista nos enseña que cada ser humano es una "persona", lo cual implica ser un individuo único, irrepetible y con una dignidad intrínseca.\n\nEn la relación de pareja, este concepto es fundamental porque nos invita a no ver al otro como un objeto de satisfacción o una extensión de nuestros deseos, sino como un "tú" con el que entramos en un diálogo de amor.\n\nReconocer al otro como persona significa respetar su libertad, admirar su misterio y entender que el amor verdadero es la donación desinteresada hacia ese ser que es igual en dignidad pero distinto en su forma de ser.`,
    date: "Hoy" 
  },
  { 
    id: "lenguajes-amor",
    title: "Los 5 lenguajes del amor: Resumen", 
    excerpt: "Entender cómo el otro recibe afecto cambia las reglas del juego.", 
    content: `No todos amamos de la misma manera ni nos sentimos amados con las mismas acciones. Gary Chapman identificó cinco "lenguajes" principales:\n\n1. **Palabras de Afirmación**: Elogios, palabras de ánimo y gratitud.\n2. **Tiempo de Calidad**: Atención indivisa y actividades compartidas.\n3. **Regalos**: Símbolos visuales del amor y el pensamiento.\n4. **Actos de Servicio**: Acciones que sabemos que alivian la carga del otro.\n5. **Contacto Físico**: Caricias, abrazos y cercanía.\n\nDescubrir el lenguaje primario de tu pareja y aprender a hablarlo es una de las mayores inversiones que puedes hacer en tu relación.`,
    date: "Ayer" 
  },
  { 
    id: "manejo-conflictos",
    title: "Manejo de conflictos desde la razón", 
    excerpt: "Por qué explotamos y cómo volver a la calma cerebral.", 
    content: `Cuando entramos en conflicto, a menudo nuestra "amígdala" toma el control, activando una respuesta de lucha o huida que anula nuestra capacidad de razonar. Esto es lo que conocemos como "secuestro emocional".\n\nPara manejar los conflictos desde la afectividad madura, debemos:\n\n* **Pausa Táctica**: Tomar 20 minutos para que el pulso baje y la corteza prefrontal vuelva a activarse.\n* **Hablar en primera persona**: En lugar de "Tú siempre haces", decir "Yo me siento...".\n* **Buscar la solución, no la victoria**: El objetivo no es ganar una discusión, sino proteger el vínculo y encontrar un camino común.`,
    date: "2 días" 
  }
];
