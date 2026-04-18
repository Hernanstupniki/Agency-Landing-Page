const [item] = $input.all();
const body = item?.json?.body ?? {};

const cleanWhitespace = (value) => {
  let text = String(value ?? '');
  for (const whitespaceChar of [String.fromCharCode(10), String.fromCharCode(13), String.fromCharCode(9)]) {
    text = text.split(whitespaceChar).join(' ');
  }
  while (text.includes('  ')) {
    text = text.split('  ').join(' ');
  }
  return text.trim();
};

const stripAccents = (value) => value.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
const normalizeText = (value) => cleanWhitespace(stripAccents(String(value ?? '').toLowerCase()));
const uniqueList = (values) => [...new Set(values.filter(Boolean))];
const mergeValue = (previousValue, nextValue) => nextValue || previousValue || null;
const joinList = (values) => {
  const filteredValues = uniqueList(values);
  return filteredValues.length ? filteredValues.join(', ') : null;
};

const normalizedMessage = cleanWhitespace(body.message);
const normalizedSearch = normalizeText(normalizedMessage);
const textTokens = normalizedSearch.split(/[^a-z0-9]+/).filter(Boolean);
const containsAny = (text, terms) => terms.some((term) => {
  const normalizedTerm = normalizeText(term);
  if (!normalizedTerm) return false;
  if (normalizedTerm.length <= 3 && !normalizedTerm.includes(' ')) {
    return textTokens.includes(normalizedTerm);
  }
  return text.includes(normalizedTerm);
});

const guessLanguageFromText = (text) => {
  const englishMarkers = ['hello', 'hi', 'how much', 'pricing', 'price', 'quote', 'budget', 'what do you', 'can you', 'do you', 'i need', 'i want', 'business', 'appointments', 'booking'];
  const portugueseMarkers = ['ola', 'olá', 'quanto', 'preco', 'preço', 'orcamento', 'orçamento', 'voc', 'agendamento', 'barbearia', 'clinica', 'clínica', 'falam', 'quero', 'preciso'];
  if (containsAny(text, englishMarkers)) return 'en';
  if (containsAny(text, portugueseMarkers)) return 'pt';
  return 'es';
};

const workflowStaticData = $getWorkflowStaticData('global');
const now = Date.now();
const sessionTtlMs = 1000 * 60 * 60 * 24;

if (!workflowStaticData.landingChatSessions || typeof workflowStaticData.landingChatSessions !== 'object') {
  workflowStaticData.landingChatSessions = {};
}

if (!workflowStaticData.landingChatConfig || typeof workflowStaticData.landingChatConfig !== 'object') {
  workflowStaticData.landingChatConfig = {
    whatsappUrl: 'https://wa.me/5493764502803',
    whatsappDisplay: '+54 9 3764 50 2803',
    instagramUrl: 'https://www.instagram.com/zubuagency/',
    responseTime: '< 24h',
    freeDiagnosis: true,
  };
}

for (const [storedSessionId, storedSession] of Object.entries(workflowStaticData.landingChatSessions)) {
  const updatedAt = storedSession?.updatedAt ?? 0;
  if (!updatedAt || now - updatedAt > sessionTtlMs) {
    delete workflowStaticData.landingChatSessions[storedSessionId];
  }
}

const configuredLanguage = cleanWhitespace(body.language).toLowerCase();
const incomingSessionId = cleanWhitespace(body.sessionId);
const sessionId = incomingSessionId || ('landing-' + Date.now());
const previousSessionState = workflowStaticData.landingChatSessions[sessionId] ?? {
  history: [],
  capture: {
    name: null,
    businessName: null,
    businessType: null,
    mainProblem: null,
    processToAutomate: null,
    currentTools: null,
    channel: null,
    volume: null,
    urgency: null,
    goal: null,
    contactMethod: null,
    language: null,
  },
  lastIntent: 'fallback',
  lastQuestionField: null,
  lastOffer: null,
  turnCount: 0,
};

const language = ['es', 'en', 'pt'].includes(configuredLanguage)
  ? configuredLanguage
  : (previousSessionState.capture?.language || guessLanguageFromText(normalizedSearch));

const source = cleanWhitespace(body.source || 'landing') || 'landing';
const timestamp = cleanWhitespace(body.timestamp || new Date().toISOString()) || new Date().toISOString();
const contactConfig = workflowStaticData.landingChatConfig;

const hashSeed = (value) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
};

const pickVariant = (key, values) => {
  if (!values.length) return '';
  const seed = String(sessionId) + ':' + String(previousSessionState.turnCount || 0) + ':' + key;
  return values[hashSeed(seed) % values.length];
};

