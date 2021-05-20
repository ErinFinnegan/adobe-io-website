// window.adobeid = {
//   client_id: 'IMSLibJSTestClient',
//   scope: 'AdobeID,openid',
//   locale: 'en_US',
//   environment: 'stg1',
//   useLocalStorage: false,
//   onAccessToken: function (tokenInformation) {
//   },
//   onReauthAccessToken: function (reauthTokenInformation) {
//   },
//   onError: function (error) {
//   },
//   onAccessTokenHasExpired: function() {
//   },
//   onReady: function(appState) {
//     console.log('adobe id ready')
//   }
// };

window.adobeid = {"client_id": "stage_adobe_io","scope": "AdobeID,openid,unified_dev_portal,read_organizations,additional_info.projectedProductContext,additional_info.roles,gnav,read_pc.dma_bullseye,creative_sdk", "locale": "en_US", "environment": "stg1", "useLocalStorage": false, "logsEnabled": true};
adobeIMSMethods = {
  signIn: function () {
      adobeIMS.signIn();
  },
  authorizeToken(token) {},
  getAccessToken() {
      vm.state.token = adobeIMS.getAccessToken();
  },
  refreshToken() {
      adobeIMS.refreshToken();
  },
  reAuthenticate() {
      adobeIMS.reAuthenticate({
      }, "check");
  },
  reAuthenticateForce() {
      adobeIMS.reAuthenticate({
          api: 'apioverride',
      }, "force");
  },
  getReauthAccessToken() {
      vm.state.rtoken = adobeIMS.getReauthAccessToken();
  },
  signOut(){
      adobeIMS.signOut({});
  },
  getProfile(){
      adobeIMS.getProfile().then(profile => {
              vm.state.profile = profile;
      })
      .catch( ex => {
              vm.state.profile = ex;
      })
  },
  signUp(){
      adobeIMS.signUp();
  },
  validateToken(){
      adobeIMS.validateToken().then(v => {
      })
      .catch(ex => {
      })
  },
  signInWithSocialProvider(){
      adobeIMS.signInWithSocialProvider('google');
  }
};
// See https://github.com/adobe/react-spectrum/blob/dac6d273a9843694a652d7513ff88f6a9c773887/packages/%40react-spectrum/utils/src/useIsMobileDevice.ts#L15
const MOBILE_SCREEN_WIDTH = 700;
const LARGE_SCREEN_WIDTH = 1280;

const $FOOTER_LINKS =
[
  {
    "name": "Api",
    "links": [
      { "name": "Adobe Creative Cloud", "url": "https://www.adobe.io/apis/creativecloud" },
      { "name": "Adobe Experience Platform", "url": "https://www.adobe.io/apis/experienceplatform/home" },
      { "name": "Adobe Document Cloud", "url": "https://www.adobe.io/apis/documentcloud" },
      { "name": "Adobe Experience Cloud", "url": "https://www.adobe.io/apis/experiencecloud" }
  ]
  },
  {
    "name": "Service",
    "links": [
      { "name": "Adobe XD", "url": "https://www.adobe.io/apis/creativecloud/xd" },
      { "name": "Adobe Target", "url": "https://www.adobe.io/apis/experiencecloud/target" },
      { "name": "Adobe Analytics", "url": "https://www.adobe.io/apis/experiencecloud/analytics" },
      { "name": "Project Firefly", "url": "https://www.adobe.io/apis/experienceplatform/project-firefly" }
    ]
  },
  {
    "name": "Community",
    "links": [
      { "name": "Adobe Tech Blog", "url": "https://medium.com/adobetech" },
      { "name": "Adobe on GitHub", "url": "https://github.com/adobe" },
      { "name": "Adobe Developer on YouTube", "url": "https://youtube.com/channel/UCDtYqOjS9Eq9gacLcbMwhhQ" },
      { "name": "Adobe Developer on Twitter", "url": "https://twitter.com/adobedevs" },
      { "name": "Community Forums", "url": "https://adobe.com/communities/index.html" }
    ]
  },
  {
    "name": "Support",
    "links": [
      { "name": "Contact us", "url": "https://www.adobe.io/contactus" },
      { "name": "Adobe Developer support", "url": "https://www.adobe.io/support" },
      { "name": "Adobe Product support", "url": "https://helpx.adobe.com/contact/enterprise-support.html" }
    ]
  },
  {
    "name": "Developer",
      "links": [
      { "name": "Adobe I/O console", "url": "https://console.adobe.io/" },
      { "name": "Open source at Adobe", "url": "https://www.adobe.io/open" },
      { "name": "Download SDKs", "url": "https://console.adobe.io/downloads" },
      { "name": "Authentication", "url": "https://www.adobe.io/authentication.html" },
      { "name": "Careers", "url": "https://adobe.com/careers.html" }
    ]
  },
  {
    "name": "Legal",
      "links": [
      { "name": "Terms of use", "url": "https://adobe.com/legal/terms.html" },
      { "name": "Privacy policy", "url": "https://adobe.com/privacy.html" },
      { "name": "Cookies", "url": "https://adobe.com/privacy/cookies.html" },
      { "name": "AdChoices", "url": "https://adobe.com/privacy/opt-out.html#interest-based-ads" }
    ]
  },
];

