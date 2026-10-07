import test from 'node:test';
import assert from 'node:assert/strict';
import {fanCard} from '../src/collection-fan.js';

test('all six photos stay in the fan and each can lead from the center',()=>{
 for(let current=0;current<6;current++){
  const cards=Array.from({length:6},(_,i)=>fanCard(i,current,6)),front=cards[current];
  assert.equal(front.angle,0);assert.equal(front.opacity,1);assert.equal(front.blur,0);
  assert.equal(front.x,0);assert.equal(front.y,0);assert.equal(front.scale,1);
  for(const [index,card] of cards.entries()){
   assert.equal(card.opacity,1);
   if(index!==current){assert.ok(front.z>card.z);assert.ok(card.angle!==0);assert.ok(front.scale>card.scale)}
  }
 }
});
test('every card moves continuously and reverses with scroll',()=>{
 for(let index=0;index<6;index++){
  for(let p=.002;p<=5;p+=.002){
   const a=fanCard(index,p-.002,6),b=fanCard(index,p,6);
   for(const property of ['angle','x','y','scale','blur'])assert.ok(Math.abs(a[property]-b[property])<.15);
   assert.equal(b.opacity,1);
  }
 }
 const positions=Array.from({length:101},(_,i)=>i/20);
 assert.deepEqual(positions.map(p=>fanCard(3,p,6)),[...positions].reverse().map(p=>fanCard(3,p,6)).reverse());
});
