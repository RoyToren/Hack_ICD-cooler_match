(this["webpackJsonpreact-flask-app"]=this["webpackJsonpreact-flask-app"]||[]).push([[0],{56:function(e,t,a){},68:function(e,t,a){},69:function(e,t,a){"use strict";a.r(t);var n,r=a(0),c=a.n(r),i=a(11),s=a.n(i),o=(a(56),a(30)),l=a.n(o),d=a(33),j=a(14),p=a(19),b=a(99),u=a(102),h=a(103),g=a(104),m=a(70),x=a(111),O=a(105),f=a(110),v=a(106),w=a(28),y=a(109),k=a(13),N=a(34),R=a(44),D=a(36),T=a(2),I={display:"flex",flexDirection:"row",flexWrap:"wrap",marginTop:16},A={display:"inline-flex",borderRadius:2,border:"1px solid #eaeaea",marginBottom:8,marginRight:8,width:300,height:300,padding:4,boxSizing:"border-box"},B={display:"flex",minWidth:0,overflow:"hidden"},C={display:"block",width:"auto",height:"100%"},F=D.a.div(n||(n=Object(N.a)(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n  border-width: 2px;\n  border-radius: 2px;\n  border-color: ",";\n  border-style: dashed;\n  background-color: #fafafa;\n  color: #bdbdbd;\n  outline: none;\n  transition: border .24s ease-in-out;\n"])),(function(e){return function(e){return e.isDragAccept?"#00e676":e.isDragReject?"#ff1744":e.isDragActive?"#2196f3":"#eeeeee"}(e)}));function S(e){var t=Object(k.a)({},e),a=Object(r.useState)([]),n=Object(j.a)(a,2),i=n[0],s=n[1],o=Object(R.a)({accept:"image/*",onDrop:function(e){s(e.map((function(e){return Object.assign(e,{preview:URL.createObjectURL(e)})}))),t.parentCallback(e[0])}}),l=o.getRootProps,d=o.getInputProps,p=o.isDragActive,b=o.isDragAccept,u=o.isDragReject,h=i.map((function(e){return Object(T.jsx)("div",{style:A,children:Object(T.jsx)("div",{style:B,children:Object(T.jsx)("img",{src:e.preview,style:C})})},e.name)}));return Object(r.useEffect)((function(){return function(){i.forEach((function(e){return URL.revokeObjectURL(e.preview)}))}}),[i]),Object(T.jsxs)(c.a.Fragment,{children:[Object(T.jsx)(w.a,{variant:"h6",gutterBottom:!0,children:"Upload image to analyze color"}),Object(T.jsxs)("div",{className:"container",children:[Object(T.jsxs)(F,Object(k.a)(Object(k.a)({},l({className:"dropzone",isDragActive:p,isDragAccept:b,isDragReject:u})),{},{children:[Object(T.jsx)("input",Object(k.a)({},d())),Object(T.jsx)("p",{children:"Drag 'n' drop some files here, or click to select files"}),Object(T.jsx)("em",{children:"(Only *.jpeg and *.png images will be accepted)"})]})),Object(T.jsx)("aside",{style:I,children:h})]})]})}var L=a(100),U=a(112),W=a(101),E=Object(b.a)((function(e){return{listItem:{padding:e.spacing(1,0)},total:{fontWeight:700},title:{marginTop:e.spacing(2)},square:{width:"100px",height:"100px",display:"inline-flex"}}}));function P(e){var t=E(),a=Object(k.a)({},e);return a.data&&a.data!=={}?Object(T.jsxs)(c.a.Fragment,{children:[Object(T.jsx)(w.a,{variant:"h6",gutterBottom:!0,children:"Top Colors We Found From Best To Worst"}),Object(T.jsx)(L.a,{disablePadding:!0,children:a.data.map((function(e){return Object(T.jsxs)(U.a,{className:t.listItem,children:[Object(T.jsx)(W.a,{primary:e.name,secondary:"".concat(100*e.percentage,"%")}),Object(T.jsx)("div",{className:t.square,style:{backgroundColor:"rgb(".concat(e.val,")")},children:" "})]})}))})]}):Object(T.jsx)(c.a.Fragment,{children:"Results"})}a(65);var z=a(107),M=(a(68),a(108)),q=Object(b.a)((function(e){return{appBar:{position:"relative",background:"#282c34",color:"white",alignItems:"center"},footer:{padding:e.spacing(3,2),marginTop:"auto",background:"#282c34",color:"white"},layout:Object(p.a)({width:"auto",marginLeft:e.spacing(2),marginRight:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(2)),{width:600,marginLeft:"auto",marginRight:"auto"}),paper:Object(p.a)({marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(3)),{marginTop:e.spacing(6),marginBottom:e.spacing(6),padding:e.spacing(3)}),stepper:{padding:e.spacing(3,0,5)},buttons:{display:"flex",justifyContent:"flex-end"},button:{marginTop:e.spacing(3),marginLeft:e.spacing(1)},progress:{marginTop:"auto",color:"green"},divider:{marginTop:e.spacing(3),marginLeft:"auto",marginRight:"auto"},listItem:{display:"block",textAlign:"center"}}})),H=["Upload Image","Result"];var J=function(){var e=c.a.useState(0),t=Object(j.a)(e,2),a=t[0],n=t[1],r=c.a.useState(0),i=Object(j.a)(r,2),s=i[0],o=i[1],p=c.a.useState({}),b=Object(j.a)(p,2),k=b[0],N=b[1],R=q(),D=c.a.useState(0),I=Object(j.a)(D,2),A=I[0],B=I[1],C=function(e){n(e)};return Object(T.jsx)("div",{className:"App",children:Object(T.jsxs)(c.a.Fragment,{children:[Object(T.jsx)(u.a,{}),Object(T.jsx)(h.a,{position:"absolute",color:"default",className:R.appBar,children:Object(T.jsx)(g.a,{children:Object(T.jsx)(w.a,{variant:"h6",color:"inherit",noWrap:!0,children:"Cooler Match"})})}),Object(T.jsx)("main",{className:R.layout,children:Object(T.jsxs)(m.a,{className:R.paper,children:[Object(T.jsx)(x.a,{activeStep:A,className:R.stepper,children:H.map((function(e){return Object(T.jsx)(O.a,{children:Object(T.jsx)(f.a,{children:e})},e)}))}),Object(T.jsxs)(c.a.Fragment,{children:[A===H.length?Object(T.jsxs)(c.a.Fragment,{children:[Object(T.jsx)(w.a,{variant:"h5",gutterBottom:!0,children:"Hope we were helful!"}),Object(T.jsx)(v.a,{variant:"contained",color:"primary",onClick:function(){n(0),N({}),B(0),o(0)},className:R.button,children:"Again"})]}):Object(T.jsxs)(c.a.Fragment,{children:[function(e){switch(e){case 0:return Object(T.jsx)(S,{parentCallback:C});case 1:return Object(T.jsx)(P,{data:k});default:throw new Error("Unknown step")}}(A),Object(T.jsx)("div",{className:R.buttons,children:s?Object(T.jsx)(z.a,{className:R.progress}):Object(T.jsx)(v.a,{variant:"contained",color:"primary",onClick:function(){if(0===A){var e=new FormData;if(null===a||0===a)return void alert("please enter an image of a test to check");e.append("images",a,a.name);var t={headers:{Accept:"application/json"},method:"POST",body:e};o(1),fetch("/api/checkColor",t).then((function(e){return e.json()})).then((function(e){var t=setInterval(Object(d.a)(l.a.mark((function a(){var n,r;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("/api/returnResults/"+e.task_id,{headers:{"Content-Type":"application/json",Accept:"application/json"}});case 2:return n=a.sent,a.next=5,n.json();case 5:"finished"==(r=a.sent).status?(N(r.result),o(0),clearInterval(t),B(A+1)):"not started"==r.status&&(clearInterval(t),alert("internal error, please try again"));case 7:case"end":return a.stop()}}),a)}))),3e3)}))}A===H.length-1&&B(A+1)},className:R.button,disabled:s,children:A===H.length-1?"Done":"Next"})})]}),s?Object(T.jsx)("span",{children:"Searching our catalogue \ud83d\udd0e"}):null]}),Object(T.jsx)(M.a,{className:R.divider}),Object(T.jsx)("h3",{children:"How to get the best match:"}),Object(T.jsxs)(L.a,{children:[Object(T.jsx)(U.a,{className:R.listItem,children:Object(T.jsx)("span",{children:"1) The desired color should be at the center of the image"})}),Object(T.jsx)(U.a,{className:R.listItem,children:Object(T.jsx)("span",{children:"2) Use flash when taking pictures, unless the surface color is close to white"})}),Object(T.jsx)(U.a,{className:R.listItem,children:Object(T.jsx)("span",{children:"3) Take the picture 15 centimeters away from the surface "})})]})]})}),Object(T.jsx)("footer",{className:R.footer,children:Object(T.jsx)(y.a,{maxWidth:"sm",children:Object(T.jsxs)(w.a,{variant:"body2",color:"inherit",align:"center",children:["By Cooler Match Team ",(new Date).getFullYear(),"."]})})})]})})};s.a.render(Object(T.jsx)(c.a.StrictMode,{children:Object(T.jsx)(J,{})}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.e2208158.chunk.js.map