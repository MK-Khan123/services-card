// function for rotate polygon group
function polygons_animation(panel, deg = 180) {
  const tlPolygons = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: "top bottom",
      end: "center top",
      scrub: true,
    },
  });
  tlPolygons
    .to(
      "#yellow-polygon",
      {
        duration: 0.2,
        rotation: deg,
      },
      0
    )
    .to(
      "#blue-polygon",
      {
        duration: 0.2,
        rotation: deg,
      },
      0
    )
    .to(
      "#red-polygon",
      {
        duration: 0.2,
        rotation: deg,
      },
      0
    );

  return tlPolygons;
}

// document.querySelector(".automation-card-panel").remove();
// document.querySelector(".migration-card-panel").remove();
// document.querySelector(".engineering-card-panel").remove();
// document.querySelector(".visualization-card-panel").remove();

// smooth scroller function
function smoothScroll(content, viewport, smoothness) {
  content = gsap.utils.toArray(content)[0];
  smoothness = smoothness || 0.7;

  gsap.set(viewport || content.parentNode, {
    overflow: "hidden",
    position: "fixed",
    height: "100vh",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  gsap.set(content, { overflow: "visible", width: "100%" });

  let getProp = gsap.getProperty(content),
    setProp = gsap.quickSetter(content, "y", "px"),
    setScroll = ScrollTrigger.getScrollFunc(window),
    removeScroll = () => (content.style.overflow = "visible"),
    killScrub = (trigger) => {
      let scrub = trigger.getTween
        ? trigger.getTween()
        : gsap.getTweensOf(trigger.animation)[0];
      scrub && scrub.pause();
      trigger.animation.progress(trigger.progress);
    },
    height,
    isProxyScrolling;

  function refreshHeight() {
    height = content.clientHeight;
    content.style.overflow = "visible";
    document.body.style.height = height + "px";
    return height - document.documentElement.clientHeight;
  }

  ScrollTrigger.addEventListener("refresh", () => {
    removeScroll();
    requestAnimationFrame(removeScroll);
  });
  ScrollTrigger.defaults({ scroller: content });
  ScrollTrigger.prototype.update = (p) => p;

  ScrollTrigger.scrollerProxy(content, {
    scrollTop(value) {
      if (arguments.length) {
        isProxyScrolling = true;
        setProp(-value);
        setScroll(value);
        return;
      }
      return -getProp("y");
    },
    scrollHeight: () => document.body.scrollHeight,
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  return ScrollTrigger.create({
    animation: gsap.fromTo(
      content,
      { y: 0 },
      {
        y: () => document.documentElement.clientHeight - height,
        ease: "none",
        onUpdate: ScrollTrigger.update,
      }
    ),
    scroller: window,
    invalidateOnRefresh: true,
    start: 0,
    end: refreshHeight,
    refreshPriority: -999,
    scrub: smoothness,
    onUpdate: (self) => {
      if (isProxyScrolling) {
        killScrub(self);
        isProxyScrolling = false;
      }
    },
    onRefresh: killScrub,
  });
}

//! auto scroll after name animation is finished
// const autoScroll = (time, panelOne) => {
//   setTimeout(function () {
//     const panelOneCooard = panelOne.getBoundingClientRect();
//     window.scrollTo(panelOneCooard.left, 400);
//   }, time);
// };

// mission and vission panel background blur
function blurMissionVisionPanel(selector, color, shadow) {
  selector.style.background = color;
  selector.style.boxShadow = shadow;
}

// elements theme toggle
function modeChange(textColor, backgroundColor) {
  const missionPanel = document.querySelector("#mission-panel");
  const vissionPanel = document.querySelector("#vision-panel");
  const nav = document.querySelector("nav");
  const smoothWrapper = document.querySelector("#smooth-wrapper");
  const visionPanel = document.querySelector("#vision-panel");
  const healthCareBtn = document.querySelector("#healthcare-btn");
  const automationBtn = document.querySelector("#automation-btn");
  const inputText = document.querySelectorAll(".input-text");
  const automationTextBox = document.querySelector("#automation-text-box");
  const addressInfo = document.querySelector("#address-info");
  const emailContactForm = document.querySelector("#email-contact-form");
  const servicesTitle = document.querySelector("#services-title");

  document.body.style.backgroundColor = backgroundColor;
  nav.style.color = textColor;
  smoothWrapper.style.color = textColor;

  document
    .querySelectorAll("#panel-one-content-body div p")
    .forEach(function (el) {
      el.style.color = textColor;
    });

  // panel two heading
  document.querySelector("#about-main-heading h2").style.color = textColor;
  document.querySelector("#about-main-heading p").style.color = textColor;

  // panel two vision
  visionPanel.style.color = textColor;
  blurMissionVisionPanel(
    vissionPanel,
    "linear-gradient(94.85deg, rgba(86, 93, 255, 0.1278) 97.05%, rgba(160, 160, 160, 0.0234) 100.14%)",
    " 8px 8px 4px rgba(0, 0, 0, 0.25)"
  );

  // panel two mission
  missionPanel.style.color = textColor;
  blurMissionVisionPanel(
    missionPanel,
    "linear-gradient(94.85deg, rgba(86, 93, 255, 0.1278) 97.05%, rgba(160, 160, 160, 0.0234) 100.14%)",
    " 8px 8px 4px rgba(0, 0, 0, 0.25)"
  );

  // panel three heading
  document.querySelector("#work-main-heading-one").style.color = textColor;
  document.querySelector("#work-main-content-one h1").style.color = textColor;
  document.querySelector("#work-main-content-two h1").style.color = textColor;

  // panel three footer
  healthCareBtn.style.color = textColor;
  automationBtn.style.color = textColor;

  // panel two healthcare
  document.querySelector("#healthcare-panel-content h1").style.color =
    textColor;
  document.querySelector("#healthcare-panel-content p").style.color = textColor;

  // panel two automation
  document.querySelector("#automation-panel-content h1").style.color =
    textColor;
  document.querySelector("#automation-panel-content p").style.color = textColor;

  // work
  automationTextBox.style.color = textColor;

  //services
  servicesTitle.style.color = textColor;

  // contact from
  inputText.forEach((input) => {
    input.style.color = textColor;
  });

  addressInfo.style.color = textColor;
  emailContactForm.style.color = textColor;

  document.querySelector(".glass").style.color = textColor;

  //footer
  document.querySelectorAll(".footer-header").forEach(function (el) {
    el.style.color = textColor;
  });

  document.querySelectorAll(".footer-links > a").forEach(function (link) {
    link.style.color = textColor;
  });

  document.querySelector(".copyright-text").style.color = textColor;
}

// light mode
function lightVersion(
  lightMode,
  darkMode,
  arrow,
  sliderBtn,
  linkedInDarkLogo,
  linkedInLightLogo,
  pageFooter
) {
  darkMode.classList.toggle("hide");
  lightMode.classList.toggle("hide");

  // change light mode
  modeChange("#000", "#D4E4FE");

  // gray ring color change
  const ellipses = gsap.utils.toArray([
    "#hidden-gray-ellipse",
    "#gray-ellipse",
  ]);
  gsap.to(ellipses, {
    duration: 0.1,
    css: {
      filter:
        "invert(49%) sepia(47%) saturate(221%) hue-rotate(192deg) brightness(88%) contrast(85%)",
    },
  });

  // logo change
  document.querySelector(".dark-logo").style.display = "none";
  document.querySelector(".light-logo").style.display = "block";

  //heading color change
  document.querySelectorAll("#header-name span").forEach((span) => {
    span.classList.add("light-mode-heading-change");
    span.classList.remove("dark-mode-heading-change");
  });

  // panel one change mode
  document
    .querySelector("#panel-one-content-heading>h1")
    .classList.remove("dark");
  document
    .querySelector("#panel-one-content-heading>h1")
    .classList.add("light");

  // panel one text
  document
    .querySelector("#panel-one-content-heading p")
    .classList.add("light-text");
  document
    .querySelector("#panel-one-content-heading p")
    .classList.remove("dark-text");

  //services
  document
    .querySelector("#migration-details")
    .classList.remove("light-mode-serves");
  document
    .querySelector("#automation-details")
    .classList.add("light-mode-serves");
  document
    .querySelector("#engineering-details")
    .classList.add("light-mode-serves");
  document
    .querySelector("#visualization-details")
    .classList.add("light-mode-serves");

  document.querySelector(".ai-vector-letter-dark").style.display = "none";
  document.querySelector(".ai-vector-letter-light").style.display = "block";

  //circelbackground color change
  document.querySelectorAll(".circular-shape").forEach(function (circel) {
    circel.classList.remove("services-details-background-dark");
    circel.classList.add("services-details-background-light");
  });

  //slider btn
  sliderBtn.style.border = "1px solid #1f2937";
  const borderB =
    window.getComputedStyle(arrow, ":before").borderBottom + " #1f2937";
  const borderR = window.getComputedStyle(arrow, ":after").borderRight;

  //contact
  document.querySelector(".contact-dark-img").classList.remove("hide");
  document.querySelector(".contact-light-img").classList.add("hide");

  document.querySelector(".glass").style.border = "2px solid gray";

  //footer color change
  pageFooter.style.background =
    "linear-gradient(89.63deg, rgba(31, 41, 55, 0.58) 0.56%, rgba(31, 41, 55, 0.58) 165.89%";

  // footer logo change
  linkedInDarkLogo.classList.add("logo-hide");
  linkedInLightLogo.classList.remove("logo-hide");
  document.querySelector(".btn-submit").style.background = "#868e96";
}
// dark mode
function darkVersion(
  lightMode,
  darkMode,
  linkedInDarkLogo,
  linkedInLightLogo,
  sliderBtn
) {
  lightMode.classList.toggle("hide");
  darkMode.classList.toggle("hide");

  //change dark mode
  modeChange("#fff", "#1F2937");

  // logo change
  document.querySelector(".dark-logo").style.display = "block";
  document.querySelector(".light-logo").style.display = "none";

  // gray ring color change
  const ellipses = gsap.utils.toArray([
    "#hidden-gray-ellipse",
    "#gray-ellipse",
  ]);
  gsap.to(ellipses, {
    duration: 0.1,
    css: {
      filter: "none",
    },
  });

  //heading color change
  document.querySelectorAll("#header-name span").forEach((span) => {
    span.classList.add("dark-mode-heading-change");
    span.classList.remove("light-mode-heading-change");
  });

  // panel one heading
  document
    .querySelector("#panel-one-content-heading>h1")
    .classList.remove("light");
  document.querySelector("#panel-one-content-heading>h1").classList.add("dark");

  // panel one text
  document
    .querySelector("#panel-one-content-heading p")
    .classList.add("dark-text");
  document
    .querySelector("#panel-one-content-heading p")
    .classList.remove("light-text");

  //services
  document
    .querySelector("#migration-details")
    .classList.add("light-mode-serves");
  document
    .querySelector("#automation-details")
    .classList.remove("light-mode-serves");
  document
    .querySelector("#engineering-details")
    .classList.remove("light-mode-serves");
  document
    .querySelector("#visualization-details")
    .classList.remove("light-mode-serves");

  document.querySelector(".ai-vector-letter-dark").style.display = "block";
  document.querySelector(".ai-vector-letter-light").style.display = "none";

  //circelbackground color change
  document.querySelectorAll(".circular-shape").forEach(function (circel) {
    circel.classList.remove("services-details-background-light");
    circel.classList.add("services-details-background-dark");
  });

  //slider btn
  sliderBtn.style.border = "1px solid rgba(255, 255, 255, 0.1)";

  //contact
  document.querySelector(".contact-dark-img").classList.add("hide");
  document.querySelector(".contact-light-img").classList.remove("hide");
  document.querySelector(".glass").style.border = "2px solid #000";

  //footer logo change
  linkedInDarkLogo.classList.remove("logo-hide");
  linkedInLightLogo.classList.add("logo-hide");

  document.querySelector(".btn-submit").style.background = "#a1adba";
}

// services section animator
const services = {
  service_name: null,
  position: null,
}; // fadingAnimation's dependency

function fadingAnimation(id, direction) {
  const animation = document.getElementById(`${id}`);
  const arrow = document.getElementById(`${direction}-arrow`);
  const animationDetails = document.getElementById(`${id}-details`);

  if (animation.classList.contains(`${id}-circle-fading-out`) === false) {
    // removePreviousAnimation(id, direction);
    if (services.service_name === null && services.position === null) {
      services.service_name = id;
      services.position = direction;
    } else {
      const service = document.getElementById(services.service_name);
      const serviceArrow = document.getElementById(
        `${services.position}-arrow`
      );
      const serviceDetails = document.getElementById(
        `${services.service_name}-details`
      );

      //First removes fading out animation classes
      service.classList.remove(`${services.service_name}-circle-fading-out`);
      serviceArrow.classList.remove(`${services.position}-arrow-fading-out`);

      //Then adds fading in animation classes
      service.classList.add(`${services.service_name}-circle-fading-in`);
      serviceArrow.classList.add(`${services.position}-arrow-fading-in`);

      //To make the service details circular shape (the larger circle) appear smoothly in a transition.
      serviceDetails.style.animation = "fadeOut 0.5s";
      serviceDetails.style.animationFillMode = "forwards";
      setTimeout(() => {
        serviceDetails.style.visibility = "hidden";
      }, 500);

      services.service_name = id;
      services.position = direction;
    }

    //Removes previously selected animation classes
    animation.classList.remove(`${id}-circle-fading-in`);
    arrow.classList.remove(`${direction}-arrow-fading-in`);

    animation.classList.add(`${id}-circle-fading-out`);
    arrow.classList.add(`${direction}-arrow-fading-out`);

    animationDetails.style.visibility = "visible";
    animationDetails.style.animation = "fadeIn 1s";
    animationDetails.style.animationFillMode = "forwards";
  } else if (animation.classList.contains(`${id}-circle-fading-in`) === false) {
    animation.classList.remove(`${id}-circle-fading-out`);
    arrow.classList.remove(`${direction}-arrow-fading-out`);

    animation.classList.add(`${id}-circle-fading-in`);
    arrow.classList.add(`${direction}-arrow-fading-in`);

    //To make the service details circular shape (the larger circle) disappear smoothly.
    animationDetails.style.animation = "fadeOut 0.5s";
    animationDetails.style.animationFillMode = "forwards";
    setTimeout(() => {
      animationDetails.style.visibility = "hidden";
    }, 500);

    services.service_name = null;
    services.position = null;
    console.log(services);
  }
}

//This function starts the rotation animation of the services section on mouse enter event.
function hoverOverServices() {
  const title = document.getElementById("services-title");
  const tagline = document.getElementById("services-tagline");
  const servicesIcon = document.getElementById("ai-vector");

  const topLeftArrow = document.getElementById("top-left-arrow");
  const topRightArrow = document.getElementById("top-right-arrow");
  const bottomLeftArrow = document.getElementById("bottom-left-arrow");
  const bottomRightArrow = document.getElementById("bottom-right-arrow");

  const migration = document.getElementById("migration");
  const automation = document.getElementById("automation");
  const engineering = document.getElementById("engineering");
  const visualization = document.getElementById("visualization");

  topLeftArrow.style.visibility = "visible";
  topRightArrow.style.visibility = "visible";
  bottomLeftArrow.style.visibility = "visible";
  bottomRightArrow.style.visibility = "visible";

  migration.style.visibility = "visible";
  automation.style.visibility = "visible";
  engineering.style.visibility = "visible";
  visualization.style.visibility = "visible";

  title.style.visibility = "hidden";
  tagline.style.visibility = "hidden";

  //This class is added for smooth rotation of the AI Vector Icon
  servicesIcon.classList.add("ai-vector-hover");
}
window.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  //! light mode for desktop
  const darkMode = document.querySelector(".dark-mode");
  const lightMode = document.querySelector(".light-mode");

  //! elemnets for light/dark mode toggle
  const arrow = document.querySelector(".arrow");
  const darkLogo = document.querySelector(".dark-logo");
  const lightLogo = document.querySelector(".light-logo");
  const linkedInDarkLogo = document.querySelector(".linkedIn-dark-logo");
  const linkedInLightLogo = document.querySelector(".linkedIn-light-logo");
  const pageFooter = document.querySelector("#page-footer");
  const sliderBtn = document.querySelector("#slider-btn");
  const navLinks = document.querySelector(".nav-links");
  const hamburgherIcon = document.querySelector(".hamburger-icon");

  //! panels
  const panelOne = document.querySelector("#panel-one");
  const panelTwo = document.querySelector("#panel-two");
  const panelThree = document.querySelector("#panel-three");
  const panelFour = document.querySelector("#panel-four");
  const panelFive = document.querySelector("#panel-five");

  //! panels for mobile screen display
  const panelVisualization = document.querySelector(
    ".visualization-card-panel"
  );
  const panelAutomation = document.querySelector(".automation-card-panel");
  const panelEngineering = document.querySelector(".engineering-card-panel");
  const panelMigration = document.querySelector(".migration-card-panel");

  //! rotating elliptical circle selector
  const ellipticalCircle = gsap.utils.selector(".rotating-elliptical-circle");

  //! cursor animation
  let cursor = document.querySelector(".cursor");
  let cursorScale = document.querySelectorAll(".cursor-scale");

  //? add by anik
  //! nav link go to particular section
  document.querySelector(".about-link").addEventListener("click", () => {
    const panelTwoCooard = panelTwo.getBoundingClientRect();
    window.scrollTo({
      left: panelTwoCooard.left + window.pageXOffset,
      top: panelTwoCooard.top + window.pageYOffset,
      behavior: "smooth",
    });
  });

  document.querySelector(".services-link").addEventListener("click", () => {
    const panelThreeCooard = panelThree.getBoundingClientRect();
    window.scrollTo({
      left: panelThreeCooard.left + window.pageXOffset,
      top: panelThreeCooard.top + window.pageYOffset,
      behavior: "smooth",
    });
  });

  document.querySelector(".work-link").addEventListener("click", () => {
    const panelFourCooard = panelFour.getBoundingClientRect();
    window.scrollTo({
      left: panelFourCooard.left + window.pageXOffset,
      top: panelFourCooard.top + window.pageYOffset,
      behavior: "smooth",
    });
  });

  document.querySelector(".contact-link").addEventListener("click", () => {
    const panelFiveCooard = panelFive.getBoundingClientRect();
    window.scrollTo({
      left: panelFiveCooard.left + window.pageXOffset,
      top: panelFiveCooard.top + window.pageYOffset,
      behavior: "smooth",
    });
  });

  //! healthcare and automation panel's element for toggle
  const contents_to_toggle = gsap.utils.toArray([
    "#about-main-heading",
    "#about-main-body",
    "#vision-missions",
    "#healthcare-btn",
    "#automation-btn",
    "#automation-text-box",
  ]);

  gsap.registerPlugin(ScrollTrigger);

  //! cursor animation
  let mouseX = 0;
  let mouseY = 0;

  gsap.to({}, 0.01, {
    repeat: -1,
    onRepeat: function () {
      gsap.set(cursor, {
        css: {
          opacity: 1,
          left: mouseX,
          top: mouseY,
        },
      });
    },
  });
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  cursorScale.forEach((link) => {
    link.addEventListener("mousemove", () => {
      cursor.classList.add("grow");
      if (link.classList.contains("small")) {
        cursor.classList.remove("grow");
        cursor.classList.add("grow-small");
      }
    });

    link.addEventListener("mouseleave", () => {
      cursor.classList.remove("grow");
      cursor.classList.remove("grow-small");
    });
  });

  //!panels intialization
  const panels = gsap.utils.toArray(".panel");
  ScrollTrigger.create({
    start: 0,
    end: "max",
    snap: 1 / (panels.length - 1),
    duration: 1,
  });

  //! smooth scroll animation
  smoothScroll("#smooth-content");

  //! first panel auto scroll
  // autoScroll(3000, panelOne);
  // this.addEventListener("scroll", () => {
  //     const windowCoord = document.documentElement.getBoundingClientRect();
  //     if (windowCoord.y === 0) {
  //         autoScroll(1200, panelOne);
  //     }
  // });

  //! theme toggle light/dark

  darkMode.addEventListener("click", () => {
    lightVersion(
      lightMode,
      darkMode,
      arrow,
      darkLogo,
      lightLogo,
      sliderBtn,
      linkedInDarkLogo,
      linkedInLightLogo,
      pageFooter
    );
  });

  lightMode.addEventListener("click", () => {
    darkVersion(
      lightMode,
      darkMode,
      arrow,
      darkLogo,
      lightLogo,
      sliderBtn,
      linkedInDarkLogo,
      linkedInLightLogo,
      pageFooter,
      sliderBtn
    );
  });

  //! mobile responsive
  hamburgherIcon.addEventListener("click", () => {
    navLinks.classList.toggle("add-opactiy");
  });

  // ? added by anik
  const links = document.querySelectorAll(".nav-links li");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.toggle("add-opactiy");
    });
  });

  //! animator s initialization
  ScrollTrigger.matchMedia({
    "(min-width: 500px)": function () {
      //! automation panel
      document
        .querySelector("#automation-btn")
        .addEventListener("click", () => {
          gsap.timeline().to(
            "#automation-panel",
            {
              duration: 1,
              display: "block",
              x: "3.5rem",
              y: "-19.5rem",
            },
            0
          );
          contents_to_toggle.forEach((element) => {
            gsap.to(element, {
              duration: 1,
              opacity: 0,
            });
          });
          gsap
            .timeline()
            .to(
              "#animated-circles-1",
              {
                duration: 1,
                x: "-24rem",
                y: "0rem",
              },
              1
            )
            .to(
              "#animated-circles-text-1",
              {
                duration: 1,
                opacity: 1,
                x: "38rem",
                y: "8rem",
              },
              1
            )
            .to(
              "#animated-circles-2",
              {
                duration: 1,
                x: "-22rem",
                y: "-8rem",
              },
              1.2
            )
            .to(
              "#animated-circles-text-2",
              {
                duration: 1,
                opacity: 1,
                x: "39rem",
                y: "-0.5rem",
              },
              1.2
            )
            .to(
              "#animated-circles-3",
              {
                duration: 1,
                x: "-18rem",
                y: "-16rem",
              },
              1.4
            )
            .to(
              "#animated-circles-text-3",
              {
                duration: 1,
                opacity: 1,
                x: "40rem",
                y: "-9rem",
              },
              1.4
            )
            .to(
              "#animated-circles-4",
              {
                duration: 1,
                x: "-10rem",
                y: "-20rem",
              },
              1.6
            )
            .to(
              "#animated-circles-5",
              {
                duration: 1,
                x: "-1rem",
                y: "-20rem",
              },
              1.8
            );
        });

      document
        .querySelector("#automation-panel")
        .addEventListener("click", (e) => {
          gsap.timeline().to("#automation-panel", {
            duration: 1,
            display: "none",
            x: "100rem",
            y: "-19.5rem",
          });
          contents_to_toggle.forEach((element) => {
            gsap.to(element, {
              duration: 2,
              opacity: 1,
            });
          });
          gsap
            .timeline()
            .to(
              "#animated-circles-1",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1
            )
            .to(
              "#animated-circles-text-1",
              {
                duration: 1,
                opacity: 0,
                x: "0rem",
                y: "0rem",
              },
              1
            )
            .to(
              "#animated-circles-2",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.2
            )
            .to(
              "#animated-circles-text-2",
              {
                duration: 1,
                opacity: 0,
                x: "0rem",
                y: "0rem",
              },
              1.2
            )
            .to(
              "#animated-circles-3",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#animated-circles-text-3",
              {
                duration: 1,
                opacity: 0,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#animated-circles-4",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.6
            )
            .to(
              "#animated-circles-5",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.8
            );
        });

      //! healthcare panel
      document
        .querySelector("#healthcare-btn")
        .addEventListener("click", () => {
          gsap
            .timeline()
            .to(
              "#healthcare-panel",
              {
                duration: 1,
                display: "block",
                x: "-3.5rem",
                y: "-17rem",
              },
              0
            )
            .to(
              ".healthcare-panel-how-text-box",
              {
                duration: 1,
                opacity: 1,
              },
              1.5
            );
          contents_to_toggle.forEach((element) => {
            gsap.to(element, {
              duration: 1,
              opacity: 0,
            });
          });

          gsap.utils
            .toArray([
              ".healthcare-panel-content-heading",
              ".healthcare-panel-content-text",
            ])
            .forEach((element) => {
              gsap.to(element, {
                duration: 2,
                opacity: 1,
              });
            });
        });

      document
        .querySelector("#healthcare-panel")
        .addEventListener("click", (e) => {
          if (
            !e.target.classList.contains("how-text") &&
            !e.target.classList.contains("healthcare-panel-how-text-box")
          ) {
            gsap.timeline().to("#healthcare-panel", {
              duration: 1,
              display: "none",
              x: "-100rem",
              y: "-19.5rem",
            });
            contents_to_toggle.forEach((element) => {
              gsap.to(element, {
                duration: 2,
                opacity: 1,
              });
            });

            // remove the how-text-box when click healthcare panel
            gsap.to(".healthcare-panel-how-text-box", {
              duration: 1,
              opacity: 0,
            });
          }
        });

      //? automation animation
      document
        .querySelector(".healthcare-panel-how-text-box")
        .addEventListener("click", () => {
          gsap.timeline().to("#automation-text-box", {
            duration: 1,
            opacity: 1,
            y: "-1em",
          });

          gsap.utils
            .toArray([
              ".healthcare-panel-content-heading",
              ".healthcare-panel-content-text",
              ".healthcare-panel-how-text-box",
            ])
            .forEach((element) => {
              gsap.to(element, {
                duration: 2,
                opacity: 0,
              });
            });
        });

      //? mission and vission animation
      document.querySelector("#vision").addEventListener("click", () => {
        gsap
          .timeline()
          .to(
            "#vision-panel",
            {
              duration: 1,
              right: "15em",
              display: "block",
            },
            0
          )
          .to(
            "#vision",
            {
              duration: 1,
              opacity: 0,
            },
            0
          )
          .to(
            "#vision-text",
            {
              duration: 1,
              opacity: 0,
            },
            0
          );
        gsap
          .timeline()
          .to(
            "#mission-panel",
            {
              duration: 0,
              display: "none",
            },
            "<"
          )
          .to(
            "#mission",
            {
              opacity: 0.5,
              display: "block",
            },
            1
          )
          .to(
            "#mission-text",
            {
              opacity: 1,
              display: "block",
            },
            1
          );
      });

      document.querySelector("#vision-panel").addEventListener("click", () => {
        gsap
          .timeline()
          .to(
            "#vision-panel",
            {
              duration: 1,
              right: "20em",
              display: "none",
            },
            0
          )
          .to(
            "#vision",
            {
              duration: 1,
              display: "block",
              opacity: 0.5,
            },
            1
          )
          .to(
            "#vision-text",
            {
              duration: 1,
              opacity: 1,
              display: "block",
            },
            1
          );
      });

      document.querySelector("#mission").addEventListener("click", () => {
        gsap
          .timeline()
          .to(
            "#mission-panel",
            {
              duration: 1,
              left: "15em",
              display: "block",
            },
            0
          )
          .to(
            "#mission",
            {
              duration: 1,
              opacity: 0,
              display: "none",
            },
            0
          )
          .to(
            "#mission-text",
            {
              duration: 1,
              opacity: 0,
            },
            0
          );
        gsap
          .timeline()
          .to(
            "#vision-panel",
            {
              duration: 0,
              display: "none",
            },
            "<"
          )
          .to(
            "#vision",
            {
              duration: 1,
              display: "block",
              opacity: 0.5,
            },
            1
          )
          .to(
            "#vision-text",
            {
              duration: 1,
              opacity: 1,
              display: "block",
            },
            1
          );
      });

      document.querySelector("#mission-panel").addEventListener("click", () => {
        gsap
          .timeline()
          .to(
            "#mission-panel",
            {
              duration: 1,
              left: "20em",
              display: "none",
            },
            0
          )
          .to(
            "#mission",
            {
              duration: 1,
              opacity: 0.5,
              display: "block",
            },
            1
          )
          .to(
            "#mission-text",
            {
              duration: 1,
              opacity: 1,
              display: "block",
            },
            1
          );
      });
      //? mission and vission animation end

      // document.querySelector('.services-card').remove();
      // document.querySelector('.automation-card-panel').remove();
      // document.querySelector('.migration-card-panel').remove();
      // document.querySelector('.engineering-card-panel').remove();
      // document.querySelector('.engineering-card-panel').classList.remove('panel');
      // document.querySelector('.automation-card-panel').classList.remove('panel');
      // document.querySelector('.migration-card-panel').classList.remove('panel');
      // document.querySelector('.visualization-card-panel').classList.remove('panel');
      // document.querySelector('.services-card').remove();
    },

    "(max-width: 499px)": function () {
      document
        .querySelector("#automation-btn")
        .addEventListener("click", () => {
          gsap.timeline().to(
            "#automation-panel",
            {
              display: "block",
              opacity: 1,
              duration: 1,
              x: "0rem",
              y: "-18.1rem",
            },
            0
          );

          contents_to_toggle.forEach((element) => {
            gsap.to(element, {
              duration: 1,
              opacity: 0,
            });
          });

          gsap
            .timeline({ delay: 1.5 })
            .to("#span-automation", {
              duration: 1,
              opacity: 0,
            })
            .to(
              "#amimated-circel-mobile-1",
              {
                duration: 1,
                x: "17rem",
                y: "-32rem",
              },
              1
            )
            .to(
              "#amimated-circel-mobile-2",
              {
                duration: 1,
                opacity: 1,
                x: "14rem",
                y: "-29rem",
              },
              1
            )
            .to(
              "#amimated-circel-mobile-3",
              {
                duration: 1,
                x: "10.5rem",
                y: "-26rem",
              },
              1.2
            )
            .to(
              "#amimated-circel-mobile-4",
              {
                duration: 1,
                opacity: 1,
                x: "8rem",
                y: "-23.5rem",
              },
              1.2
            )
            .to(
              "#amimated-circel-mobile-5",
              {
                duration: 1,
                x: "6.5rem",
                y: "-20rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-6",
              {
                duration: 1,
                x: "10rem",
                y: "-18.7rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-7",
              {
                duration: 1,
                x: "14rem",
                y: "-17rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-8",
              {
                duration: 1,
                x: "18rem",
                y: "-15.6rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-9",
              {
                duration: 1,
                x: "22rem",
                y: "-14rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-10",
              {
                duration: 1,
                x: "24rem",
                y: "-11rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-11",
              {
                duration: 1,
                x: "20rem",
                y: "-9rem",
              },
              1.4
            )
            .to(
              "#animated-circles-mobile-text-1",
              {
                duration: 1,
                opacity: 1,
                x: "17rem",
                y: "-5.5rem",
              },
              1.4
            )
            .to(
              "#animated-circles-mobile-text-2",
              {
                duration: 1,
                x: "14.5rem",
                y: "-2rem",
              },
              1.4
            )
            .to(
              "#animated-circles-mobile-text-3",
              {
                duration: 1,
                x: "16rem",
                y: "2rem",
              },
              1.4
            )
            .to(
              "#animated-mobile-text-1",
              {
                duration: 1,
                opacity: 1,
                x: "-7rem",
                y: "6rem",
              },
              1.7
            )
            .to(
              "#animated-mobile-text-2",
              {
                duration: 1,
                opacity: 1,
                x: "-7rem",
                y: "9rem",
              },
              1.8
            )
            .to(
              "#animated-mobile-text-3",
              {
                duration: 1,
                opacity: 1,
                x: "-5rem",
                y: "13rem",
              },
              2
            );
        });

      document
        .querySelector("#automation-panel")
        .addEventListener("click", (e) => {
          gsap.timeline().to("#automation-panel", {
            duration: 1,
            display: "none",
            x: "-30rem",
            y: "32.5rem",
          });

          contents_to_toggle.forEach((element) => {
            gsap.to(element, {
              duration: 1,
              opacity: 1,
            });
          });
          gsap
            .timeline()
            .to("#span-automation", {
              duration: 1,
              opacity: 1,
            })
            .to(
              "#amimated-circel-mobile-1",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1
            )
            .to(
              "#amimated-circel-mobile-2",
              {
                duration: 1,
                opacity: 0,
                x: "0rem",
                y: "0rem",
              },
              1
            )
            .to(
              "#amimated-circel-mobile-3",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.2
            )
            .to(
              "#amimated-circel-mobile-4",
              {
                duration: 1,
                opacity: 0,
                x: "0rem",
                y: "0rem",
              },
              1.2
            )
            .to(
              "#amimated-circel-mobile-5",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-6",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-7",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-8",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-9",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-10",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#amimated-circel-mobile-11",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#animated-circles-mobile-text-1",
              {
                duration: 1,
                opacity: 0,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#animated-circles-mobile-text-2",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#animated-circles-mobile-text-3",
              {
                duration: 1,
                x: "0rem",
                y: "0rem",
              },
              1.4
            )
            .to(
              "#animated-mobile-text-1",
              {
                duration: 1,
                opacity: 0,
                x: "0rem",
                y: "2rem",
              },
              1.6
            )
            .to(
              "#animated-mobile-text-2",
              {
                duration: 1,
                opacity: 0,
                x: "0rem",
                y: "0rem",
              },
              1.8
            )
            .to(
              "#animated-mobile-text-3",
              {
                duration: 1,
                opacity: 0,
                x: "5rem",
                y: "2rem",
              },
              2
            );
        });

      document
        .querySelector("#healthcare-btn")
        .addEventListener("click", () => {
          contents_to_toggle.forEach((element) => {
            gsap.to(element, {
              duration: 1.5,
              opacity: 0,
            });
          });

          gsap
            .timeline()
            .to(
              "#healthcare-panel",
              {
                duration: 1,
                display: "block",
                x: "0rem",
                y: "-16rem",
              },
              0
            )
            .to(
              "#vision-text-mobile",
              {
                duration: 1,
                opacity: 0,
              },
              "<"
            )
            .to(
              "#mission-text-mobile",
              {
                duration: 1,
                opacity: 0,
              },
              "<"
            )
            .to(
              ".healthcare-panel-how-text-box",
              {
                duration: 1,
                opacity: 1,
              },
              1.5
            )
            .to(
              "#automation-text-box",
              {
                duration: 1,
                opacity: 1,
                y: "-1em",
              },
              "+=.5"
            )
            .to(
              ".healthcare-panel-how-text-box",
              {
                duration: 0,
                opacity: 0,
              },
              "<"
            );
        });

      document
        .querySelector("#healthcare-panel")
        .addEventListener("click", () => {
          gsap
            .timeline()
            .to("#healthcare-panel", {
              duration: 1,
              display: "none",
              x: "-30rem",
              y: "32.5rem",
            })
            .to(
              "#vision-text-mobile",
              {
                opacity: 1,
              },
              "<"
            )
            .to(
              "#mission-text-mobile",
              {
                opacity: 1,
              },
              "<"
            );

          contents_to_toggle.forEach((element) => {
            gsap.to(element, {
              duration: 2,
              opacity: 1,
            });
          });

          // remove the how-text-box when click healthcare panel
          gsap.to(".healthcare-panel-how-text-box", {
            duration: 1,
            opacity: 0,
          });
        });

      //? mission and vission animation
      document
        .querySelector(".vision-container")
        .addEventListener("click", () => {
          gsap
            .timeline()
            .to(
              "#vision-panel",
              {
                duration: 0.5,
                x: "0rem",
                y: "-4rem",
                display: "block",
              },
              0
            )
            .to(
              "#vision-text-mobile",
              {
                duration: 1,
                opacity: 0,
                display: "block",
              },
              0.5
            );
        });

      document
        .querySelector(".mission-container")
        .addEventListener("click", () => {
          gsap
            .timeline()
            .to("#mission-panel", {
              duration: 0.5,
              x: "0rem",
              y: "-4rem",
              display: "block",
            })
            .to(
              "#mission-text-mobile",
              {
                duration: 1,
                opacity: 0,
              },
              1
            );
        });

      document.querySelector("#vision-panel").addEventListener("click", () => {
        gsap
          .timeline()
          .to(
            "#vision-panel",
            {
              duration: 0.8,
              x: "-25rem",
              display: "none",
              opacity: 1,
            },
            0
          )
          .to("#vision-text-mobile", {
            duration: 0.2,
            opacity: 1,
          });
      });

      document.querySelector("#mission-panel").addEventListener("click", () => {
        gsap
          .timeline()
          .to(
            "#mission-panel",
            {
              duration: 0.8,
              x: "25em",
              display: "none",
            },
            0
          )
          .to(
            "#mission-text-mobile",
            {
              duration: 0.2,
              opacity: 1,
            },
            1
          );
      });

  //     const serviceCard = document.querySelector(".services-card");
  //     serviceCard.insertAdjacentHTML(
  //       "afterbegin",
  //       `<div id="card-alignment" class="panel visualization-card-panel">
  //     <div id="visualization-card">
  //         <svg id="scrolling-svg-container" width="364" height="2674" viewBox="0 0 364 2674" fill="none"
  //             preserveAspectRatio="xMidYMid meet">
  //             <path id="scrolling-svg"
  //                 d="M176.434 0.999992C184.737 267.52 221.944 588.112 63.4971 634.5C-94.9495 680.888 140.497 691 159.997 654C179.497 617 -134.165 652.306 69.857 668.038C333.739 688.386 -37.7465 547.64 23.9053 706.73C81.5574 855.499 29.3982 957.489 76.7151 1036.88C124.032 1116.26 177.812 1124.04 224.997 1133C576.575 1199.74 67.3654 1246.12 205.794 1169.5C292.462 1121.53 407.421 1184.5 333.498 1184.5C259.576 1184.5 355.066 1575.64 351.998 1609C343.998 1696 96.4981 1746.87 22.9982 1710C-19.4384 1688.71 119.498 1677 193.997 1683C204.463 1683.84 335.351 1692 333.497 1796C328.498 2076.5 328.197 2171.48 351.533 2236.5M351.533 2236.5C351.533 2285 145.533 2225 177.533 2217C377.467 2167.02 424.033 2248.5 218.033 2248.5C42.4977 2248.5 369.532 2158 351.533 2236.5ZM351.533 2236.5C327.033 2429.5 386.122 2716.08 351.534 2668C301.535 2598.5 16.5344 2705.5 42.0344 2650C67.5344 2594.5 -35.9656 2685 96.0344 2641"
  //                 stroke="white" />
  //         </svg>
  //         <h4 id="visualization-card-title">Visualization</h4>
  //         <div class="red-card"></div>
  //         <div class="blue-card card-right card-shrink"></div>
  //     </div>
  // </div>
  // <div id="card-alignment" class="panel automation-card-panel">
  //     <div id="automation-card">
  //         <h4 id="automation-card-title">Automation</h4>
  //         <div class="red-card"></div>
  //         <div class="blue-card card-left card-shrink"></div>
  //     </div>
  // </div>
  // <div id="card-alignment" class="panel engineering-card-panel">
  //     <div id="engineering-card">
  //         <h4 id="engineering-card-title">Engineering</h4>
  //         <div class="red-card"></div>
  //         <div class="blue-card card-right card-shrink"></div>
  //     </div>
  // </div>
  // <div id="card-alignment" class="panel migration-card-panel">
  //     <div id="migration-card">
  //         <h4 id="migration-card-title">Migration</h4>
  //         <div class="red-card"></div>
  //         <div class="blue-card card-left card-shrink"></div>
  //     </div>
  // </div>`
  //     );

      //! for movile device panel animation
      forMobileDevice(
        panelOne,
        panelTwo,
        panelThree,
        panelVisualization,
        panelAutomation,
        panelEngineering,
        panelMigration,
        panelFour,
        panelFive
      );
    },

    //this will be apply for all secreen sci
    all: function () {
      forDesktopScreen(panelOne, panelTwo, panelThree, panelFour, panelFive);
    },
  });

  //! rotating blue and gray colored ellipse animation initialization
  ScrollTrigger.matchMedia({
    "(min-width: 800px)": function () {},
    "(max-width: 799px)": function () {},
    all: function () {
      blueAndGrayDesktop(
        panelTwo,
        panelThree,
        panelFour,
        panelFive,
        ellipticalCircle
      );
    },
  });

  document.querySelector("#slider-btn").addEventListener("click", function (e) {
    const slider = document.querySelector("#work-main-slider");

    if (slider.style.left !== "50%") {
      gsap
        .timeline()
        .to(
          slider,
          {
            // duration: .5,
            css: {
              left: "50%",
            },
            onEnd: function () {
              document
                .querySelector("#slider-btn")
                .classList.add("active-slide");
            },
          },
          0.4
        )
        .to(
          "#work-main-content-one",
          {
            opacity: 1,
          },
          0.4
        )
        .to(
          "#work-main-content-two",
          {
            opacity: 0,
          },
          0.4
        );
    } else {
      gsap
        .timeline()
        .to(
          slider,
          {
            css: {
              left: "0",
            },
            onEnd: function () {
              document
                .querySelector("#slider-btn")
                .classList.remove("active-slide");
            },
          },
          0.4
        )
        .to(
          "#work-main-content-one",
          {
            opacity: 0,
          },
          0.4
        )
        .to(
          "#work-main-content-two",
          {
            opacity: 1,
          },
          0.4
        );
    }
  });
});
//? save style for inline style
ScrollTrigger.saveStyles(
  "#automation-btn, #automation-panel,#about-main-heading,#about-main-body,#vision-missions,#healthcare-btn,#automation-btn,#automation-text-box,#mission-panel,#vision-panel,#mission-text-mobile,#vision-text-mobile",
  "#mobile-gray-ellipse",
  "#mobile-gray-small-ellipse",
  "#mobile-red-ellipse",
  "#mobile-yellow-polygon",
  "#mobile-blue-polygon",
  "#mobile-red-polygon"
);

// ROTATING BLUE AND GREY COLORED ELLIPSES ANIMATION
//They are kept separate because their position is fixed with the screen and starts at the top of the HTML document

function blueAndGrayDesktop(
  panelTwo,
  panelThree,
  panelFour,
  panelFive,
  ellipticalCircle
) {
  //PANEL 2 Starts
  gsap
    .timeline({
      defaults: {
        transformOrigin: "center center",
      },
      scrollTrigger: {
        trigger: panelTwo, // What element triggers the scroll
        scrub: true, // Add a small delay of scrolling and animation. `true` is direct
        start: "top center", // Can be top, center, bottom
        end: "+=100%", // Can be top, center, bottom
      },
    })
    .from(
      ellipticalCircle(".left-gray-ellipse"),
      {
        opacity: 0,
        x: -500,
        rotate: -180,
        duration: 1,
      },
      "<"
    )

    .from(
      ellipticalCircle(".rotating-blue-ellipse"),
      {
        opacity: 0,
        x: 500,
        rotate: 180,
        duration: 1,
      },
      "<"
    )

    .add(() => {}, "+=1");
  //PANEL 2 Ends

  //PANEL 3 Starts
  gsap
    .timeline({
      defaults: {
        transformOrigin: "center center",
      },
      scrollTrigger: {
        trigger: panelThree,
        scrub: true,
        start: "top center",
        end: "+=100%",
      },
    })
    .to(
      ellipticalCircle(".left-gray-ellipse"),
      {
        opacity: 0,
        x: -500,
        rotate: -180,
        duration: 1,
      },
      "<"
    )

    .to(
      ellipticalCircle(".rotating-blue-ellipse"),
      {
        x: 600,
        y: 80,
        rotate: 160,
        duration: 1,
      },
      "<"
    )

    .from(
      ellipticalCircle(".right-gray-ellipse"),
      {
        opacity: 0,
        x: 500,
        rotate: 180,
        duration: 1,
      },
      "<"
    )

    .add(() => {}, "+=1");
  //PANEL 3 Ends

  //PANEL 4 Starts
  gsap
    .timeline({
      defaults: {
        transformOrigin: "center center",
      },
      scrollTrigger: {
        trigger: panelFour,
        scrub: true,
        start: "top center",
        end: "+=100%",
      },
    })
    .to(
      ellipticalCircle(".right-gray-ellipse"),
      {
        opacity: 0,
        x: 500,
        rotate: 180,
        duration: 1,
      },
      "<"
    )

    .to(
      ellipticalCircle(".rotating-blue-ellipse"),
      {
        x: 30,
        y: -5,
        rotate: 0,
        duration: 1,
      },
      "<"
    )

    .fromTo(
      ellipticalCircle(".left-gray-ellipse"),
      { opacity: 0 },
      {
        opacity: 1,
        x: 30,
        rotate: 0,
        duration: 1,
      },
      "<"
    )

    .add(() => {}, "+=1");
  //PANEL 4 Ends

  //PANEL 5 Starts
  gsap
    .timeline({
      defaults: {
        transformOrigin: "center center",
      },
      scrollTrigger: {
        trigger: panelFive,
        scrub: true,
        start: "top center",
        end: "+=100%",
      },
    })
    .to(
      ellipticalCircle(".left-gray-ellipse"),
      {
        opacity: 0,
        x: -500,
        rotate: -180,
        duration: 1,
      },
      "<"
    )

    .to(
      ellipticalCircle(".rotating-blue-ellipse"),
      {
        x: 600,
        y: 80,
        rotate: 160,
        duration: 1,
      },
      "<"
    )

    .fromTo(
      ellipticalCircle(".right-gray-ellipse"),
      { opacity: 0 },
      {
        opacity: 1,
        x: 0,
        rotate: 0,
        duration: 1,
      },
      "<"
    )

    .add(() => {}, "+=1");
  //PANEL 5 Ends
}

//! animator for desktop screen size
function forDesktopScreen(
  panelOne,
  panelTwo,
  panelThree,
  panelFour,
  panelFive
) {
  // PANEL 1 STARTS
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelOne,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#blue-ellipse",
      {
        x: "54vw",
        y: "154vh",
        rotation: "135deg",
        duration: 1,
      },
      0
    )
    .to(
      "#gray-ellipse",
      {
        x: "-41.67vw",
        y: "85.38vh",
        rotation: "180deg",
        duration: 1,
      },
      0
    )
    .to(
      "#hidden-gray-ellipse",
      {
        x: "33.34vw",
        y: "17.08vh",
        rotation: -345,
        duration: 1,
      },
      0
    )
    .to(
      "#red-ellipse",
      {
        // x: "10rem",
        y: "93.917vh",
        rotate: "180deg",
        duration: 1,
      },
      0
    )
    .to(
      "#polygons",
      {
        x: "-50rem",
        y: "58rem",
        duration: 1,
      },
      0
    )
    .add(polygons_animation(panelOne));
  // PANEL 1 ENDS

  // PANEL 2 STARTS
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelTwo,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#blue-ellipse",
      {
        x: "153vw",
        y: "256.99vh",
        rotation: "-163deg",
        duration: 1,
      },
      0
    )
    .to(
      "#red-ellipse",
      {
        rotate: "-180deg",
        x: "-4.3333vw",
        y: "198.079vh",
        duration: 1,
      },
      0
    )
    .to(
      "#hidden-gray-ellipse",
      {
        rotation: -5,
        duration: 1,
      },
      0
    )
    .to(
      "#panel-three-red-ellipse",
      {
        rotation: -220,
        duration: 1,
      },
      0
    )
    .to(
      "#polygons",
      {
        x: "15rem",
        y: "100rem",
        duration: 1,
      },
      0
    )
    .add(polygons_animation(panelTwo, 250));
  // PANEL 2 ENDS

  // PANEL 3 STARTS
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelThree,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#panel-three-red-ellipse",
      {
        rotation: 400,
        duration: 1,
      },
      0
    )
    .to(
      "#polygons",
      {
        x: "-55rem",
        y: "160rem",
        duration: 1,
      },
      0
    )
    .add(polygons_animation(panelThree, 300))
    .add(hoverOverServices);
  // PANEL 3 ENDS

  // PANEL 4 STARTS
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelFour,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#panel-three-red-ellipse",
      {
        x: "-45.83vw",
        y: -45,
        rotation: 320,
        duration: 1,
      },
      0
    )
    .to(
      "#panel-five-red-ellipse",
      {
        x: "-50rem",
        x: "-125vw",
        rotation: 100,
        duration: 1,
      },
      0
    )
    .to(
      "#yellow-polygon",
      {
        x: "20rem",
        y: "105rem",
        rotation: "-280deg",
      },
      0
    )
    .to(
      "#blue-polygon",
      {
        x: "15rem",
        y: "75rem",
        rotation: "-280deg",
      },
      0
    )
    .to(
      "#red-polygon",
      {
        x: "10rem",
        y: "45rem",
        rotation: "-280deg",
      },
      0
    );
  // PANEL 4 ENDS

  // PANEL 5 STARTS
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelFive,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#panel-five-red-ellipse",
      {
        x: "-41.67vw",
        rotation: -270,
        duration: 1,
      },
      0
    );
  //PANEL 5 ENDS
  // PANEL 5 ENDS
}

//change from anik
//! animator for mobile screen size
function forMobileDevice(
  panelOne,
  panelTwo,
  panelThree,
  panelVisualization,
  panelAutomation,
  panelEngineering,
  panelMigration,
  panelFour,
  panelFive
) {
  //animation ellipes for mobile screen size

  // ? panel one starts
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelOne,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#mobile-gray-ellipse",
      {
        x: "-3vw",
        y: "100vh",
        rotation: "215deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-ellipse",
      {
        x: "-31vw",
        y: "108vh",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-gray-small-ellipse",
      {
        x: "-54vw",
        y: "89vh",
        rotation: "245deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-yellow-polygon",
      {
        x: "-18vw",
        y: "110vh",
        rotation: "232deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-blue-polygon",
      {
        x: "-14vw",
        y: "103vh",
        rotation: "232deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-polygon",
      {
        x: "7vw",
        y: "102vh",
        rotation: "237deg",
        duration: 1,
      },
      0
    );

  // ? panel one end

  // ? panel two starts
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelTwo,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#mobile-gray-ellipse",
      {
        x: "3vw",
        y: "215vh",
        rotation: "-178deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-ellipse",
      {
        x: "-52vw",
        y: "205vh",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-gray-small-ellipse",
      {
        x: "-108vw",
        y: "187vh",
        rotation: "148deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-yellow-polygon",
      {
        x: "-5vw",
        y: "206vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-blue-polygon",
      {
        x: "2vw",
        y: "200vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-polygon",
      {
        x: "0vw",
        y: "202vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    );

  // ? panel three starts
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelThree,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#mobile-gray-ellipse",
      {
        x: "6vw",
        y: "315vh",
        rotation: "185deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-ellipse",
      {
        x: "-73vw",
        y: "302vh",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-gray-small-ellipse",
      {
        x: "-162vw",
        y: "285vh",
        rotation: "-200deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-yellow-polygon",
      {
        x: "-18vw",
        y: "302vh",
        rotation: "232deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-blue-polygon",
      {
        x: "-14vw",
        y: "297vh",
        rotation: "232deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-polygon",
      {
        x: "7vw",
        y: "302vh",
        rotation: "237deg",
        duration: 1,
      },
      0
    );
  // ? panel three ends

  // ? panel visualization starts
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelVisualization,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#mobile-gray-ellipse",
      {
        x: "9vw",
        y: "415vh",
        rotation: "-208deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-ellipse",
      {
        x: "-94vw",
        y: "399vh",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-gray-small-ellipse",
      {
        x: "-216vw",
        y: "383vh",
        rotation: "148deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-yellow-polygon",
      {
        x: "-5vw",
        y: "403vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-blue-polygon",
      {
        x: "2vw",
        y: "402vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-polygon",
      {
        y: "402vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    );
  // ? panel visualization ends

  // ? panel automation starts
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelAutomation,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#mobile-gray-ellipse",
      {
        x: "12vw",
        y: "515vh",
        rotation: "185deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-ellipse",
      {
        x: "-115vw",
        y: "496vh",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-gray-small-ellipse",
      {
        x: "-270vw",
        y: "481vh",
        rotation: "-200deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-yellow-polygon",
      {
        x: "-18vw",
        y: "509vh",
        rotation: "232deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-blue-polygon",
      {
        x: "-14vw",
        y: "500vh",
        rotation: "233deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-polygon",
      {
        x: "7vw",
        y: "502vh",
        rotation: "240deg",
        duration: 1,
      },
      0
    );
  // ? panel automation ends

  // ? panel engineering starts
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelEngineering,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#mobile-gray-ellipse",
      {
        x: "15vw",
        y: "615vh",
        rotation: "-208deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-ellipse",
      {
        x: "-136vw",
        y: "593vh",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-gray-small-ellipse",
      {
        x: "-324vw",
        y: "579vh",
        rotation: "148deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-yellow-polygon",
      {
        x: "-5vw",
        y: "603vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-blue-polygon",
      {
        x: "2vw",
        y: "600vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-polygon",
      {
        y: "602vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    );
  // ? panel engineering ends

  // ? panel migration starts
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelMigration,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#mobile-gray-ellipse",
      {
        x: "18vw",
        y: "715vh",
        rotation: "185deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-ellipse",
      {
        x: "-157vw",
        y: "690vh",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-gray-small-ellipse",
      {
        x: "-378vw",
        y: "677vh",
        rotation: "-200deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-yellow-polygon",
      {
        x: "-18vw",
        y: "709vh",
        rotation: "233deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-blue-polygon",
      {
        x: "-14vw",
        y: "698vh",
        rotation: "233deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-polygon",
      {
        y: "702vh",
        rotation: "240deg",
        duration: 1,
      },
      0
    );
  // ? panel migration ends

  // ? panel 4 starts
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelFour,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#mobile-gray-ellipse",
      {
        x: "21vw",
        y: "815vh",
        rotation: "-208deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-ellipse",
      {
        x: "-178vw",
        y: "787vh",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-gray-small-ellipse",
      {
        x: "-432vw",
        y: "775vh",
        rotation: "215deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-yellow-polygon",
      {
        x: "-5vw",
        y: "796vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-blue-polygon",
      {
        x: "2vw",
        y: "800vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-polygon",
      {
        y: "802vh",
        rotation: "0deg",
        duration: 1,
      },
      0
    );
  // ? panel 4 ends

  // ? panel 5 starts
  gsap
    .timeline({
      scrollTrigger: {
        trigger: panelFive,
        start: "top bottom",
        end: "+=100%",
        scrub: true,
      },
    })
    .to(
      "#mobile-gray-ellipse",
      {
        x: "24vw",
        y: "915vh",
        rotation: "185deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-ellipse",
      {
        x: "-199vw",
        y: "884vh",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-gray-small-ellipse",
      {
        x: "-486vw",
        y: "873vh",
        rotation: "-200deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-yellow-polygon",
      {
        x: "-18vw",
        y: "901vh",
        rotation: "237deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-blue-polygon",
      {
        x: "-14vw",
        y: "903vh",
        rotation: "237deg",
        duration: 1,
      },
      0
    )
    .to(
      "#mobile-red-polygon",
      {
        x: "7vw",
        y: "902vh",
        rotation: "240deg",
        duration: 1,
      },
      0
    );
  // ? panel 5 ends
}

//Functions for mobile display size (max-width: 576px)
const hoverOverServicesMobile = () => {
  const title = document.getElementById("services-mobile-title");
  const tagline = document.getElementById("services-mobile-tagline");
  const servicesIcon = document.getElementById("services-mobile-ai-vector");
  const glassBackground = document.getElementById("services-mobile-wrapper");

  servicesIcon.classList.add("ai-vector-hover-small");

  glassBackground.classList.remove("mobile-glass-background");

  console.log(servicesIcon.classList);

  title.style.display = "none";
  tagline.style.visibility = "hidden";
};

const clinicManagementAnimation = () => {
  console.log("clicked");
  const workPanel = document.getElementById("work-main-mobile");
  const workPanelButtonLeft = document.getElementById(
    "work-main-mobile-button-left"
  );
  const workPanelButtonRight = document.getElementById(
    "work-main-mobile-button-right"
  );

  workPanelButtonLeft.classList.add("left-button-fading-out");
  workPanelButtonRight.classList.add("right-button-fading-out");

  console.log(workPanelButtonLeft.classList);
};

document.querySelector("#work-main-mobile").addEventListener("click", () => {
  gsap.timeline().to("#work-main-mobile", {
    duration: 1.5,
    css: { height: "80%" },
  });
});
