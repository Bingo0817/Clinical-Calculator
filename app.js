'use strict';
for(const id of ['bsa','renal']){
 const form=document.getElementById(id+'-form'),out=document.getElementById(id+'-result'),total=document.getElementById(id+'-total'),error=document.getElementById(id+'-error');
 const val=n=>form.elements[n].value;
 const clear=()=>{out.textContent=total.textContent='';error.textContent='';};
 function compute(){return id==='bsa'?Calculators.bsa(val('height'),val('weight'),val('sex')):Calculators.crcl(val('age'),val('weight'),val('scr'),val('unit'),val('sex'));}
 function run(withDose){clear();try{out.textContent=compute();if(withDose)total.textContent=Calculators.dose(out.textContent,val(id==='bsa'?'rate':'auc'),id==='bsa'?0:25);}catch(e){error.textContent=e.message;}}
 form.addEventListener('submit',e=>{e.preventDefault();run(false);});
 document.getElementById(id+'-dose').addEventListener('click',()=>run(true));
 const invalidate=e=>{if(e.target.name==='rate'||e.target.name==='auc'){total.textContent='';error.textContent='';}else{clear();}};
 form.addEventListener('input',invalidate);form.addEventListener('change',e=>{invalidate(e);if(e.target.name==='sex'){const selectedSex=e.target.value;form.reset();form.elements.sex.value=selectedSex;return;}if(e.target.name==='unit'){form.elements.scr.value='';}});form.addEventListener('reset',clear);
}

const renalForm=document.getElementById('renal-form');

// Reset both forms whenever navigation changes the active calculator.
let activeCalculator=null;
function showCalculator(){
 const active=location.hash==='#renal'?'renal':'bsa';
 if(activeCalculator!==null && activeCalculator!==active){
  for(const id of ['bsa','renal'])document.getElementById(id+'-form').reset();
 }
 activeCalculator=active;
 for(const id of ['bsa','renal']){
  document.getElementById(id).hidden=id!==active;
  const link=document.getElementById('nav-'+id);
  if(id===active)link.setAttribute('aria-current','page');
  else link.removeAttribute('aria-current');
 }
}
window.addEventListener('hashchange',showCalculator);
showCalculator();