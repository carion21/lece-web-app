const { SERVICE_TYPES_FIELDS } = require("./consts")
const { isString, isInteger, isBoolean, isObject, isArray, isNumber, isArrayOfString, isArrayOfInteger, getMoment, getCoreUrl } = require("./utils")

const axios = require('axios');
const validator = require('email-validator');

require('dotenv').config()

const urlapi = getCoreUrl()
const moment = getMoment()


const control_service_data = ((service_type_value, service_data) => {
  let result = {
    success: false
  }

  let error = ""

  try {
    if (isObject(service_data)) {
      let authorized_services = Object.keys(SERVICE_TYPES_FIELDS)

      if (authorized_services.includes(service_type_value)) {
        if (service_type_value == "undefined") {
          result.success = true
        } else {
          let rcontrol_basic = execute_service_basic_control_field(service_type_value, service_data)

          if (rcontrol_basic.success) {
            result.success = true
          } else {
            error = rcontrol_basic.message
          }
        }
      } else {
        error = "service_type is not valid or not implemented"
      }
    } else {
      error = "service_data must be an object"
    }
  } catch (err) {
    error = "big error when controlling service data : " + err.toString()
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const execute_service_basic_control_field = ((service_type_value, service_data) => {
  let result = {
    success: false
  }

  let error = ""

  try {
    let data_fields = Object.keys(service_data)
    let data_values = Object.values(service_data)

    let authorized_fields = SERVICE_TYPES_FIELDS[service_type_value].fields
    let authorized_types = SERVICE_TYPES_FIELDS[service_type_value].types

    let present_fields = data_fields.filter(field => authorized_fields.includes(field))
    let present_types = present_fields.map(field => authorized_types[authorized_fields.indexOf(field)])

    let required_fields = SERVICE_TYPES_FIELDS[service_type_value].required
    // let required_types = required_fields.map(field => authorized_types[authorized_fields.indexOf(field)])
    // verify if each element of required_fields is in data_fields
    if (required_fields.every(field => data_fields.includes(field))) {
      let rcontrol_fields_type = control_fields_type(present_fields, present_types, data_fields, data_values)

      if (rcontrol_fields_type.success) {
        result.success = true
      } else {
        error = rcontrol_fields_type.message
      }
    } else {
      error = "the authorized fields for service_type " + service_type_value + " are : " + authorized_fields.join(", ")
    }
  } catch (err) {
    error = "big error while executing service basic control field : " + err.toString()
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const control_fields_type = ((rfields, rtypes, dfields, dvalues) => {
  let result = {
    success: false
  }

  let error = ""

  result.success = true

  for (let i = 0; i < rfields.length; i++) {
    const field = rfields[i];
    const ftype = rtypes[i];
    const index = dfields.indexOf(field)
    if (index != -1) {
      const value = dvalues[index];
      let rcontrol_field_type = control_field_type(field, value, ftype)
      if (!rcontrol_field_type.success) {
        error = rcontrol_field_type.message
        result.success = false
        break;
      }
    } else {
      error = "the field " + field + " is required"
      result.success = false
      break;
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const control_field_type = ((field, value, field_type) => {
  let result = {
    success: false
  }

  let error = ""

  switch (field_type) {
    case "string":
      if (isString(value) && value != "") {
        result.success = true
      } else {
        error = "the field " + field + " must be a string"
      }
      break;
    case "string_not_empty":
      if (isString(value) && value != "") {
        result.success = true
      } else {
        error = "the field " + field + " must be a string and not empty"
      }
      break;
    case "string_email":
      if (isString(value) && value != "") {
        if (validator.validate(value)) {
          result.success = true
        } else {
          error = "the field " + field + " must be a string email"
        }
      } else {
        error = "the field " + field + " must be a string and not empty"
      }
      break;
    case "string_date":
      if (isString(value) && value != "") {
        if (moment(value, "YYYY-MM-DD HH:mm:ss").isValid() || moment(value, "YYYY-MM-DD").isValid()) {
          result.success = true
        }
      }
      if (!result.success) {
        error = "the field " + field + " must be a string date"
      }
      break;
    case "string_boolean":
      if (isString(value) && value != "") {
        if (value == "true" || value == "false") {
          result.success = true
        }
      }
      if (!result.success) {
        error = "the field " + field + " must be a string boolean"
      }
      break;
    case "string_integer":
      if (isString(value) && value != "") {
        if (isInteger(parseInt(value))) {
          result.success = true
        }
      }
      if (!result.success) {
        error = "the field " + field + " must be a string integer"
      }
      break;
    case "integer":
      if (isInteger(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be an integer"
      }
      break;
    case "boolean":
      if (isBoolean(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be a boolean"
      }
      break;
    case "object":
      if (isObject(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be an object"
      }
      break;
    case "array":
      if (isArray(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be an array"
      }
      break;
    case "number":
      if (isNumber(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be a number"
      }
      break;
    case "array_of_string":
      if (isString(value)) {
        value = [value]
      }
      if (isArrayOfString(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be an array of string"
      }
      break;
    case "array_of_integer":
      if (isInteger(value)) {
        value = [value]
      }
      if (isArrayOfInteger(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be an array of integer"
      }
      break;
    case "array_of_string_integer":
      if (isArrayOfString(value)) {
        if (value.every(element => isInteger(parseInt(element)))) {
          result.success = true
        }
      }
      if (!result.success) {
        error = "the field " + field + " must be an array of string integer"
      }
      break;
    case "undefined":
      result.success = true
      break;
    default:
      error = "the field " + field + " has an unknown type"
      break;
  }

  if (error != "") {
    result.message = error
  }

  return result
})


const core_list_genre = (async () => {
  let result = {
    success: false
  }

  let error = ""

  let urlcomplete = urlapi + process.env.ROUTE_OF_CORE_FOR_GENRE
  try {
    let response = await axios.get(urlcomplete)
    if (response.status == 200) {
      let rdata = response.data
      result.success = true
      result.data = rdata
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
    if (err.response) {
      error = err.response.data.message
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const core_retrieve_genre = (async (genre_slug) => {
  let result = {
    success: false
  }

  let error = ""

  let urlcomplete = urlapi + process.env.ROUTE_OF_CORE_FOR_GENRE
  urlcomplete += "/by-slug/" + genre_slug
  try {
    let response = await axios.get(urlcomplete)
    if (response.status == 200) {
      let rdata = response.data
      result.success = true
      result.data = rdata.data
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
    if (err.response) {
      error = err.response.data.message
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const core_list_author = (async () => {
  let result = {
    success: false
  }

  let error = ""

  let urlcomplete = urlapi + process.env.ROUTE_OF_CORE_FOR_AUTHOR
  try {
    let response = await axios.get(urlcomplete)
    if (response.status == 200) {
      let rdata = response.data
      result.success = true
      result.data = rdata.data
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
    if (err.response) {
      error = err.response.data.message
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const core_retrieve_author = (async (author_slug) => {
  let result = {
    success: false
  }

  let error = ""

  let urlcomplete = urlapi + process.env.ROUTE_OF_CORE_FOR_AUTHOR
  urlcomplete += "/by-slug/" + author_slug
  try {
    let response = await axios.get(urlcomplete)
    if (response.status == 200) {
      let rdata = response.data
      result.success = true
      result.data = rdata.data
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
    if (err.response) {
      error = err.response.data.message
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const core_list_book = (async () => {
  let result = {
    success: false
  }

  let error = ""

  let urlcomplete = urlapi + process.env.ROUTE_OF_CORE_FOR_BOOK
  try {
    let response = await axios.get(urlcomplete)
    if (response.status == 200) {
      let rdata = response.data
      result.success = true
      result.data = rdata.data
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
    if (err.response) {
      error = err.response.data.message
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const core_retrieve_book = (async (book_slug) => {
  let result = {
    success: false
  }

  let error = ""

  let urlcomplete = urlapi + process.env.ROUTE_OF_CORE_FOR_BOOK
  urlcomplete += "/by-slug/" + book_slug
  try {
    let response = await axios.get(urlcomplete)
    if (response.status == 200) {
      let rdata = response.data
      result.success = true
      result.data = rdata.data
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
    if (err.response) {
      error = err.response.data.message
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const core_get_tops_book = (async () => {
  let result = {
    success: false
  }

  let error = ""

  let urlcomplete = urlapi + process.env.ROUTE_OF_CORE_FOR_BOOK
  urlcomplete += "/tops"
  try {
    let response = await axios.get(urlcomplete)
    if (response.status == 200) {
      let rdata = response.data
      result.success = true
      result.data = rdata.data
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
    if (err.response) {
      error = err.response.data.message
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const core_get_recents_book = (async () => {
  let result = {
    success: false
  }

  let error = ""

  let urlcomplete = urlapi + process.env.ROUTE_OF_CORE_FOR_BOOK
  urlcomplete += "/recents"
  try {
    let response = await axios.get(urlcomplete)
    if (response.status == 200) {
      let rdata = response.data
      result.success = true
      result.data = rdata.data
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
    if (err.response) {
      error = err.response.data.message
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const core_create_subscriber = (async (subscriber_data) => {
  let result = {
    success: false
  }

  let error = ""

  let urlcomplete = urlapi + process.env.ROUTE_OF_CORE_FOR_SUBSCRIBER
  try {
    let response = await axios.post(urlcomplete, subscriber_data)
    if (response.status == 201) {
      let rdata = response.data
      result.success = true
      result.data = rdata.data
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
    if (err.response) {
      error = err.response.data.message
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const core_create_message = (async (message_data) => {
  let result = {
    success: false
  }

  let error = ""

  let urlcomplete = urlapi + process.env.ROUTE_OF_CORE_FOR_MESSAGE
  try {
    let response = await axios.post(urlcomplete, message_data)
    if (response.status == 201) {
      let rdata = response.data
      result.success = true
      result.data = rdata.data
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
    if (err.response) {
      error = err.response.data.message
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const core_create_submission = (async (submission_data) => {
  let result = {
    success: false
  }

  let error = ""

  let urlcomplete = urlapi + process.env.ROUTE_OF_CORE_FOR_BOOK_SUBMISSION
  try {
    let response = await axios.post(urlcomplete, submission_data, {
      headers: {
        ...submission_data.getHeaders()
      }
    })
    if (response.status == 201) {
      let rdata = response.data
      result.success = true
      result.data = rdata
    } else {
      error = response.data.message
    }
  } catch (err) {
    error = err.message
    if (err.response) {
      console.log(err.response.data);
      error = err.response.data.message
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})


module.exports = {
  control_service_data,
  core_list_genre,
  core_retrieve_genre,
  core_list_author,
  core_retrieve_author,
  core_list_book,
  core_retrieve_book,
  core_get_tops_book,
  core_get_recents_book,
  core_create_subscriber,
  core_create_message,
  core_create_submission
}