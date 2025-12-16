import {TrustedOng} from "@/types/ongs";

/**
 * Array of trusted organizations (ONGs) with their details.
 */
export const trustedOngs: TrustedOng[] = [
    {
        id: 1, // ID of the organization
        name: 'Asociația Ramses', // Name of the organization
        description: 'Inspirată din povestea motanului Ramses, misiunea Asociației Ramses constă în strângerea ' +
            'de fonduri pentru adăposturile și asociațiile din întreaga țară.', // Description of the organization
        image: '/ong/asociatia-ramses.png', // Path to the logo/image
        link: 'https://asociatiaramses.ro/' // Website of the organization
    },
    {
        id: 2,
        name: 'Centrul Filia',
        description: 'Centrul FILIA este o organizație feministă care face auzite vocile femeilor prin lucru' +
            ' direct în comunități și activități de advocacy, activism și sensibilizare, studii și analize.',
        image: '/ong/centrul-filia.png',
        link: 'https://centrulfilia.ro/'
    },
    {
        id: 3,
        name: 'O Mână De Ajutor',
        description: 'Asociația Eco-Durabil este o organizație non-profit, apolitică și independentă ' +
            'din București, fondată în 2007 la inițiativa unor tineri din diferite domenii.',
        image: '/ong/o-mana-de-ajutor.png',
        link: 'https://omanadeajutor.eu/'
    },
    {
        id: 4,
        name: 'Agenția Împreună',
        description: 'Misiunea Agenției este să păstreze și să promoveze identitatea romilor prin cercetare,' +
            ' documentare și implementarea politicilor sociale dedicate lor.',
        image: '/ong/agentia-impreuna.png',
        link: 'https://www.agentiaimpreuna.ro/'
    },
    {
        id: 5,
        name: 'Vocea copiilor abandonați',
        description: 'Scopul nostru este să susținem copiii și tinerii abandonați, oferindu-le sprijin' +
            ' educativ și un mediu în care să fie ascultați, înțeleși și iubiți.',
        image: '/ong/vocea-copiilor-abandonati.png',
        link: 'https://voceacopiilor.ro/'
    },
    {
        id: 6,
        name: 'Motivation',
        description: 'Pe 15 februarie 2025, Fundația Motivation România a împlinit 30 de ani de programe în beneficiul' +
            ' copiilor și adulților cu dizabilități din România. Peste 30.000 de vieți schimbate în bine.',
        image: '/ong/motivation.png',
        link: 'https://motivation.ro/'
    }
];

/**
 * Extra visual configuration for ONG logos.
 *
 * Maps ONG `id` to image dimensions used by UI components
 * (e.g. Next.js <Image />).
 *
 */
export const ongExtras: Record<number, { width: number; height: number }> = {
    1: { width: 500, height: 500 },
    2: { width: 400, height: 400 },
    3: { width: 400, height: 400 },
    4: { width: 280, height: 280 },
    5: { width: 350, height: 350 },
    6: { width: 300, height: 300 },
};