const t = {
  es: {
    businessSummary: 'ZUBU es una agencia de automatización, software a medida e inteligencia artificial para empresas y PyMEs en Posadas, Misiones.',
    promise: 'El foco está en ahorrar tiempo, reducir errores y aumentar ventas.',
    responseTime: 'Suelen responder en menos de 24 horas.',
    servicesSummary: 'Trabajan con automatización de WhatsApp, ERP y CRM, integraciones, cobros, reservas, documentos, software a medida, paneles, reportes e IA aplicada.',
    safeUnknown: [
      'Eso depende del alcance y de cómo trabajen hoy.',
      'Habría que verlo según su proceso actual.',
      'No te quiero inventar una respuesta cerrada sin entender bien el caso.'
    ],
    greetings: [
      'Hola, soy el asistente de ZUBU.',
      'Hola, acá el asistente de ZUBU.',
      'Buenas, soy el asistente comercial de ZUBU.'
    ],
    greetingQuestions: [
      '¿Qué te gustaría mejorar en tu negocio?',
      '¿Qué proceso querés ordenar o automatizar?',
      '¿En qué te gustaría que te ayuden?'
    ],
    qualificationQuestions: {
      businessType: ['¿Qué tipo de negocio tenés?', '¿En qué rubro estás?', '¿Qué tipo de empresa o negocio manejan hoy?'],
      mainProblem: ['¿Qué es lo que más te complica hoy?', '¿Cuál es el principal problema que querés resolver?', '¿Dónde sentís más desorden o pérdida de tiempo?'],
      processToAutomate: ['¿Qué proceso querés automatizar o mejorar?', '¿Qué parte te gustaría ordenar primero?', '¿Buscás resolver algo puntual o automatizar un proceso completo?'],
      currentTools: ['¿Hoy cómo lo manejan?', '¿Qué herramientas usan actualmente?', '¿Esto lo hacen manual, con Excel o con algún sistema?'],
      channel: ['¿Las consultas les llegan más por WhatsApp, Instagram o web?', '¿Cuál es su canal principal hoy?', '¿Dónde entra la mayor parte de las consultas o ventas?'],
      urgency: ['¿Esto te urge o lo están evaluando?', '¿Lo necesitan resolver pronto o están explorando opciones?', '¿Es algo para este mes o más adelante?'],
      goal: ['¿Qué te gustaría lograr con esto: ahorrar tiempo, vender más o tener más control?', '¿Cuál es el objetivo principal?', '¿Qué resultado te gustaría conseguir primero?'],
      contactMethod: ['¿Querés que te lo derive por WhatsApp?', '¿Preferís seguir por WhatsApp?', '¿Querés que lo sigamos directo por WhatsApp?']
    },
    ctaWhatsapp: [
      'Lo mejor es seguirlo directo por WhatsApp.',
      'Te conviene verlo por WhatsApp así lo revisan según tu caso.',
      'Si querés avanzar, lo más práctico es seguirlo por WhatsApp.'
    ],
    pricing: [
      'Eso depende mucho del alcance y no te quiero inventar un precio desde acá.',
      'No manejan precios fijos desde el chat porque cambia según lo que necesites.',
      'Para no decirte cualquier cosa con el precio, lo ideal es verlo según tu caso.'
    ],
    contactLeadIn: [
      'Con lo que contás, esto se puede trabajar.',
      'Por lo que describís, tiene sentido revisarlo con el equipo.',
      'Eso ya da buen contexto para seguirlo con ZUBU.'
    ],
    contactClose: [
      'Si querés, seguí directo por WhatsApp.',
      'Te dejo el WhatsApp para que lo continúen ahí.',
      'Te paso el WhatsApp para que lo vean directo.'
    ],
    serviceAcknowledgements: [
      'Sí, eso se puede trabajar.',
      'Sí, aplica muy bien para ese caso.',
      'Sí, ZUBU trabaja justamente ese tipo de solución.'
    ],
    noTechnical: [
      'No necesitás conocimientos técnicos para empezar.',
      'No hace falta que sepas de sistemas para avanzar con esto.',
      'La parte técnica la trabaja el equipo; no necesitás venir con conocimientos previos.'
    ],
    results: 'Lo habitual es ganar orden, velocidad, más control, menos tareas manuales y menos errores, además de mejorar la experiencia del cliente.',
    industries: 'Trabajan con PyMEs, empresas de servicios, gastronomía, e-commerce, inmobiliarias, estudios, clínicas, barberías, peluquerías y spas.',
    timeGeneral: 'En general, una automatización puntual puede estar lista en pocos días y un sistema a medida suele llevar algunas semanas. El tiempo exacto depende del diagnóstico.',
    whatsappInfo: 'Trabajan con automatización de WhatsApp y atención al cliente.',
    appointmentsInfo: 'Trabajan con turnos, reservas, recordatorios y orden de agenda, algo muy útil para clínicas, barberías, peluquerías, spas y negocios similares.',
    erpCrmInfo: 'Desarrollan ERP, CRM, sistemas de gestión, paneles administrativos y software a medida.',
    integrationsInfo: 'Integran herramientas para que la información fluya entre CRM, ERP, formularios, pagos y otros procesos.',
    collectionsInfo: 'También se pueden automatizar cobros, recordatorios, reservas y documentos.',
    reportsInfo: 'También desarrollan reportes, dashboards, KPIs y paneles para tener más visibilidad del negocio.',
    aiInfo: 'Trabajan con agentes de IA y automatizaciones inteligentes, pero no siempre hace falta IA: depende del proceso.',
    fallback: 'ZUBU ayuda a automatizar procesos, ordenar operaciones y desarrollar soluciones a medida para empresas y PyMEs.',
    socialInfo: 'Como red pública visible en la web, ZUBU muestra Instagram.',
    directWhatsapp: 'WhatsApp directo',
    instagram: 'Instagram',
    diagnosis: 'También ofrecen diagnóstico gratuito.',
    yesFollowUp: ['Perfecto.', 'Bien.', 'Dale.'],
    noFollowUp: ['No hay problema.', 'Perfecto, todo bien.', 'Sin drama.'],
    languageCode: 'es'
  },
  en: {
    businessSummary: 'ZUBU is an automation, custom software, and artificial intelligence agency for companies and SMEs based in Posadas, Misiones.',
    promise: 'The focus is on saving time, reducing errors, and increasing sales.',
    responseTime: 'They usually reply in under 24 hours.',
    servicesSummary: 'They work on WhatsApp automation, ERP and CRM, integrations, collections, bookings, documents, custom software, dashboards, reporting, and applied AI.',
    safeUnknown: [
      'That depends on the scope and on how you are handling it today.',
      'It would need to be reviewed based on your current process.',
      'I do not want to make up a fixed answer without understanding your case.'
    ],
    greetings: [
      'Hi, I am the ZUBU assistant.',
      'Hi, this is the ZUBU assistant.',
      'Hello, I am ZUBU’s commercial assistant.'
    ],
    greetingQuestions: [
      'What would you like to improve in your business?',
      'What process are you looking to organize or automate?',
      'What would you like help with?'
    ],
    qualificationQuestions: {
      businessType: ['What kind of business do you have?', 'What industry are you in?', 'What type of company or business are you running today?'],
      mainProblem: ['What is causing the biggest issue right now?', 'What is the main problem you want to solve?', 'Where are you losing the most time or order today?'],
      processToAutomate: ['What process do you want to automate or improve?', 'What would you like to organize first?', 'Are you looking to solve something specific or improve a full process?'],
      currentTools: ['How are you handling it today?', 'What tools are you currently using?', 'Are you doing this manually, with Excel, or with some other system?'],
      channel: ['Do most inquiries come through WhatsApp, Instagram, or your website?', 'What is your main channel today?', 'Where do most inquiries or sales come in?'],
      urgency: ['Is this urgent or are you still exploring?', 'Do you need to solve this soon or are you evaluating options?', 'Is this for this month or later on?'],
      goal: ['What would you like to achieve with this: save time, sell more, or gain more control?', 'What is the main goal for this project?', 'What result would you like to see first?'],
      contactMethod: ['Would you like me to send you to WhatsApp?', 'Would you prefer to continue on WhatsApp?', 'Do you want to keep this moving on WhatsApp?']
    },
    ctaWhatsapp: [
      'The best next step is to continue directly on WhatsApp.',
      'It makes more sense to review this on WhatsApp based on your case.',
      'If you want to move forward, the easiest option is to continue on WhatsApp.'
    ],
    pricing: [
      'That depends a lot on the scope, and I do not want to make up a price here.',
      'They do not handle fixed pricing through the chat because it changes depending on what you need.',
      'To avoid giving you the wrong number, it is better to review pricing based on your case.'
    ],
    contactLeadIn: [
      'Based on what you shared, this looks workable.',
      'From what you described, it makes sense to review this with the team.',
      'That already gives enough context to continue with ZUBU.'
    ],
    contactClose: [
      'If you want, continue directly on WhatsApp.',
      'I can send you the WhatsApp contact so you can keep going there.',
      'I will leave the WhatsApp contact so you can continue from there.'
    ],
    serviceAcknowledgements: [
      'Yes, that can definitely be worked on.',
      'Yes, that fits this kind of case very well.',
      'Yes, ZUBU works with exactly this kind of solution.'
    ],
    noTechnical: [
      'You do not need technical knowledge to get started.',
      'You do not need to know systems or technology to move forward with this.',
      'The technical side is handled by the team, so you do not need prior technical knowledge.'
    ],
    results: 'The usual gains are more order, more speed, more control, fewer manual tasks, fewer errors, and a better customer experience.',
    industries: 'They work with SMEs, service businesses, restaurants, e-commerce, real estate companies, firms, clinics, barbershops, hair salons, and spas.',
    timeGeneral: 'In general, a specific automation can be ready in a few days, while a custom system usually takes a few weeks. The exact timing depends on the diagnosis.',
    whatsappInfo: 'They work with WhatsApp automation and customer service.',
    appointmentsInfo: 'They work with appointments, bookings, reminders, and schedule organization, which is especially useful for clinics, barbershops, hair salons, spas, and similar businesses.',
    erpCrmInfo: 'They build ERP, CRM, management systems, admin panels, and custom software.',
    integrationsInfo: 'They connect tools so information can flow between CRM, ERP, forms, payments, and other processes.',
    collectionsInfo: 'Collections, reminders, bookings, and documents can also be automated.',
    reportsInfo: 'They also build reports, dashboards, KPIs, and panels to give you more visibility over the business.',
    aiInfo: 'They work with AI agents and smart automations, but AI is not always necessary. It depends on the process.',
    fallback: 'ZUBU helps companies and SMEs automate processes, organize operations, and build custom solutions.',
    socialInfo: 'As a public social channel shown on the website, ZUBU lists Instagram.',
    directWhatsapp: 'Direct WhatsApp',
    instagram: 'Instagram',
    diagnosis: 'They also offer a free diagnosis.',
    yesFollowUp: ['Perfect.', 'Great.', 'Got it.'],
    noFollowUp: ['No problem.', 'All good.', 'That is fine.'],
    languageCode: 'en'
  },
  pt: {
    businessSummary: 'A ZUBU é uma agência de automação, software sob medida e inteligência artificial para empresas e PMEs em Posadas, Misiones.',
    promise: 'O foco é economizar tempo, reduzir erros e aumentar vendas.',
    responseTime: 'Eles costumam responder em menos de 24 horas.',
    servicesSummary: 'Trabalham com automação de WhatsApp, ERP e CRM, integrações, cobranças, reservas, documentos, software sob medida, painéis, relatórios e IA aplicada.',
    safeUnknown: [
      'Isso depende do escopo e de como vocês fazem isso hoje.',
      'Precisaria ser analisado com base no processo atual de vocês.',
      'Não quero inventar uma resposta fechada sem entender melhor o seu caso.'
    ],
    greetings: [
      'Olá, sou o assistente da ZUBU.',
      'Oi, aqui é o assistente da ZUBU.',
      'Olá, sou o assistente comercial da ZUBU.'
    ],
    greetingQuestions: [
      'O que você gostaria de melhorar no seu negócio?',
      'Que processo você quer organizar ou automatizar?',
      'Em que posso te ajudar melhor?'
    ],
    qualificationQuestions: {
      businessType: ['Que tipo de negócio você tem?', 'Em que setor você atua?', 'Que tipo de empresa ou negócio vocês têm hoje?'],
      mainProblem: ['O que mais complica hoje?', 'Qual é o principal problema que você quer resolver?', 'Onde vocês mais perdem tempo ou organização hoje?'],
      processToAutomate: ['Que processo você quer automatizar ou melhorar?', 'O que você gostaria de organizar primeiro?', 'Você quer resolver algo pontual ou melhorar um processo mais completo?'],
      currentTools: ['Como vocês fazem isso hoje?', 'Que ferramentas vocês usam atualmente?', 'Isso é feito manualmente, com Excel ou com algum sistema?'],
      channel: ['A maioria das consultas chega pelo WhatsApp, Instagram ou site?', 'Qual é o principal canal hoje?', 'Por onde entram mais consultas ou vendas?'],
      urgency: ['Isso é urgente ou você ainda está avaliando?', 'Vocês precisam resolver isso logo ou ainda estão explorando opções?', 'É algo para este mês ou mais para frente?'],
      goal: ['O que você quer ganhar com isso: economizar tempo, vender mais ou ter mais controle?', 'Qual é o objetivo principal?', 'Que resultado você gostaria de ver primeiro?'],
      contactMethod: ['Quer que eu te encaminhe para o WhatsApp?', 'Você prefere seguir pelo WhatsApp?', 'Quer continuar isso direto no WhatsApp?']
    },
    ctaWhatsapp: [
      'O melhor próximo passo é seguir direto pelo WhatsApp.',
      'Faz mais sentido ver isso no WhatsApp com base no seu caso.',
      'Se quiser avançar, o caminho mais prático é continuar pelo WhatsApp.'
    ],
    pricing: [
      'Isso depende bastante do escopo, e eu não quero inventar um preço por aqui.',
      'Eles não trabalham com preço fixo pelo chat porque muda conforme o que você precisa.',
      'Para não te passar um valor errado, o ideal é ver isso conforme o seu caso.'
    ],
    contactLeadIn: [
      'Pelo que você contou, isso dá para trabalhar.',
      'Com o que você descreveu, já faz sentido ver isso com a equipe.',
      'Isso já dá um bom contexto para seguir com a ZUBU.'
    ],
    contactClose: [
      'Se quiser, segue direto pelo WhatsApp.',
      'Posso te passar o WhatsApp para continuar por lá.',
      'Vou te deixar o WhatsApp para vocês seguirem por ali.'
    ],
    serviceAcknowledgements: [
      'Sim, isso dá para trabalhar.',
      'Sim, isso se encaixa muito bem nesse tipo de caso.',
      'Sim, a ZUBU trabalha justamente com esse tipo de solução.'
    ],
    noTechnical: [
      'Você não precisa de conhecimento técnico para começar.',
      'Não precisa entender de sistemas para avançar com isso.',
      'A parte técnica fica com a equipe, então você não precisa ter conhecimento prévio.'
    ],
    results: 'O ganho mais comum é mais organização, mais velocidade, mais controle, menos tarefas manuais, menos erros e uma experiência melhor para o cliente.',
    industries: 'Eles trabalham com PMEs, empresas de serviços, gastronomia, e-commerce, imobiliárias, escritórios, clínicas, barbearias, salões e spas.',
    timeGeneral: 'Em geral, uma automação pontual pode ficar pronta em poucos dias, enquanto um sistema sob medida costuma levar algumas semanas. O prazo exato depende do diagnóstico.',
    whatsappInfo: 'Eles trabalham com automação de WhatsApp e atendimento ao cliente.',
    appointmentsInfo: 'Eles trabalham com agendamentos, reservas, lembretes e organização de agenda, algo muito útil para clínicas, barbearias, salões, spas e negócios parecidos.',
    erpCrmInfo: 'Eles desenvolvem ERP, CRM, sistemas de gestão, painéis administrativos e software sob medida.',
    integrationsInfo: 'Eles integram ferramentas para que os dados circulem entre CRM, ERP, formulários, pagamentos e outros processos.',
    collectionsInfo: 'Cobranças, lembretes, reservas e documentos também podem ser automatizados.',
    reportsInfo: 'Eles também fazem relatórios, dashboards, KPIs e painéis para dar mais visibilidade ao negócio.',
    aiInfo: 'Eles trabalham com agentes de IA e automações inteligentes, mas IA nem sempre é necessária. Isso depende do processo.',
    fallback: 'A ZUBU ajuda empresas e PMEs a automatizar processos, organizar operações e desenvolver soluções sob medida.',
    socialInfo: 'Como rede pública visível no site, a ZUBU mostra o Instagram.',
    directWhatsapp: 'WhatsApp direto',
    instagram: 'Instagram',
    diagnosis: 'Eles também oferecem diagnóstico gratuito.',
    yesFollowUp: ['Perfeito.', 'Ótimo.', 'Fechado.'],
    noFollowUp: ['Sem problema.', 'Tudo certo.', 'Tranquilo.'],
    languageCode: 'pt'
  }
};

