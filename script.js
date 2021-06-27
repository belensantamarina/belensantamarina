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
    imageContainer.dataset.selected = imageElement.dataset.id;

    galleryContainer.querySelector('img.active')?.classList.toggle('active');
    imageElement.classList.toggle('active');
  };

  const imageElements = galleryContainer.querySelectorAll('img');
  selectImage(imageElements[0]);

  const autoPlayInterval = window.setInterval(() => {
    const currentId = Number(imageContainer.dataset.selected);
    const nextId =
      imageElements.length - 1 >= currentId + 1 ? currentId + 1 : 0;
    selectImage(imageElements[nextId]);
  }, 3000);

  imageElements.forEach((imageElement) => {
    imageElement.addEventListener('click', (event) => {
      selectImage(event.target);
      clearInterval(autoPlayInterval);
    });
  });
}