let $CURRENT_API_FILTERS = [];
  /**
   * Creates a tag with the given name and attributes.
   * @param {string} name The tag name
   * @param {object} attrs An object containing the attributes
   * @returns The new tag
   */
  function createTag(name, attrs) {
    const el = document.createElement(name);
    if (typeof attrs === "object") {
      for (let [key, value] of Object.entries(attrs)) {
        el.setAttribute(key, value);
      }
    }
    return el;
  }

  function toClassName(name) {
    return name.toLowerCase().replace(/[^0-9a-z]/gi, "-");
  }

  /**
   * Loads a CSS file.
   * @param {string} href The path to the CSS file
   */
  function loadCSS(href) {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", href);
    document.head.appendChild(link);
  }

  /**
   * Turn tables to DIV.
   * @param {object} $table Table element
   */

  function tableToDivs($table) {
    const $rows = $table.querySelectorAll("tbody tr");
    const blockname = $table.querySelector("th").textContent;
    const $block = createTag("div", { class: `${toClassName(blockname)}` });
    $rows.forEach(($tr) => {
      const $row = createTag("div");
      $tr.querySelectorAll("td").forEach(($td, i) => {
        const $div = createTag("div");
        $div.innerHTML = $td.innerHTML;
        $row.append($div);
      });
      $block.append($row);
    });
    return $block;
  }

  function removeEmptyPTags($theElement){
    $theElement.querySelectorAll('p').forEach(($pElement) => {
      // get rid of empty p tags
      if(!$pElement.hasChildNodes()){
        $pElement.remove();
      }
    })
  }

  function sortDate( a, b ) {
    if ( a['Last Updated'] > b['Last Updated']  ){
      return -1;
    }
    if ( a['Last Updated'] < b['Last Updated']  ){
      return 1;
    }
    return 0;
  }

  function sortTitle( a, b ) {
    if ( a['Title'] < b['Title']  ){
      return -1;
    }
    if ( a['Title'] > b['Title']  ){
      return 1;
    }
    return 0;
  }

  function decorateTables() {
    document.querySelectorAll("main div>table").forEach(($table) => {
      const $div = tableToDivs($table);
      $table.parentNode.replaceChild($div, $table);
    });
  }

  function decorateBlocks() {
    document
      .querySelectorAll("main>div.section-wrapper>div>div")
      .forEach(($block) => {
        const classes = Array.from($block.classList.values());
        $block
          .closest(".section-wrapper")
          .classList.add(`${classes[0]}-container`);
      });
  }

  function decorateBackgroundImageBlocks() {
    document
      .querySelectorAll("main div.background-image")
      .forEach(($bgImgDiv) => {
        const $images = $bgImgDiv.querySelectorAll("img");
        const $lastImage = $images[$images.length - 1];

        const $section = $bgImgDiv.closest(".section-wrapper");
        if ($section && $lastImage) {
          $section.style.backgroundImage = `url(${$lastImage.src})`;
          let $caption = $lastImage.nextElementSibling;
          if ($caption) {
            if ($caption.textContent == "")
              $caption = $caption.nextElementSibling;
            if ($caption) $caption.classList.add("background-image-caption");
          }
          $lastImage.remove();
        }
      });
  }

  function decorateEmbeds() {
    document.querySelectorAll('.embed-container').forEach(($embed) => {
      $embed.classList.add('spectrum--lightest');
      $embed.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(($header) => {
        $header.classList.add('spectrum-Heading', 'spectrum-Heading--sizeM');
      })

      $embed.querySelectorAll('p').forEach(($p) => {
        const $hasLinks = $p.querySelectorAll('a, button');
        // don't attach to icon container or if p tag contains links
        if(!$p.classList.contains('icon-container') && $hasLinks.length === 0) {
          $p.classList.add('spectrum-Body', 'spectrum-Body--sizeM');
        }
      });

    });
  }

  function isLinkExternal(url) {
    if(url.indexOf('adobe.io') > -1 || url.indexOf('hlx.page') > -1 ){
      return false;
    } else {
      return true;
    }
  }

  function decorateButtons(section) {
    document.querySelectorAll(`${section} a`).forEach(($a) => {
      $a.innerHTML = `<span class="spectrum-Button-label">${$a.innerHTML}</span>`
      const $up = $a.parentElement;
      const $twoup = $a.parentElement.parentElement;
      if ($up.childNodes.length == 1 && $up.tagName == "P") {
        $a.className = 'spectrum-Button spectrum-Button--secondary  spectrum-Button--sizeM';
      }

      if(isLinkExternal($a.href)) {
        $a.target = '_blank';
        $a.rel = 'noopener noreferrer';
      }

      if (
        $up.childNodes.length == 1 &&
        $up.tagName == "STRONG" &&
        $twoup.childNodes.length == 1 &&
        $twoup.tagName == "P"
      ) {
        $a.className = 'spectrum-Button spectrum-Button--cta  spectrum-Button--sizeM';
        $twoup.replaceChild($a, $up);
      }
    });
  }

  function decorateIframe() {
    document.querySelectorAll(".iframe a").forEach(($a) => {
      if ($a.textContent.startsWith("https://")) {
        const url = new URL($a.href);

        let embedHTML = `<div>
      <iframe src="${$a.href}" style="border: 0; width: 100%; height: 100%; position: absolute;"></iframe>
      </div>
      `;

        let type = "iframe";

        if (type) {
          const $embed = createTag("div", {
            class: `embed embed-oembed embed-${type}`,
          });
          const $div = $a.closest("div");
          $embed.innerHTML = embedHTML;
          $div.parentElement.replaceChild($embed, $div);
        }
      }
    });
  }

  function wrapSections(element) {
    document.querySelectorAll(element).forEach(($div) => {
      const $wrapper = createTag("div", { class: "section-wrapper" });
      $div.parentNode.appendChild($wrapper);
      $wrapper.appendChild($div);
    });
  }

  function footerListItem(name, url) {
    return `
      <li>
        <a href="${url}" class="spectrum-Link spectrum-Link--secondary spectrum-Link--quiet">${name}</a>
      </li>
    `;
  }

  function decorateFooter() {
    document.querySelectorAll('footer').forEach(($footer) => {
      let $apiLinksHTML = '';
      $FOOTER_LINKS[0].links.forEach(($link) => {
        $apiLinksHTML += footerListItem($link.name, $link.url)
      });

      let $servicesLinksHTML = '';
      $FOOTER_LINKS[1].links.forEach(($link) => {
        $servicesLinksHTML += footerListItem($link.name, $link.url)
      });

      let $apisTemplate = `
      <div class="footer-apis">
        <div class="footer-apis-container">
          <div class="footer-apis-inner">
            <h3 class="spectrum-Heading--sizeXS">APIs and Services</h3>
            <ul class="spectrum-Body spectrum-Body--sizeS">
              ${$apiLinksHTML}
              <li>
                <a href="https://www.adobe.io/apis/" class="spectrum-Link spectrum-Link--quiet">
                  <strong>
                    View all
                  </strong>
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-services-container">
            <ul class="spectrum-Body spectrum-Body--sizeS">
              ${$servicesLinksHTML}
            </ul>
          </div>
        </div>
        <div class="footer-divider">
          <div class="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--vertical" style="height: 100%; align-self: stretch;"></div>
        </div>
      </div>
      `;

      let $communityLinksHTML = '';
      $FOOTER_LINKS[2].links.forEach(($link) => {
        $communityLinksHTML += footerListItem($link.name, $link.url)
      });

      let $communityTemplate = `
      <div class="footer-community">
        <div class="footer-community-container">
          <div>
          <h3 class="spectrum-Heading--sizeXS">Community</h3>
            <ul class="spectrum-Body spectrum-Body--sizeS">
              ${$communityLinksHTML}
            </ul>
          </div>
        </div>
        <div class="footer-divider">
          <div class="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--vertical" style="height: 100%; align-self: stretch;"></div>
        </div>
      </div>
      `;

      let $supportLinksHTML = '';
      $FOOTER_LINKS[3].links.forEach(($link) => {
        $supportLinksHTML += footerListItem($link.name, $link.url)
      });

      let $supportTemplate = `
      <div class="footer-support">
      <div class="footer-support-container">
        <div>
        <h3 class="spectrum-Heading--sizeXS">Support</h3>
          <ul class="spectrum-Body spectrum-Body--sizeS">
            ${$supportLinksHTML}
          </ul>
        </div>
      </div>
      <div class="footer-divider">
        <div class="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--vertical" style="height: 100%; align-self: stretch;"></div>
      </div>
    </div>
      `;


      let $developerLinksHTML = '';
      $FOOTER_LINKS[4].links.forEach(($link) => {
        $developerLinksHTML += footerListItem($link.name, $link.url)
      });

      let $developerTemplate = `
      <div class="footer-developer">
      <div class="footer-developer-container">
        <div>
        <h3 class="spectrum-Heading--sizeXS">Adobe Developer</h3>
          <ul class="spectrum-Body spectrum-Body--sizeS">
            ${$developerLinksHTML}
          </ul>
        </div>
      </div>
      <div class="footer-divider">
        <div class="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--vertical" style="height: 100%; align-self: stretch;"></div>
      </div>
    </div>
      `;

      let $legalLinksHTML = '';
      $FOOTER_LINKS[5].links.forEach(($link) => {
        $legalLinksHTML += footerListItem($link.name, $link.url)
      });

      let $legalLinksTemplate = `
      <div
        class="spectrum-Divider spectrum-Divider--sizeM footer-horizontal"
      ></div>
      <div
        class="footer-legal">
        <div>
          <ul
            class="spectrum-Body spectrum-Body--sizeXS">
            ${$legalLinksHTML}
          </ul>
        </div>
        <div>
          <span
            class="spectrum-Body spectrum-Body--sizeXS footer-date">
            Copyright © ${new Date().getFullYear()} Adobe. All rights reserved.
          </span>
        </div>
      </div>
      `;

      let $footerTemplate = `
        <div class="footer-links-container">
          <div class="footer-links-container-inner">
            ${$apisTemplate}
            ${$communityTemplate}
            ${$supportTemplate}
            ${$developerTemplate}
          </div>
          ${$legalLinksTemplate}
        </div>
      `;
      const $footerContainer = createTag('div', {class: 'footer-links-container'});
      $footerContainer.innerHTML = $footerTemplate;
      $footer.prepend($footerContainer);
    });
  }

  function decorateSiteHero() {
    document.querySelectorAll('.site-hero-container').forEach(($heroSection) => {
      removeEmptyPTags($heroSection);

      $heroSection.classList.add('spectrum--dark');

      $heroSection.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(($header) => {
        $header.classList.add('spectrum-Heading', 'spectrum-Heading--sizeXXL', 'spectrum-Heading--serif');
      })

      $heroSection.querySelectorAll('p').forEach(($p) => {
        const $hasLinks = $p.querySelectorAll('a, button');
        // don't attach to icon container or if p tag contains links
        if(!$p.classList.contains('icon-container') && $hasLinks.length === 0) {
          $p.classList.add('spectrum-Body', 'spectrum-Body--sizeL');
        }
      });

      // delete image and re-insert as bg
      let $heroImageSrc = $heroSection.querySelector('img') ? $heroSection.querySelector('img').src : null;

      $heroSection.querySelectorAll('picture source').forEach(($picture) => {
        //remove weird max-width attribute 
        $picture.media = "";
        $picture.parentElement.parentElement.remove();
      });

      $heroSection.style.backgroundImage = `url(${$heroImageSrc})`;
    });
  }

  function decorateHero() {
    decorateButtons('.hero-container');

    document.querySelectorAll('.hero-container').forEach(($heroSection) => {
      removeEmptyPTags($heroSection);

      $heroSection.querySelectorAll('.hero').forEach(($hero) => {
        $hero.classList.add('spectrum--lightest')
      });

      $heroSection.querySelectorAll('img.icon').forEach(($heroIcon) => {
        $heroIcon.parentElement.classList.add('icon-container');
      })

      $heroSection.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(($header) => {
        $header.classList.add('spectrum-Heading', 'spectrum-Heading--sizeXXL', 'spectrum-Heading--serif');
      })

      $heroSection.querySelectorAll('p').forEach(($p) => {
        const $hasLinks = $p.querySelectorAll('a, button');
        // don't attach to icon container or if p tag contains links
        if(!$p.classList.contains('icon-container') && $hasLinks.length === 0) {
          $p.classList.add('spectrum-Body', 'spectrum-Body--sizeL');
        }
      });

      $heroSection.querySelectorAll('picture source').forEach(($picture) => {
        //remove weird max-width attribute 
        $picture.media = "";
      });
      // put buttons into their own div
      const $buttonContainer = createTag('div', {class: 'hero-button-container'});
      $heroSection.querySelectorAll('a').forEach(($button) => {
        $button.classList.add('spectrum-Button--quiet')
        $buttonContainer.append($button);
      });

      // have to remove ps after moving buttons
      removeEmptyPTags($heroSection);

      const $firstSection = $heroSection.querySelector('div.hero>div>div');
      $firstSection.append($buttonContainer);
    });
  }

  function decorateTitle($container, $containerClass) {
    // search container for h's and p's not inside a container and apply title block classes
    $container.querySelectorAll('p').forEach(($pTag) => {
      const $mainContainer = $container.querySelector('div.'+ $containerClass);
      if(!$mainContainer.contains($pTag)) {
        $pTag.classList.add('title-body', 'spectrum-Body--sizeL', 'spectrum-Body--light');
      }
    })

    $container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(($hTag) => {
      const $mainContainer = $container.querySelector('div.'+ $containerClass);
      if(!$mainContainer.contains($hTag)) {
        $hTag.classList.add('title-header', 'spectrum-Heading--sizeL', 'spectrum-Heading--light');
      }
    })
  }

  function readBlockConfig($block) {
    const config = {};
    $block.querySelectorAll(":scope>div").forEach(($row) => {
      if ($row.children && $row.children[1]) {
        const name = toClassName($row.children[0].textContent);
        const $a = $row.children[1].querySelector("a");
        let value = "";
        if ($a) value = $a.href;
        else value = $row.children[1].textContent;
        config[name] = value;
      }
    });
    return config;
  }

  function displayFilteredCards(catalog, $cards, buttons, limit) {
    $cards.innerHTML = "";
    let counter = 0;
    catalog.forEach((card) => {
      let show = true;
      if ($CURRENT_API_FILTERS.length > 0) {
        if (!$CURRENT_API_FILTERS.includes(card.Category)) show = false;
      }

      if (counter >= limit) show = false;
      if (show) {

        let iconTemplate = '';
        if(card.Icon) {
          iconTemplate = `
            <div class="api-card-icon-container">
              <img
                width="48px"
                height="48px"
                class="api-card-icon"
                src="/hlx_statics/icons/${card.Icon}.svg"
              />
            </div>
          `
        }

        let buttonTemplate = '';
        buttons.forEach((b, i) => {
          if (card[b] !== "") {

            if(b === "Learn More"){
              buttonTemplate += 
                `<a href="${card[b]}" class="spectrum-Button spectrum-Button--secondary spectrum-Button--quiet spectrum-Button--sizeM" >
                  <span class="spectrum-Button-label">${b}</span>
                </a>`
            
            } else {
              buttonTemplate +=
              `
              <a href="${card[b]}" class="spectrum-Button spectrum-Button--primary spectrum-Button--sizeM">
                <span class="spectrum-Button-label">${b}</span>
              </a>
              `
            
            }
          }
        });

        let cardTemplate = `
<div class="api-card spectrum--lightest">
  <div
    class="spectrum-Card api-card-inner"
    role="figure"
    tabindex="0"
  >
    <div class="spectrum-Card-body api-card-body">
      ${iconTemplate}
      <div class="api-card-body-inner">
        <div
          class="api-card-title-container spectrum-Card-header spectrum-Heading spectrum-Heading--sizeXXS"
        >
          <div class="api-card-title spectrum-Card-title">
            <strong><h4>${card.Title}</h4></strong>
          </div>
        </div>
        <div
          class="spectrum-Card-content spectrum-Body spectrum-Body--sizeS api-card-content"
        >
          ${card.Description}
        </div>
      </div>
    </div>
    <div class="spectrum-Card-footer">
        <div class="api-card-button-container">
          ${buttonTemplate}
        </div>
    </div>
  </div>
</div>
`;

        $cards.innerHTML += cardTemplate;
        counter++;
      }
    });
  }

  function globalHeaderTemplate() {
    return `
      <p>
        <img class="icon icon-adobe" src="/hlx_statics/icons/adobe.svg" alt="adobe icon">
        <strong class="spectrum-Heading spectrum-Heading--sizeXXS">Adobe I/O</strong>
      </p>

      <ul id="navigation-links">
        <li>
          <a href="/apis">Discover</a>
        </li>
      </ul>

      <div>
        <a href="https://console.adobe.io/" class="spectrum-Button spectrum-Button--secondary  spectrum-Button--sizeM">
          <span class="spectrum-Button-label">
            Console
          </span>
        </a>
      </div>
    `
  }

  function globalNavTemplate() {
    return `
      <p class="icon-adobe-container">
        <img class="icon icon-adobe" src="/hlx_statics/icons/adobe.svg" alt="adobe icon">
        <strong class="spectrum-Heading spectrum-Heading--sizeS icon-adobe-label">Adobe Developer</strong>
      </p>

      <ul id="navigation-links">
        <li class="navigation-products">
          <a href="/apis">Products</a>
        </li>
        <li>
          <a href="/apis">Adobe Document Services</a>
        </li>
        <li>
          <button id="nav-dropdown-button_0" class="spectrum-Picker spectrum-Picker--sizeM spectrum-Picker--quiet navigation-dropdown" aria-haspopup="listbox">
            <span class="spectrum-Picker-label">
              Community
            </span>
            <svg class="spectrum-Icon spectrum-UIIcon-ChevronDown100 spectrum-Picker-menuIcon" focusable="false" aria-hidden="true">
              <use xlink:href="#spectrum-css-icon-Chevron100" />
            </svg>
          </button>
          <div id="nav-dropdown-popover_0" class="spectrum-Popover spectrum-Popover--bottom spectrum-Picker-popover spectrum-Picker-popover--quiet filter-by-popover nav-dropdown-popover">
            <ul class="spectrum-Menu" role="menu">
              <li class="spectrum-Menu-item">
                <span class="spectrum-Menu-itemLabel">Document Generation</span>
              </li>
              <li class="spectrum-Menu-item">
                <span class="spectrum-Menu-itemLabel">PDF Embed</span>
              </li>
              <li class="spectrum-Menu-item">
                <span class="spectrum-Menu-itemLabel">PDF Tools</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <div class="nav-view-docs-button">
        <a href="https://console.adobe.io/" class="spectrum-Button spectrum-Button--secondary  spectrum-Button--sizeM">
          <span class="spectrum-Button-label">
            View Docs
          </span>
        </a>
      </div>

      <div class ="nav-console-right-container">
        <div class="nav-console-search-button">
          <button id="nav-dropdown-search" class="spectrum-ActionButton spectrum-ActionButton--sizeM spectrum-ActionButton--emphasized spectrum-ActionButton--quiet">
            <svg class="spectrum-Icon spectrum-Icon--sizeM" focusable="false" aria-hidden="true" aria-label="Edit">
              <use xlink:href="#spectrum-icon-24-Search"></use>
            </svg>
          </button>
        </div>

        <div class="nav-console-button">
          <a href="https://console.adobe.io/" class="spectrum-Button spectrum-Button--secondary  spectrum-Button--sizeM">
            <span class="spectrum-Button-label">
              Console
            </span>
          </a>
        </div>

        <div class="nav-sign-in">
          <button class="spectrum-ActionButton spectrum-ActionButton--sizeM spectrum-ActionButton--quiet">
            <span id="signIn" class="spectrum-ActionButton-label">Sign in</span>
          </button>
        </div>

        <div class="nav-profile">
          <button id="nav-profile-dropdown-button" class="spectrum-ActionButton spectrum-ActionButton--sizeM spectrum-ActionButton--quiet  navigation-dropdown">
            <svg class="spectrum-Icon spectrum-Icon--sizeM" focusable="false" aria-hidden="true" aria-label="Profile">
              <use xlink:href="#spectrum-icon-24-RealTimeCustomerProfile"></use>
            </svg>
          </button>

          <div id="nav-profile-dropdown-popover" class="spectrum-Popover spectrum-Popover--bottom spectrum-Picker-popover spectrum-Picker-popover--quiet">
            <div class="nav-profile-popover-innerContainer">
              <div class="nav-profile-popover-avatar">
                <svg class="spectrum-Icon spectrum-Icon--sizeM" focusable="false" aria-hidden="true" aria-label="Profile">
                  <use xlink:href="#spectrum-icon-24-RealTimeCustomerProfile"></use>
                </svg>
              </div>
        
              <div class="nav-profile-popover-name">
                I am name
              </div>
        
              <div class="nav-profile-popover-divider">
                <hr />
              </div>

              <a href="https://account.adobe.com/">
                Edit Profile
              </a>
        
              <button class="spectrum-ActionButton spectrum-ActionButton--sizeM spectrum-ActionButton--quiet">
                <span id="signOut" class="spectrum-ActionButton-label">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }



//   <div hidden={!profile}>
//   <div
//     aria-controls={profilePopoverId}
//     onClick={(event) => {
//       event.stopPropagation();
//       event.nativeEvent.stopImmediatePropagation();

//       setOpenProfile((open) => !open);
//     }}
//     css={css`
//       width: var(--spectrum-global-dimension-size-400);
//       height: var(--spectrum-global-dimension-size-400);
//       border-radius: var(--spectrum-global-dimension-static-percent-50);
//       background: var(--spectrum-global-color-gray-50);
//       overflow: hidden;
//       cursor: pointer;
//     `}>
//     <Image alt="Avatar" src={profile ? ims.avatarUrl(profile.userId) : ''} />
//   </div>
//   <Popover
//     id={profilePopoverId}
//     ref={profilePopover}
//     isOpen={openProfile}
//     css={css`
//       width: var(--spectrum-global-dimension-size-3400);
//       max-height: var(--spectrum-global-dimension-size-4600);
//       margin-left: calc(-1 * var(--spectrum-global-dimension-size-3000));
//     `}>
//     <div
//       css={css`
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         flex-direction: column;
//       `}>
//       <div
//         css={css`
//           width: var(--spectrum-global-dimension-size-800);
//           height: var(--spectrum-global-dimension-size-800);
//           border-radius: var(--spectrum-global-dimension-static-percent-50);
//           background: var(--spectrum-global-color-gray-50);
//           overflow: hidden;
//           margin-top: var(--spectrum-global-dimension-size-400);
//           margin-bottom: var(--spectrum-global-dimension-size-200);
//         `}>
//         <Image alt="Avatar" src={profile ? ims.avatarUrl(profile.userId) : ''} />
//       </div>

//       <div
//         className="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light"
//         css={css`
//           padding: 0 var(--spectrum-global-dimension-size-200);
//           text-align: center;
//         `}>
//         {profile && profile.displayName}
//       </div>

//       <div
//         css={css`
//           margin: var(--spectrum-global-dimension-size-200) 0;
//           padding: 0 var(--spectrum-global-dimension-size-200);
//           box-sizing: border-box;
//           width: 100%;
//         `}>
//         <Divider size="S" />
//       </div>

//       <AnchorButton href="https://account.adobe.com/" variant="primary" isQuiet>
//         Edit Profile
//       </AnchorButton>

//       <Button
//         variant="primary"
//         css={css`
//           margin: var(--spectrum-global-dimension-size-200) 0;
//         `}
//         onClick={() => {
//           ims.signOut();
//         }}>
//         Sign out
//       </Button>
//     </div>
//   </Popover>
// </div>
// </div>


  async function fetchNav() {
    const $localNavPath = window.location.pathname.split('/')[1];
    const resp = await fetch(`/${$localNavPath}/nav.json`);
    return (await resp.json()).data;
  }

  function decorateHeader() {
    if(window.location.pathname === '/apis' || window.location.pathname === '/apis/') {
      document.querySelectorAll('header').forEach(($header) => {
        $header.classList.add('main-header');
        const $mainHeaderLinks = `
          <li class="header-list-item">
            <a href="/apis" class="header-list-item-link">
              Discover
            </a>
          </li>
          <li class="header-list-item">
            <a href="/open" class="header-list-item-link">
              Open Source
            </a>
          </li>
          <li class="header-list-item">
            <a href="https://medium.com/adobetech" class="header-list-item-link">
              Blog
            </a>
          </li>
          <li class="header-list-item header-list-item-button">
            <a href="https://console.adobe.io/" class="spectrum-Button spectrum-Button--cta spectrum-Button--sizeM">
              <span class="spectrum-Button-label">Console</span>
            </a>
          </li>
        `;

        const $mainHeaderTemplate = `
          <nav class="header-nav">
          <a href="/" class="header-main-link">
            <span class="header-label">
              Adobe I/O
            </span>
          </a>
          <div class="header-link-container">
            <ul class="header-list">
              ${$mainHeaderLinks}
            </ul>
          </div>
        </nav>
        `;

        $header.innerHTML = $mainHeaderTemplate;
      });
    } else {
      document.querySelectorAll('header').forEach(($header) => {
        $header.classList.add('main-header');
        $header.classList.add('global-nav-header');
        $header.innerHTML = globalNavTemplate('');

        const $currentHeader = $header;

        $header.querySelectorAll('button.navigation-dropdown').forEach(($button) => {
          if($button.id.indexOf('nav-dropdown-button') >= 0) {
            let $index = $button.id.split('_')[1];
            let $dropdownPopover = $currentHeader.querySelector('div#nav-dropdown-popover_' + $index);
            
            $button.addEventListener('click', (evt) => {
              if(!evt.currentTarget.classList.contains('is-open')){
                $button.classList.add('is-open');
                $dropdownPopover.classList.add('is-open');
                $dropdownPopover.ariaHidden = false;
              } else {
                $button.classList.remove('is-open');
                $dropdownPopover.classList.remove('is-open');
                $dropdownPopover.ariaHidden = false;
              }
            });
          } else if($button.id.indexOf('nav-profile-dropdown-button') >=0 ) {

            let $profileDropdownPopover = $currentHeader.querySelector('div#nav-profile-dropdown-popover');

            $button.addEventListener('click', (evt) => {
              if(!evt.currentTarget.classList.contains('is-open')){
                $button.classList.add('is-open');
                $profileDropdownPopover.classList.add('is-open');
                $profileDropdownPopover.ariaHidden = false;
              } else {
                $button.classList.remove('is-open');
                $profileDropdownPopover.classList.remove('is-open');
                $profileDropdownPopover.ariaHidden = false;
              }
            });
          }
        })

        const $signIn = $header.querySelector('#signIn');
        $signIn.addEventListener('click', (evt) => {
          adobeIMSMethods.signIn();
        });

        const $signOut = $header.querySelector('#signOut');
        $signIn.addEventListener('click', (evt) => {
          adobeIMSMethods.signOut();
        });
      });

      fetchNav().then($links => {
        const $headerLinks = document.querySelector('#navigation-links');
        $links.forEach(($link) => {
          let $liItem = createTag('li');
          let $aItem = createTag('a');
          // fix link urls - there's a weird bug with a urls that end
          // with trailing slashes and relative links
          if(window.location.pathname.substr(-1) !== '/') {
            if($link.Url.charAt(0) === '.') {
              let $tempUrl = $link.Url.split('.');
              $aItem.href = './' + window.location.pathname.split('/')[1] + $tempUrl[1];
            }
          } else {
            $aItem.href = $link.Url;
          }

          $aItem.innerText = $link.Title;
          $liItem.append($aItem);
          $headerLinks.append($liItem);
        })
      })
    }
  }

  function decorateAnnouncement() {
    decorateButtons('.announcement-container');
    document.querySelectorAll(".announcement").forEach(($announcement) => {
      removeEmptyPTags($announcement);

      $announcement.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(($h) => {
        $h.classList.add('spectrum-Heading', 'spectrum-Heading--sizeM', 'announce-heading');
      });

      $announcement.querySelectorAll('p a').forEach(($link) => {
        $link.parentElement.classList.add('announce-link');
      });

    });
  }

  function decorateAPIBrowser() {
    document.querySelectorAll('.api-browser-container').forEach(($apiBrowserContainer) => {
      decorateTitle($apiBrowserContainer, 'api-browser');
    });

    document.querySelectorAll(".api-browser").forEach(async ($apiBrowser) => {
      $apiBrowser.classList.add('spectrum--light');
      const config = readBlockConfig($apiBrowser);
      window.aio = window.aio || {};
      const resp = await fetch("/hlx_api_catalog.json");
      window.aio.apiCatalog = (await resp.json()).data;
      const catalog = window.aio.apiCatalog;
      let buttons = ["Learn More", "View Docs"];

      if (config.display)
        buttons = config.display.split(",").map((e) => e.trim());

      $apiBrowser.innerHTML = "";
      if (config.filters == "Show") {
        const categories = catalog
          .map((e) => e.Category)
          .filter((v, i, self) => {
            return self.indexOf(v) === i;
          });

        const $cards = createTag("div", { class: "api-cards" });

        const $apiCardsInner = createTag("div", { class: 'api-cards-inner' });
        const $filters = createTag('div', {class: 'filters'});


        const $pickerContainer = createTag('div', {class: 'picker'});
        $apiBrowser.append($pickerContainer);
        let $pickerHtml = `
        <button id="filter-dropdown-picker" class="spectrum-Picker spectrum-Picker--sizeM spectrum-Picker--quiet" aria-haspopup="listbox">
          <span id="filter-label" class="spectrum-Picker-label">Last updated</span>
          <svg class="spectrum-Icon spectrum-UIIcon-ChevronDown100 spectrum-Picker-menuIcon" focusable="false" aria-hidden="true">
            <use xlink:href="#spectrum-css-icon-Chevron100" />
          </svg>
        </button>
        <div id="filter-dropdown-popover" class="spectrum-Popover spectrum-Popover--bottom spectrum-Picker-popover spectrum-Picker-popover--quiet filter-by-popover">
          <ul id="filter-list"class="spectrum-Menu" role="listbox">
            <li id="filter-list-last-updated" class="spectrum-Menu-item is-selected" role="option" aria-selected="true" tabindex="0">
              <span class="spectrum-Menu-itemLabel">Last updated</span>
              <svg class="spectrum-Icon spectrum-UIIcon-Checkmark100 spectrum-Menu-checkmark spectrum-Menu-itemIcon" focusable="false" aria-hidden="true">
                <use xlink:href="#spectrum-css-icon-Checkmark100" />
              </svg>
            </li>
            <li id="filter-list-name" class="spectrum-Menu-item" role="option" tabindex="0">
              <span class="spectrum-Menu-itemLabel">Name</span>
              <svg class="spectrum-Icon spectrum-UIIcon-Checkmark100 spectrum-Menu-checkmark spectrum-Menu-itemIcon" focusable="false" aria-hidden="true">
                <use xlink:href="#spectrum-css-icon-Checkmark100" />
              </svg>
            </li>
          </ul>
        </div>
        `;

        $pickerContainer.innerHTML = $pickerHtml;

        const $dropdownPicker = document.querySelector('#filter-dropdown-picker');
        const $dropdownPopover = document.querySelector('#filter-dropdown-popover');

        $dropdownPicker.addEventListener('click', (evt) => {
          if(!evt.currentTarget.classList.contains('is-open')){
            $dropdownPicker.classList.add('is-open');
            $dropdownPopover.classList.add('is-open');
            $dropdownPopover.ariaHidden = false;
          } else {
            $dropdownPicker.classList.remove('is-open');
            $dropdownPopover.classList.remove('is-open');
            $dropdownPopover.ariaHidden = true;
          }
        });

        const $filterLabel = document.querySelector('#filter-label');
        const $filterListLastUpdated = document.querySelector('#filter-list-last-updated');
        const $filterListName = document.querySelector('#filter-list-name');

        $filterListLastUpdated.addEventListener('click', (evt) => {
          if(!$filterListLastUpdated.classList.contains('is-selected')){
            $filterListLastUpdated.classList.add('is-selected');
            $filterListLastUpdated.ariaSelected = true;
            $filterListName.classList.remove('is-selected');
            $filterListName.ariaSelected = false;

            $filterLabel.innerText = 'Last updated';

            $dropdownPicker.classList.remove('is-open');
            $dropdownPopover.classList.remove('is-open');
            $dropdownPopover.ariaHidden = true;

            displayFilteredCards(catalog.sort(sortDate), $cards, buttons, config.limit);
          }
        });

        $filterListName.addEventListener('click', (evt) => {
          if(!$filterListName.classList.contains('is-selected')){
            $filterListLastUpdated.classList.remove('is-selected');
            $filterListLastUpdated.ariaSelected = false;
            $filterListName.classList.add('is-selected');
            $filterListName.ariaSelected = true;

            $filterLabel.innerText = 'Name';

            $dropdownPicker.classList.remove('is-open');
            $dropdownPopover.classList.remove('is-open');
            $dropdownPopover.ariaHidden = true;
            displayFilteredCards(catalog.sort(sortTitle), $cards, buttons, config.limit);
          }
        });

        $apiCardsInner.append($filters);

        let $filterHtml = '';
        categories.forEach((c) => {
          const id = toClassName(c);

          $filterHtml += `
            <label class="spectrum-Checkbox spectrum-Checkbox--emphasized spectrum-Checkbox--sizeM" for="${id}">
              <input type="checkbox" class="spectrum-Checkbox-input" id="${id}" name="${id}" value="${c}">
              <span class="spectrum-Checkbox-box">
              <svg class="spectrum-Icon spectrum-UIIcon-Checkmark100 spectrum-Checkbox-checkmark" focusable="false" aria-hidden="true">
              <use xlink:href="#spectrum-css-icon-Checkmark100" />
            </svg>
            <svg class="spectrum-Icon spectrum-UIIcon-Dash100 spectrum-Checkbox-partialCheckmark" focusable="false" aria-hidden="true">
              <use xlink:href="#spectrum-css-icon-Dash100" />
            </svg>
              </span>
              <span class="spectrum-Checkbox-label filter-label">${c}</span>
            </label>
        `;
        });

        let $filtersTemplate = `
        <div class="filters-inner">
          <strong><h4 class="spectrum-Heading--sizeXS">Filter by</h4></strong>
          <div class="filters-list">
            ${$filterHtml}
          </div>
        </div>
        `;

        $filters.innerHTML = $filtersTemplate;
        $apiCardsInner.append($cards);
        $apiBrowser.append($apiCardsInner);

        displayFilteredCards(catalog, $cards, buttons, config.limit);

        document.querySelectorAll('.filters-list input').forEach(($filterItem) => {
          $filterItem.addEventListener('change', (evt) => {
            if(evt.currentTarget.checked) {
              if($CURRENT_API_FILTERS.indexOf(evt.currentTarget.value) < 0){
                $CURRENT_API_FILTERS.push(evt.currentTarget.value);
              }
            } else {
              $CURRENT_API_FILTERS.splice($CURRENT_API_FILTERS.indexOf(evt.currentTarget.value),1);
            }
            displayFilteredCards(catalog, $cards, buttons, config.limit);
          });
        })
      }
    });
  }

  function decorateCards() {
    decorateButtons('.cards-container');
    document.querySelectorAll('.cards-container').forEach(($cardContainer) => {
      $cardContainer.querySelectorAll('.cards > div').forEach(($card, index, $array) => {
        $card.classList.add('spectrum--light');
        $card.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(($header) => {
          $header.classList.add('spectrum-Heading', 'spectrum-Heading--sizeM');
        })
  
        $card.querySelectorAll('p').forEach(($p) => {
          $p.classList.add('spectrum-Body', 'spectrum-Body--sizeM');
        });

        $card.querySelectorAll('p > a').forEach(($button) => {
          $button.classList.remove('spectrum-Button--secondary')
          $button.classList.add('spectrum-Button--cta', 'spectrum-Button--quiet', 'card-button');
        });

        if($array.length === 3) {
          $card.classList.add('three-card');
        } else if($array.length === 4) {
          $card.classList.add('four-card');
        }
      })
    })
  }

  function decorateColumns() {
    document.querySelectorAll('.columns > div > div:first-child').forEach(($column) => {
      $column.classList.add('first-column');
    });

    document.querySelectorAll('.columns > div > div:nth-child(2)').forEach(($column) => {
      $column.classList.add('second-column');
    });

    document.querySelectorAll('.columns').forEach(($column) => {
      $column.classList.add('spectrum--light');
      removeEmptyPTags($column);
      $column.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(($header) => {
        $header.classList.add('spectrum-Heading', 'spectrum-Heading--sizeM', 'column-header');
      })

      $column.querySelectorAll('p').forEach(($p) => {
        const $hasLinks = $p.querySelectorAll('a, button');
        // don't attach to icon container or if p tag contains links
        if(!$p.classList.contains('icon-container') && $hasLinks.length === 0) {
          $p.classList.add('spectrum-Body', 'spectrum-Body--sizeM');
        } else {
          $p.classList.add('icon-container')
        }
      });

      $column.querySelectorAll('a').forEach(($a) => {
        $a.classList.add('spectrum-Link', 'spectrum-Link--quiet');
        
        if(isLinkExternal($a.href)) {
          $a.target = '_blank';
          $a.rel = 'noopener noreferrer';
        }
      });

      $column.querySelectorAll('div > div.second-column').forEach(($secondColumn) => {
        let $productLinkContainer = createTag('div', { class : 'product-link-container'});

        $secondColumn.querySelectorAll('p.icon-container').forEach(($innerSecond) => {

          $productLinkContainer.append($innerSecond);
        });
        $secondColumn.append($productLinkContainer);
      });

    });
  }

  function decorateColumnsDark() {
    document.querySelectorAll('.columns-dark').forEach(($column) => {
    });
    
    //document.querySelectorAll('.columns').forEach(($column) => {
    // document.querySelectorAll('.columns-dark').forEach(($column) => {
    //   removeEmptyPTags($column);

    //   // re-wrap second container so it's easier to vertically align
    //   $column.childNodes.forEach(($row) => {
    //     if($row.childNodes.length > 1) {
    //       let $textColumnContainer = createTag('div', { class : 'columns-text'});

    //       // find the text column in the row and wrap it then insert it 
    //       // may have to expand search to allow all media types instead of just iframe
    //       let $cloneNodes;
    //       if(!$row.childNodes[0].querySelector('iframe')) {
    //         $cloneNodes = $row.childNodes[0].cloneNode(true);
    //         $textColumnContainer.append($cloneNodes); 
    //         $row.replaceChild($textColumnContainer, $row.childNodes[0]);

    //       } else if(!$row.childNodes[1].querySelector('iframe')) {
    //         $cloneNodes = $row.childNodes[1].cloneNode(true);
    //         $textColumnContainer.append($cloneNodes); 
    //         $row.replaceChild($textColumnContainer, $row.childNodes[1]);
    //       }
    //     } 
    //   });
    // });
  }
  function getResourceCard(size,linkHref, imgSrc, heading, text) {
    return `
          <a class="spectrum-Card ${size === 'small' ? 'spectrum-Card--horizontal' : ''} resource-card-${size}-container-inner"
             href=${linkHref}
          >
            <div class="spectrum-Card-preview resource-card-${size}-preview">
              <div class="resource-card-${size}-image-container spectrum-Asset">
                <img class="spectrum-Asset-image" src=${imgSrc} />
              </div>
            </div>
            <div class="spectrum-Card-body resource-card-${size}-body">
              <div class="spectrum-Card-header resource-card-${size}-header">
                <div class="spectrum-Card-title resource-card-${size}-title">
                  <h3 class="spectrum-Heading spectrum-Heading--sizeM">
                    ${heading}
                  </h3>
                </div>
              </div>
              <div class="spectrum-Card-content">
                <div class="spectrum-Card-subtitle">
                  <p className="spectrum-Body spectrum-Body-S">
                    ${text}
                  </p>
                </div>
              </div>
            </div>
          </a>
    `;
  }

  function decorateResourceCards() {
    document.querySelectorAll('.section-wrapper').forEach(($section) => {
      // resource cards are special in that multiple cards will be grouped together within
      // a section so need to find out how many and what format it is
      // let $smallResourceCardCount = 0;
      // let $largeResourceCardCount = 0;

      // make sure section has resource cards
      if($section.querySelector('.resource-card-large, .resource-card-small')){
        let $leftResourceCardContainer = createTag('div', { class: 'resource-cards-left'});
        let $rightResourceCardContainer = createTag('div', { class: 'resource-cards-right'});

        let $resourceCardsContainer = createTag('div', { class: 'resource-cards-container'});
        $section.append($resourceCardsContainer);
        $resourceCardsContainer.append($leftResourceCardContainer);
        $resourceCardsContainer.append($rightResourceCardContainer);

        $section.querySelectorAll('.resource-card-large').forEach(($resourceLarge, index, array) => {
          removeEmptyPTags($resourceLarge);
          //$largeResourceCardCount = array.length;
          let $linkHref = $resourceLarge.querySelector('a').href;
          let $heading = $resourceLarge.querySelector('a').innerText;
          let $imgSrc = $resourceLarge.querySelector('img').src;
          let $text = $resourceLarge.querySelector('p').innerText;

          $leftResourceCardContainer.innerHTML = getResourceCard('large', $linkHref, $imgSrc, $heading, $text);
  
          $resourceLarge.remove();
        });
  
        $section.querySelectorAll('.resource-card-small').forEach(($resourceSmall, index, array) => {
          removeEmptyPTags($resourceSmall);
          //$smallResourceCardCount = array.length;
          let $linkHref = $resourceSmall.querySelector('a').href;
          let $heading = $resourceSmall.querySelector('a').innerText;
          let $imgSrc = $resourceSmall.querySelector('img').src;
          let $text = $resourceSmall.querySelector('p').innerText;
  
          $rightResourceCardContainer.innerHTML += getResourceCard('small', $linkHref, $imgSrc, $heading, $text);
          toggleScale();
          $resourceSmall.remove();
        });
      }
    });
  }

  function decorateSummary() {
    decorateButtons('.summary-container');
    document.querySelectorAll(".summary-container").forEach(($summary) => {
      removeEmptyPTags($summary);
      $summary.classList.add('spectrum--dark');

      //removeEmptyPTags($summary);
      $summary.querySelectorAll('h2').forEach(($header) => {
        $header.classList.add('spectrum-Heading', 'spectrum-Heading--sizeL');
      })

      $summary.querySelectorAll('p').forEach(($p) => {
        const $hasLinks = $p.querySelectorAll('a, button');
        // don't attach to icon container or if p tag contains links
        if(!$p.classList.contains('icon-container') && $hasLinks.length === 0) {
          $p.classList.add('spectrum-Body', 'spectrum-Body--sizeL');
        } 
        $hasLinks.forEach(($button) => {
          $button.classList.add('spectrum-Button--overBackground');
        })
      });

      // delete image and re-insert as bg
      let $summaryImageSrc = $summary.querySelector('img') ? $summary.querySelector('img').src : null;

      $summary.querySelectorAll('picture').forEach(($picture) => {
        //remove weird max-width attribute 

        //$picture.media = "";
        $picture.parentElement.parentElement.remove();
        //$picture.remove();
      });

      $summary.style.backgroundImage = `url(${$summaryImageSrc})`;
    });
  }

  function fixIcons() {
    document.querySelectorAll('img.icon').forEach(($icon) => {
      // fix up paths for icons that are injected into the doc when using :icon: 
      if($icon.getAttribute('src').indexOf('hlx_statics') === -1){
        $icon.setAttribute('src',  '/hlx_statics' + $icon.getAttribute('src') );
      }
    });
  }

  function toggleScale() {
    const doc = document.documentElement;
    const isLargeScale = doc.clientWidth < MOBILE_SCREEN_WIDTH;
    const mobileBreak = doc.clientWidth < LARGE_SCREEN_WIDTH;

    doc.classList.toggle('spectrum--medium', !isLargeScale);
    doc.classList.toggle('spectrum--large', isLargeScale);

    // have to toggle dumb small resource cards
    document.querySelectorAll('.resource-card-small-container-inner').forEach(($smallResourceCards) => {
      $smallResourceCards.classList.toggle('spectrum-Card--horizontal', !mobileBreak);
    });

  }

  function later() {
    const $adobeAnalytics = document.createElement('script');
    $adobeAnalytics.src = '//assets.adobedtm.com/f9ca2ebf8aa5/cfdcfc3c597a/launch-8857f8f8b05b.min.js';
    document.body.appendChild($adobeAnalytics);

    // We're done, let the page render
    document.documentElement.classList.remove('helix-loading');

    console.log(window.adobeid)
    window.adobeImsFactory.createIMSLib(window.adobeid);
  }

  async function decoratePage() {
    toggleScale();
    decorateTables();
    wrapSections("main>div");
    decorateBlocks();
    wrapSections("header>div, footer>div");
    decorateFooter();
    decorateHeader();
    decorateSiteHero();
    decorateHero();
    decorateEmbeds();
    decorateCards();
    decorateColumns();
    // decorateColumnsDark();
    decorateAnnouncement();
    decorateAPIBrowser()
    decorateResourceCards();
    decorateSummary();
    fixIcons();
    later();
  }

  decoratePage();

  window.addEventListener('resize', toggleScale);