const currentCopy = t[language];

const labelMaps = {
  businessType: {
    barberia: { es: 'barbería', en: 'barbershop', pt: 'barbearia' },
    clinica: { es: 'clínica', en: 'clinic', pt: 'clínica' },
    inmobiliaria: { es: 'inmobiliaria', en: 'real estate business', pt: 'imobiliária' },
    ecommerce: { es: 'e-commerce', en: 'e-commerce', pt: 'e-commerce' },
    restaurante: { es: 'gastronomía', en: 'restaurant business', pt: 'gastronomia' },
    spa: { es: 'spa', en: 'spa', pt: 'spa' },
    pyme_servicios: { es: 'PyME de servicios', en: 'service SME', pt: 'PME de serviços' },
    estudio: { es: 'estudio', en: 'professional firm', pt: 'escritório' },
    peluqueria: { es: 'peluquería', en: 'hair salon', pt: 'salão de beleza' }
  },
  process: {
    appointments: { es: 'turnos y reservas', en: 'appointments and bookings', pt: 'agendamentos e reservas' },
    whatsapp_support: { es: 'atención por WhatsApp', en: 'WhatsApp customer service', pt: 'atendimento pelo WhatsApp' },
    sales_followup: { es: 'seguimiento comercial', en: 'sales follow-up', pt: 'follow-up comercial' },
    crm: { es: 'CRM', en: 'CRM', pt: 'CRM' },
    erp: { es: 'ERP', en: 'ERP', pt: 'ERP' },
    collections: { es: 'cobros', en: 'collections', pt: 'cobranças' },
    documents: { es: 'documentos', en: 'documents', pt: 'documentos' },
    reports: { es: 'reportes y KPIs', en: 'reports and KPIs', pt: 'relatórios e KPIs' },
    integrations: { es: 'integraciones', en: 'integrations', pt: 'integrações' },
    management_panel: { es: 'panel de gestión', en: 'management panel', pt: 'painel de gestão' }
  },
  problem: {
    slow_response: { es: 'responden tarde', en: 'slow response times', pt: 'respondem com atraso' },
    disorder: { es: 'tienen todo desordenado', en: 'things are disorganized', pt: 'está tudo desorganizado' },
    losing_sales: { es: 'pierden ventas', en: 'they are losing sales', pt: 'estão perdendo vendas' },
    high_volume: { es: 'les escriben mucho por WhatsApp', en: 'they get too many WhatsApp messages', pt: 'recebem muitas mensagens no WhatsApp' },
    manual_work: { es: 'hacen demasiado manual', en: 'too much work is still manual', pt: 'fazem muita coisa manualmente' },
    mixed_appointments: { es: 'se mezclan los turnos', en: 'appointments get mixed up', pt: 'os agendamentos ficam bagunçados' },
    collections_issue: { es: 'no llevan bien los cobros', en: 'collections are hard to manage', pt: 'as cobranças estão desorganizadas' },
    data_errors: { es: 'tienen errores de carga', en: 'they have data entry errors', pt: 'há erros de lançamento' },
    no_visibility: { es: 'no saben bien qué está pasando en el negocio', en: 'they lack visibility into the business', pt: 'falta visibilidade do negócio' },
    no_control: { es: 'sienten poco control sobre la operación', en: 'they feel they lack operational control', pt: 'sentem falta de controle na operação' }
  },
  goal: {
    save_time: { es: 'ahorrar tiempo', en: 'save time', pt: 'economizar tempo' },
    increase_sales: { es: 'vender más', en: 'increase sales', pt: 'vender mais' },
    reduce_errors: { es: 'reducir errores', en: 'reduce errors', pt: 'reduzir erros' },
    organize: { es: 'ordenar la operación', en: 'organize operations', pt: 'organizar a operação' },
    faster_response: { es: 'responder más rápido', en: 'respond faster', pt: 'responder mais rápido' },
    automate_tasks: { es: 'automatizar tareas', en: 'automate tasks', pt: 'automatizar tarefas' },
    control: { es: 'tener más control', en: 'gain more control', pt: 'ter mais controle' },
    scale: { es: 'escalar', en: 'scale', pt: 'escalar' }
  },
  urgency: {
    urgent: { es: 'urgente', en: 'urgent', pt: 'urgente' },
    this_month: { es: 'este mes', en: 'this month', pt: 'este mês' },
    asap: { es: 'lo antes posible', en: 'as soon as possible', pt: 'o quanto antes' },
    exploring: { es: 'lo están evaluando', en: 'they are still exploring', pt: 'ainda estão avaliando' },
    later: { es: 'más adelante', en: 'later on', pt: 'mais para frente' }
  },
  channel: {
    whatsapp: { es: 'WhatsApp', en: 'WhatsApp', pt: 'WhatsApp' },
    instagram: { es: 'Instagram', en: 'Instagram', pt: 'Instagram' },
    web: { es: 'web', en: 'website', pt: 'site' },
    calls: { es: 'llamadas', en: 'calls', pt: 'ligações' },
    local: { es: 'local', en: 'storefront', pt: 'loja física' },
    social: { es: 'redes sociales', en: 'social media', pt: 'redes sociais' }
  },
  tool: {
    whatsapp: { es: 'WhatsApp', en: 'WhatsApp', pt: 'WhatsApp' },
    excel: { es: 'Excel', en: 'Excel', pt: 'Excel' },
    google_sheets: { es: 'Google Sheets', en: 'Google Sheets', pt: 'Google Sheets' },
    web_form: { es: 'formulario web', en: 'web form', pt: 'formulário web' },
    crm: { es: 'CRM', en: 'CRM', pt: 'CRM' },
    erp: { es: 'ERP', en: 'ERP', pt: 'ERP' },
    mercado_pago: { es: 'Mercado Pago', en: 'Mercado Pago', pt: 'Mercado Pago' },
    manual_agenda: { es: 'agenda manual', en: 'manual schedule', pt: 'agenda manual' },
    notebook: { es: 'cuaderno', en: 'notebook', pt: 'caderno' },
    instagram: { es: 'Instagram', en: 'Instagram', pt: 'Instagram' },
    tienda_nube: { es: 'Tienda Nube', en: 'Tienda Nube', pt: 'Tienda Nube' },
    email: { es: 'correo', en: 'email', pt: 'e-mail' },
    custom_system: { es: 'sistema propio', en: 'custom system', pt: 'sistema próprio' }
  },
  contactMethod: {
    whatsapp: { es: 'WhatsApp', en: 'WhatsApp', pt: 'WhatsApp' },
    call: { es: 'llamada', en: 'call', pt: 'ligação' },
    email: { es: 'mail', en: 'email', pt: 'e-mail' },
    meeting: { es: 'reunión', en: 'meeting', pt: 'reunião' }
  }
};

