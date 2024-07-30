
class Consts {
    static NLIMIT = 10;

    static PORT_SYSTEM = 3000
    static APP_NAME = "Les Editions Calebasse"
    static APP_AUTHOR = "Carion21"
    static APP_VERSION = "1.0.0"
    static APP_DESCRIPTION = "Landings page for Les Editions Calebasse"

    static APP_MENU = [
        {
            label: "Accueil",
            route: "/",
            id: "home",
            submenus: []
        },
        {
            label: "Catalogue",
            route: "/book/list",
            id: "catalog",
            submenus: [
                {
                    label: "Nouveautés",
                    route: "/book/list/new",
                },
                {
                    label: "À paraître",
                    route: "/book/list/coming",
                },
                {
                    label: "Top lectures",
                    route: "/top-reading",
                },
                {
                    label: "Tous les livres",
                    route: "/book/list",
                },
            ]
        },
        {
            label: "Auteurs",
            route: "/author/list",
            id: "authors",
            submenus: []
        },
        {
            label: "Genres",
            route: "/genre/list",
            id: "genres",
            submenus: []
        },
        {
            label: "Publier un livre",
            route: "/publish",
            id: "publish",
            submenus: []
        },
        {
            label: "Contact",
            route: "/contact",
            id: "contact",
            submenus: []
        },
        {
            label: "Notre equipe",
            route: "/team",
            id: "team",
            submenus: []
        },
        {
            label: "FAQ",
            route: "/faq",
            id: "faq",
            submenus: []
        },
    ];

    static CAROUSELS = [
        {
            "text": "",
            "image": "carousel3.jpeg",
            "color": "black"
        },
        {
            "text": "",
            "image": "carousel1.jpeg",
            "color": "black"
        },
        // {
        //     "text": "Les bons livres ne livrent pas tous leurs secrets en même temps",
        //     "image": "carousel1.jpeg",
        //     "color": "black"
        // }
    ];

    static TEAM = [
        {
            "fullname": "Edgard TOURE",
            "role": "Fondateur et Directeur Général",
            "image": "edgard.png",
            "bio": "Edgard a fondé Les Éditions Calebasse pour promouvoir les voix diversifiées de la littérature africaine. Visionnaire expérimenté."
        },
        {
            "fullname": "Fatou DIOMANDE",
            "role": "Co-fondatrice, Directrice Générale Adjointe et Directrice Editoriale",
            "image": "fatou.png",
            "bio": "Fatou a fondé Les Éditions Calebasse pour promouvoir les voix diversifiées de la littérature africaine. Visionnaire expérimentée."
        },
        {
            "fullname": "Abdallah KONE",
            "role": "Responsable des Relations Auteurs",
            "image": "abdallah.png",
            "bio": "Abdalla est le contact principal pour nos auteurs, les guidant et soutenant durant la publication."
        },
        {
            "fullname": "XXX",
            "role": "Directeur Marketing et Communication",
            "image": "",
            "bio": "Fort de son expérience, XXX est en charge de la promotion de nos livres et de la communication avec nos lecteurs."
        },
        // {
        //     "fullname": "",
        //     "role": "",
        //     "image": "",
        //     "bio": ""
        // }
    ];

