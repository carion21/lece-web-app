var express = require('express');
var router = express.Router();
require('dotenv').config();

const apiUrl = process.env.API_URL;

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/top-seller', (req, res) => {
  res.render('top-seller');
});

// router.get('/book', (req, res) => {
//   res.render('book');
// });

router.get('/book', async (req, res) => {
  try {
    // URL de l'API ou chemin du fichier JSON
    const URL = `${apiUrl}/book` // ou './chemin/vers/votre/fichier.json';
    
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    
    // Extraction des livres à partir de data
    const books = jsonData.data;
    console.log(books)
    
    // Rendu de la page avec les données des livres
    res.render('book', { books: books });
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).render('error', { message: 'Erreur lors de la récupération des données des livres' });
  }
});

router.get('/book_details', (req, res) => {
  res.render('book_details');
});

router.get('/book_details/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    // URL de l'API pour récupérer les détails d'un livre spécifique
    const URL = `${apiUrl}/book/by-slug/${slug}`;
    
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const bookData = await response.json();
    
    // Vérifiez si les données du livre sont dans une propriété 'data'
    const book = bookData.data || bookData;
    
    // Rendu de la page avec les données du livre
    res.render('book_details', { book });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre :', error);
    res.status(500).render('error', { message: 'Erreur lors de la récupération des détails du livre' });
  }
});


router.get('/author', async (req, res) => {

  try {
    // URL de l'API ou chemin du fichier JSON
    const URL = `${apiUrl}/author` // ou './chemin/vers/votre/fichier.json';
    
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    
    // Extraction des livres à partir de data
    const authors = jsonData.data;
    console.log(authors)
    
    // Rendu de la page avec les données des livres
    res.render('author', { authors: authors });
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).render('error', { message: 'Erreur lors de la récupération des données des livres' });
  }
});

router.get('/author_details/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    // URL de l'API pour récupérer les détails d'un livre spécifique
    const URL = `${apiUrl}/author/by-slug/${slug}`;
    
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const authorData = await response.json();
    
    // Vérifiez si les données du livre sont dans une propriété 'data'
    const author = authorData.data || authorData;
    
    // Rendu de la page avec les données du livre
    res.render('author_details', { author });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre :', error);
    res.status(500).render('error', { message: 'Erreur lors de la récupération des détails du livre' });
  }
});

router.get('/genre', async (req, res) => {

  try {
    // URL de l'API ou chemin du fichier JSON
    const URL = `${apiUrl}/genre`
    
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    
    // Extraction des livres à partir de data
    const genres = jsonData;
    console.log(genres)
    
    // Rendu de la page avec les données des livres
    res.render('genre', { genres: genres });
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).render('error', { message: 'Erreur lors de la récupération des données des livres' });
  }
});

router.get('/genre/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const genreDetailUrl = `${apiUrl}/genre/by-slug/${slug}`;
    const allGenresUrl = `${apiUrl}/genre`;

    const [genreResponse, allGenresResponse] = await Promise.all([
      fetch(genreDetailUrl),
      fetch(allGenresUrl)
    ]);

    if (!genreResponse.ok || !allGenresResponse.ok) {
      throw new Error(`HTTP error! status: ${genreResponse.status}, ${allGenresResponse.status}`);
    }

    const [genreDetail, allGenres] = await Promise.all([
      genreResponse.json(),
      allGenresResponse.json()
    ]);


    if (!genreDetail.data || !allGenres) {
      return res.status(404).render('error', { message: 'Genre non trouvé' });
    }

    // console.log(genreDetail.data.);

    res.render('genre_details', { 
      genreDetail: genreDetail.data, 
      allGenres: allGenres 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).render('error', { message: 'Erreur lors de la récupération des données des genres' });
  }
});


module.exports = router;
