var express = require('express');
var router = express.Router();

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
    const url = 'http://167.86.106.97:3535/book' // ou './chemin/vers/votre/fichier.json';
    
    const response = await fetch(url);
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
    const apiUrl = `http://167.86.106.97:3535/book/by-slug/${slug}`;
    
    const response = await fetch(apiUrl);
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
    const url = 'http://167.86.106.97:3535/author' // ou './chemin/vers/votre/fichier.json';
    
    const response = await fetch(url);
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
    const apiUrl = `http://167.86.106.97:3535/author/by-slug/${slug}`;
    
    const response = await fetch(apiUrl);
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
    const url = 'http://167.86.106.97:3535/genre'
    
    const response = await fetch(url);
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


module.exports = router;
