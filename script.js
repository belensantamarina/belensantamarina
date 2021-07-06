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
  const imageContainers = galleryContainer.querySelectorAll('li');

  const selectImage = (imageContainer) => {
    if (galleryContainer.dataset.selected) {
      imageContainers[galleryContainer.dataset.selected].classList.toggle(
        'active'
      );
    }
    imageContainer.classList.toggle('active');
    galleryContainer.dataset.selected = imageContainer.dataset.id;
  };

  const autoPlayInterval = window.setInterval(() => {
    const currentId = Number(galleryContainer.dataset.selected);
    const nextId =
      imageContainers.length - 1 >= currentId + 1 ? currentId + 1 : 0;
    selectImage(imageContainers[nextId]);
  }, 3000);

  selectImage(imageContainers[0]);
}
