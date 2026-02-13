import {Calendar, Heart, MapPin, Users} from "lucide-react";

export const ngos = [
    {
        id: 1,
        name: "Crucea Roșie Română",
        description:
            "Organizație umanitară care protejează și ajută persoanele vulnerabile din întreaga țară.",
        url: "https://crucearosie.ro",
        logo: "/seedImages/ngos/crucea_rosie_romana.png",
        verified: true
    },
    {
        id: 2,
        name: "Salvați Copiii",
        description:
            "Organizație care apără drepturile copiilor și oferă suport educativ și medical celor defavorizați.",
        url: "https://salvaticopiiromania.ro",
        logo: "/seedImages/ngos/salvati_copiii.png",
        verified: true
    },
    {
        id: 3,
        name: "WWF România",
        description:
            "Organizație de conservare a naturii care protejează biodiversitatea și promovează dezvoltarea durabilă.",
        url: "https://wwf.ro",
        logo: "/seedImages/ngos/wwf.png",
        verified: false
    },
    {
        id: 4,
        name: "Habitat for Humanity",
        description:
            "Organizație globală care construiește case și comunități pentru familii aflate în nevoie.",
        url: "https://habitat.ro",
        logo: "/seedImages/ngos/habitat_for_humanity.png",
        verified: true
    },
    {
        id: 5,
        name: "Teach for Romania",
        description:
            "Program care aduce tineri profesioniști în comunitățile educaționale defavorizate.",
        url: "https://teachforromania.org",
        logo: "/seedImages/ngos/teach_for_romania.png",
        verified: true
    },
    {
        id: 6,
        name: "Asociația Ramses",
        description:
            "Organizație care strânge fonduri pentru adăposturi și asociații din întreaga țară.",
        logo: "/seedImages/ngos/asociatia-ramses.png",
        url: "https://asociatiaramses.ro/",
        verified: true
    },
    {
        id: 7,
        name: "Centrul FILIA",
        description:
            "Organizație feministă care susține drepturile femeilor prin activism, advocacy și implicare în comunitate.",
        logo: "/seedImages/ngos/centrul-filia.png",
        url: "https://centrulfilia.ro/",
        verified: true
    },
    {
        id: 8,
        name: "O Mână De Ajutor",
        description:
            "Organizație non-profit care dezvoltă proiecte sociale și comunitare pentru persoanele din București și împrejurimi.",
        logo: "/seedImages/ngos/o-mana-de-ajutor.png",
        url: "https://omanadeajutor.eu/",
        verified: true
    },
    {
        id: 9,
        name: "Agenția Împreună",
        description:
            "Organizație care promovează identitatea romilor și implementează politici sociale dedicate comunității lor.",
        logo: "/seedImages/ngos/agentia_impreuna.png",
        url: "https://www.agentiaimpreuna.ro/",
        verified: true
    },
    {
        id: 10,
        name: "Vocea copiilor abandonați",
        description:
            "Organizație care sprijină copiii și tinerii abandonați prin educație și consiliere într-un mediu sigur.",
        logo: "/seedImages/ngos/vocea-copiilor-abandonati.png",
        url: "https://voceacopiilor.ro/",
        verified: true
    },
    {
        id: 11,
        name: "Motivation",
        description:
            "Organizație care sprijină persoanele cu dizabilități prin programe de incluziune, mobilitate și independență.",
        logo: "/seedImages/ngos/motivation.png",
        url: "https://motivation.ro/",
        verified: true
    }
];

