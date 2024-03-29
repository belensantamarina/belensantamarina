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

let autoPlayInterval;

const galleryContainer = document.getElementById('gallery');
if (galleryContainer) {
  const withNavigation = Boolean(galleryContainer.dataset.nav);
  const imageContainers = galleryContainer.querySelectorAll('li');

  const selectImage = (imageContainer) => {
    if (galleryContainer.dataset.selected) {
      imageContainers[galleryContainer.dataset.selected].classList.toggle(
        'active',
      );
    }
    imageContainer.classList.toggle('active');

    if (withNavigation) {
      const imageButtons = galleryContainer.querySelectorAll('button');
      if (galleryContainer.dataset.selected) {
        imageButtons[galleryContainer.dataset.selected].classList.toggle(
          'active',
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
      imageButton.style.backgroundImage = `url('${imageContainer
        .getElementsByTagName('img')[0]
        .getAttribute('src')}')`;
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

  window.addEventListener('load', () => {
    autoPlayInterval = window.setInterval(() => {
      const currentId = Number(galleryContainer.dataset.selected);
      const nextId =
        imageContainers.length - 1 >= currentId + 1 ? currentId + 1 : 0;
      selectImage(imageContainers[nextId]);
    }, 3000);
  });
}

/********************************/
/*            SOCIAL            */
/********************************/

const navSocialContainer = document.querySelector('ul.social');
const socialViewAllContainer = navSocialContainer.querySelector('li');
const socialUrl = navSocialContainer.querySelector('a').href;

const renderStatusInNav = ({ id, description, source }) => {
  const statusImage = document.createElement('img');
  statusImage.alt = description;
  statusImage.src = source;
  statusImage.decoding = 'async';
  statusImage.loading = 'lazy';

  const statusLink = document.createElement('a');
  statusLink.href = `${socialUrl}?statusId=${id}`;
  statusLink.appendChild(statusImage);

  const statusContainer = document.createElement('li');
  statusContainer.appendChild(statusLink);

  navSocialContainer.insertBefore(statusContainer, socialViewAllContainer);
};

const renderSocialModuleInNav = (data) => {
  data.every((status) => {
    if (status.media_attachments.length > 0) {
      renderStatusInNav({
        id: status.id,
        description:
          status.media_attachments[0].description ||
          status.content.replace(/(<([^>]+)>)/gi, ''),
        source: status.media_attachments[0].preview_url,
      });
      return true;
    }

    return false;
  });
};

window.fetchSocialData = (
  renderCallback = renderSocialModuleInNav,
  limit = 3,
  lastId = null,
) => {
  let url = `https://${window.MASTODON_COMMUNITY}/api/v1/accounts/${window.MASTODON_USER_ID}/statuses?limit=${limit}`;
  if (lastId) {
    url += `&max_id=${lastId}`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderCallback(data);
    });
};

window.addEventListener('load', () => {
  window.fetchSocialData();
});
