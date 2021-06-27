/********************************/
/*							NAV							*/
/********************************/

const navButton = document.getElementById('nav');

const navContainer = document.querySelector('nav');
const headerContainer = document.querySelector('header');

navButton.addEventListener('click', () => {
  headerContainer.classList.toggle('active');
  navContainer.classList.toggle('active');
});

/********************************/
/*						GALLERY						*/
/********************************/

const galleryContainer = document.getElementById('gallery');
if (galleryContainer) {
  const imageContainer = document.getElementById('img');

  const selectImage = (imageElement) => {
    imageContainer.style.backgroundImage = `url('${imageElement.getAttribute(
      'src'
    )}')`;
  };

  const imageElements = galleryContainer.querySelectorAll('img');
  selectImage(imageElements[0]);

  imageElements.forEach((imageElement) => {
    imageElement.addEventListener('click', (event) => {
      selectImage(event.target);
    });
  });
}