export const events = [
    {
        id: 1,
        banner: '/seedImages/events/cleaning.png',
        title: "Curățenia de Primăvară",
        description:
            "O zi dedicată ecologizării parcurilor și spațiilor verzi din București. Toți voluntarii sunt bineveniți!",
        type: "Activitate comunitară",
        date: "15 Martie 2026",
        time: { from: '10:00', to: '16:00' },
        location: "Parcul Herăstrău, București",
        creatorId: 3,
        volunteersNeeded: 120,
        registeredVolunteers: 45,
    },
    {
        id: 2,
        banner: '/seedImages/events/blood_donation.png',
        title: "Donare de sânge",
        description:
            "Eveniment de donare de sânge organizat împreună cu Crucea Roșie Română. Salvează vieți!",
        type: "Campanie de sănătate",
        date: "22 Martie 2026",
        time: { from: '09:00', to: '15:00' },
        location: "Spitalul Universitar, București",
        creatorId: 1,
        volunteersNeeded: 50,
        registeredVolunteers: 20,
    },
    {
        id: 3,
        banner: '/seedImages/events/running.png',
        title: "Maraton caritabil",
        description:
            "Alergăm pentru copii și tineri defavorizați. Donațiile se vor folosi pentru educație și activități recreative.",
        type: "Activitate sportivă",
        date: "30 Martie 2026",
        time: { from: '08:00', to: '14:00' },
        location: "Parcul Cișmigiu, București",
        creatorId: 2,
        volunteersNeeded: 80,
        registeredVolunteers: 60,
    },
    {
        id: 4,
        banner: '/seedImages/events/food.png',
        title: "Colectă de alimente",
        description:
            "Ajutăm persoanele nevoiașe din comunitate prin strângerea și distribuirea de alimente.",
        type: "Campanie socială",
        date: "5 Aprilie 2026",
        time: { from: '10:00', to: '18:00' },
        location: "Centrul Comunitar, București",
        creatorId: 4,
        volunteersNeeded: 100,
        registeredVolunteers: 75,
    },
    {
        id: 5,
        banner: '/seedImages/events/plantingTree.png',
        title: "Plantare de copaci",
        description:
            "Participă la o acțiune ecologică și ajută la plantarea de copaci în parcurile din București. Contribuie la un oraș mai verde!",
        type: "Activitate ecologică",
        date: "10 Aprilie 2026",
        time: { from: '09:00', to: '15:00' },
        location: "Parcul Titan, București",
        creatorId: 3,
        volunteersNeeded: 50,
        registeredVolunteers: 49,
    }
];



export const faqItems = [
    {
        question: "Cum verificăm transparența financiară a ONG-urilor?",
        answer:
            "Fiecare ONG listat pe Civicom trece printr-un proces riguros de verificare. Analizăm rapoartele financiare anuale, auditul extern, sursele de finanțare și modul în care fondurile sunt alocate. Doar organizațiile cu transparență financiară dovedită pot primi badge-ul 'Verificat'.",
    },
    {
        question: "Ce înseamnă impact demonstrabil?",
        answer:
            "Impactul demonstrabil se referă la rezultate concrete și măsurabile ale activităților ONG-urilor. Evaluăm numărul de beneficiari, proiectele finalizate cu succes, rapoartele de impact și testimonialele din comunitățile deservite. Ne asigurăm că fiecare organizație produce schimbări reale.",
    },
    {
        question: "De ce contează activitatea constantă?",
        answer:
            "O organizație cu activitate constantă demonstrează angajament pe termen lung față de cauza sa. Verificăm istoricul proiectelor, frecvența evenimentelor organizate, prezența în comunitate și capacitatea de a menține programe în desfășurare. Aceasta asigură susținerea continuă a beneficiarilor.",
    },
    {
        question: "Cum colectăm feedback-ul din comunitate?",
        answer:
            "Feedback-ul este colectat direct de la voluntari, beneficiari și parteneri ai ONG-urilor. Folosim sondaje anonime, recenzii verificate și interviuri cu membrii comunității. Acest feedback ne ajută să menținem un standard ridicat de calitate și încredere pe platformă.",
    },
    {
        question: "Cum pot deveni voluntar prin Civicom?",
        answer:
            "Crearea unui cont pe Civicom este gratuită și simplă. După înregistrare, poți explora evenimentele disponibile în zona ta, te poți înscrie la activități care te interesează și poți urmări progresul tău ca voluntar. Fiecare contribuție contează și este recunoscută pe platformă.",
    },
]

export const stats = [
    {
        icon: Calendar,
        value: 1240,
        suffix: "+",
        label: "Evenimente organizate",
    },
    {
        icon: Users,
        value: 8500,
        suffix: "+",
        label: "Voluntari activi",
    },
    {
        icon: Heart,
        value: 320,
        suffix: "",
        label: "ONG-uri partenere",
    },
    {
        icon: MapPin,
        value: 42,
        suffix: "",
        label: "Orase acoperite",
    },
]

