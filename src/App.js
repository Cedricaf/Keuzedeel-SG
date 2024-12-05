import './App.css';
import { useState, useEffect } from 'react';
import { Card, Button, Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for routing

// Import the quotes from the JSON file
import quotesData from './quotes.json'; // Adjust the path if needed

// Import images for the slideshow
import images from './images';  // images is an array of image objects with 'src' and 'tags'

// Language Images (7 images below the quotes)
const languageImages = [
  { src: '/dutch-flag.png', alt: 'Dutch Flag', href: 'kan pas gebeurt zijn wanneer website online is ' },
  { src: '/english-flag.png', alt: 'English Flag', href: 'kan pas gebeurt zijn wanneer website online is ' },
  { src: '/french-flag.png', alt: 'French Flag', href: 'kan pas gebeurt zijn wanneer website online is ' },
  { src: '/spain-flag.png', alt: 'Spanish Flag', href: 'kan pas gebeurt zijn wanneer website online is ' },
  { src: '/german-flag.png', alt: 'German Flag', href: 'kan pas gebeurt zijn wanneer website online is ' },
  { src: '/italy-flag.png', alt: 'Italian Flag', href: 'kan pas gebeurt zijn wanneer website online is ' },
  { src: '/russian-flag.png', alt: 'Russian Flag', href: 'kan pas gebeurt zijn wanneer website online is ' },
];

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');  // State for quote search query
  const [imageSearchQuery, setImageSearchQuery] = useState('');  // State for image search query
  const [currentImageIndex, setCurrentImageIndex] = useState(0);  // State for image index
  const [filteredImages, setFilteredImages] = useState(images);  // State for filtered images

  // Alphabet array for the 26 letters
  const alphabet = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));

  // Split alphabet into two parts for two rows
  const firstRow = alphabet.slice(0, 13);  // First 13 letters
  const secondRow = alphabet.slice(13, 26); // Last 13 letters

  useEffect(() => {
    // Set the first quote on initial load
    setRandomQuote();
  }, []);

  // Set a random quote
  const setRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    setQuote(quotesData[randomIndex].quote);
    setAuthor(quotesData[randomIndex].author);
  };

  // Handle quote search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterQuotes(query);  // Filter quotes based on search query
  };

  // Filter quotes based on the search query (searching in quote text or author)
  const filterQuotes = (query) => {
    if (!query) {
      setRandomQuote();  // Reset to a random quote if no search query
    } else {
      const filtered = quotesData.filter(
        (quote) =>
          quote.quote.toLowerCase().includes(query.toLowerCase()) ||
          quote.author.toLowerCase().includes(query.toLowerCase())
      );

      if (filtered.length > 0) {
        setQuote(filtered[0].quote);
        setAuthor(filtered[0].author);
      } else {
        setQuote("No quotes found.");
        setAuthor("");
      }
    }
  };

  // Handle image search query change
  const handleImageSearchChange = (e) => {
    const query = e.target.value;
    setImageSearchQuery(query);  // Update the image search query separately
    filterImages(query);  // Filter images based on search query
  };

  // Filter images based on the search query (searching within tags)
  const filterImages = (query) => {
    if (!query) {
      setFilteredImages(images);  // Show all images if no search query
    } else {
      const filtered = images.filter(
        (image) =>
          image.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) // Check if any tag matches the search query
      );
      setFilteredImages(filtered); // Set filtered images
    }
  };

  // Handle image change
  const goToNextImage = () => {
    if (filteredImages.length === 0) return; // Prevent going to next image if no images left
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const goToPreviousImage = () => {
    if (filteredImages.length === 0) return; // Prevent going to previous image if no images left
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length
    );
  };

  // Share the quote using the Web Share API
  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Inspirational Quote',
        text: `${quote} — ${author}`,
        url: window.location.href,
      })
      .then(() => console.log('Quote shared successfully!'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this device or browser.');
    }
  };

  return (
    <>
      <div className="navbar-container">
  <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
    <Navbar.Brand href="#home">Quote App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
</div>


      {/* Content Section */}
      <div className="d-flex flex-column justify-content-center align-items-center">
        {/* Slideshow Image Display */}
        <div className="image-container">
          {filteredImages.length > 0 && (
            <img
              src={filteredImages[currentImageIndex].src}
              alt="Slideshow"
              className="slideshow-image"
            />
          )}
          {/* Arrow Buttons */}
          <div className="arrow-buttons">
            <Button className="arrow-button left-arrow" onClick={goToPreviousImage}>
              <i className="fas fa-arrow-left"></i>
            </Button>
            <Button className="arrow-button right-arrow" onClick={goToNextImage}>
              <i className="fas fa-arrow-right"></i>
            </Button>
          </div>
        </div>

        {/* Image Search Bar */}
        <div className="search-bar-container">
          <div className="search-bar">
            <i className="search-icon fas fa-search"></i> {/* Magnifying glass icon */}
            <input
              type="text"
              value={imageSearchQuery}
              onChange={handleImageSearchChange}
              placeholder="Spreekwoorden zoeken"
              className="search-input"
            />
          </div>
        </div>

        {/* Language Header for Dutch */}
        <div className="language-header">
          <span className="language-text">Nederlands </span>
          <img src="/dutch-flag.png" alt="Dutch Flag" className="flag-image" />
        </div>

        {/* Alphabet Circles for Dutch */}
        <div className="alphabet-circles">
          {/* First row of circles */}
          <div className="circle-row">
            {firstRow.map((letter, index) => (
              <div key={index} className="circle">
                {letter}
              </div>
            ))}
          </div>

          {/* Second row of circles */}
          <div className="circle-row">
            {secondRow.map((letter, index) => (
              <div key={index} className="circle">
                {letter}
              </div>
            ))}
          </div>
        </div>

        {/* Quote Card */}
        <Card className="bg-light">
          <Card.Body className="text-center my-4">
            <Card.Text>"{quote}"</Card.Text>
            <Card.Text className="text-end">--- {author}</Card.Text>
            {/* Share Button */}
            <Button className="bg-transparent mt-3" onClick={shareQuote}>
              <i className="fa-solid fa-link"></i> <span className="btn-text">Share</span>
            </Button>
          </Card.Body>
        </Card>

        {/* Language Images Section */}
        <div className="language-images">
          {languageImages.map((image, index) => (
            <React.Fragment key={index}>
              <a href={`#${image.alt.toLowerCase()}`} className="language-link">
                <img src={image.src} alt={image.alt} className="language-img" />
              </a>
              {index < languageImages.length - 1 && (
                <span className="separator"> - </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Quote Search Bar */}
        <div className="search-bar-container">
          <div className="search-bar">
            <i className="search-icon fas fa-search"></i> {/* Magnifying glass icon */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Quotes zoeken"
              className="search-input"
            />
          </div>
        </div>

        {/* Language Header for English */}
        <div className="language-header">
          <span className="language-text">Engels </span>
          <span className="language-text">Coming soon! </span>
          <img src="/english-flag.png" alt="English Flag" className="flag-image" />
        </div>

        {/* Alphabet Circles for English */}
        <div className="alphabet-circles">
          {/* First row of circles */}
          <div className="circle-row">
            {firstRow.map((letter, index) => (
              <div key={index} className="circle">
                {letter}
              </div>
            ))}
          </div>

          {/* Second row of circles */}
          <div className="circle-row">
            {secondRow.map((letter, index) => (
              <div key={index} className="circle">
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;