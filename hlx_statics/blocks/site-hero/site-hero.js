import {
  removeEmptyPTags,
  rearrangeHeroPicture,
  decorateButtons,
  createTag
} from '../../scripts/lib-adobeio.js';

/**
 * decorates the site-hero
 * @param {Element} block The site-hero block element
 */
export default async function decorate(block) {
  block.setAttribute('daa-lh', 'site hero');
  removeEmptyPTags(block);
  decorateButtons(block);

  const button_div = createTag('div', {class: 'hero-button-container'});
 
  block.classList.add('spectrum--dark');
  block.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((h) => {
    h.classList.add('spectrum-Heading', 'spectrum-Heading--sizeXXL', 'spectrum-Heading--serif');
    h.parentElement.append(button_div);
  });
  
  block.querySelectorAll('p').forEach((p) => {
    const hasLinks = p.querySelectorAll('a, button');
    // don't attach to icon container or if p tag contains links
    if (!p.classList.contains('icon-container') && hasLinks.length === 0) {
      p.classList.add('spectrum-Body', 'spectrum-Body--sizeL');
    }
    if (p.classList.contains('button-container')){
      button_div.append(p);
    }
  });

  const overlayStyle = 'position: absolute; display: flex; left: 50%; top: 50%;  transform: translate(-50%, -50%); text-align: center';
  rearrangeHeroPicture(block, overlayStyle);

  if(document.querySelectorAll('.xl img').length === 1){
    const hero_picture = document.querySelectorAll('.xl picture')[0];
    hero_picture.style.setProperty('align-items', '');
    const hero_img = document.querySelectorAll('.xl img')[0];
    hero_img.removeAttribute('style');
    hero_img.setAttribute('class', 'xl-img');
  }
  
}