const localizedLabel = (group, code) => labelMaps[group]?.[code]?.[language] || null;

const findCode = (catalog) => {
  for (const [code, terms] of Object.entries(catalog)) {
    if (containsAny(normalizedSearch, terms)) return code;
  }
  return null;
};

const businessTypeCode = findCode({
  barberia: ['barberia', 'barbería', 'barbershop', 'barbearia'],
  clinica: ['clinica', 'clínica', 'clinic', 'clinica médica'],
  inmobiliaria: ['inmobiliaria', 'real estate', 'real estate agency', 'imobiliaria'],
  ecommerce: ['ecommerce', 'e-commerce', 'online store', 'loja virtual'],
  restaurante: ['restaurante', 'restaurant', 'gastronomia', 'food business'],
  spa: ['spa'],
  pyme_servicios: ['pyme', 'small business', 'sme', 'empresa de servicios', 'service business', 'empresa de servicos', 'pme'],
  estudio: ['estudio', 'firm', 'office', 'escritorio'],
  peluqueria: ['peluqueria', 'peluquería', 'hair salon', 'salao', 'salon']
});

const processCode = findCode({
  appointments: ['turnos', 'reservas', 'agenda', 'appointment', 'appointments', 'booking', 'bookings', 'schedule', 'scheduling', 'agendamentos', 'reservas'],
  whatsapp_support: ['whatsapp', 'atencion por whatsapp', 'atención por whatsapp', 'chatbot', 'automatic replies', 'customer service', 'atendimento', 'respostas automáticas', 'respuestas automaticas', 'respuestas automáticas'],
  sales_followup: ['seguimiento comercial', 'follow up', 'follow-up', 'lead follow', 'ventas por whatsapp', 'follow-up comercial'],
  crm: ['crm'],
  erp: ['erp'],
  collections: ['cobros', 'cobranza', 'payment reminders', 'collections', 'cobrancas', 'cobranças'],
  documents: ['documentos', 'documents', 'docs'],
  reports: ['reportes', 'kpis', 'reporting', 'reports', 'dashboard', 'dashboards', 'metricas', 'métricas', 'relatorios', 'relatórios'],
  integrations: ['integracion', 'integración', 'integraciones', 'integration', 'integrations', 'integração', 'integrações'],
  management_panel: ['panel', 'panel de gestion', 'panel de gestión', 'management panel', 'admin panel', 'painel', 'painel de gestão']
});

