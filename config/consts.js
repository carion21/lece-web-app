
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
        },
        {
            label: "Top lectures",
            route: "/top-reading",
        },
        {
            label: "Livres",
            route: "/book/list",
        },
        {
            label: "Auteurs",
            route: "/author/list",
        },
        {
            label: "Genres",
            route: "/genre/list",
        },
        {
            label: "Contact",
            route: "/contact",
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
            "fields": ["name", "email", "subject", "content"],
            "types": ["string_not_empty", "string_email", "string_not_empty", "string_not_empty"],
            "required": ["name", "email", "subject", "content"]
        },
        "new_subscriber": {
            "fields": ["name", "email"],
            "types": ["string_not_empty", "string_email"],
            "required": ["name", "email"]
        },
    };

}

module.exports = Consts;