    static FAQS = [
        {
            "active": true,
            "question": "Qui sont Les Éditions Calebasse ?",
            "answer": "Les Éditions Calebasse sont une maison d'édition spécialisée dans la littérature africaine et francophone. Nous publions des livres en plusieurs formats pour promouvoir ..."
        },
        {
            "active": true,
            "question": "Comment puis-je acheter des livres sur votre site ?",
            "answer": "Vous pouvez acheter nos livres directement sur notre site en ajoutant les titres de votre choix à votre panier et en suivant les étapes de paiement sécurisé. Nous proposons des livres papier, des ebooks et des audiobooks."
        },
        {
            "active": true,
            "question": "Comment puis-je soumettre mon manuscrit à Les Éditions Calebasse ?",
            "answer": "Pour soumettre votre manuscrit, veuillez consulter notre guide de soumission sur notre site web. Assurez-vous de suivre toutes les instructions et d'inclure toutes les informations requises pour une considération rapide et efficace."
        },
        {
            "active": true,
            "question": "Quels genres de livres publiez-vous ?",
            "answer": "Nous publions une variété de genres littéraires, y compris la fiction, ... et plus encore. Notre focus est principalement sur la littérature africaine et francophone, mais nous sommes ouverts à d'autres sujets pertinents."
        },
        {
            "active": true,
            "question": "Comment puis-je contacter le service clientèle ?",
            "answer": "Vous pouvez contacter notre service clientèle par e-mail à l'adresse suivante : support@editionscalebasse.com. Nous nous efforçons de répondre à toutes les demandes dans les meilleurs délais, généralement sous 48 heures."
        },
        {
            "active": true,
            "question": "Proposez-vous des livraisons internationales ?",
            "answer": "Oui, nous proposons des livraisons internationales pour la plupart de nos produits. Les frais d'expédition seront calculés lors du processus de paiement en fonction de votre adresse de livraison."
        },
        {
            "active": true,
            "question": "Puis-je annuler ou modifier ma commande ?",
            "answer": "Une fois que votre commande a été passée et confirmée, nous ne pouvons pas garantir les modifications ou annulations. Veuillez nous contacter dès que possible si vous avez des préoccupations concernant votre commande."
        },
        {
            "active": true,
            "question": "Où puis-je trouver des informations sur les événements littéraires organisés par Les Éditions Calebasse ?",
            "answer": "Vous pouvez trouver des informations sur nos événements littéraires, séances de dédicaces et participations à des festivals sur notre site web ou en nous suivant sur nos réseaux sociaux."
        },
        {
            "active": true,
            "question": "Comment puis-je suivre ma commande ?",
            "answer": "Une fois votre commande expédiée, vous recevrez un e-mail de confirmation contenant un numéro de suivi. Vous pourrez ainsi suivre l'état de votre livraison en ligne."
        },
        {
            "active": true,
            "question": "Acceptez-vous les retours et les remboursements ?",
            "answer": "réserve que les livres soient retournés dans leur état d'origine. Pour les détails sur les retours et les remboursements, veuillez consulter notre politique de retour sur notre site web."
        },
        {
            "active": false,
            "question": "",
            "answer": ""
        },
    ];

    static DEFAULT_TYPES = [
        "string",
        "string_not_empty",
        "string_email",
        "string_date",
        "string_integer",
        "string_boolean",
        "number",
        "integer",
        "boolean",
        "object",
        "array",
        "array_of_string",
        "array_of_number",
        "array_of_integer",
        "array_of_boolean",
        "array_of_object",
        "array_of_string_integer"
    ];


    static SERVICE_TYPES = [
        "undefined",
        "security_login",
        "admin_search_spot",
        "admin_search_top",
        "admin_set_settings",
        "admin_account_details",
        "admin_security",
    ];

    static SERVICE_TYPES_FIELDS = {
        "undefined": {},
        "new_message": {
            "fields": ["name", "email", "phone", "subject", "content"],
            "types": ["string_not_empty", "string_not_empty", "string_email", "string_not_empty", "string_not_empty"],
            "required": ["name", "email", "phone", "subject", "content"]
        },
        "new_subscriber": {
            "fields": ["name", "email"],
            "types": ["string_not_empty", "string_email"],
            "required": ["name", "email"]
        },
        "new_publication": {
            "fields": ["name", "email", "phone", "title", "summary"],
            "types": ["string_not_empty", "string_email", "string_not_empty", "string_not_empty", "string_not_empty"],
            "required": ["name", "email", "phone", "title", "summary"]
        },
    };

}

module.exports = Consts;