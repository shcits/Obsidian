import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function initMotion({reduced,onFrame}){
 const state={progress:0};let paused=false;
 const event=document.querySelector('#evento'),lenis=reduced?null:new Lenis({lerp:.08,smoothWheel:true,wheelMultiplier:.95});
 lenis?.on('scroll',ScrollTrigger.update);gsap.ticker.lagSmoothing(0);
 const context=gsap.context(()=>{
  if(reduced)return;
  const hero=document.querySelector('.hero'),source=document.querySelector('#hero-title'),destination=document.querySelector('#about-title'),brand=document.querySelector('.shared-brand'),header=document.querySelector('.site-header');
  document.body.classList.add('has-shared-title');
  // Measure the two layout slots, never the animated artwork itself.
  const displacement=axis=>destination.getBoundingClientRect()[axis]-source.getBoundingClientRect()[axis];
  gsap.to(brand,{x:()=>displacement('left'),y:()=>displacement('top'),scale:()=>destination.offsetWidth/source.offsetWidth,transformOrigin:'top left',ease:'none',scrollTrigger:{id:'shared-brand-title',trigger:hero,start:'top top',end:()=>Math.max(1,destination.closest('section').offsetTop-header.offsetHeight),scrub:.6,invalidateOnRefresh:true}});
  gsap.from('.hero>p span',{y:15,opacity:0,duration:.9,delay:.3,ease:'power3.out'});
  gsap.from('.hero-side-label>span,.hero-reveal-control>*',{opacity:0,y:12,duration:1,delay:.5,stagger:.12,ease:'power3.out'});
  gsap.to('.hero>p:not(.sr-only),.hero-scroll,.hero-side-label,.hero-reveal-control',{autoAlpha:0,y:-16,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'top -22%',scrub:true,invalidateOnRefresh:true}});
  gsap.to('.hero-media',{opacity:0,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom 20%',scrub:true,invalidateOnRefresh:true}});
  gsap.from('.about-columns article',{y:30,opacity:0,duration:.95,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:'#nosotros',start:'top 45%',once:true}});
  gsap.to(state,{progress:1,ease:'none',scrollTrigger:{trigger:event,start:'top top',end:'bottom bottom',scrub:.85,invalidateOnRefresh:true}});
  gsap.from('.ticket-intro>div',{y:30,opacity:0,duration:.95,ease:'power3.out',scrollTrigger:{trigger:'#tickets',start:'top 72%',once:true}});
  gsap.from('footer>*',{y:18,opacity:0,duration:.8,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:'footer',start:'top 90%',once:true}});
  return ()=>document.body.classList.remove('has-shared-title');
 });
 const nav=[...document.querySelectorAll('[data-nav]')];
 const sectionTriggers=['nosotros','evento','tickets'].map(id=>ScrollTrigger.create({trigger:'#'+id,start:'top 45%',end:'bottom 45%',onToggle:self=>{if(self.isActive&&document.querySelector('#reservation-view').hidden)nav.forEach(link=>{if(link.dataset.nav===id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})}}));
 function position(p){return event.offsetTop+p*(event.offsetHeight-innerHeight)}
 function scrollTo(target,immediate=false,duration=1.1){const top=typeof target==='number'?target:target.offsetTop;if(lenis)lenis.scrollTo(top,{immediate,duration});else window.scrollTo({top,behavior:'instant'})}
 const open=()=>scrollTo(position(.345),false,1.3);
 document.querySelector('.open-passport').addEventListener('click',open);
 const tick=time=>{if(paused||document.hidden)return;lenis?.raf(time*1000);if(reduced)state.progress=Math.max(0,Math.min(1,(scrollY-event.offsetTop)/Math.max(1,event.offsetHeight-innerHeight)));onFrame(state.progress,time)};
 gsap.ticker.add(tick);
 function refresh(){lenis?.resize();ScrollTrigger.refresh()}
 document.fonts.ready.then(refresh);addEventListener('resize',refresh);addEventListener('load',refresh,{once:true});
 return {refresh,scrollTo,rewardsStart:()=>document.querySelector('#recompensas').offsetTop,pause(value){paused=value;value?lenis?.stop():lenis?.start()},dispose(){gsap.ticker.remove(tick);context.revert();sectionTriggers.forEach(t=>t.kill());lenis?.destroy();removeEventListener('resize',refresh);removeEventListener('load',refresh);document.querySelector('.open-passport').removeEventListener('click',open)}};
}
