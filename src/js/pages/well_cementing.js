import $ from "jquery";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

$(document).ready(function () {
  if (!document.querySelector('.well-cem')) return;

  const wrapper = document.querySelector('.well-cem__display');
  let duration = 4,
  sections = gsap.utils.toArray('.well-cem__item');
  const quant = sections.length;
  const scrollStep = 750;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.well-cem',
      pin: true,
      start: 'top top',
      end: () => '+=' + quant * scrollStep,
    }
  });


  gsap.registerPlugin(ScrollTrigger);

  gsap.set('.well-cem__display', {autoAlpha:1})

  var allSections = gsap.utils.toArray(".well-cem__item");
  gsap.set(allSections[0], {position:'fixed'})
  var allSectionsNotFirst = allSections.slice(1);
  gsap.set(allSectionsNotFirst, {position:'absolute', yPercent:100});

  var allLines = gsap.utils.toArray("well-cem__item p");
  var allLinesNotFirst = allLines.slice(1);

  // ================
  var allTrigger = gsap.utils.toArray(".trigger");
  gsap.set(allTrigger, {height:1000})
  //height value defines the 'gap' between changes
  gsap.set(allTrigger, {visibility:'hidden'})

  // ========================
  allSectionsNotFirst.forEach((section, i) => {

    gsap.timeline({
      scrollTrigger:{
        trigger: allTrigger[i],
        start:"top -150px",
        toggleActions: "play none none reverse",
      }
    })
      .to(section, {
      yPercent:0, 
      duration:0.6, //ease:,
      ease: 'power3.inOut',
    })
  });
  allSectionsNotFirst.forEach((section, i) => {

    gsap.timeline({
      scrollTrigger:{
        trigger: allTrigger[i],
        start:"top -150px",
        toggleActions: "play none none reverse",
      }
    })
    .to(allSections[i], {
      yPercent:-100, 
      duration:0.6, //ease:,
      ease: 'power3.inOut',
    })
  });

  // mobile vs desctop
  if (!$(".well-cem").data("platform")) {
		screen.width < 769
			? $(".well-cem").data("platform", "mobile")
			: $(".well-cem").data("platform", "desktop");
	}

  if (screen.width > 769) {
    gsap.set(allTrigger, {height:1000});
    ScrollTrigger.refresh();

  } else {
    gsap.set(allTrigger, {height:500});
    ScrollTrigger.refresh();
  }

  $(window).resize(function () {
		changeWellSlider();
	});

  function changeWellSlider() {
    if (screen.width < 769) {
      if ($('.well-cem').data('platform') != 'desktop') return;
      $(".well-cem").data("platform", "mobile");

      gsap.set(allTrigger, {height:500});
      ScrollTrigger.refresh();
    } else {
      if ($('.well-cem').data('platform') != 'mobile') return;
      $(".well-cem").data("platform", "desktop");

      gsap.set(allTrigger, {height:1000});
      ScrollTrigger.refresh();
    }
  }
});