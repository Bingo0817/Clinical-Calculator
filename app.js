'use strict';
for(const id of ['bsa','renal']){
 const form=document.getElementById(id+'-form'),out=document.getElementById(id+'-result'),total=document.getElementById(id+'-total'),error=document.getElementById(id+'-error');
 const val=n=>form.elements[n].value;
 const clear=()=>{out.textContent=total.textContent='—';error.textContent='';};
 function compute(){return id==='bsa'?Calculators.bsa(val('height'),val('weight'),val('sex')):Calculators.crcl(val('age'),val('weight'),val('scr'),val('unit'),val('sex'));}
 function run(withDose){clear();try{out.textContent=compute();if(withDose)total.textContent=Calculators.dose(out.textContent,val(id==='bsa'?'rate':'auc'),id==='bsa'?0:25);}catch(e){error.textContent=e.message;}}
 form.addEventListener('submit',e=>{e.preventDefault();run(false);});
 document.getElementById(id+'-dose').addEventListener('click',()=>run(true));
 form.addEventListener('input',clear);form.addEventListener('change',e=>{clear();if(e.target.name==='unit'){form.elements.scr.value='';error.textContent='单位已切换，请重新填写对应单位的血肌酐值。';}});form.addEventListener('reset',clear);
}

const renalForm=document.getElementById('renal-form');
renalForm.elements.unit.addEventListener('change',()=>{document.getElementById('scr-unit').textContent=renalForm.elements.unit.value==='umol'?'μmol/L':'mg/dL';});
renalForm.addEventListener('reset',()=>{document.getElementById('scr-unit').textContent='μmol/L';});

// Hash links support direct entry and browser back/forward without losing form values.
function showCalculator(){
 const active=location.hash==='#renal'?'renal':'bsa';
 for(const id of ['bsa','renal']){
  document.getElementById(id).hidden=id!==active;
  const link=document.getElementById('nav-'+id);
  if(id===active)link.setAttribute('aria-current','page');
  else link.removeAttribute('aria-current');
 }
}
window.addEventListener('hashchange',showCalculator);
showCalculator();
