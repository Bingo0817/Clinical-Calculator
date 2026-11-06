(function(root){
  'use strict';
  function positive(v){if(String(v).trim()==='' || !Number.isFinite(Number(v)) || Number(v)<=0) throw Error('请填写大于 0 的有效数值。'); return Number(v);}
  function sex(v){if(!['male','female'].includes(v)) throw Error('请选择性别。');}
  function bsa(h,w,s){h=positive(h);w=positive(w);sex(s);const c=s==='male'?[.00607,.0127,.0698]:[.00586,.0126,.0461];const r=h*c[0]+w*c[1]-c[2];if(r<=0||!Number.isFinite(r))throw Error('输入无法生成有效体表面积，请核对。');return r.toFixed(2);}
  function crcl(age,w,scr,unit,s){age=positive(age);w=positive(w);scr=positive(scr);sex(s);if(age<18||age>=140)throw Error('本清除率工具仅接受 18 至小于 140 岁成人。');if(!['umol','mg'].includes(unit))throw Error('请选择血肌酐单位。');const r=w*(140-age)*(s==='male'?1:.85)/(unit==='umol'?scr/88.4*72:scr*72);if(!Number.isFinite(r))throw Error('计算超出范围，请核对输入。');return r.toFixed(0);}
  function dose(value,rate,offset=0){const r=positive(rate)*(positive(value)+offset);if(!Number.isFinite(r))throw Error('计算超出范围。');return r.toFixed(0);}
  const api={bsa,crcl,dose};if(typeof module!=='undefined')module.exports=api;else root.Calculators=api;
})(globalThis);
