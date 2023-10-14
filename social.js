/********************************/
/*            SOCIAL            */
/********************************/

let loading = true;

const url = new URL(window.location);

const mainContainer = document.querySelector('main');

const mainSocialContainer = document.createElement('section');
mainSocialContainer.id = 'social';
mainContainer.appendChild(mainSocialContainer);

const renderStatusInBody = ({ id, content, thumbnail, media }) => {
  const statusContainer = document.createElement('article');
  statusContainer.id = id;

  const statusDetailsContainer = document.createElement('div');

  media.forEach(({ description, source }) => {
    const statusImage = document.createElement('img');
    statusImage.alt = description;
    statusImage.src = source;
    statusImage.decoding = 'async';
    statusImage.loading = 'lazy';
    statusDetailsContainer.appendChild(statusImage);
  });

  const statusContent = document.createElement('blockquote');
  statusContent.innerHTML = content;
  statusDetailsContainer.appendChild(statusContent);

  const closeStatusButton = document.createElement('button');
  closeStatusButton.title = 'Close';
  closeStatusButton.classList.add('close');
  closeStatusButton.addEventListener('click', () => {
    statusContainer.classList.remove('active');
    url.searchParams.delete('statusId');
    window.history.pushState({}, '', url);
  });
  statusDetailsContainer.prepend(closeStatusButton);

  statusContainer.appendChild(statusDetailsContainer);

  const openStatusButton = document.createElement('button');
  openStatusButton.title = 'Open';
  openStatusButton.classList.add('open');
  openStatusButton.style.backgroundImage = `url('${thumbnail}')`;
  openStatusButton.addEventListener('click', () => {
    statusContainer.classList.add('active');
    url.searchParams.set('statusId', statusContainer.id);
    window.history.pushState({}, '', url);
  });
  statusContainer.appendChild(openStatusButton);

  mainSocialContainer.appendChild(statusContainer);
};

const renderSocialModuleInBody = (data) => {
  data.forEach((status) => {
    if (status.media_attachments.length > 0) {
      const fallbackDescription = status.content.replace(/(<([^>]+)>)/gi, '');

      const media = status.media_attachments.map(({ description, url }) => ({
        description: description || fallbackDescription,
        source: url,
      }));

      renderStatusInBody({
        id: status.id,
        content: status.content,
        thumbnail: status.media_attachments[0].preview_url,
        media,
      });
    }
  });

  const selectedStatusId = url.searchParams.get('statusId');
  if (selectedStatusId) {
    document.getElementById(selectedStatusId).classList.add('active');
  }

  loading = false;
};

window.addEventListener('load', () => {
  window.fetchSocialData(renderSocialModuleInBody, 30);
});

window.addEventListener('scroll', () => {
  if (loading) return;
  if (window.pageYOffset + window.innerHeight >= document.body.offsetHeight) {
    loading = true;
    window.fetchSocialData(
      renderSocialModuleInBody,
      30,
      mainSocialContainer.lastChild.id,
    );
  }
});
