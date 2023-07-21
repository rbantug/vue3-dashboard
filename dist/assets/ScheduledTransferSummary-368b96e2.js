import{b as _,r as f,c as x,E as y,o as a,g as i,k as e,f as s,a3 as p,a4 as m,e as w,I as b,h as g,t as o,a9 as k}from"./index-2ba80acb.js";import{o as S}from"./outputLast4CardNum-d5332ab7.js";const M={class:"flex flex-col w-full relative"},B=["onKeydown"],v=e("span",null,"Back",-1),D=e("div",{class:"text-white text-xl mt-10 mx-auto"},"Your summary",-1),N={class:"flex justify-center items-center gap-x-2 mt-2 mx-auto py-2 px-4 w-auto bg-gray-200/20 text-white rounded-xl"},$=["src"],T={class:"flex flex-col"},V={class:"flex flex-col gap-y-1 items-center mt-5"},I={class:"text-white"},Y={class:"text-white text-3xl"},R={class:"text-gray-300"},C={class:"flex flex-col items-center mt-5"},E=e("span",{class:"text-white"},"Reminder:",-1),K={key:0,class:"text-white"},j={key:1,class:"text-indigo-400"},O={class:"flex flex-col items-center mt-5"},W=e("span",{class:"text-white"},"Description:",-1),F={key:0,class:"text-white"},L={key:1,class:"text-indigo-400"},z={__name:"ScheduledTransferSummary",setup(P){const t=_(),u=f(null);function l(){t.editTransferModalIsVisible?t.updateEditTransferOptions(!0):t.updateNewTransferOptions(!0),t.updateSubTransactSummary(!1),k(()=>{t.monthlyBtnRef.focus()})}const h=x(()=>{const r=t.totalDurationMonths/12,n=Math.floor(r);if(t.newSubBilling==="Monthly"&&t.totalDurationMonths>11&&Number.isInteger(r))return`${n} year${n>1?"s":""}`;if(t.newSubBilling==="Monthly"&&t.totalDurationMonths>11&&!Number.isInteger(r)){const c=t.totalDurationMonths-n*12;return`${n} year${n>1?"s":""} and ${c} month${c>1?"s":""}`}if(t.newSubBilling==="Monthly"&&t.totalDurationMonths<12)return`${t.totalDurationMonths} month${t.totalDurationMonths>1?"s":""}`;if(t.newSubBilling==="Yearly"){const c=new Date,d=t.durationYear-c.getFullYear();return`${d} year${d>1?"s":""}`}});return y(()=>{t.getBackBtnSummaryWindowRef(u.value)}),(r,n)=>(a(),i("div",null,[e("div",M,[s(t).processNewSubscription?g("",!0):(a(),i("button",{key:0,class:"flex items-center gap-x-2 pr-2 text-white hover:cursor-pointer absolute top-4 left-6",onClick:l,onKeydown:[p(m(l,["exact","stop","prevent"]),["enter"]),p(m(l,["exact","stop","prevent"]),["space"])],"aria-label":"go back to transfer details",ref_key:"backBtnRef",ref:u},[w(s(b),{icon:"material-symbols:arrow-back-ios-new-rounded",class:"h-5 w-5"}),v],40,B)),D,e("div",N,[e("img",{src:s(t).tempSelectedSubscription.icon1,alt:"",class:"w-20 h-10 object-contain","aria-hidden":"true"},null,8,$),e("div",T,[e("span",null,o(s(t).tempSelectedSubscription.company),1),e("span",null,o(s(h)),1)])]),e("div",V,[e("span",I,"To be paid "+o(s(t).outputBillingText)+"ly",1),e("span",Y,"$"+o(s(t).outputPrice),1),e("span",R,"Using "+o(s(t).paymentNetworkVModel.paymentNetwork)+" **** "+o(s(S)(s(t).paymentNetworkVModel)),1)]),e("div",C,[E,s(t).checkboxState?(a(),i("span",K,o(s(t).reminderChoice)+" before the billing date",1)):(a(),i("span",j,"not selected"))]),e("div",O,[W,s(t).descriptionVmodel?(a(),i("span",F,o(s(t).descriptionVmodel),1)):(a(),i("span",L,"no description provided"))])])]))}};export{z as default};
