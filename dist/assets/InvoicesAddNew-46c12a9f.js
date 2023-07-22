import{u as G,a as K,r as c,o as w,d as U,w as m,$ as j,k as s,e as I,a0 as q,f as B,n as z,t as W,a1 as $,a2 as D,T,g as M,h as C,a3 as Y,a4 as Q,a5 as X,a6 as g,a7 as f}from"./index-6697ba1b.js";const Z={class:"flex flex-col justify-center items-center"},ee={class:"w-[90%] bg-gray-900 rounded-xl"},te={class:"flex flex-col items-start justify-center mx-auto gap-y-4 mt-6 mb-6 w-[80%]"},oe={class:"flex flex-col items-start gap-y-1"},ie=s("label",{for:"input-client",class:"text-white text-sm"},"Client Name",-1),se=["src"],ne={class:"flex flex-col items-start gap-y-1 w-full relative"},ae=s("label",{for:"input-date",class:"text-white text-sm"},"Date",-1),le={class:"flex flex-col gap-y-2"},ue={key:0,class:"absolute left-[6rem] top-[4rem] text-sm text-red-400 duration-300",role:"alert"},re={class:"flex flex-col items-start gap-y-1 w-full relative"},ce=s("label",{for:"input-amount",class:"text-white text-sm"},"Amount",-1),de={key:0,class:"absolute left-[6rem] top-[4rem] text-sm text-red-400 duration-300",role:"alert"},ve={__name:"InvoicesAddNew",props:{newInvoiceBtnRef:{type:[HTMLButtonElement,null],required:!0}},emits:["runCheckPendings"],setup(k,{emit:O}){const A=k,e=G(),n=K(),l=c(""),u=c(0),d=c(!1),v=c(!1),V="bg-white text-left shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2",E="py-2 pl-3 pr-10 leading-5 text-gray-900",R='px-2 focus:bg-gray-400/20"';function y(){e.closeInvoicesViewAll(),e.updateAddInvoiceModalIsVisible(!1),d.value=!1,v.value=!1,l.value="",u.value=0,A.newInvoiceBtnRef.focus()}const p=c();function L(t){p.value=t}const b=c([...e.invoiceData]),S=c();let a;function F(){var _;const t=new Date,o=Date.parse(t),i=l.value.split("-");if(Date.parse(`${i[0]} ${i[1]} ${i[2]} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`)+1e4<o){d.value=!0;return}if(!l.value){d.value=!0;return}if(!u.value||u.value<=0){v.value=!0;return}const P=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];a=e.lastInvoiceId+Math.floor(g(0,500)),e.updateLastInvoiceIdFormSubmit(a);const r=new Date(l.value);(_=S.value)==null||_.runEmit();const J={id:a,date:`${P[r.getMonth()]} ${r.getDate()}, ${r.getFullYear()}`,client:p.value.name,clientPhoto:p.value.photo,amount:u.value,status:"Pending"};e.updateInvoices(J),y(),b.value=[...e.invoiceData];let h=n.lastNotificationId+Math.floor(g(0,500));H(`${a}`,h),e.updateHasPending(!0),f.info(`Invoice #${a} is being processed`,{autoClose:3e3,position:f.POSITION.BOTTOM_RIGHT,theme:"dark",transition:f.TRANSITIONS.SLIDE}),n.updateNotifications({id:h,type:"invoice",status:"pending",message:`Invoice #${a} is being processed`,showCancelBtn:!0,invoiceId:a}),n.updateLastNotificationId(h),l.value="",u.value=0}function H(t,o){e.updateOPBAddNewProp(t);let i=1e4;e.updateOPBPropValue(`${t}notificationId`,o),e.updateOPBPropValue(`${t}SI`,setInterval(()=>{i=g(5e3,1e4),e.updateOPBPropValue(t,e.outputPendingBar[t]+25),e.outputPendingBar[t]>=100&&(clearInterval(e.outputPendingBar[`${t}SI`]),e.updateOPBPropValue(`${t}ST`,setTimeout(()=>{const N=b.value.findIndex(r=>r.id==t);b.value[N].status="Successful",e.updateHasSuccess(!0),O("runCheckPendings"),f.success(`Invoice #${e.outputPendingBar[`${t}invoiceId`]} was successfully processed`,{autoClose:3e3,position:f.POSITION.BOTTOM_RIGHT,theme:"dark",transition:f.TRANSITIONS.SLIDE}),n.notifications.findIndex(r=>r.id===o)!==-1&&n.updateNotifyCancelBtn(o);const x=n.lastNotificationId+Math.floor(g(0,500));n.updateNotifications({id:x,type:"invoice",status:"successful",message:`Invoice #${e.outputPendingBar[`${t}invoiceId`]} was successfully processed`,showCancelBtn:!1,invoiceId:a}),n.updateLastNotificationId(x),n.removeNotification(e.outputPendingBar[`${t}notificationId`]),e.OPBRemoveProp(t)},1e3)))},i))}return(t,o)=>(w(),U(X,{show:B(e).addInvoiceModalIsVisible,ariaLabelProp:"add new invoice.",dialogCustomHeight:"h-[28rem]",dialogCustomWidth:"w-[20rem]",onClose:y},{header:m(()=>[j("Add New Invoice")]),default:m(()=>[s("div",Z,[s("div",ee,[s("div",te,[s("div",oe,[ie,I(q,{"data-list":B(e).clientList,"icon-position":"right","icon-code":"majesticons:chevron-down-line","combobox-width":"w-[13.5rem]","combobox-styling":V,"input-box-styling":E,"button-styling":R,"icon-color":"text-gray-600","prop-to-show":"name",onEmitSelectedOption:L,ref_key:"comboboxRef",ref:S},{comboboxItem:m(i=>[s("img",{src:i.slotData.photo,alt:"client photo",class:"object-fit rounded-full h-7 w-7","aria-hidden":"true"},null,8,se),s("span",{class:z(["block truncate",{"font-medium":i.textStyling,"font-normal":!i.textStyling}])},W(i.slotData.name),3)]),_:1},8,["data-list"])]),s("div",ne,[ae,s("div",le,[$(s("input",{id:"input-date",class:"w-[11rem] rounded-md py-1 px-2 bg-gray-200 hover:ring-1 hover:ring-white focus-visible:border focus-visible:border-green-500 focus-visible:ring-4 focus-visible:ring-green-500/50 duration-300",type:"date","onUpdate:modelValue":o[0]||(o[0]=i=>l.value=i),onClick:o[1]||(o[1]=i=>d.value=!1),onFocus:o[2]||(o[2]=i=>d.value=!1)},null,544),[[D,l.value]])]),I(T,null,{default:m(()=>[d.value?(w(),M("div",ue," Invalid Date ")):C("",!0)]),_:1})]),s("div",re,[ce,$(s("input",{id:"input-amount",class:"w-[11rem] rounded-md py-1 px-2 bg-gray-200 hover:ring-1 hover:ring-white focus-visible:border focus-visible:border-green-500 focus-visible:ring-4 focus-visible:ring-green-500/50 duration-300",type:"number","onUpdate:modelValue":o[3]||(o[3]=i=>u.value=i),onClick:o[4]||(o[4]=i=>v.value=!1),onFocus:o[5]||(o[5]=i=>v.value=!1)},null,544),[[D,u.value]]),I(T,{name:"amountError"},{default:m(()=>[v.value?(w(),M("div",de," Please add an amount ")):C("",!0)]),_:1})]),s("button",{class:"flex p-2 text-sm bg-gray-700 text-gray-300 rounded-lg outline-none hover:ring-1 hover:ring-white hover:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:text-white duration-300",onKeydown:o[6]||(o[6]=Y(Q(()=>{},["exact","prevent"]),["tab"])),onClick:F}," Submit ",32)])])])]),_:1},8,["show"]))}};export{ve as default};