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
