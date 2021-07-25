/********************************/
/*            SOCIAL            */
/********************************/

const mainContainer = document.querySelector('main');

const mainSocialContainer = document.createElement('section');
mainSocialContainer.id = 'social';
mainContainer.appendChild(mainSocialContainer);

const renderStatusInBody = ({ id, content, media }) => {
  const statusContainer = document.createElement('article');
  statusContainer.id = id;

  const statusDetailsContainer = document.createElement('div');

  media.forEach(({ description, source }) => {
    const statusImage = document.createElement('img');
    statusImage.alt = description;
    statusImage.src = source;
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
  });
  statusDetailsContainer.prepend(closeStatusButton);

  statusContainer.appendChild(statusDetailsContainer);

  const openStatusButton = document.createElement('button');
  openStatusButton.title = 'Open';
  openStatusButton.classList.add('open');
  openStatusButton.style.backgroundImage = `url('${media[0].source}')`;
  openStatusButton.addEventListener('click', () => {
    statusContainer.classList.add('active');
  });
  statusContainer.appendChild(openStatusButton);

  mainSocialContainer.appendChild(statusContainer);
};

window.renderSocialModuleInBody = (data) => {
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
        media,
      });
    }
  });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  document.getElementById(urlParams.get('statusId')).classList.add('active');
};
