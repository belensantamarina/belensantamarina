/********************************/
/*            SOCIAL            */
/********************************/

const mainContainer = document.querySelector('main');

const mainSocialContainer = document.createElement('ul');
mainSocialContainer.classList.add('social');
mainContainer.appendChild(mainSocialContainer);

const renderStatusInBody = (status) => {
  const statusImageButton = document.createElement('button');
  statusImageButton.title = status.media[0].description;
  statusImageButton.style.backgroundImage = `url('${status.media[0].source}')`;

  const statusContainer = document.createElement('li');
  statusContainer.appendChild(statusImageButton);

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
};
