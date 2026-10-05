export function initCollection(){
 const cards=[...document.querySelectorAll('[data-product-photo]')],cleanups=[],hoverEnabled=matchMedia('(hover: hover) and (min-width: 601px)');
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.querySelector('.worn-shot').loading='eager';observer.unobserve(entry.target)}},{rootMargin:'500px'});
 for(const button of cards){
  const product=button.querySelector('.catalog-shot'),worn=button.querySelector('.worn-shot'),label=button.querySelector('[data-photo-label]');
  let hovered=false,focused=false,manual=null;
  const intended=()=>manual??(hovered||focused);
  const update=()=>{const active=intended()&&worn.complete&&worn.naturalWidth>0;button.dataset.preview=String(active);button.setAttribute('aria-pressed',String(active));button.setAttribute('aria-label',(active?'Ver producto: ':'Ver en uso: ')+button.dataset.name);product.setAttribute('aria-hidden',String(active));worn.setAttribute('aria-hidden',String(!active));label.textContent=active?'Ver producto':'Ver en uso'};
  const enter=e=>{if(e.pointerType==='mouse'&&hoverEnabled.matches){hovered=true;manual=null;update()}};
  const leave=e=>{if(e.pointerType==='mouse'&&hoverEnabled.matches){hovered=false;manual=null;update()}};
  const focus=()=>{focused=button.matches(':focus-visible');update()};
  const blur=()=>{focused=false;manual=null;update()};
  const click=()=>{manual=!intended();update()};
  const handlers={pointerenter:enter,pointerleave:leave,focus,blur,click};
  for(const [event,handler] of Object.entries(handlers))button.addEventListener(event,handler);
  worn.addEventListener('load',update);observer.observe(button);update();
  cleanups.push(()=>{for(const [event,handler] of Object.entries(handlers))button.removeEventListener(event,handler);worn.removeEventListener('load',update)});
 }
 return {dispose(){observer.disconnect();cleanups.forEach(clean=>clean())}};
}