const problemCode = findCode({
  slow_response: ['respondo tarde', 'respondemos tarde', 'responden tarde', 'slow response', 'reply late', 'demoran en responder', 'respondem tarde'],
  disorder: ['todo desordenado', 'desorden', 'chaos', 'caos', 'desorganizado', 'desorganizada', 'bagunçado', 'baguncado', 'bagunçada'],
  losing_sales: ['pierdo ventas', 'perdemos ventas', 'pierden ventas', 'lose sales', 'losing sales', 'perco vendas', 'perdendo vendas'],
  high_volume: ['me escriben mucho por whatsapp', 'muchas consultas', 'too many messages', 'too many inquiries', 'muitas mensagens', 'muitas consultas'],
  manual_work: ['hago todo manual', 'hacemos todo manual', 'todo manual', 'manually', 'manual', 'faço tudo manual', 'fazemos tudo manual'],
  mixed_appointments: ['se me mezclan los turnos', 'se mezclan los turnos', 'appointments get mixed up', 'booking mess', 'agendamentos baguncados', 'agendamentos bagunçados', 'agendamentos ficam baguncados', 'agendamentos ficam bagunçados', 'turnos desordenados'],
  collections_issue: ['no llevo bien los cobros', 'no llevamos bien los cobros', 'cobros desordenados', 'collection issues', 'payment reminders are messy', 'não levo bem as cobranças', 'cobrancas desorganizadas', 'cobranças desorganizadas'],
  data_errors: ['errores de carga', 'data entry errors', 'carga manual con errores', 'erros de lancamento', 'erros de lançamento'],
  no_visibility: ['no se que esta pasando', 'no sé qué está pasando', 'no tenemos visibilidad', 'lack visibility', 'sem visibilidade', 'nao sei o que está acontecendo', 'não sei o que está acontecendo'],
  no_control: ['no tengo control', 'no tenemos control', 'falta de control', 'lack of control', 'sem controle', 'falta de controle']
});

const goalCode = findCode({
  save_time: ['ahorrar tiempo', 'save time', 'economizar tempo'],
  increase_sales: ['vender mas', 'vender más', 'increase sales', 'sell more', 'vender mais'],
  reduce_errors: ['reducir errores', 'reduce errors', 'reduzir erros'],
  organize: ['ordenar la operacion', 'ordenar la operación', 'organize operations', 'organizar operacoes', 'organizar operações'],
  faster_response: ['responder mas rapido', 'responder más rápido', 'respond faster', 'responder mais rapido', 'responder mais rápido'],
  automate_tasks: ['automatizar tareas', 'automate tasks', 'automatizar tarefas'],
  control: ['tener mas control', 'tener más control', 'gain more control', 'ter mais controle'],
  scale: ['escalar', 'scale']
});

const urgencyCode = findCode({
  urgent: ['urgente', 'urgent'],
  this_month: ['este mes', 'this month', 'este mes'],
  asap: ['lo antes posible', 'as soon as possible', 'quanto antes', 'o quanto antes'],
  exploring: ['estoy viendo', 'evaluando', 'exploring', 'just looking', 'avaliando'],
  later: ['mas adelante', 'más adelante', 'later', 'later on', 'mais para frente']
});

const channelCode = findCode({
  whatsapp: ['whatsapp'],
  instagram: ['instagram'],
  web: ['web', 'website', 'site', 'sitio'],
  calls: ['llamadas', 'calls', 'ligacoes', 'ligações'],
  local: ['local', 'store', 'storefront', 'loja'],
  social: ['redes', 'social media', 'redes sociais']
});

const toolCatalog = {
  whatsapp: ['whatsapp'],
  excel: ['excel'],
  google_sheets: ['google sheets', 'sheets'],
  web_form: ['formulario web', 'formulario', 'web form', 'form'],
  crm: ['crm'],
  erp: ['erp'],
  mercado_pago: ['mercado pago'],
  manual_agenda: ['agenda manual', 'manual schedule', 'agenda de papel'],
  notebook: ['cuaderno', 'notebook', 'caderno'],
  instagram: ['instagram'],
  tienda_nube: ['tienda nube'],
  email: ['correo', 'email', 'mail', 'e-mail'],
  custom_system: ['sistema propio', 'custom system', 'sistema interno']
};
const currentToolCodes = Object.entries(toolCatalog)
  .filter(([, terms]) => containsAny(normalizedSearch, terms))
  .map(([code]) => code);

const contactMethodCode = findCode({
  whatsapp: ['whatsapp'],
  call: ['llamada', 'call', 'phone call', 'ligacao', 'ligação'],
  email: ['mail', 'email', 'correo', 'e-mail'],
  meeting: ['reunion', 'reunión', 'meeting', 'call with team', 'reuniao', 'reunião']
});

const volumePatterns = [
  /(\\d{1,4})\\s*(consultas|consultation|inquiries|messages|mensajes|mensagens)\\s*(por|per)?\\s*(dia|día|day)?/i,
  /(\\d{1,4})\\s*(turnos|appointments|bookings|agendamentos|reservas)\\s*(por|per)?\\s*(semana|week)?/i,
  /(\\d{1,4})\\s*(ventas|sales|vendas|clientes|clients)\\s*(por|per)?\\s*(mes|month)?/i
];
let volumeValue = null;
for (const pattern of volumePatterns) {
  const match = normalizedMessage.match(pattern);
  if (match) {
    volumeValue = cleanWhitespace(match[0]);
    break;
  }
}

const rawNameMatch = normalizedMessage.match(/(?:me llamo|soy|mi nombre es|i am|my name is|sou|me chamo)\\s+([A-Za-zÁÉÍÓÚáéíóúÑñÇç]{2,}(?:\\s+[A-Za-zÁÉÍÓÚáéíóúÑñÇç]{2,})?)/i);
const rawBusinessNameMatch = normalizedMessage.match(/(?:mi negocio se llama|mi empresa se llama|my business is|my company is|meu negocio se chama|meu negócio se chama|minha empresa se chama)\\s+([^,.!]+)/i);

const captureUpdates = {
  name: rawNameMatch ? cleanWhitespace(rawNameMatch[1]) : null,
  businessName: rawBusinessNameMatch ? cleanWhitespace(rawBusinessNameMatch[1]) : null,
  businessType: businessTypeCode ? localizedLabel('businessType', businessTypeCode) : null,
  mainProblem: problemCode ? localizedLabel('problem', problemCode) : null,
  processToAutomate: processCode ? localizedLabel('process', processCode) : null,
  currentTools: joinList(currentToolCodes.map((code) => localizedLabel('tool', code))),
  channel: channelCode ? localizedLabel('channel', channelCode) : null,
  volume: volumeValue,
  urgency: urgencyCode ? localizedLabel('urgency', urgencyCode) : null,
  goal: goalCode ? localizedLabel('goal', goalCode) : null,
  contactMethod: contactMethodCode ? localizedLabel('contactMethod', contactMethodCode) : null,
  language,
};

