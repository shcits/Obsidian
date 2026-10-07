import {smooth} from './passport-model.js';

// All photos keep a place in the fan; selection brings one to the center.
export function fanCard(index,position,count,spread=45){
 const distance=index-position,back=smooth(0,1,Math.abs(distance));
 const slot=count>1?(index/(count-1)*2-1):0;
 return {distance,x:slot*spread*back||0,y:-18*back||0,angle:slot*20*back||0,
  scale:1-.1*back,blur:.65*back,
  opacity:1,z:Math.round(100-back*40-Math.abs(slot)*5)};
}
