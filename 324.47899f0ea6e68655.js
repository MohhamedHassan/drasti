"use strict";(self.webpackChunkdrasti=self.webpackChunkdrasti||[]).push([[324],{2324:($,x,a)=>{a.r(x),a.d(x,{SubjectVideosModule:()=>R});var p=a(9808),v=a(6115),y=a(3900),o=a(5e3),Z=a(8174),S=a(2313),C=a(8424),g=a(7259),j=a(1819);function w(e,t){1&e&&o._UZ(0,"app-loading")}function T(e,t){if(1&e&&(o.TgZ(0,"li",22)(1,"div",23),o._UZ(2,"i",24),o._uU(3),o.qZA(),o._UZ(4,"i",25),o.qZA()),2&e){const n=t.$implicit;o.xp6(3),o.hij(" ",null==n?null:n.name," ")}}function A(e,t){if(1&e&&(o.ynx(0),o.TgZ(1,"ul",20),o.YNc(2,T,5,1,"li",21),o.qZA(),o.BQk()),2&e){const n=o.oxw();o.xp6(2),o.Q6J("ngForOf",n.lessons)}}const V=function(e){return{background:e}};function F(e,t){if(1&e){const n=o.EpF();o.TgZ(0,"li",31),o.NdJ("click",function(){const d=o.CHM(n).$implicit,s=o.oxw(3);return s.opendvideo=d,s.lessonid=null==d?null:d.id,s.scrll()}),o.TgZ(1,"div",23),o._UZ(2,"i",24),o._uU(3),o.qZA()()}if(2&e){const n=t.$implicit,i=o.oxw(3);o.Q6J("ngStyle",o.VKq(2,V,i.lessonid==(null==n?null:n.id)?"#F7F8F9":"transparent")),o.xp6(3),o.hij(" ",null==n?null:n.name," ")}}function J(e,t){if(1&e&&(o.TgZ(0,"accordion",27)(1,"accordion-group",28)(2,"ul",29),o.YNc(3,F,4,4,"li",30),o.qZA()()()),2&e){const n=t.$implicit,i=o.oxw(2);o.Q6J("isAnimated",!0),o.xp6(1),o.Q6J("isOpen",i.unitid==(null==n?null:n.id))("heading",null==n?null:n.name),o.xp6(2),o.Q6J("ngForOf",null==n?null:n.lessons)}}function Q(e,t){if(1&e&&(o.ynx(0),o.YNc(1,J,4,4,"accordion",26),o.BQk()),2&e){const n=o.oxw();o.xp6(1),o.Q6J("ngForOf",n.units)}}function U(e,t){if(1&e&&(o.TgZ(0,"p",32),o._UZ(1,"i",24),o._uU(2),o.qZA()),2&e){const n=o.oxw();o.xp6(2),o.hij(" ",null==n.opendvideo?null:n.opendvideo.name," ")}}function k(e,t){if(1&e&&o._UZ(0,"iframe",33),2&e){const n=o.oxw();o.Q6J("cachedSrc",(null==n.opendvideo?null:n.opendvideo.video_url)||(null==n.opendvideo?null:n.opendvideo.video_vimeo_url)||(null==n.opendvideo?null:n.opendvideo.video_upload))}}function Y(e,t){if(1&e&&o._UZ(0,"iframe",33),2&e){const n=o.oxw();o.Q6J("cachedSrc",n.savedYoutube(null==n.opendvideo?null:n.opendvideo.video_youtube))}}function O(e,t){1&e&&(o.TgZ(0,"h6"),o._uU(1,"\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062a"),o.qZA())}function N(e,t){if(1&e&&(o.TgZ(0,"li")(1,"a",35),o._UZ(2,"i",36),o._uU(3),o.qZA()()),2&e){const n=t.$implicit;o.xp6(1),o.Q6J("href",null==n?null:n.link,o.LSH),o.xp6(2),o.hij(" ",null==n?null:n.filename," ")}}function B(e,t){if(1&e&&(o.TgZ(0,"ul",29),o.YNc(1,N,4,2,"li",34),o.qZA()),2&e){const n=o.oxw();o.xp6(1),o.Q6J("ngForOf",null==n.opendvideo?null:n.opendvideo.attachment)}}const I=function(e,t){return{"col-lg-8 ":e,"col-lg-12 ":t}},M=function(e,t){return{"fa-chevron-left":e,"fa-chevron-right":t}},L=[{path:"",component:(()=>{class e{constructor(n,i,l,d,s){this.classdetailsService=n,this._sanitizer=i,this.title=l,this.router=d,this.activatedRoute=s,this.loading=!0,this.lessons=[],this.units=[],this.lessonid=-1,this.unitid=-1,this.hdeSidebar=!1}ngOnInit(){this.title.setTitle(" \u062f\u0631\u0627\u0633\u062a\u064a - \u0627\u062f\u0631\u0633 \u0648\u0627\u0646\u062a \u0645\u062a\u0637\u0645\u0646 "),this.activatedRoute.params.pipe((0,y.w)(n=>(this.lessonid=null==n?void 0:n.lessonid,this.unitid=null==n?void 0:n.unitid,this.classdetailsService.getClassDetails(null==n?void 0:n.id)))).subscribe(n=>{var i,l,d,s,u,c;(null===(i=null==n?void 0:n.data)||void 0===i?void 0:i.is_paid)?(this.title.setTitle(null===(l=null==n?void 0:n.data)||void 0===l?void 0:l.name),(null===(d=null==n?void 0:n.data)||void 0===d?void 0:d.has_units)?this.getUnits(null===(s=null==n?void 0:n.data)||void 0===s?void 0:s.id):(null===(u=null==n?void 0:n.data)||void 0===u?void 0:u.has_lessons)&&this.getLessons(null===(c=null==n?void 0:n.data)||void 0===c?void 0:c.id)):this.router.navigate(["/"])})}openAccordion(){var n,i,l;if(-1==this.lessonid&&(null===(n=this.units)||void 0===n?void 0:n.length))return null===(l=null===(i=this.units[0])||void 0===i?void 0:i.lessons[0])||void 0===l?void 0:l.id}savedHtml(n){return this._sanitizer.bypassSecurityTrustHtml(n)}getUnits(n){this.classdetailsService.classUnites(n).subscribe(i=>{var l,d,s,u,c,h,m,_;this.units=null==i?void 0:i.data,-1==this.unitid&&(null===(l=this.units)||void 0===l?void 0:l.length)&&(this.unitid=null===(d=null==i?void 0:i.data[0])||void 0===d?void 0:d.id),-1==this.lessonid&&(null===(s=this.units)||void 0===s?void 0:s.length)?(null===(c=null===(u=null==i?void 0:i.data[0])||void 0===u?void 0:u.lessons)||void 0===c?void 0:c.length)&&(this.opendvideo=null===(h=null==i?void 0:i.data[0])||void 0===h?void 0:h.lessons[0],this.lessonid=null===(_=null===(m=null==i?void 0:i.data[0])||void 0===m?void 0:m.lessons[0])||void 0===_?void 0:_.id):this.units.forEach(r=>{var b;(null===(b=null==r?void 0:r.lessons)||void 0===b?void 0:b.length)&&(null==r||r.lessons.forEach(f=>{(null==f?void 0:f.id)==this.lessonid&&(this.opendvideo=f)}))}),this.loading=!1})}getLessons(n){this.classdetailsService.classLessons(n).subscribe(i=>{this.lessons=null==i?void 0:i.data,this.loading=!1})}savedYoutube(n){if(n)return`https://www.youtube.com/embed/${n.slice(n.indexOf("v=")+2,n.lastIndexOf("&"))}`}scrll(){window.scroll(0,0)}}return e.\u0275fac=function(n){return new(n||e)(o.Y36(Z._),o.Y36(S.H7),o.Y36(S.Dx),o.Y36(v.F0),o.Y36(v.gz))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-subject-videos"]],decls:28,vars:18,consts:[[1,"class-details",2,"min-height","100vh"],[4,"ngIf"],[1,"container-fluid",3,"hidden"],[1,"row"],[1,"col-lg-4","mb-2","order-2","order-lg-1",3,"hidden"],[1,"pb-2"],[1,"p-3","rounded","m-0",2,"background","#f1f6f8","text-align","center","border","1px solid #e0e9ec"],[1,"fa-solid","fa-book-open","text-primary"],[1,"resp"],[1,"mb-2","order-1","order-lg-2",3,"ngClass"],[1,"px-3","d-flex","flex-column","flex-md-row","justify-content-between","align-items-center",2,"background","#1B52D8"],[1,"m-0","p-3","d-none","d-lg-inline-block",2,"background-color","#1B52A9","font-size","20px","cursor","pointer",3,"click"],[1,"fa-solid","text-white",3,"ngClass"],[1,"mx-2","d-none","d-lg-inline-block"],["routerLink","/",1,"text-white","py-2","p-lg-0","d-inline-block"],[1,"fa-solid","fa-house"],["class","p-3 text-center text-white rounded m-0",4,"ngIf"],[1,"px-3"],["allow","encrypted-media","allowFullScreen","true","class","w-100","style","height:70vh",3,"cachedSrc",4,"ngIf"],["class","p-0 list-unstyled",4,"ngIf"],[1,"p-0","list-unstyled","card","cstm"],["class","d-flex justify-content-between align-items-center","style","border-top:1px solid #C2BEC9",4,"ngFor","ngForOf"],[1,"d-flex","justify-content-between","align-items-center",2,"border-top","1px solid #C2BEC9"],[1,"w-57"],[1,"fa-solid","fa-book"],[1,"fa-solid","fa-lock"],["class","mb-2",3,"isAnimated",4,"ngFor","ngForOf"],[1,"mb-2",3,"isAnimated"],[3,"isOpen","heading"],[1,"p-0","list-unstyled"],["class","py-3","style","border-top:1px solid #C2BEC9;cursor: pointer;",3,"ngStyle","click",4,"ngFor","ngForOf"],[1,"py-3",2,"border-top","1px solid #C2BEC9","cursor","pointer",3,"ngStyle","click"],[1,"p-3","text-center","text-white","rounded","m-0"],["allow","encrypted-media","allowFullScreen","true",1,"w-100",2,"height","70vh",3,"cachedSrc"],[4,"ngFor","ngForOf"],["target","_blank",1,"attachLinks",3,"href"],[1,"fa-solid","fa-file"]],template:function(n,i){1&n&&(o.TgZ(0,"section",0),o.YNc(1,w,1,0,"app-loading",1),o.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"p",6),o._UZ(7,"i",7),o._uU(8," \u0627\u0644\u0645\u0646\u0647\u062c "),o.qZA(),o.TgZ(9,"div",8),o.YNc(10,A,3,1,"ng-container",1),o.YNc(11,Q,2,1,"ng-container",1),o.qZA()()(),o.TgZ(12,"div",9)(13,"div")(14,"div",10)(15,"div")(16,"p",11),o.NdJ("click",function(){return i.hdeSidebar=!i.hdeSidebar}),o._UZ(17,"i",12),o.qZA(),o._UZ(18,"span",13),o.TgZ(19,"a",14),o._UZ(20,"i",15),o._uU(21," \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629 "),o.qZA()(),o.YNc(22,U,3,1,"p",16),o._UZ(23,"div",17),o.qZA(),o.YNc(24,k,1,1,"iframe",18),o.YNc(25,Y,1,1,"iframe",18),o.YNc(26,O,2,0,"h6",1),o.YNc(27,B,2,1,"ul",19),o.qZA()()()()()),2&n&&(o.xp6(1),o.Q6J("ngIf",i.loading),o.xp6(1),o.Q6J("hidden",i.loading),o.xp6(2),o.Q6J("hidden",i.hdeSidebar),o.xp6(6),o.Q6J("ngIf",null==i.lessons?null:i.lessons.length),o.xp6(1),o.Q6J("ngIf",null==i.units?null:i.units.length),o.xp6(1),o.Q6J("ngClass",o.WLB(12,I,!i.hdeSidebar,i.hdeSidebar)),o.xp6(5),o.Q6J("ngClass",o.WLB(15,M,!i.hdeSidebar,i.hdeSidebar)),o.xp6(5),o.Q6J("ngIf",null==i.opendvideo?null:i.opendvideo.name),o.xp6(2),o.Q6J("ngIf","videocipher"==(null==i.opendvideo?null:i.opendvideo.video_type)||"vimeo"==(null==i.opendvideo?null:i.opendvideo.video_type)||"upload"==(null==i.opendvideo?null:i.opendvideo.video_type)),o.xp6(1),o.Q6J("ngIf","youtube"==(null==i.opendvideo?null:i.opendvideo.video_type)),o.xp6(1),o.Q6J("ngIf",null==i.opendvideo||null==i.opendvideo.attachment?null:i.opendvideo.attachment.length),o.xp6(1),o.Q6J("ngIf",null==i.opendvideo||null==i.opendvideo.attachment?null:i.opendvideo.attachment.length))},directives:[p.O5,C.N,p.sg,g.Zf,g.U_,p.PC,p.mk,v.yS,j.s],styles:['.mat-radio-group:not(:last-of-type) .border-btm{padding-bottom:15px;border-bottom:1px solid #d4d1d1;margin-bottom:15px}  .accordion-toggle{padding:5px}  .accordion-toggle[aria-expanded=true]:after{font-family:"Font Awesome 5 Free";content:"\\f077";display:inline-block;padding-right:3px;vertical-align:middle;font-weight:900;position:absolute;color:#3052d8;left:20px;top:20px}  .card{padding:10px 0}  .card li{padding:20px 20px 0}  .card li i{color:#c2bec9}  .card li:not(:last-of-type){padding-bottom:20px}  .card.cstm li:last-of-type{padding-bottom:20px}  .card-header{border-bottom:none;background-color:transparent;padding:0}  .card-body{padding:0}  .accordion-toggle[aria-expanded=false]:after{font-family:"Font Awesome 5 Free";content:"\\f078";color:#3052d8;display:inline-block;padding-right:3px;vertical-align:middle;font-weight:900;position:absolute;left:20px;top:20px}  .btn-link{font-weight:500;color:#3052d8;text-decoration:none}  .btn.focus,   .btn:focus{box-shadow:none}  .btn-link:hover{color:#3052d8;text-decoration:none}.resp[_ngcontent-%COMP%]{height:100vh;overflow:auto}@media only screen and (max-width: 992px){.resp[_ngcontent-%COMP%]{height:auto}}']}),e})()}];let z=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[v.Bz.forChild(L)],v.Bz]}),e})();var E=a(4466);let R=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[p.ez,z,E.m,g.fx.forRoot()]]}),e})()}}]);