const mergedCapture = {
  name: mergeValue(previousSessionState.capture?.name, captureUpdates.name),
  businessName: mergeValue(previousSessionState.capture?.businessName, captureUpdates.businessName),
  businessType: mergeValue(previousSessionState.capture?.businessType, captureUpdates.businessType),
  mainProblem: mergeValue(previousSessionState.capture?.mainProblem, captureUpdates.mainProblem),
  processToAutomate: mergeValue(previousSessionState.capture?.processToAutomate, captureUpdates.processToAutomate),
  currentTools: mergeValue(previousSessionState.capture?.currentTools, captureUpdates.currentTools),
  channel: mergeValue(previousSessionState.capture?.channel, captureUpdates.channel),
  volume: mergeValue(previousSessionState.capture?.volume, captureUpdates.volume),
  urgency: mergeValue(previousSessionState.capture?.urgency, captureUpdates.urgency),
  goal: mergeValue(previousSessionState.capture?.goal, captureUpdates.goal),
  contactMethod: mergeValue(previousSessionState.capture?.contactMethod, captureUpdates.contactMethod),
  language,
};

const affirmativeTerms = ['si', 'sí', 'dale', 'de una', 'claro', 'ok', 'okay', 'yes', 'sure', 'go ahead', 'sounds good', 'sim', 'claro', 'pode ser', 'manda', 'a ver', 'show me', 'send it'];
const negativeTerms = ['no', 'nope', 'nah', 'negative', 'nao', 'não'];
const isAffirmative = containsAny(normalizedSearch, affirmativeTerms) && textTokens.length <= 4;
const isNegative = containsAny(normalizedSearch, negativeTerms) && textTokens.length <= 3;

const directIntentMatches = {
  greeting: ['hola', 'buenas', 'que tal', 'qué tal', 'info', 'queria consultar', 'quería consultar', 'me interesa', 'queria averiguar', 'quería averiguar', 'hello', 'hi', 'hey', 'i want info', 'i want to ask', 'im interested', 'i am interested', 'can you help me', 'oi', 'ola', 'olá', 'queria informacoes', 'queria informações', 'tenho interesse'],
  what_is_zubu: ['que hacen', 'qué hacen', 'a que se dedican', 'a qué se dedican', 'que es zubu', 'qué es zubu', 'en que me pueden ayudar', 'en qué me pueden ayudar', 'what do you do', 'what is zubu', 'what does your agency do', 'how can you help me', 'o que voces fazem', 'o que vocês fazem', 'o que e a zubu', 'o que é a zubu', 'como podem me ajudar'],
  services_general: ['que ofrecen', 'qué ofrecen', 'que servicios hacen', 'qué servicios hacen', 'que soluciones tienen', 'qué soluciones tienen', 'que me pueden resolver', 'qué me pueden resolver', 'what do you offer', 'what services do you provide', 'what solutions do you have', 'what can you help with', 'o que voces oferecem', 'o que vocês oferecem', 'quais servicos fazem', 'quais serviços fazem', 'que solucoes voces tem', 'que soluções vocês têm'],
  turnos_reservas: ['turnos', 'reservas', 'agenda', 'appointments', 'booking', 'bookings', 'schedule', 'scheduling', 'appointment reminders', 'agendamentos', 'agendamento'],
  whatsapp_automation: ['automatizan whatsapp', 'automatizacion de whatsapp', 'automatización de whatsapp', 'bots de whatsapp', 'respuestas automáticas por whatsapp', 'chatbot para whatsapp', 'atencion automatica por whatsapp', 'atención automática por whatsapp', 'ventas por whatsapp', 'seguimiento por whatsapp', 'automate whatsapp', 'whatsapp bot', 'automatic replies on whatsapp', 'automated customer service on whatsapp', 'sales through whatsapp', 'follow-up through whatsapp', 'automatizam whatsapp', 'bot para whatsapp', 'respostas automaticas no whatsapp', 'respostas automáticas no whatsapp', 'atendimento automatico no whatsapp', 'atendimento automático no whatsapp'],
  erp_crm: ['crm', 'erp', 'sistema de gestion', 'sistema de gestión', 'panel administrativo', 'sistema interno', 'software a medida', 'management system', 'admin panel', 'internal system', 'custom software', 'sistema de gestao', 'sistema de gestão', 'painel administrativo', 'software sob medida'],
  integrations: ['integran', 'integraciones', 'integracion', 'integración', 'connect systems', 'integrate whatsapp with crm', 'integrate forms', 'integrate payments', 'connect everything', 'integram', 'integrações', 'integracoes', 'conectam sistemas'],
  collections_documents: ['cobros', 'cobranza', 'recordatorios de pago', 'payment reminders', 'collections', 'automatic documents', 'automated reservations', 'cobrancas', 'cobranças', 'lembretes de pagamento', 'documentos automaticos', 'documentos automáticos'],
  reports_kpis: ['reportes', 'dashboards', 'paneles', 'metricas', 'métricas', 'indicadores', 'kpis', 'analisis del negocio', 'business analytics', 'reports', 'painéis', 'paineis', 'relatorios', 'relatórios', 'analise do negocio', 'análise do negócio'],
  ai_agents: ['usan ia', 'agentes de ia', 'inteligencia artificial', 'inteligencia artificial', 'bot con ia', 'do you use ai', 'ai agents', 'artificial intelligence', 'ai automation', 'vocês usam ia', 'voces usam ia', 'agentes de ia', 'inteligencia artificial', 'inteligência artificial', 'bot com ia'],
  industries: ['trabajan con mi rubro', 'trabajan con pymes', 'sirve para mi negocio', 'clinicas', 'clínicas', 'inmobiliarias', 'e-commerce', 'do you work with my industry', 'does this work for my business', 'small businesses', 'real estate', 'serve para meu negocio', 'serve para meu negócio', 'trabalham com meu setor', 'pequenas empresas', 'imobiliarias', 'imobiliárias'],
  implementation_time: ['cuanto tarda', 'cuánto tarda', 'en cuanto esta', 'en cuánto está', 'tiempo de implementacion', 'tiempo de implementación', 'how long', 'implementation time', 'how fast can this be done', 'quanto tempo leva', 'tempo de implementacao', 'tempo de implementação'],
  pricing: ['precio', 'precios', 'cuanto sale', 'cuánto sale', 'cuanto cobran', 'cuánto cobran', 'planes', 'presupuesto', 'costo', 'costos', 'valor', 'tarifa', 'price', 'prices', 'how much', 'cost', 'pricing', 'quote', 'budget', 'plan', 'plans', 'preco', 'preço', 'precos', 'preços', 'quanto custa', 'quanto sai', 'orcamento', 'orçamento', 'plano', 'planos'],
  technical_knowledge: ['no entiendo de tecnologia', 'no entiendo de tecnología', 'no entiendo de sistemas', 'conocimientos tecnicos', 'conocimientos técnicos', 'es complicado usarlo', 'do i need technical knowledge', 'i dont understand tech', 'i do not understand tech', 'i do not understand anything about tech', 'is it hard to use', 'preciso saber de tecnologia', 'nao entendo de sistemas', 'não entendo de sistemas', 'é dificil de usar', 'é difícil de usar'],
  results: ['beneficios', 'que beneficios', 'qué beneficios', 'en que me ayuda', 'en qué me ayuda', 'que resultados da', 'qué resultados da', 'para que me sirve', 'para qué me sirve', 'que mejora', 'what are the benefits', 'how does this help me', 'what results can it bring', 'what does it improve', 'quais sao os beneficios', 'quais são os benefícios', 'como isso me ajuda', 'que resultados traz', 'o que melhora'],
  contact: ['quiero avanzar', 'quiero hablar con alguien', 'quiero una reunion', 'quiero una reunión', 'quiero diagnostico', 'quiero diagnóstico', 'me contacto por whatsapp', 'pasame el contacto', 'quiero que me escriban', 'i want to move forward', 'i want to talk to someone', 'i want a meeting', 'i want a diagnosis', 'send me your whatsapp', 'give me the contact', 'i want someone to reach out', 'quero avançar', 'quero falar com alguem', 'quero falar com alguém', 'quero uma reuniao', 'quero uma reunião', 'quero um diagnostico', 'quero um diagnóstico', 'me passa o whatsapp', 'quero que entrem em contato', 'instagram', 'redes', 'social media', 'redes sociais']
};

