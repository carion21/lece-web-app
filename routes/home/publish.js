const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { control_service_data, core_create_message, core_create_submission } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "home"
const SERVICE_TYPE = "new_publication"

const FormData = require('form-data');
const fs = require("fs");
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

// Define the maximum size for uploading
// picture i.e. 10 MB. it is optional
const maxSize = 10 * 1000 * 1000;

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /pdf/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(
            "Error: File upload only supports the " +
            "following filetypes - " +
            filetypes
        );
    },

}).single("file");


router.get('/', async function (req, res, next) {
    res.render(service + '/publish', {
        menus: getAppMenu(),
        moment: moment,
    });
});


router.post('/', async function (req, res, next) {
    let message = ""
    let error = ""

    upload(req, res, async function (err) {
        let body = req.body
        if (err) {
            error = err.toString()
        } else {
            let bcontrol = control_service_data(SERVICE_TYPE, body)

            if (bcontrol.success) {
                const book_submission_data = new FormData();

                book_submission_data.append("name", body.name);
                book_submission_data.append("email", body.email);
                book_submission_data.append("phone", body.phone);
                book_submission_data.append("title", body.title);
                book_submission_data.append("summary", body.summary);
                book_submission_data.append("file", fs.createReadStream(req.file.path));

                const r_core_new_submission = await core_create_submission(book_submission_data);

                if (r_core_new_submission.success) {
                    // suppression du fichier
                    fs.unlinkSync(req.file.path);

                    message = "Votre livre a été soumis avec succès. Nous vous répondrons dans les plus brefs délais."
                    res.render(service + "/publish", {
                        menus: getAppMenu(),
                        moment: moment,
                        message: message
                    })
                } else {
                    error = r_core_new_submission.message
                }
            } else {
                error = bcontrol.message
            }

        }

        if (error) {
            res.render(
                service + "/publish", {
                menus: getAppMenu(),
                moment: moment,
                rbody: body,
                error: error
            })
        }
    });
});


module.exports = router;