"use strict";(self.webpackChunkpet_store=self.webpackChunkpet_store||[]).push([[180],{1180:function(e,n,s){s.r(n),s.d(n,{default:function(){return _}});var a=s(4165),t=s(5861),r=s(4942),i=s(1413),o=s(9439),l=s(2791),d=s(5705),c="AdminProfile_productContainer__788LY",u="AdminProfile_formContainer__L0+Fg",m="AdminProfile_firstLine__gPC1c",f="AdminProfile_form__EAV6D",p="AdminProfile_button__GRCjc",h="AdminProfile_submitForm__byOv1",x=s(5227),b=s(3501),w=s(5763),j=s(1745),v=s(184),_=function(){var e=(0,j.PR)(),n=(0,j._y)(),s=(0,l.useState)(""),_=(0,o.Z)(s,2),C=_[0],y=_[1],N=(0,l.useState)({personalInfo:!0,passwordInfo:!0}),g=(0,o.Z)(N,2),I=g[0],Z=g[1],P=function(e){Z((function(n){return(0,i.Z)((0,i.Z)({},n),{},(0,r.Z)({},e,!n[e]))}))},k=function(e,n){e.handleReset(),P(n)},A=function(){var e=(0,t.Z)((0,a.Z)().mark((function e(s,t){var r,i;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(I.personalInfo){e.next=6;break}return r={name:s.name,surname:s.surname},e.next=4,n.editProfile(r).then().catch((function(e){e.response?y(e.response.data.message):y(e.message)}));case 4:e.next=9;break;case 6:return i={password:s.password,confirm:s.confirm},e.next=9,n.editPassword(i).then().catch((function(e){e.response?y(e.response.data.message):y(e.message)}));case 9:P(t);case 10:case"end":return e.stop()}}),e)})));return function(n,s){return e.apply(this,arguments)}}();return(0,v.jsxs)("div",{className:c,children:[(0,v.jsx)("div",{className:m,children:(0,v.jsx)("p",{children:"Admin information"})}),(0,v.jsxs)("div",{className:u,children:[(0,v.jsx)(d.J9,{validationSchema:b.GP,initialValues:{surname:e.lastName,email:e.email,name:e.firstName},onSubmit:A,children:function(n){return(0,v.jsxs)(d.l0,{className:f,children:[(0,v.jsx)(x.Z,{name:"name",type:"text",label:"Name",width:"276px",onChange:function(e){n.handleChange(e)},disabled:I.personalInfo,required:!0}),(0,v.jsx)(x.Z,{name:"surname",type:"text",label:"Surname",width:"276px",onChange:function(e){n.handleChange(e)},disabled:I.personalInfo,required:!0}),(0,v.jsx)(x.Z,{name:"email",type:"unstyled",label:"E-mail",width:"276px",value:e.email}),I.personalInfo?(0,v.jsxs)("button",{type:"button",onClick:function(){return P("personalInfo")},className:p,children:["Edit ",(0,v.jsx)(w.LBv,{size:20,style:{marginLeft:"5px"}})]}):(0,v.jsxs)("div",{className:h,children:[(0,v.jsx)("button",{type:"submit",className:p,children:"Confirm"}),(0,v.jsx)("button",{type:"button",onClick:function(){return k(n,"personalInfo")},className:p,children:"Cancel"})]})]})}}),(0,v.jsx)(d.J9,{validationSchema:b.vG,initialValues:{password:"",confirm:"",editEnabled:!1},onSubmit:function(e,n){return A(e,"passwordInfo",n)},children:function(e){return(0,v.jsxs)(d.l0,{className:f,children:[(0,v.jsx)("h3",{style:{marginBottom:"20px"},children:"Your password"}),(0,v.jsx)(x.Z,{name:"password",type:"password",label:"Password",width:"276px",value:e.values.password,disabled:I.passwordInfo,required:!0}),(0,v.jsx)(x.Z,{name:"confirm",type:"password",label:"Confirm password",width:"276px",value:e.values.confirm,disabled:I.passwordInfo,required:!0}),I.passwordInfo?(0,v.jsxs)("button",{type:"button",onClick:function(){return P("passwordInfo")},className:p,children:["Edit",(0,v.jsx)(w.LBv,{size:20,style:{marginLeft:"5px"}})]}):(0,v.jsxs)("div",{className:h,children:[(0,v.jsx)("button",{type:"submit",className:p,disabled:e.isSubmitting,children:"Confirm"}),(0,v.jsx)("button",{type:"button",onClick:function(){return k(e,"passwordInfo")},className:p,children:"Cancel"})]})]})}}),C&&(0,v.jsx)("p",{children:C})]})]})}}}]);
//# sourceMappingURL=180.2e2c9824.chunk.js.map