const matchedIntentOrder = [
  'pricing',
  'contact',
  'technical_knowledge',
  'implementation_time',
  'turnos_reservas',
  'whatsapp_automation',
  'erp_crm',
  'integrations',
  'collections_documents',
  'reports_kpis',
  'ai_agents',
  'industries',
  'results',
  'what_is_zubu',
  'services_general',
  'greeting'
];

let intent = 'fallback';
for (const candidateIntent of matchedIntentOrder) {
  if (containsAny(normalizedSearch, directIntentMatches[candidateIntent])) {
    intent = candidateIntent;
    break;
  }
}

const answeredRequestedField = previousSessionState.lastQuestionField && Boolean(captureUpdates[previousSessionState.lastQuestionField]);
if (intent === 'fallback' && answeredRequestedField && previousSessionState.lastIntent && previousSessionState.lastIntent !== 'fallback') {
  intent = previousSessionState.lastIntent === 'greeting' ? 'services_general' : previousSessionState.lastIntent;
}

if (intent === 'contact' && containsAny(normalizedSearch, ['redes', 'instagram', 'social media', 'redes sociais']) && !containsAny(normalizedSearch, ['whatsapp', 'contacto', 'contact', 'contato'])) {
  intent = 'contact';
}

if (intent === 'fallback' && (isAffirmative || isNegative) && previousSessionState.lastOffer) {
  intent = previousSessionState.lastIntent || 'contact';
}

const progressingIntent = intent === 'contact' || intent === 'pricing' || mergedCapture.contactMethod === localizedLabel('contactMethod', 'whatsapp');
const hasLeadContext = Boolean(mergedCapture.businessType && mergedCapture.mainProblem && mergedCapture.processToAutomate);
const qualifiedLead = Boolean(hasLeadContext && progressingIntent);

const baseMissingFields = [];
if (!mergedCapture.businessType) baseMissingFields.push('businessType');
if (!mergedCapture.mainProblem) baseMissingFields.push('mainProblem');
if (!mergedCapture.processToAutomate) baseMissingFields.push('processToAutomate');
if (intent === 'integrations' && !mergedCapture.currentTools) baseMissingFields.push('currentTools');
if (intent === 'whatsapp_automation' && !mergedCapture.channel) baseMissingFields.push('channel');
if (intent === 'contact' && !mergedCapture.contactMethod) baseMissingFields.push('contactMethod');
const missingFields = uniqueList(baseMissingFields).slice(0, 3);

const whatsappLine = contactConfig.whatsappUrl
  ? (currentCopy.directWhatsapp + ': ' + contactConfig.whatsappUrl)
  : '';
const instagramLine = currentCopy.instagram + ': ' + contactConfig.instagramUrl;

const buildContactCta = () => {
  const parts = [
    pickVariant('cta_whatsapp', currentCopy.ctaWhatsapp),
    whatsappLine,
  ];
  if (contactConfig.freeDiagnosis) parts.push(currentCopy.diagnosis);
  if (currentCopy.responseTime) parts.push(currentCopy.responseTime);
  return parts.filter(Boolean).join(' ');
};

const selectQuestion = (field) => pickVariant('question_' + field, currentCopy.qualificationQuestions[field] || []);

const selectNextQuestion = () => {
  const prioritiesByIntent = {
    greeting: ['businessType', 'mainProblem'],
    what_is_zubu: ['businessType', 'mainProblem'],
    services_general: ['businessType', 'mainProblem'],
    turnos_reservas: ['currentTools', 'channel'],
    whatsapp_automation: ['processToAutomate', 'channel', 'mainProblem'],
    erp_crm: ['mainProblem', 'processToAutomate'],
    integrations: ['currentTools', 'processToAutomate'],
    collections_documents: ['mainProblem', 'processToAutomate'],
    reports_kpis: ['goal', 'mainProblem'],
    ai_agents: ['processToAutomate', 'mainProblem'],
    industries: ['businessType', 'mainProblem'],
    implementation_time: ['processToAutomate', 'businessType'],
    technical_knowledge: ['processToAutomate', 'mainProblem'],
    results: ['mainProblem', 'goal'],
    contact: missingFields.length ? [missingFields[0]] : ['contactMethod'],
    fallback: ['businessType', 'mainProblem']
  };
  const priorities = prioritiesByIntent[intent] || prioritiesByIntent.fallback;
  for (const field of priorities) {
    if (!mergedCapture[field]) {
      return { field, text: selectQuestion(field) };
    }
  }
  return null;
};

const buildStructuredReply = (mainText, questionText, includeWhatsapp) => {
  const parts = [mainText];
  if (questionText) parts.push(questionText);
  if (includeWhatsapp) parts.push(buildContactCta());
  return parts.filter(Boolean).join(' ');
};

let reason = 'fallback';
let confidence = 0.7;
let shouldRedirectToWhatsApp = false;
let lastOffer = null;

if (!normalizedMessage) {
  const invalidReply = {
    es: 'No pude leer tu mensaje. Probá de nuevo.',
    en: 'I could not read your message. Please try again.',
    pt: 'Não consegui ler sua mensagem. Tente novamente.'
  };
  return [{
    json: {
      message: '',
      sessionId,
      source,
      timestamp,
      language,
      intent: 'fallback',
      responseCode: 400,
      responseBody: {
        ok: false,
        reply: invalidReply[language],
        intent: 'fallback',
        confidence: 0,
        capture: mergedCapture,
        missingFields: ['mainProblem'],
        qualifiedLead: false,
        shouldRedirectToWhatsApp: false,
        reason: 'empty_message',
        sessionId,
        language,
        source: 'landing-website-knowledge-base'
      }
    }
  }];
}

let reply = '';
const nextQuestion = selectNextQuestion();

