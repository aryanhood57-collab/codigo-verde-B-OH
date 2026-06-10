import { useState, useEffect, useRef } from "react";

// ─── PALETA PASTEL HOTELERA ───────────────────────────────────────────────────
const COLORS = {
  bg: "#F5F0FF",
  card: "#FFFFFF",
  headerBg: "#E8DAEF",
  calentamiento: "#E8DAEF",
  calentamientoDark: "#6C3483",
  nucleo: "#D6EAF8",
  nucleoDark: "#1A5276",
  sprint: "#FDEBD0",
  sprintDark: "#784212",
  accent: "#4A235A",
  accentLight: "#F4ECF7",
  text: "#1C2833",
  textLight: "#566573",
  correct: "#1E8449",
  wrong: "#C0392B",
  border: "#C39BD3",
  gold: "#F0B429",
  revealed: "#6C3483",
  hidden: "#BFC9CA",
  teamBeta: "#E8DAEF",
  teamDelta: "#D6EAF8",
};

// ─── DATOS DE LOS RETOS — VERSIÓN B ──────────────────────────────────────────
// Palabra: A-M-E-N-I-D-A-D-E-S (10 letras, una por reto)
const RETOS = [
  // ════════════════════════════════════════════════════════
  // BLOQUE 1: CALENTAMIENTO (Retos 1–3, 10 min c/u)
  // ════════════════════════════════════════════════════════
  {
    id: 1, bloque: "CALENTAMIENTO", minutos: 10,
    letra: "A",
    titulo: "El Hotel que Agota el Planeta",
    narrativa: `Una cadena hotelera internacional te contrató como consultora ambiental junior. Tu primera misión: explicarle al directorio por qué su modelo de operación actual es insostenible usando datos concretos. Tienes 10 minutos para construir ese argumento.`,
    escenario: `Datos del Resort Playa Dorada (250 habitaciones, operación anual):
• Agua: 480 L/hab/noche (benchmark UNWTO sostenible: 170 L/hab/noche)
• Energía: 58 kWh/hab/noche (benchmark eficiente: 25 kWh/hab/noche)
• Huella ecológica: 3.2 hag/habitación/año
• Biocapacidad de Panamá: 3.8 hag/persona/año
• Residuos: 3.1 kg/huésped/noche
• 180 días de alta ocupación al año (100%), 185 días de baja ocupación (60%)`,
    pregunta1: {
      texto: "Calcula el consumo total anual de agua del resort (temporada alta + baja) y compara con el benchmark de la UNWTO. Luego argumenta ante el directorio por qué esto representa un riesgo ambiental y reputacional.",
      tipo: "abierta",
      respuesta: "Alta ocupación: 250 hab × 180 días × 480 L = 21,600,000 L. Baja ocupación: 250 × 0.60 × 185 × 480 L = 13,320,000 L. Total real: 34,920,000 L/año. Con benchmark UNWTO: alta= 250×180×170=7,650,000; baja=250×0.6×185×170=4,717,500 → total eficiente: 12,367,500 L. Exceso: 22,552,500 L (82.4% más). Argumento: desperdicia el equivalente al consumo doméstico anual de miles de familias, viola principios de ODS 6, expone al hotel a riesgo regulatorio y daño reputacional en mercados de turistas ambientalmente conscientes.",
    },
    pregunta2: {
      texto: "¿Cuál de los siguientes conceptos describe mejor la 'sostenibilidad tridimensional' aplicada al sector hotelero?",
      opciones: [
        "A) La capacidad de un hotel para generar utilidades durante tres años consecutivos sin interrupciones",
        "B) La integración equilibrada de dimensiones ambiental, social y económica en todas las decisiones y operaciones del establecimiento",
        "C) El cumplimiento simultáneo de tres certificaciones internacionales de calidad turística",
        "D) La sostenibilidad de la infraestructura física del edificio frente a eventos climáticos extremos",
      ],
      correcta: "B",
      explicacion: "La sostenibilidad tridimensional (o triple bottom line de Elkington, 1994) integra las dimensiones ambiental (gestión de recursos naturales y reducción de impactos), social (bienestar de trabajadores, comunidad y huéspedes) y económica (viabilidad financiera de largo plazo). En turismo sostenible, ninguna dimensión puede sacrificarse en favor de las otras dos; las tres deben gestionarse simultáneamente.",
    },
  },
  {
    id: 2, bloque: "CALENTAMIENTO", minutos: 10,
    letra: "M",
    titulo: "Mapa de Impactos por Departamento",
    narrativa: `Eres el/la nuevo/a responsable ambiental del Hotel Gran Bahía. El gerente general te pide que en tu primera semana mapees los impactos ambientales más importantes por área. Tienes 10 minutos para hacer ese primer diagnóstico.`,
    escenario: `Áreas operativas del Hotel Gran Bahía:
• Recepción y lobby: sistemas de climatización 24/7, iluminación LED/incandescente mixta, impresión masiva de documentos y vouchers
• Housekeeping: 18 productos de limpieza, lavandería industrial 380 kg/día, cambio diario de amenidades plásticas
• Alimentos y Bebidas (A&B): restaurante + bar + room service, 65 kg residuos orgánicos/día, aceite usado, refrigeración
• Mantenimiento: taller con aceites, pinturas, solventes; generador diésel de emergencia; piscinas con cloro
• Eventos y banquetes: 3 salones, 500 personas máx., residuos de montajes (cartón, plástico, textiles desechables)`,
    pregunta1: {
      texto: "Para tres de las cinco áreas, identifica el aspecto ambiental más crítico de cada una, el impacto que genera y una medida de control o mejora aplicable de inmediato.",
      tipo: "abierta",
      respuesta: "Housekeeping → Aspecto crítico: amenidades plásticas de un solo uso (240/día) → Impacto: contaminación por microplásticos en suelos y aguas → Mejora inmediata: sustituir por dispensadores recargables de productos ecológicos. A&B → Aspecto: aceite de cocina usado vertido al drenaje → Impacto: contaminación acuática, obstrucción de alcantarillado → Mejora: contrato con gestor autorizado para recolección quincenal. Mantenimiento → Aspecto: solventes y pinturas almacenados sin contención → Impacto: riesgo de contaminación de suelo por derrame accidental → Mejora: instalar bandeja de contención secundaria y etiquetar con SDS. (Otras combinaciones válidas con argumentación técnica sólida.)",
    },
    pregunta2: {
      texto: "En el contexto de la educación ambiental, ¿qué diferencia existe entre 'sensibilización ambiental' y 'capacitación ambiental'?",
      opciones: [
        "A) Son sinónimos; ambos términos describen el mismo proceso de aprendizaje",
        "B) La sensibilización genera conciencia y actitud positiva hacia el ambiente; la capacitación desarrolla competencias técnicas concretas para actuar sobre él",
        "C) La sensibilización es para el público externo; la capacitación es exclusiva para personal técnico",
        "D) La sensibilización incluye evaluación formal; la capacitación no requiere verificación de aprendizaje",
      ],
      correcta: "B",
      explicacion: "La sensibilización ambiental busca generar o fortalecer actitudes, valores y conciencia sobre la importancia del medio ambiente — es el primer escalón del proceso educativo ambiental. La capacitación ambiental, en cambio, desarrolla competencias técnicas específicas (ej.: cómo segregar residuos, cómo leer una SDS, cómo calcular una huella de carbono). Ambas son necesarias: sin sensibilización no hay motivación para aprender; sin capacitación no hay habilidades para actuar.",
    },
  },
  {
    id: 3, bloque: "CALENTAMIENTO", minutos: 10,
    letra: "E",
    titulo: "La Ecuación del Carbono Hotelero",
    narrativa: `Un hotel urbano de 60 habitaciones quiere conocer su huella de carbono mensual para publicarla en su informe de sostenibilidad. El contador ambiental se fue de vacaciones y el informe es en tres días. Tu equipo tiene 10 minutos.`,
    escenario: `Datos del mes de mayo — Hotel Urb Eco:
• Energía eléctrica: 18,500 kWh consumidos (factor ETESA/CEPAL: 0.264 kg CO₂eq/kWh)
• Gas LP cocina: 8 cilindros de 100 lb (1 lb LP = 0.454 kg; factor: 2.983 kg CO₂eq/kg LP)
• Combustible vehículo de mantenimiento: 120 litros gasolina (factor: 2.31 kg CO₂eq/litro)
• Residuos orgánicos a relleno: 580 kg (40% biodegradable en condiciones anaeróbicas; factor: 0.5 kg CO₂eq/kg orgánico degradado)
• Viajes aéreos del personal: 2 vuelos PTY-MIA-PTY a 2 personas (factor: 0.255 kg CO₂eq/km/pasajero; distancia PTY-MIA: 1,950 km ida)`,
    pregunta1: {
      texto: "Calcula la huella de carbono total del hotel para el mes de mayo, desglosada por cada fuente. Expresa el resultado en kg CO₂eq y en toneladas CO₂eq.",
      tipo: "abierta",
      respuesta: "Electricidad: 18,500 × 0.264 = 4,884 kg. Gas LP: 8 × 100 × 0.454 × 2.983 = 1,083.7 kg. Gasolina: 120 × 2.31 = 277.2 kg. Residuos orgánicos: 580 × 0.40 × 0.5 = 116 kg. Vuelos: 1,950 × 2 (ida y vuelta) × 2 personas × 0.255 = 1,989 kg. TOTAL: 8,349.9 kg CO₂eq ≈ 8.35 toneladas CO₂eq/mes. La electricidad representa el 58.5% — mayor fuente; los vuelos el 23.8% — segunda fuente.",
    },
    pregunta2: {
      texto: "¿Qué representa el 'Alcance 3' (Scope 3) en el inventario de emisiones de gases de efecto invernadero de un hotel, según el Protocolo GEI?",
      opciones: [
        "A) Las emisiones directas de fuentes propias del hotel, como calderas y generadores",
        "B) Las emisiones indirectas de la electricidad adquirida para uso del hotel",
        "C) Las emisiones indirectas en la cadena de valor: proveedores, transporte de huéspedes, residuos y viajes de negocios del personal",
        "D) Las emisiones compensadas mediante proyectos de reforestación certificados",
      ],
      correcta: "C",
      explicacion: "El Protocolo de Gases de Efecto Invernadero distingue tres alcances: Alcance 1 = emisiones directas de fuentes propias (combustión interna, generadores, flota); Alcance 2 = emisiones indirectas de la energía adquirida (electricidad comprada); Alcance 3 = todas las demás emisiones indirectas en la cadena de valor aguas arriba y aguas abajo: proveedores de alimentos e insumos, transporte de huéspedes para llegar al hotel, gestión de residuos generados, viajes de negocios del personal, uso y disposición de amenidades, etc. El Alcance 3 suele representar el 70-80% de la huella total.",
    },
  },

  // ════════════════════════════════════════════════════════
  // BLOQUE 2: NÚCLEO TÉCNICO (Retos 4–7, 8 min c/u)
  // ════════════════════════════════════════════════════════
  {
    id: 4, bloque: "NÚCLEO TÉCNICO", minutos: 8,
    letra: "N",
    titulo: "Matriz de Impactos: Salón de Eventos",
    narrativa: `El salón de eventos del hotel organiza un banquete para 300 personas. El coordinador ambiental necesita una matriz simplificada de aspectos e impactos antes del evento para el informe regulatorio. Tu equipo tiene 8 minutos.`,
    escenario: `Operaciones del banquete — Salón Gran Cristal:
• Decoración: 200 globos de látex, 30 arreglos florales con flores importadas en espuma floral (oasis)
• Menú: 300 platos principales con proteína animal + 300 postres individuales en empaque plástico
• Vajilla: descartable plástico para las mesas de aperitivos (300 personas × 3 implementos)
• Residuos proyectados: 180 kg orgánicos + 45 kg plástico + 12 kg cartón de embalajes
• Iluminación especial: 800W adicionales por 5 horas
• Transporte de proveedores: 4 camionetas de abastecimiento`,
    pregunta1: {
      texto: "Elabora una Matriz de Leopold simplificada para este evento con al menos 5 actividades y 3 factores ambientales. Para cada celda de intersección indica el impacto (+ o -) y su magnitud estimada (1 a 5).",
      tipo: "abierta",
      respuesta: "Actividades sugeridas: (1) Decoración con espuma floral, (2) Uso de vajilla plástica descartable, (3) Servicio gastronómico con residuos orgánicos, (4) Iluminación especial 800W, (5) Transporte de proveedores. Factores ambientales: Suelo (contaminación por residuos), Agua (eutrofización por espuma floral), Aire (emisiones GEI por transporte y energía), Fauna (globos de látex fuera de sitio). Ejemplo: Vajilla plástica × Suelo = impacto negativo alto (-4); Orgánicos × Agua = impacto negativo medio (-3) si van a relleno sin tratamiento. Los impactos positivos podrían incluir el uso de flores locales × Economía local (+2). Valoración válida si argumentada.",
    },
    pregunta2: {
      texto: "¿Cuál es la función principal de una Matriz de Leopold en un proceso de Evaluación de Impacto Ambiental?",
      opciones: [
        "A) Calcular el costo económico de las medidas de mitigación ambiental requeridas",
        "B) Relacionar sistemáticamente las acciones de un proyecto con los factores ambientales que pueden verse afectados, valorando la magnitud e importancia de cada impacto",
        "C) Determinar si un proyecto requiere o no licencia ambiental según la Ley 41/1998 de Panamá",
        "D) Establecer los límites máximos permisibles de contaminación para cada actividad del proyecto",
      ],
      correcta: "B",
      explicacion: "La Matriz de Leopold (Leopold et al., 1971) es una herramienta de análisis causa-efecto que cruza las acciones del proyecto (columnas) con los factores ambientales (filas), asignando a cada intersección dos valores: magnitud (intensidad del cambio ambiental, 1-10) e importancia (relevancia del impacto, 1-10). Permite identificar, de forma visual y sistemática, qué actividades generan los impactos más severos y sobre qué factores del ambiente, facilitando la priorización de medidas de mitigación.",
    },
  },
  {
    id: 5, bloque: "NÚCLEO TÉCNICO", minutos: 8,
    letra: "I",
    titulo: "La Piscina que Envenena",
    narrativa: `El área de piscinas del hotel recibió una queja formal de un huésped que presentó irritación en piel y ojos tras bañarse. El gerente de mantenimiento sospecha de un error en el tratamiento químico. Tu equipo tiene 8 minutos para diagnosticar el problema y proponer el protocolo correcto.`,
    escenario: `Datos del sistema de tratamiento de la piscina principal (600 m³):
• Cloro libre residual medido: 4.8 mg/L (rango ideal: 1.0–3.0 mg/L)
• pH medido: 6.9 (rango ideal: 7.2–7.8)
• Temperatura del agua: 29°C
• Última adición de cloro: hace 6 horas (1.5 kg cloro granulado 90%)
• Cyanuric acid (estabilizador): 95 mg/L (máximo recomendado: 50 mg/L)
• Sistema de recirculación: filtro de arena, bomba a 85% capacidad
• Vaciado parcial del sistema (backwash): agua va directamente al drenaje pluvial`,
    pregunta1: {
      texto: "Identifica los tres problemas técnicos del sistema de tratamiento, explica el impacto ambiental del vaciado de backwash al drenaje pluvial y propón las acciones correctivas inmediatas.",
      tipo: "abierta",
      respuesta: "Problemas: (1) Hipercloración: cloro 4.8 mg/L supera el límite —irritación de piel/ojos; acción: no agregar más cloro y exponer al sol para reducción natural. (2) pH ácido 6.9: ideal 7.2-7.8; el pH bajo potencia la corrosividad del cloro —acción: agregar bicarbonato de sodio para elevar pH. (3) Estabilizador excesivo (95 mg/L): atrapa el cloro haciéndolo menos efectivo aunque la medición sea alta ('oversaturation')—acción: dilución parcial renovando agua. Impacto ambiental del backwash: el agua de lavado del filtro contiene cloro residual, productos de oxidación, partículas y microorganismos; al ir al drenaje pluvial llega directamente a cuerpos de agua receptores sin tratamiento, causando toxicidad acuática y alteración de flora/fauna. Correctivo: redirigir backwash al sistema de aguas residuales o a laguna de decantación.",
    },
    pregunta2: {
      texto: "Desde la perspectiva de la gestión ambiental hotelera, ¿por qué el agua de lavado de filtros de piscina (backwash) NO debe descargarse directamente al sistema pluvial?",
      opciones: [
        "A) Porque contiene sal y minerals que pueden dañar las tuberías de concreto del sistema pluvial",
        "B) Porque porta cloro residual, biocidas y partículas contaminantes que, sin tratamiento, generan toxicidad en los cuerpos de agua receptores del sistema pluvial",
        "C) Porque la temperatura del agua de backwash supera los límites de la red de alcantarillado pluvial",
        "D) Porque el volumen del backwash puede sobrecargar la capacidad hidráulica del sistema pluvial municipal",
      ],
      correcta: "B",
      explicacion: "El agua de backwash de piscinas contiene cloro libre residual (tóxico para la fauna acuática), productos de oxidación del cloro (cloraminas, trihalometanos), biocidas como el cyanuric acid, partículas orgánicas e inorgánicas retenidas por el filtro, y ocasionalmente algas y patógenos. Al ingresar sin tratamiento al sistema pluvial —que descarga directamente a ríos, quebradas o el mar— genera toxicidad acuática, altera el pH y el oxígeno disuelto, y puede causar la muerte de biota sensible. La legislación ambiental exige pretratamiento o descarga al sistema de aguas residuales.",
    },
  },
  {
    id: 6, bloque: "NÚCLEO TÉCNICO", minutos: 8,
    letra: "D",
    titulo: "El Proveedor Que Contamina Desde Afuera",
    narrativa: `El hotel acaba de adoptar una política de compras sostenibles. Debes evaluar a tres proveedores candidatos para suministro de amenidades (jabones, shampoos, acondicionadores). El comité de compras necesita tu recomendación técnica en 8 minutos.`,
    escenario: `Perfil de los tres proveedores candidatos:

PROVEEDOR A — "CleanPro Industrial":
• Envases: plástico PET virgen, 30 ml/unidad, desechables
• Fórmulas: contienen sulfatos (SLS), parabenos y fragancias sintéticas
• Embalaje: cajas de cartón sin certificación forestal
• Precio: $0.18/unidad · Capacidad: 5,000 unidades/semana

PROVEEDOR B — "EcoSense Panamá":
• Envases: plástico reciclado post-consumo (PCR) 30%, recargables
• Fórmulas: sin parabenos, sin SLS, biodegradables >90% en 28 días
• Embalaje: cartón certificado FSC
• Precio: $0.31/unidad · Capacidad: 3,000 unidades/semana

PROVEEDOR C — "NaturBio":
• Envases: vidrio reciclable, sistema de retorno
• Fórmulas: 100% biodegradables, ingredientes orgánicos certificados
• Embalaje: papel kraft reciclado 100%
• Precio: $0.52/unidad · Certificación: EcoLabel Europa
• Capacidad: 1,500 unidades/semana`,
    pregunta1: {
      texto: "Elabora una matriz de evaluación de proveedores con criterios ambientales ponderados. Recomienda el proveedor más adecuado y argumenta el caso de negocio para justificar el mayor costo ante la gerencia financiera.",
      tipo: "abierta",
      respuesta: "Criterios sugeridos con ponderación: biodegradabilidad de fórmula (25%), tipo de envase y residuos generados (25%), certificaciones ambientales (20%), embalaje (15%), precio relativo (15%). Evaluación: Proveedor B obtendría la mayor puntuación ponderada al balancear criterios ambientales sólidos con precio razonable y capacidad suficiente. Proveedor C es el más sostenible pero limitado en capacidad. Proveedor A es el menos sostenible. Caso de negocio: el mayor costo de B ($0.13 más que A) se recupera mediante: (1) reducción de residuos plásticos = menor costo de gestión, (2) mejora de rating en plataformas como TripAdvisor (los turistas ambientalmente conscientes pagan un 10-15% más por hoteles sostenibles), (3) reducción del riesgo regulatorio ante normativa más estricta de plásticos de un solo uso.",
    },
    pregunta2: {
      texto: "En el marco de una política de compras sostenibles para un hotel, ¿qué criterio ambiental tiene mayor peso para evaluar productos de limpieza personal (amenidades)?",
      opciones: [
        "A) El precio por unidad, ya que determina la rentabilidad del programa de sostenibilidad",
        "B) La biodegradabilidad de las fórmulas y la generación de residuos de envase, ya que ambos inciden directamente en la contaminación acuática y sólida",
        "C) El país de origen del proveedor, porque los productos locales siempre tienen menor huella de carbono",
        "D) El tamaño del envase, ya que los envases más grandes siempre generan menos residuos por unidad de producto",
      ],
      correcta: "B",
      explicacion: "Para amenidades hoteleras, los dos criterios ambientales más relevantes son la biodegradabilidad de los ingredientes activos (SLS, parabenos, fragancias sintéticas generan ecotoxicidad acuática cuando se vierten por los desagües) y la generación de residuos de envase (las minibotellas plásticas de un solo uso representan toneladas de plástico anual en hoteles grandes). Estos dos factores tienen el mayor impacto medioambiental real y son verificables con fichas técnicas y certificaciones reconocidas.",
    },
  },
  {
    id: 7, bloque: "NÚCLEO TÉCNICO", minutos: 8,
    letra: "A",
    titulo: "El Plan de Acción que Salva la Temporada",
    narrativa: `MiAMBIENTE acaba de notificar al hotel que tiene 30 días para presentar un Plan de Acción Ambiental o enfrentará una multa. El gerente general te llama en pánico a las 11 PM. Tu equipo tiene 8 minutos para estructurar los elementos esenciales del plan.`,
    escenario: `No conformidades identificadas por el inspector de MiAMBIENTE:
1. Sin segregación de residuos peligrosos (pilas, cartuchos, fluorescentes)
2. Aceite de cocina vertido al alcantarillado (evidencia fotográfica)
3. Sin programa de ahorro de agua documentado
4. Personal de limpieza sin capacitación en manejo de químicos
5. Sin registro de consumo de agua y energía por área
6. Generador diésel sin mantenimiento preventivo documentado (fuga de aceite detectada)`,
    pregunta1: {
      texto: "Diseña el Plan de Acción con las 6 no conformidades priorizadas por nivel de riesgo. Para cada una define: acción correctiva, responsable, plazo (días) y evidencia de cumplimiento que presentarás al inspector.",
      tipo: "abierta",
      respuesta: "Prioridad 1 (máxima/plazo 7 días): Aceite al alcantarillado — Acción: instalar contenedor hermético de aceite usado rotulado, contrato con gestor autorizado. Responsable: Jefe de A&B. Evidencia: contrato firmado + foto del contenedor. Fuga de generador — Acción: reparación inmediata, bandeja de contención. Responsable: Jefe de Mantenimiento. Evidencia: orden de trabajo + foto. Prioridad 2 (alta/plazo 15 días): Segregación residuos peligrosos — contenedores diferenciados señalizados. Evidencia: fotos + registro de disposición. Capacitación en químicos — sesión de 2 horas con lista de asistencia + evaluación. Prioridad 3 (media/plazo 30 días): Programa ahorro de agua documentado con metas y responsables. Registro de consumo por área con hojas de seguimiento mensual. Evidencia: documento firmado por gerencia.",
    },
    pregunta2: {
      texto: "En el ciclo PHVA aplicado a la gestión ambiental hotelera, ¿en qué fase se ubica la elaboración de un Plan de Acción correctivo ante no conformidades detectadas?",
      opciones: [
        "A) Planificar (P) — porque define objetivos y acciones a implementar",
        "B) Hacer (H) — porque implica ejecutar los procedimientos del sistema",
        "C) Verificar (V) — porque evalúa los resultados del sistema de gestión",
        "D) Actuar (A) — porque responde a desviaciones identificadas para mejorar el sistema",
      ],
      correcta: "D",
      explicacion: "En el ciclo PHVA de ISO 14001:2015, la fase ACTUAR (A) es donde se gestionan las no conformidades y se implementan acciones correctivas: investigar la causa raíz, definir acciones correctivas, implementarlas y verificar su eficacia. El Plan de Acción ante no conformidades es el instrumento típico de la fase Actuar. La confusión con Planificar es común porque el plan tiene componentes de planificación, pero su origen es la respuesta a una desviación del sistema detectada en la fase Verificar.",
    },
  },

  // ════════════════════════════════════════════════════════
  // BLOQUE 3: SPRINT FINAL (Retos 8–10, 5 min c/u)
  // ════════════════════════════════════════════════════════
  {
    id: 8, bloque: "SPRINT FINAL", minutos: 5,
    letra: "D",
    titulo: "El Certificado que Vale Oro",
    narrativa: `Un hotel competidor acaba de obtener la certificación Green Globe. El director de ventas te pregunta qué significa eso exactamente y si deberían buscarla también. Tu equipo tiene 5 minutos para el análisis.`,
    escenario: `Comparativa de desempeño (año 2025):

Hotel Caribe Verde (certificado Green Globe):
• Energía: 28 kWh/hab/noche
• Agua: 185 L/hab/noche  
• Residuos reciclados: 68%
• Personal capacitado en sostenibilidad: 92%
• Puntuación en plataformas de viajes: 4.7/5.0

Hotel Sol del Mar (sin certificación, datos propios):
• Energía: 46 kWh/hab/noche
• Agua: 310 L/hab/noche
• Residuos reciclados: 31%
• Personal capacitado: 45%
• Puntuación en plataformas: 4.1/5.0`,
    pregunta1: {
      texto: "Calcula las brechas de desempeño entre ambos hoteles en los cuatro indicadores medibles. Elabora un argumento de negocio para que el director de ventas justifique ante el directorio la inversión en certificación.",
      tipo: "abierta",
      respuesta: "Brechas: Energía: 46 vs 28 = 39.1% más alto; Agua: 310 vs 185 = 67.6% más alto; Reciclaje: 31% vs 68% = brecha de 37 puntos porcentuales; Capacitación: 45% vs 92% = brecha de 47 pp. Argumento de negocio: (1) Los turistas internacionales con conciencia ambiental (segmento de mayor gasto) prefieren hoteles certificados — potencial de incremento tarifario del 10-15%. (2) La calificación 4.7 vs 4.1 en plataformas representa un diferencial competitivo enorme (una subida de 0.5 puntos puede incrementar la ocupación entre 8-11%). (3) La reducción de consumo de agua y energía genera ahorros operativos anuales que pueden amortizar el costo de certificación en 2-3 años. (4) Preparación para normativas más estrictas de turismo sostenible.",
    },
    pregunta2: {
      texto: "¿Qué tipo de herramienta de gestión ambiental representa una certificación como Green Globe, ISO 14001 o Rainforest Alliance Sustainable Tourism?",
      opciones: [
        "A) Un instrumento de comando y control que impone sanciones a los hoteles no certificados",
        "B) Un mecanismo de mercado voluntario que reconoce y diferencia a las organizaciones con desempeño ambiental verificado por terceros",
        "C) Un requisito legal obligatorio para hoteles con más de 50 habitaciones en países miembros de la OMT",
        "D) Un sistema de autoregulación sin verificación externa, basado únicamente en la declaración del establecimiento",
      ],
      correcta: "B",
      explicacion: "Las certificaciones de sostenibilidad turística son instrumentos de mercado voluntarios: las organizaciones se someten por iniciativa propia a un proceso de auditoría y verificación por terceros independientes (organismos certificadores acreditados), que confirma que cumplen estándares de desempeño ambiental, social y/o económico definidos. Al ser voluntarias y verificadas externamente, generan credibilidad ante consumidores, inversores y reguladores, y crean ventajas competitivas en mercados que valoran la sostenibilidad.",
    },
  },
  {
    id: 9, bloque: "SPRINT FINAL", minutos: 5,
    letra: "E",
    titulo: "Emergencia en el Turno de Noche",
    narrativa: `Son las 2 AM. El vigilante nocturno reporta que el cuarto de almacenamiento de productos químicos huele extraño y hay un charco de líquido verdoso bajo uno de los estantes. Tu equipo de supervisión nocturna tiene 5 minutos para tomar las decisiones correctas.`,
    escenario: `Inventario del cuarto de químicos comprometido:
• Estante A: hipoclorito de sodio al 10% (5 bidones de 20 L)
• Estante B: ácido muriático (HCl 31%) para piscinas (3 bidones de 5 L)
• Estante C: detergentes alcalinos industriales (pH 12–13)
• Estante D: solventes orgánicos para mantenimiento (acetona, thinner)
• El charco verdoso está bajo el Estante B
• Temperatura ambiente: 29°C, espacio confinado sin ventilación activa`,
    pregunta1: {
      texto: "Describe el protocolo de respuesta ante este derrame incluyendo: evaluación inicial del riesgo, acciones inmediatas de seguridad, procedimiento de neutralización y disposición correcta del material, y cómo se previene el impacto ambiental al alcantarillado.",
      tipo: "abierta",
      respuesta: "1. Evaluación: el ácido muriático (HCl) derramado en presencia de hipoclorito y en espacio confinado puede generar cloro gaseoso (Cl₂) — gas tóxico. RIESGO ALTO. 2. Acciones inmediatas: NO ingresar sin EPP completo (traje resistente a ácidos, guantes nitrilo, gafas, respirador con filtro ácido). Evacuar el área, ventilar abriendo puertas y activando extractor si existe. Alertar a gerencia y si hay personas expuestas, llamar al 911. 3. Neutralización: aplicar bicarbonato de sodio o cal sobre el derrame de ácido hasta cese de reacción. Recoger con material absorbente inerte (arena, aserrín). 4. Disposición: el material absorbido es residuo peligroso — colocar en contenedor etiquetado, nunca al drenaje. Contactar gestor de residuos peligrosos. 5. Prevención impacto alcantarillado: el ácido sin neutralizar destruye la biota de plantas de tratamiento — siempre neutralizar y absorber antes de cualquier lavado del área.",
    },
    pregunta2: {
      texto: "¿Por qué el ácido muriático (HCl) y el hipoclorito de sodio NUNCA deben almacenarse juntos en un mismo espacio?",
      opciones: [
        "A) Porque ambos son líquidos corrosivos y su mezcla genera calor que puede causar explosión",
        "B) Porque la reacción entre el ácido clorhídrico y el hipoclorito genera cloro gaseoso (Cl₂), un gas tóxico que puede causar intoxicación grave o muerte",
        "C) Porque su proximidad física acelera la degradación química de ambos productos, reduciendo su efectividad",
        "D) Porque ambos productos tienen el mismo pH ácido y se neutralizan mutuamente, perdiendo utilidad",
      ],
      correcta: "B",
      explicacion: "La reacción química entre el ácido clorhídrico (HCl) y el hipoclorito de sodio (NaOCl) produce cloro gaseoso (Cl₂): 2HCl + NaOCl → Cl₂(g) + NaCl + H₂O. El cloro gaseoso es altamente tóxico para las vías respiratorias — fue usado como arma química en la Primera Guerra Mundial. En espacios confinados sin ventilación, incluso cantidades pequeñas pueden causar irritación severa, edema pulmonar y muerte. Por eso la normativa de almacenamiento de químicos exige segregación por compatibilidad, no solo por tipo.",
    },
  },
  {
    id: 10, bloque: "SPRINT FINAL", minutos: 5,
    letra: "S",
    titulo: "El Veredicto Final: ¿Hotel Sostenible?",
    narrativa: `¡Último reto! Un fondo de inversión especializado en turismo sostenible está evaluando si comprar el Hotel Pacífico Real. Te contrataron para emitir el dictamen ambiental final. Tienes los datos del año. 5 minutos para el veredicto.`,
    escenario: `Informe de desempeño ambiental — Hotel Pacífico Real (año 2025):
✅ Agua: 195 L/hab/noche (benchmark 170 — brecha del 14.7%)
✅ Capacitación ambiental: 88% del personal
✅ Segregación de residuos: implementada en 4 de 5 áreas
❌ Energía: 52 kWh/hab/noche (benchmark 25 — brecha del 108%)
❌ Incidentes ambientales: 2 no documentados, 1 con acción correctiva pendiente
❌ Sin política de proveedores sostenibles
❌ Sin cálculo de huella de carbono
⚠️ En trámite: solicitud de certificación Green Globe (proceso iniciado hace 6 meses)`,
    pregunta1: {
      texto: "Emite el dictamen ambiental para el fondo de inversión. Incluye: calificación global (apto/no apto con condiciones), las dos fortalezas más relevantes, las tres brechas críticas que deben resolverse antes de cualquier transacción y el plan de due diligence ambiental que recomendarías.",
      tipo: "abierta",
      respuesta: "DICTAMEN: APTO CON CONDICIONES. Fortalezas: (1) Alta tasa de capacitación del personal (88%) — indica cultura organizacional con sensibilidad ambiental instalada; (2) Proceso Green Globe iniciado — señal de compromiso institucional verificable. Brechas críticas: (1) Energía al 108% sobre benchmark — el mayor riesgo financiero (costos operativos altos) y ambiental (mayor huella de carbono). Requiere auditoría energética completa y plan de inversión en eficiencia. (2) Incidentes no documentados — violación de principios básicos de gestión ambiental; implica posible pasivo ambiental oculto. (3) Sin huella de carbono — impide reportar ante inversores ESG y bloquea la certificación Green Globe. Due diligence recomendado: auditoría ambiental Fase I (revisión documental completa), inspección física de almacenamiento de químicos, revisión de registro de incidentes, verificación del proceso Green Globe, análisis de facturas de energía 24 meses.",
    },
    pregunta2: {
      texto: "En la gestión ambiental de un hotel, ¿qué significa el principio de 'mejora continua' bajo el estándar ISO 14001:2015?",
      opciones: [
        "A) Que el hotel debe obtener una nueva certificación de mayor nivel cada dos años para demostrar avance",
        "B) Que el hotel debe incrementar sus actividades y servicios continuamente para aumentar los beneficios ambientales",
        "C) Que el hotel debe mejorar de forma sistemática y recurrente su desempeño ambiental mediante el ciclo PHVA, revisando objetivos y corrigiendo desviaciones periódicamente",
        "D) Que el hotel debe publicar un informe de sostenibilidad anual con datos verificados por un auditor externo",
      ],
      correcta: "C",
      explicacion: "La mejora continua en ISO 14001:2015 no es un destino sino un proceso dinámico: implica revisar periódicamente el desempeño ambiental respecto a los objetivos establecidos, identificar las causas de las brechas, implementar acciones correctivas y preventivas, y volver a planificar con metas más ambiciosas. Se operacionaliza mediante el ciclo PHVA (Planificar → Hacer → Verificar → Actuar) aplicado sistemáticamente. No requiere incrementar la escala de operaciones ni publicar informes en formatos específicos; requiere que el desempeño ambiental real mejore de manera demostrable y sostenida.",
    },
  },
];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function CodigoVerdeB_OH() {
  const [equipo, setEquipo] = useState(null);
  const [reto, setReto] = useState(0);
  const [fase, setFase] = useState("intro");
  const [seleccion, setSeleccion] = useState(null);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [letrasObtenidas, setLetrasObtenidas] = useState([]);
  const [tiempoGlobal, setTiempoGlobal] = useState(90 * 60);
  const [tiempoReto, setTiempoReto] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const intervalGlobal = useRef(null);
  const intervalReto = useRef(null);

  const EQUIPOS = [
    { nombre: "BETA", color: COLORS.teamBeta, emoji: "🏨" },
    { nombre: "DELTA", color: COLORS.teamDelta, emoji: "💎" },
  ];

  const PALABRA = "AMENIDADES";

  useEffect(() => {
    if (corriendo && tiempoGlobal > 0) {
      intervalGlobal.current = setInterval(() => setTiempoGlobal(t => t - 1), 1000);
    }
    return () => clearInterval(intervalGlobal.current);
  }, [corriendo]);

  useEffect(() => {
    if (corriendo && tiempoReto > 0) {
      intervalReto.current = setInterval(() => setTiempoReto(t => t - 1), 1000);
    } else if (tiempoReto === 0 && corriendo && fase === "reto") {
      clearInterval(intervalReto.current);
    }
    return () => clearInterval(intervalReto.current);
  }, [corriendo, tiempoReto, fase]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const iniciarReto = (idx) => {
    setReto(idx);
    setFase("reto");
    setSeleccion(null);
    setMostrarExplicacion(false);
    setTiempoReto(RETOS[idx].minutos * 60);
    if (!corriendo) setCorriendo(true);
  };

  const responder = (opcion) => {
    if (seleccion) return;
    setSeleccion(opcion);
    const correcto = opcion === RETOS[reto].pregunta2.correcta;
    if (correcto) setLetrasObtenidas(prev => [...prev, RETOS[reto].letra]);
    setMostrarExplicacion(true);
    clearInterval(intervalReto.current);
  };

  const siguiente = () => {
    if (reto + 1 >= RETOS.length) {
      setFase("victoria");
      setCorriendo(false);
    } else {
      iniciarReto(reto + 1);
    }
  };

  const bloqueColor = (b) => {
    if (b === "CALENTAMIENTO") return { bg: COLORS.calentamiento, dark: COLORS.calentamientoDark };
    if (b === "NÚCLEO TÉCNICO") return { bg: COLORS.nucleo, dark: COLORS.nucleoDark };
    return { bg: COLORS.sprint, dark: COLORS.sprintDark };
  };

  if (fase === "intro") return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 480, width: "100%", background: COLORS.card, borderRadius: 16, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.10)", border: `2px solid ${COLORS.border}` }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 48 }}>🏨</div>
          <div style={{ fontSize: 11, letterSpacing: 3, color: COLORS.textLight, textTransform: "uppercase", marginTop: 4 }}>ITSE · EDA1001 · II Cuatrimestre 2026</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: COLORS.accent, margin: "10px 0 4px" }}>OPERACIÓN</h1>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: COLORS.calentamientoDark, margin: 0 }}>CÓDIGO VERDE</h1>
          <div style={{ fontSize: 13, color: COLORS.textLight, marginTop: 6 }}>Versión B · Operaciones Hoteleras</div>
        </div>
        <div style={{ background: COLORS.accentLight, borderRadius: 10, padding: "14px 16px", marginBottom: 18, fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>
          🌿 <strong>BRIEFING DE MISIÓN:</strong> Los sistemas de control ambiental del hotel han sido comprometidos. Solo los equipos con dominio técnico podrán descifrar la clave de restauración, letra por letra. Cada reto superado acerca a tu equipo a la solución final.
        </div>
        <div style={{ background: "#FFF0FB", borderRadius: 10, padding: "12px 14px", marginBottom: 18, fontSize: 12, color: COLORS.text }}>
          <strong>⏱ ESTRUCTURA DE LA MISIÓN:</strong><br />
          🟣 Bloque 1 — Calentamiento: Retos 1–3 (10 min c/u)<br />
          🔵 Bloque 2 — Núcleo Técnico: Retos 4–7 (8 min c/u)<br />
          🟠 Bloque 3 — Sprint Final: Retos 8–10 (5 min c/u)<br />
          <strong>Total: 90 minutos</strong>
        </div>
        <button onClick={() => setFase("seleccion")} style={{ width: "100%", padding: "14px", background: COLORS.accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
          🔓 INICIAR MISIÓN
        </button>
      </div>
    </div>
  );

  if (fase === "seleccion") return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 480, width: "100%", background: COLORS.card, borderRadius: 16, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}>
        <h2 style={{ textAlign: "center", color: COLORS.accent, marginBottom: 6, fontSize: 20 }}>🏨 IDENTIFICA TU EQUIPO</h2>
        <p style={{ textAlign: "center", color: COLORS.textLight, fontSize: 13, marginBottom: 20 }}>Versión B — selecciona el nombre de tu equipo</p>
        {EQUIPOS.map(eq => (
          <button key={eq.nombre} onClick={() => { setEquipo(eq); iniciarReto(0); }}
            style={{ width: "100%", padding: "16px", background: eq.color, color: COLORS.text, border: `2px solid ${COLORS.border}`, borderRadius: 10, fontSize: 17, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}>
            {eq.emoji} EQUIPO {eq.nombre}
          </button>
        ))}
      </div>
    </div>
  );

  if (fase === "victoria") return (
    <div style={{ minHeight: "100vh", background: "#4A235A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 480, width: "100%", background: COLORS.card, borderRadius: 16, padding: 28, textAlign: "center", boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize: 52 }}>🏆</div>
        <h1 style={{ color: COLORS.accent, fontSize: 24, margin: "12px 0 6px" }}>¡MISIÓN COMPLETADA!</h1>
        <p style={{ color: COLORS.textLight, fontSize: 14, marginBottom: 20 }}>Equipo {equipo?.nombre} — Versión B</p>
        <div style={{ background: COLORS.accentLight, borderRadius: 12, padding: "16px", marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: COLORS.textLight, marginBottom: 8 }}>LA CLAVE DESENCRIPTADA ES:</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            {PALABRA.split("").map((l, i) => (
              <div key={i} style={{ width: 36, height: 36, background: i < letrasObtenidas.length ? COLORS.revealed : COLORS.hidden, color: "#fff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>
                {l}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 22, fontWeight: 900, color: COLORS.accent, letterSpacing: 3, marginTop: 12 }}>{PALABRA}</p>
        </div>
        <a href="https://teams.microsoft.com" target="_blank" rel="noreferrer"
          style={{ display: "block", width: "100%", padding: "13px", background: "#2563EB", color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", boxSizing: "border-box" }}>
          📤 Enviar resultados por Teams
        </a>
      </div>
    </div>
  );

  const r = RETOS[reto];
  const bc = bloqueColor(r.bloque);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "Arial, sans-serif", paddingBottom: 40 }}>
      <div style={{ background: COLORS.accent, color: "#fff", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontSize: 12 }}>🏨 {equipo?.emoji} {equipo?.nombre} · V.B</div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>⏱ {fmt(tiempoGlobal)}</div>
        <div style={{ fontSize: 12 }}>Reto {r.id}/10</div>
      </div>

      <div style={{ background: COLORS.headerBg, padding: "8px 16px", display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap" }}>
        {PALABRA.split("").map((l, i) => (
          <div key={i} style={{ width: 28, height: 28, background: i < letrasObtenidas.length ? COLORS.revealed : COLORS.hidden, color: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, transition: "background 0.4s" }}>
            {i < letrasObtenidas.length ? l : "?"}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 500, margin: "0 auto", padding: "16px" }}>
        <div style={{ background: bc.bg, borderRadius: 8, padding: "6px 12px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: bc.dark, letterSpacing: 1 }}>{r.bloque} · RETO {r.id}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: bc.dark }}>⏱ {fmt(tiempoReto)}</span>
        </div>

        <h2 style={{ fontSize: 18, color: COLORS.accent, marginBottom: 10, lineHeight: 1.3 }}>🔐 {r.titulo}</h2>

        <div style={{ background: "#F5EEF8", borderRadius: 8, padding: "12px 14px", marginBottom: 12, fontSize: 13, color: COLORS.text, lineHeight: 1.6, fontStyle: "italic" }}>
          {r.narrativa}
        </div>

        <div style={{ background: COLORS.card, borderRadius: 8, padding: "12px 14px", marginBottom: 14, fontSize: 12.5, color: COLORS.text, lineHeight: 1.7, border: `1px solid ${COLORS.border}` }}>
          <strong style={{ color: COLORS.accent }}>📋 DATOS DE LA OPERACIÓN:</strong><br />
          <pre style={{ margin: "6px 0 0", fontFamily: "Arial, sans-serif", whiteSpace: "pre-wrap", fontSize: 12.5 }}>{r.escenario}</pre>
        </div>

        <div style={{ background: "#F9F9F9", borderRadius: 8, padding: "12px 14px", marginBottom: 14, border: `1px solid ${COLORS.border}` }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, marginBottom: 6 }}>🧪 ANÁLISIS TÉCNICO (respuesta en equipo):</p>
          <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6, margin: 0 }}>{r.pregunta1.texto}</p>
        </div>

        <div style={{ background: COLORS.card, borderRadius: 8, padding: "12px 14px", border: `1px solid ${COLORS.border}` }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: bc.dark, marginBottom: 10 }}>🔑 PREGUNTA CLAVE (obtén la letra "{r.letra}"):</p>
          <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.5, marginBottom: 12 }}>{r.pregunta2.texto}</p>
          {r.pregunta2.opciones.map((op) => {
            const letra = op[0];
            const esCor = letra === r.pregunta2.correcta;
            const esSel = letra === seleccion;
            let bg = "#F4F6F7";
            if (seleccion) bg = esCor ? "#D5F5E3" : esSel ? "#FADBD8" : "#F4F6F7";
            return (
              <button key={letra} onClick={() => responder(letra)} disabled={!!seleccion}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", marginBottom: 8, background: bg, border: `1px solid ${seleccion && esCor ? COLORS.correct : COLORS.border}`, borderRadius: 8, fontSize: 13, color: COLORS.text, cursor: seleccion ? "default" : "pointer", lineHeight: 1.4 }}>
                {op}
                {seleccion && esCor && " ✅"}
                {seleccion && esSel && !esCor && " ❌"}
              </button>
            );
          })}

          {mostrarExplicacion && (
            <div style={{ background: seleccion === r.pregunta2.correcta ? "#D5F5E3" : "#FADBD8", borderRadius: 8, padding: "10px 12px", marginTop: 10, fontSize: 12.5, color: COLORS.text, lineHeight: 1.6 }}>
              {seleccion === r.pregunta2.correcta
                ? <><strong style={{ color: COLORS.correct }}>✅ ¡Correcto! Letra "{r.letra}" obtenida.</strong><br /></>
                : <><strong style={{ color: COLORS.wrong }}>❌ Respuesta incorrecta. Letra no obtenida.</strong><br /></>
              }
              <strong>Explicación:</strong> {r.pregunta2.explicacion}
            </div>
          )}

          {mostrarExplicacion && (
            <button onClick={siguiente} style={{ width: "100%", marginTop: 14, padding: "13px", background: COLORS.accent, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              {reto + 1 < RETOS.length ? `➡ SIGUIENTE RETO (${reto + 2}/10)` : "🏆 FINALIZAR MISIÓN"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
