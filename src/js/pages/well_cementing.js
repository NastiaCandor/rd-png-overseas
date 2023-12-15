import $ from "jquery";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

 
import Swiper from 'swiper';
import { Mousewheel, Navigation } from 'swiper/modules';


gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

// semi-working
// $(document).ready(function () {
//   if (!document.querySelector('.well-cem')) return;

//   const wrapper = document.querySelector('.well-cem__display');
//   let duration = 4,
//   sections = gsap.utils.toArray('.well-cem__item');
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: '.well-cem',
//       pin: true,
//       scrub: 2,
//       // snap: 1 / (sections.length - sections.length - 1),
//       start: 'top top',
//       end: () => '+=' + (sections.length * sections[0].offsetHeight),
//       // end: '+=3000',
//       fastScrollEnd: 3000,
//       markers: true,
//       endTrigger: '.well-cem__item_last',
//       // animate: gsap.timeline().set(sections[sections.length - 1], {autoAlpha: 0}),
//       onToggle: (self) => console.log("toggled. active?", self.isActive),
//       // anticipatePin: 1,
//       onEnter: ({progress, direction, isActive}) => {
//         console.log(progress, direction, isActive);
//         swiper.enable();
//         tl.pause();
//         tl.addPause();
//       },
//       onEnterBack: ({progress, direction, isActive}) => {
//         console.log(progress, direction, isActive, 'enterBack');
//         swiper.enable();
//         tl.pause();
//       },
//       onLeave: ({progress, direction, isActive}) => {
//         console.log(progress, direction, isActive, 'leave');
//         swiper.disable();
//         tl.resume();
//       },
//       onLeaveBack: ({progress, direction, isActive}) => {
//         console.log(progress, direction, isActive, 'leaveBack');
//         swiper.disable();
//         tl.resume();
//       }
//     }
//   });
//   // tl.to(sections, {
//   //   yPercent: -(100 * (sections.length - 1)),
//   //   duration: duration,
//   //   ease: 'none'
//   // });

//   let swiper = new Swiper('.well-cem__swiper', {
//     modules: [Mousewheel],
//     slidesPerView: 1,
//     speed: 1000,
//     direction: "vertical",
//     mousewheel: {
//       releaseOnEdges: true,
//       eventsTarget: '.well-main',
//       // thresholdDelta: 1,
//     },
//     spaceBetween: 30,
//     scrollbar: true,
//   });
//   swiper.disable();

// });

$(document).ready(function () {
  if (!document.querySelector('.well-cem')) return;

  console.log('well');

  const wrapper = document.querySelector('.well-cem__display');
  let duration = 4,
  sections = gsap.utils.toArray('.well-cem__item');
  const quant = sections.length;
  const scrollStep = 750;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.well-cem',
      pin: true,
      // scrub: 2,
      // snap: 1 / (sections.length - sections.length - 1),
      start: 'top top',
      // end: () => '+=' + (sections.length * sections[0].offsetHeight),
      end: () => '+=' + quant * scrollStep,
      // end: '+=10000',
      // end: '+=3000',
      // fastScrollEnd: 3000,
      // markers: true,
    }
  });
  // tl.to(sections, {
  //   yPercent: -(100 * (sections.length - 1)),
  //   duration: duration,
  //   ease: 'none'
  // });
  // const lenis = new Lenis({
  //   smoothWheel: false,
  // });

  // lenis.on('scroll', (e) => {
  //   console.log(e);
  //   console.log(lenis.scroll);
  // });
  // // lenis.stop();
  
  // function raf(time) {
  //   lenis.raf(time);
  //   requestAnimationFrame(raf);
  // }
  
  // requestAnimationFrame(raf);

  // let swiper = new Swiper('.well-cem__swiper', {
  //   modules: [Mousewheel],
  //   slidesPerView: 1,
  //   speed: 1000,
  //   direction: "vertical",
  //   mousewheel: {
  //     releaseOnEdges: true,
  //     eventsTarget: '.well-main',
  //     // thresholdDelta: 1,
  //   },
  //   spaceBetween: 30,
  //   scrollbar: true,
  // });
  // swiper.disable();

  // const options = { threshold: [0.9] };
  // const wellObserver = new IntersectionObserver(swiperEnable, options);
  // const wellCem = document.querySelector('.well-cem');
  
  // function swiperEnable(entry) {
  //   entry.forEach(item => {
  //     // console.log(item);
  //     if (item.isIntersecting) {
  //       swiper.enable();
  //     } else {
  //       swiper.disable();
  //     }
  //   });
  // }
  
  // wellObserver.observe(wellCem);

  gsap.registerPlugin(ScrollTrigger);

  gsap.set('.well-cem__display', {autoAlpha:1})

  var allSections = gsap.utils.toArray(".well-cem__item");
  gsap.set(allSections[0], {position:'fixed'})
  var allSectionsNotFirst = allSections.slice(1);
  gsap.set(allSectionsNotFirst, {position:'absolute', yPercent:100});

  var allLines = gsap.utils.toArray("well-cem__item p");
  var allLinesNotFirst = allLines.slice(1);
  //gsap.set(allLinesNotFirst, {autoAlpha:0});

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
        // preventOverlaps: true,
        //fastScrollEnd: true
        // markers: true,
      }
    })
    // .to(allSections[i], {
    //   yPercent:-100, 
    //   duration:0.4, //ease:,
    //   delay: 0.3,
    // })
      .to(section, {
      yPercent:0, 
      duration:0.6, //ease:,
      ease: 'power3.inOut',
    })
    //   .from(allLinesNotFirst[i], {
    //   y:'+=200', 
    //   autoAlpha:0, 
    //   duration:0.5,
    // },0.3)
  });
  allSectionsNotFirst.forEach((section, i) => {

    gsap.timeline({
      scrollTrigger:{
        trigger: allTrigger[i],
        start:"top -150px",
        toggleActions: "play none none reverse",
        // preventOverlaps: true,
        //fastScrollEnd: true
      }
    })
    .to(allSections[i], {
      yPercent:-100, 
      duration:0.6, //ease:,
      ease: 'power3.inOut',
    })
  });
});