if ((isAffirmative || containsAny(normalizedSearch, ['a ver', 'show me', 'manda'])) && previousSessionState.lastOffer === 'whatsapp') {
  shouldRedirectToWhatsApp = true;
  confidence = 0.92;
  reason = 'cta_acceptance';
  reply = buildStructuredReply(pickVariant('yes_followup', currentCopy.yesFollowUp), null, true);
} else if (isNegative && previousSessionState.lastOffer === 'whatsapp') {
  confidence = 0.82;
  reason = 'cta_declined';
  reply = buildStructuredReply(pickVariant('no_followup', currentCopy.noFollowUp), selectQuestion(nextQuestion?.field || 'businessType'), false);
} else if (intent === 'greeting') {
  confidence = 0.92;
  reason = 'greeting';
  reply = buildStructuredReply(
    pickVariant('greeting', currentCopy.greetings) + ' ' + currentCopy.businessSummary + ' ' + currentCopy.promise,
    pickVariant('greeting_question', currentCopy.greetingQuestions),
    false
  );
} else if (intent === 'what_is_zubu' || intent === 'services_general') {
  confidence = 0.9;
  reason = intent;
  reply = buildStructuredReply(
    currentCopy.businessSummary + ' ' + currentCopy.servicesSummary,
    nextQuestion ? nextQuestion.text : selectQuestion('mainProblem'),
    false
  );
} else if (intent === 'turnos_reservas') {
  confidence = 0.9;
  reason = 'appointments';
  reply = buildStructuredReply(
    pickVariant('service_ack_turnos', currentCopy.serviceAcknowledgements) + ' ' + currentCopy.appointmentsInfo,
    nextQuestion ? nextQuestion.text : selectQuestion('currentTools'),
    false
  );
} else if (intent === 'whatsapp_automation') {
  confidence = 0.92;
  reason = 'whatsapp_automation';
  reply = buildStructuredReply(
    pickVariant('service_ack_whatsapp', currentCopy.serviceAcknowledgements) + ' ' + currentCopy.whatsappInfo,
    nextQuestion ? nextQuestion.text : selectQuestion('processToAutomate'),
    false
  );
} else if (intent === 'erp_crm') {
  confidence = 0.9;
  reason = 'erp_crm';
  reply = buildStructuredReply(
    pickVariant('service_ack_erp', currentCopy.serviceAcknowledgements) + ' ' + currentCopy.erpCrmInfo,
    nextQuestion ? nextQuestion.text : selectQuestion('mainProblem'),
    false
  );
} else if (intent === 'integrations') {
  confidence = 0.9;
  reason = 'integrations';
  reply = buildStructuredReply(
    pickVariant('service_ack_integrations', currentCopy.serviceAcknowledgements) + ' ' + currentCopy.integrationsInfo,
    nextQuestion ? nextQuestion.text : selectQuestion('currentTools'),
    false
  );
} else if (intent === 'collections_documents') {
  confidence = 0.9;
  reason = 'collections_documents';
  reply = buildStructuredReply(
    pickVariant('service_ack_collections', currentCopy.serviceAcknowledgements) + ' ' + currentCopy.collectionsInfo,
    nextQuestion ? nextQuestion.text : selectQuestion('mainProblem'),
    false
  );
} else if (intent === 'reports_kpis') {
  confidence = 0.88;
  reason = 'reports_kpis';
  reply = buildStructuredReply(
    pickVariant('service_ack_reports', currentCopy.serviceAcknowledgements) + ' ' + currentCopy.reportsInfo,
    nextQuestion ? nextQuestion.text : selectQuestion('goal'),
    false
  );
} else if (intent === 'ai_agents') {
  confidence = 0.88;
  reason = 'ai_agents';
  reply = buildStructuredReply(
    pickVariant('service_ack_ai', currentCopy.serviceAcknowledgements) + ' ' + currentCopy.aiInfo,
    nextQuestion ? nextQuestion.text : selectQuestion('processToAutomate'),
    false
  );
} else if (intent === 'industries') {
  confidence = 0.86;
  reason = 'industries';
  reply = buildStructuredReply(
    currentCopy.industries,
    nextQuestion ? nextQuestion.text : selectQuestion('businessType'),
    false
  );
} else if (intent === 'implementation_time') {
  confidence = 0.87;
  reason = 'implementation_time';
  reply = buildStructuredReply(
    currentCopy.timeGeneral,
    nextQuestion ? nextQuestion.text : selectQuestion('processToAutomate'),
    false
  );
} else if (intent === 'technical_knowledge') {
  confidence = 0.9;
  reason = 'technical_knowledge';
  reply = buildStructuredReply(
    pickVariant('no_technical', currentCopy.noTechnical),
    nextQuestion ? nextQuestion.text : selectQuestion('processToAutomate'),
    false
  );
} else if (intent === 'results') {
  confidence = 0.86;
  reason = 'results';
  reply = buildStructuredReply(
    currentCopy.results,
    nextQuestion ? nextQuestion.text : selectQuestion('mainProblem'),
    false
  );
} else if (intent === 'pricing') {
  confidence = 0.97;
  reason = 'pricing_rule';
  shouldRedirectToWhatsApp = true;
  lastOffer = 'whatsapp';
  reply = buildStructuredReply(
    pickVariant('pricing_reply', currentCopy.pricing),
    null,
    true
  );
} else if (intent === 'contact') {
  confidence = 0.95;
  reason = qualifiedLead ? 'qualified_lead_closure' : 'contact_request';
  shouldRedirectToWhatsApp = true;
  lastOffer = 'whatsapp';

  const askedForSocialOnly = containsAny(normalizedSearch, ['redes', 'instagram', 'social media', 'redes sociais']) && !containsAny(normalizedSearch, ['whatsapp', 'contacto', 'contact', 'contato']);
  if (askedForSocialOnly) {
    reply = buildStructuredReply(currentCopy.socialInfo + ' ' + instagramLine + '.', null, true);
  } else if (qualifiedLead) {
    reply = buildStructuredReply(
      pickVariant('contact_leadin', currentCopy.contactLeadIn) + ' ' + pickVariant('contact_close', currentCopy.contactClose),
      null,
      true
    );
  } else if (missingFields.length) {
    reply = buildStructuredReply(
      pickVariant('contact_leadin', currentCopy.contactLeadIn),
      selectQuestion(missingFields[0]),
      true
    );
  } else {
    reply = buildStructuredReply(
      pickVariant('contact_close_only', currentCopy.contactClose),
      null,
      true
    );
  }
} else {
  const safeUnknown = pickVariant('safe_unknown', currentCopy.safeUnknown);
  confidence = 0.62;
  reason = 'fallback';
  reply = buildStructuredReply(
    currentCopy.fallback + ' ' + safeUnknown,
    nextQuestion ? nextQuestion.text : selectQuestion('businessType'),
    false
  );
}

if (!reply) {
  reply = buildStructuredReply(
    currentCopy.fallback + ' ' + pickVariant('safe_unknown_final', currentCopy.safeUnknown),
    selectQuestion('businessType'),
    false
  );
}

if (!lastOffer && shouldRedirectToWhatsApp) {
  lastOffer = 'whatsapp';
}

const nextHistory = [...(previousSessionState.history ?? []),
  {
    role: 'user',
    text: normalizedMessage,
    intent,
    timestamp,
  },
  {
    role: 'bot',
    text: reply,
    intent,
    timestamp: new Date().toISOString(),
  }
].slice(-14);

workflowStaticData.landingChatSessions[sessionId] = {
  history: nextHistory,
  capture: mergedCapture,
  lastIntent: intent,
  lastQuestionField: nextQuestion?.field || null,
  lastOffer,
  updatedAt: now,
  turnCount: (previousSessionState.turnCount || 0) + 1,
};

return [{
  json: {
    message: normalizedMessage,
    sessionId,
    source,
    timestamp,
    language,
    intent,
    responseCode: 200,
    responseBody: {
      ok: true,
      reply,
      intent,
      confidence,
      capture: mergedCapture,
      missingFields,
      qualifiedLead,
      shouldRedirectToWhatsApp,
      reason,
      sessionId,
      language,
      source: 'landing-website-knowledge-base'
    }
  }
}];