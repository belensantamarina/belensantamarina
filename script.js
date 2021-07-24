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
  const withNavigation = Boolean(galleryContainer.dataset.nav);
  const imageContainers = galleryContainer.querySelectorAll('li');

  const selectImage = (imageContainer) => {
    if (galleryContainer.dataset.selected) {
      imageContainers[galleryContainer.dataset.selected].classList.toggle(
        'active'
      );
    }
    imageContainer.classList.toggle('active');

    if (withNavigation) {
      const imageButtons = galleryContainer.querySelectorAll('button');
      if (galleryContainer.dataset.selected) {
        imageButtons[galleryContainer.dataset.selected].classList.toggle(
          'active'
        );
      }
      imageButtons[imageContainer.dataset.id].classList.toggle('active');
    }
    galleryContainer.dataset.selected = imageContainer.dataset.id;
  };

  if (withNavigation) {
    const generateButtonTitle = (index) =>
      `${galleryContainer.dataset.action} ${index + 1}`;
    const navigationContainer = document.createElement('div');

    imageContainers.forEach((imageContainer, index) => {
      const imageButton = document.createElement('button');
      imageButton.style.backgroundImage = `url('${imageContainer.children[0].getAttribute(
        'src'
      )}')`;
      imageButton.addEventListener('click', (event) => {
        clearInterval(autoPlayInterval);
        selectImage(imageContainers[index]);
      });
      imageButton.title = generateButtonTitle(index);
      navigationContainer.appendChild(imageButton);
    });

    galleryContainer.appendChild(navigationContainer);
  }

  selectImage(imageContainers[0]);

  const autoPlayInterval = window.setInterval(() => {
    const currentId = Number(galleryContainer.dataset.selected);
    const nextId =
      imageContainers.length - 1 >= currentId + 1 ? currentId + 1 : 0;
    selectImage(imageContainers[nextId]);
  }, 3000);
}
