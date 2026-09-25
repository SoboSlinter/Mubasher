/* =========================================================
   مباشر (Mubasher) — ملف الجافاسكريبت الموحّد لكل صفحات المشروع
   يشمل: دعم اللغتين العربية والإنجليزية، حالة الدخول بالهيدر،
   تسجيل الدخول والخروج، إنشاء حساب، نسيت كلمة المرور (رمز مؤقت
   لمرة واحدة)، وصفحة إضافة إعلان.

   ملاحظة: هذا موقع تجريبي بدون خادم فعلي، لذلك يتم تخزين
   الحسابات وحالة الدخول وتفضيل اللغة داخل localStorage الخاص
   بالمتصفح، وكلمة المرور المؤقتة تُعرض على الشاشة بدلاً من
   إرسالها فعليًا عبر بريد إلكتروني أو رسالة نصية.
   ========================================================= */

(function () {
  "use strict";

  var USERS_KEY = "eqari_users";
  var SESSION_KEY = "eqari_session";
  var LANG_KEY = "eqari_lang";

  var currentLang = localStorage.getItem(LANG_KEY) || "ar";
  var profileModalOpenFn = null;

  var I18N = {
    ar: {
    "brand.name": "مباشر",
    "meta.home.title": "مباشر | عقارات وسيارات للبيع والإيجار",
    "meta.login.title": "تسجيل الدخول | مباشر",
    "meta.signup.title": "إنشاء حساب | مباشر",
    "meta.listing.title": "أضف إعلانك | مباشر",
    "meta.privacy.title": "سياسة الخصوصية | مباشر",
    "meta.terms.title": "الشروط والأحكام | مباشر",
    "nav.realestate": "عقارات",
    "nav.cars": "سيارات",
    "nav.addListing": "أضف إعلانك",
    "nav.about": "من نحن",
    "auth.login": "تسجيل الدخول",
    "auth.logout": "تسجيل الخروج",
    "auth.signup": "إنشاء حساب",
    "auth.backHome": "← العودة إلى الرئيسية",
    "auth.backHomeShort": "العودة إلى الرئيسية",
    "auth.loginTitle": "تسجيل الدخول",
    "auth.loginSub": "أدخل بياناتك للوصول إلى حسابك",
    "auth.remember": "تذكرني",
    "auth.forgot": "نسيت كلمة المرور؟",
    "auth.loginBtn": "دخول",
    "auth.or": "أو",
    "auth.noAccount": "ليس لديك حساب؟",
    "auth.createOne": "إنشاء حساب جديد",
    "auth.hasAccount": "لديك حساب بالفعل؟",
    "auth.visualLogin": "سجّل الدخول لمتابعة إعلاناتك المحفوظة، والتواصل مع البائعين، ونشر إعلاناتك الخاصة.",
    "auth.signupTitle": "إنشاء حساب جديد",
    "auth.signupSub": "املأ بياناتك للبدء في استخدام المنصة",
    "auth.signupBtn": "إنشاء الحساب",
    "auth.agreeTo": "أوافق على",
    "auth.and": "و",
    "plan.title": "اختر خطة الاشتراك",
    "plan.intro": "اشتراك شهري لنشر إعلاناتك على المنصة، بإمكانك الدفع شهريًا أو الدفع سنويًا بخصم.",
    "plan.currency": "ج.س",
    "plan.perMonth": "شهريًا",
    "plan.perYear": "سنويًا",
    "plan.monthly.name": "شهري",
    "plan.yearly.name": "سنوي",
    "plan.yearly.badge": "خصم 17%",
    "plan.yearly.savings": "توفّر 41٬000 ج.س سنويًا مقارنة بالدفع الشهري",
    "plan.yearly.compareNote": "بدلاً من 240٬000 ج.س عند الدفع شهريًا (20٬000 × 12 شهرًا)",
    "auth.visualSignupTitle": "انضم إلى آلاف المستخدمين الذين يبيعون ويشترون بثقة",
    "auth.visualSignupSub": "أنشئ حسابك لتتمكن من حفظ الإعلانات، ونشر عقاراتك وسياراتك، والتواصل المباشر مع المهتمين.",
    "auth.fixErrors": "الرجاء تصحيح البيانات المُعلّمة أدناه قبل المتابعة.",
    "auth.agreeTermsRequired": "الرجاء الموافقة على الشروط والأحكام للمتابعة.",
    "auth.emailExists": "يوجد حساب مسجّل بهذا البريد الإلكتروني مسبقًا.",
    "auth.creatingAccount": "جارٍ إنشاء الحساب...",
    "auth.signupSuccess": "تم إنشاء الحساب بنجاح، جارٍ تحويلك...",
    "auth.enterValidData": "الرجاء إدخال بيانات صحيحة.",
    "auth.wrongCredentials": "البريد الإلكتروني أو كلمة المرور غير صحيحة، الرجاء إدخال بيانات صحيحة.",
    "auth.loggingIn": "جارٍ الدخول...",
    "auth.loginSuccess": "تم تسجيل الدخول بنجاح، جارٍ تحويلك...",
    "auth.accountDisabled": "تم تعطيل هذا الحساب من قبل إدارة المنصة. يرجى التواصل مع الدعم الفني.",
    "field.email": "البريد الإلكتروني",
    "field.password": "كلمة المرور",
    "field.confirmPassword": "تأكيد كلمة المرور",
    "field.fullName": "الاسم الكامل",
    "field.phone": "رقم الجوال",
    "field.choose": "اختر...",
    "error.email": "الرجاء إدخال بريد إلكتروني صحيح",
    "error.password": "كلمة المرور يجب ألا تقل عن 6 أحرف",
    "error.confirmPassword": "كلمتا المرور غير متطابقتين",
    "error.fullName": "الرجاء إدخال الاسم الكامل",
    "error.phone": "الرجاء إدخال رقم جوال صحيح (10 أرقام)",
    "field.birthdate": "تاريخ الميلاد",
    "error.birthdate": "الرجاء إدخال تاريخ ميلاد صحيح",
    "auth.ageRequirement": "يجب أن يكون عمرك 18 عامًا أو أكثر للتسجيل في المنصة",
    "auth.ageRequirementHint": "يجب أن يكون عمرك 18 عامًا أو أكثر لإنشاء حساب.",
    "field.profilePhoto": "الصورة الشخصية (اختياري)",
    "field.profilePhotoHint": "يمكنك إضافة صورة شخصية تظهر بجانب اسم المنصة بعد تسجيل الدخول.",
    "field.profilePhotoRequired": "الصورة الشخصية",
    "field.profilePhotoHintRequired": "يجب إضافة صورة شخصية، وستظهر بجانب اسم المنصة بعد تسجيل الدخول.",
    "error.profilePhoto": "الرجاء إرفاق صورة شخصية",

    "field.identityVerificationTitle": "التحقق من الهوية",
    "field.identityVerificationIntro": "هذه البيانات مطلوبة لمراجعة طلبك من قبل الإدارة قبل تفعيل حسابك، ويتم استخدامها للأغراض القانونية فقط.",
    "field.nationalId": "الرقم الوطني",
    "error.nationalId": "الرجاء إدخال الرقم الوطني",
    "field.idPhoto": "صورة الهوية",
    "error.idPhoto": "الرجاء التقاط أو إرفاق صورة للهوية",
    "field.idPhotoHint": "التقط صورة واضحة لهويتك الوطنية أو ارفقها من جهازك. تُستخدم هذه الصورة فقط للتحقق من هويتك من قبل الإدارة.",

    "auth.pendingReviewMessage": "تم إرسال طلبك بنجاح، وحسابك الآن بانتظار مراجعة الإدارة. سيتم إشعارك عند الموافقة عليه.",
    "auth.accountPendingReview": "حسابك قيد المراجعة الإدارية، سيتم إشعارك عند الموافقة عليه.",
    "auth.accountRejected": "تم رفض طلب تسجيلك.",

    "nav.subscription": "اشتراكي",
    "meta.subscription.title": "اشتراكي | مباشر",
    "subscription.heading": "اشتراكي",
    "subscription.sub": "تابع حالة حسابك واشتراكك، وأكمل الدفع لتفعيل النشر على المنصة.",
    "subscription.loginNotice": "يجب تسجيل الدخول لعرض بيانات اشتراكك.",
    "subscription.paymentTitle": "إكمال الدفع لتفعيل الاشتراك",
    "subscription.method.bankak": "بنكك (بنك الخرطوم)",
    "subscription.method.ewallet": "محفظة إلكترونية",
    "subscription.method.card": "Visa / Mastercard",
    "subscription.method.banktransfer": "تحويل بنكي",
    "subscription.method.gateway": "بوابة دفع إلكترونية",
    "subscription.payNowBtn": "ادفع الآن",
    "subscription.paymentSimNote": "بيئة تجريبية: لا يتم تحصيل أي مبلغ فعلي، ويُستخدم هذا النموذج لمحاكاة عملية الدفع فقط.",
    "subscription.processing": "جارٍ معالجة الدفع...",
    "subscription.paymentSuccess": "تم الدفع بنجاح، تم تفعيل اشتراكك.",
    "subscription.trialDaysLeft": "متبقٍ {days} يوم من فترتك التجريبية المجانية (تنتهي في {date}).",
    "subscription.rejectedReason": "تم رفض طلب تسجيلك.",
    "subscription.activeSince": "اشتراكك نشط منذ",
    "subscription.selectedPlan": "الخطة المختارة:",
    "subscription.stageDetail.pending_review": "حسابك بانتظار مراجعة الإدارة للرقم الوطني وصورة الهوية. لا يمكنك نشر إعلانات حتى تتم الموافقة.",
    "subscription.stageDetail.rejected": "تم رفض طلب تسجيلك، يرجى التواصل مع الدعم الفني لمزيد من التفاصيل.",
    "subscription.stageDetail.trial": "أنت الآن ضمن الفترة التجريبية المجانية، ويمكنك نشر الإعلانات بحرية.",
    "subscription.stageDetail.active": "اشتراكك نشط، ويمكنك نشر الإعلانات بحرية.",
    "subscription.stageDetail.expired": "انتهت فترتك التجريبية ولم يتم تفعيل الاشتراك بعد. أكمل الدفع لمتابعة نشر الإعلانات.",
    "subscription.goToSubscriptionBtn": "إدارة الاشتراك",

    "admin.users.col.accountStage": "مرحلة الاشتراك",
    "admin.accountStage.pending_review": "بانتظار المراجعة",
    "admin.accountStage.rejected": "مرفوض",
    "admin.accountStage.trial": "تجربة مجانية",
    "admin.accountStage.active": "نشط",
    "admin.accountStage.expired": "منتهي",

    "admin.pendingReview.heading": "طلبات التسجيل بانتظار المراجعة",
    "admin.pendingReview.note": "راجع الرقم الوطني وصورة الهوية قبل الموافقة على الحساب. عند الموافقة تبدأ فترة تجربة مجانية مدتها 7 أيام تلقائيًا.",
    "admin.pendingReview.col.name": "الاسم",
    "admin.pendingReview.col.email": "البريد",
    "admin.pendingReview.col.nationalId": "الرقم الوطني",
    "admin.pendingReview.col.idPhoto": "صورة الهوية",
    "admin.pendingReview.col.plan": "الخطة المطلوبة",
    "admin.pendingReview.col.actions": "إجراءات",
    "admin.pendingReview.approveBtn": "موافقة",
    "admin.pendingReview.rejectBtn": "رفض",
    "admin.pendingReview.rejectReasonPrompt": "سبب الرفض (اختياري):",
    "admin.pendingReview.empty": "لا توجد طلبات تسجيل بانتظار المراجعة حاليًا.",

    "admin.auditAction.account_submitted_for_review": "إرسال طلب تسجيل للمراجعة",
    "admin.auditAction.user_approved": "الموافقة على حساب مستخدم",
    "admin.auditAction.user_rejected": "رفض طلب تسجيل مستخدم",
    "admin.auditAction.subscription_activated": "تفعيل الاشتراك بعد الدفع",
    "admin.auditAction.login_blocked_pending_review": "محاولة دخول لحساب بانتظار المراجعة",
    "admin.auditAction.login_blocked_rejected": "محاولة دخول لحساب مرفوض",

    "terms.s10.heading": "التحقق من الهوية ومراجعة الحسابات",
    "terms.s10.body": "عند إنشاء الحساب، يُطلب منك إدخال رقمك الوطني وإرفاق صورة لهويتك للتحقق من صحة بياناتك. يبقى الحساب معلّقًا حتى تتم مراجعته والموافقة عليه من قبل إدارة المنصة، ويحق للإدارة رفض أي طلب تسجيل لا تكتمل بياناته أو تبدو غير صحيحة.",
    "terms.s11.heading": "الاشتراك والفترة التجريبية والدفع",
    "terms.s11.body": "بعد الموافقة على بياناتك، تُمنح فترة تجربة مجانية مدتها 7 أيام لاستخدام المنصة. لاستمرار الاشتراك بعد انتهاء الفترة التجريبية، يجب إكمال عملية الدفع عبر إحدى وسائل الدفع المتاحة على المنصة، وتصبح حالة الاشتراك \"نشط\" تلقائيًا بعد نجاح عملية الدفع.",

    "privacy.s10.heading": "الرقم الوطني وصورة الهوية",
    "privacy.s10.body": "يُستخدم الرقم الوطني وصورة الهوية التي تقدّمها عند التسجيل حصريًا للتحقق من صحة بياناتك ومراجعتها من قبل إدارة المنصة، ولأغراض قانونية فقط. لا تتم مشاركة هذه البيانات مع أي طرف خارجي، ولا تُستخدم لأي غرض تسويقي.",

    "profile.title": "الملف الشخصي",
    "profile.changePhotoBtn": "تغيير الصورة",
    "profile.addressLabel": "العنوان",
    "profile.addressPlaceholder": "أدخل عنوانك",
    "profile.saveAddressBtn": "حفظ العنوان",
    "profile.changePasswordTitle": "تغيير كلمة المرور",
    "profile.currentPasswordLabel": "كلمة المرور الحالية",
    "profile.newPasswordLabel": "كلمة المرور الجديدة",
    "profile.confirmNewPasswordLabel": "تأكيد كلمة المرور الجديدة",
    "profile.savePasswordBtn": "تحديث كلمة المرور",
    "profile.currentPasswordError": "كلمة المرور الحالية غير صحيحة",
    "profile.addressSaved": "تم حفظ العنوان بنجاح",
    "profile.passwordSaved": "تم تحديث كلمة المرور بنجاح",
    "profile.photoSaved": "تم تحديث الصورة الشخصية",
    "profile.fixPasswordErrors": "الرجاء تصحيح بيانات كلمة المرور أعلاه",
    "forgot.title": "نسيت كلمة المرور؟",
    "forgot.step1Sub": "أدخل بريدك الإلكتروني أو رقم جوالك المسجّل بحسابك",
    "forgot.identifierLabel": "البريد الإلكتروني أو رقم الجوال",
    "forgot.identifierError": "لا يوجد حساب مرتبط بهذه البيانات",
    "forgot.sendBtn": "إرسال كلمة مرور مؤقتة",
    "forgot.step2Title": "تحقق من كلمة المرور المؤقتة",
    "forgot.sentTo": "أرسلنا كلمة مرور مؤقتة إلى",
    "forgot.demoNote": "بيئة تجريبية: كلمة المرور المؤقتة معروضة هنا بدلاً من إرسالها فعليًا عبر البريد أو الرسائل.",
    "forgot.otpLabel": "أدخل كلمة المرور المؤقتة",
    "forgot.otpError": "كلمة المرور المؤقتة غير صحيحة",
    "forgot.verifyBtn": "تحقق",
    "forgot.step3Title": "تعيين كلمة مرور جديدة",
    "forgot.step3Sub": "كلمة المرور المؤقتة صالحة لاستخدام واحد فقط. عيّن كلمة مرور جديدة لحسابك",
    "forgot.newPassword": "كلمة المرور الجديدة",
    "forgot.resetBtn": "تعيين كلمة المرور والدخول",
    "hero.eyebrow": "منصة موثوقة للبيع والشراء",
    "hero.title": "منزلك القادم، أو سيارتك التالية، في مكان واحد",
    "hero.subtitle": "آلاف الإعلانات المُحقّقة للعقارات والسيارات والأراضي، من أصحابها مباشرة أو عبر وسطاء معتمدين.",
    "search.tab.realestate": "عقارات",
    "search.tab.land": "أراضي",
    "search.tab.cars": "سيارات",
    "search.tab.moto": "دراجات نارية",
    "search.city.label": "المدينة",
    "search.offerType.label": "نوع العرض",
    "search.budget.label": "الميزانية",
    "search.cta": "ابحث الآن",
    "city.khartoum": "الخرطوم",
    "city.omdurman": "أم درمان",
    "city.bahri": "بحري",
    "city.madani": "مدني",
    "city.portsudan": "بورتسودان",
    "city.kassala": "كسلا",
    "city.elobeid": "الأبيض",
    "city.nyala": "نيالا",
    "city.elfasher": "الفاشر",
    "city.elgeneina": "الجنينة",
    "city.kosti": "كوستي",
    "city.sennar": "سنار",
    "city.eddamazin": "الدمازين",
    "city.atbara": "عطبرة",
    "city.dongola": "دنقلا",
    "city.gadarif": "القضارف",
    "city.shendi": "شندي",
    "city.kadugli": "كادقلي",
    "city.zalingei": "زالنجي",
    "city.eddamer": "الدامر",
    "offer.sale": "للبيع",
    "offer.rent": "للإيجار",
    "budget.low": "أقل من 500 ألف",
    "budget.mid": "500 ألف - مليون",
    "budget.high": "أكثر من مليون",
    "cat.apartments.title": "شقق وفلل",
    "cat.apartments.count": "3٬240 إعلان",
    "cat.land.title": "أراضي",
    "cat.land.count": "1٬180 إعلان",
    "cat.cars.title": "سيارات",
    "cat.cars.count": "2٬560 إعلان",
    "cat.commercial.title": "عقارات تجارية",
    "cat.commercial.count": "640 إعلان",
    "cat.moto.title": "دراجات نارية",
    "cat.moto.count": "310 إعلان",
    "realestate.heading": "أحدث العقارات",
    "realestate.sub": "فلل وشقق وأراضي مختارة بعناية هذا الأسبوع",
    "realestate.seeAll": "عرض جميع العقارات",
    "listing1.price": "1٬250٬000 ج.س",
    "listing1.title": "فيلا دوبلكس راقية بحي الياسمين",
    "listing1.loc": "الخرطوم — حي الرياض",
    "listing2.price": "4٬500 ج.س / شهرياً",
    "listing2.title": "شقة مفروشة بإطلالة على النيل",
    "listing2.loc": "أم درمان — الثورة",
    "listing3.price": "680٬000 ج.س",
    "listing3.title": "قطعة أرض سكنية مخططة",
    "listing3.loc": "بحري — الكدرو",
    "spec.rooms": "غرف",
    "spec.baths": "حمامات",
    "spec.sqm": "م²",
    "spec.corner": "زاوية",
    "spec.eTitle": "صك إلكتروني",
    "cars.heading": "أحدث السيارات",
    "cars.sub": "سيارات مفحوصة وموثقة من أصحابها",
    "cars.seeAll": "عرض جميع السيارات",
    "listing4.price": "96٬000 ج.س",
    "listing4.title": "تويوتا لاندكروزر GXR 2023",
    "listing4.loc": "الخرطوم",
    "listing5.price": "61٬500 ج.س",
    "listing5.title": "هيونداي سوناتا 2022 فل كامل",
    "listing5.loc": "أم درمان",
    "listing6.price": "142٬000 ج.س",
    "listing6.title": "مرسيدس C200 موديل 2024",
    "listing6.loc": "بحري",
    "spec.thousandKm": "ألف كم",
    "spec.automatic": "أوتوماتيك",
    "spec.petrol": "بنزين",
    "spec.dealerWarranty": "ضمان الوكالة",
    "promo.heading": "عندك عقار أو سيارة تبيعها؟",
    "promo.sub": "انشر إعلانك مجاناً ويصل لآلاف المهتمين الجادين خلال دقائق.",
    "promo.point1": "نشر الإعلان خلال دقائق بدون تعقيد",
    "promo.point2": "توثيق الإعلانات لحماية البائع والمشتري",
    "promo.point3": "تواصل مباشر مع المهتمين عبر المنصة",
    "promo.cta": "أضف إعلانك الآن",
    "footer.about": "منصة سودانية لعرض وبيع وشراء العقارات والأراضي والسيارات والدراجات النارية مباشرة بين الأفراد والوسطاء.",
    "footer.sections.heading": "الأقسام",
    "footer.sections.saleRealestate": "عقارات للبيع",
    "footer.sections.rentRealestate": "عقارات للإيجار",
    "footer.sections.land": "أراضي",
    "footer.sections.cars": "سيارات",
    "footer.sections.moto": "دراجات نارية",
    "footer.company.heading": "الشركة",
    "footer.company.about": "من نحن",
    "footer.company.contact": "تواصل معنا",
    "footer.company.faq": "الأسئلة الشائعة",
    "footer.contact.heading": "تواصل",
    "footer.contact.support": "الدعم الفني",
    "footer.contact.terms": "الشروط والأحكام",
    "footer.contact.privacy": "سياسة الخصوصية",
    "footer.copyright": "© 2026 مباشر. جميع الحقوق محفوظة.",
    "listingPage.heading": "أضف إعلانك",
    "listingPage.sub": "اختر نوع ما تعرضه، وأدخل التفاصيل. جميع الأسعار بالجنيه السوداني.",
    "listingPage.categoryTitle": "نوع الإعلان",
    "listingPage.cat.land": "قطعة أرض",
    "listingPage.cat.residential": "عقار سكني",
    "listingPage.cat.commercial": "عقار تجاري",
    "listingPage.cat.car": "سيارة",
    "listingPage.cat.motorcycle": "دراجة نارية",
    "listingPage.categoryError": "الرجاء اختيار نوع الإعلان",
    "listingPage.detailsTitle": "بيانات الإعلان",
    "listingPage.offerTypeError": "الرجاء اختيار نوع العرض",
    "listingPage.priceLabel": "السعر (بالجنيه السوداني)",
    "listingPage.priceError": "الرجاء إدخال سعر صحيح",
    "listingPage.cityChoose": "اختر المدينة...",
    "listingPage.cityError": "الرجاء اختيار المدينة",
    "listingPage.landDetails": "تفاصيل الأرض",
    "listingPage.areaLabel": "المساحة (م²)",
    "listingPage.areaError": "الرجاء إدخال المساحة",
    "listingPage.landTypeLabel": "نوع الأرض",
    "listingPage.landTypeError": "الرجاء اختيار نوع الأرض",
    "listingPage.addressLabel": "العنوان",
    "listingPage.addressPlaceholder": "الحي، الشارع، أقرب علامة مميزة",
    "listingPage.addressError": "الرجاء إدخال العنوان",
    "listingPage.landNumberLabel": "رقم قطعة الأرض",
    "listingPage.landNumberError": "الرجاء إدخال رقم قطعة الأرض",
    "listingPage.landNumberDuplicate": "هذه الأرض تم نشر إعلان لها من قبل بنفس الرقم، لا يمكن نشر إعلان مكرر لنفس القطعة.",
    "listingPage.propertyNumberLabel": "رقم العقار",
    "listingPage.propertyNumberError": "الرجاء إدخال رقم العقار",
    "listingPage.propertyNumberDuplicate": "هذا العقار تم نشر إعلان له من قبل بنفس الرقم، لا يمكن نشر إعلان مكرر لنفس العقار.",
    "listingPage.carRegistrationLabel": "رقم استمارة السيارة",
    "listingPage.carRegistrationError": "الرجاء إدخال رقم استمارة السيارة",
    "listingPage.carRegistrationDuplicate": "تم نشر إعلان لهذه السيارة من قبل بنفس رقم الاستمارة، لا يمكن نشر إعلان مكرر لنفس السيارة.",
    "listingPage.internalOnlyHintProperty": "لن يظهر هذا الرقم للعملاء، ويُستخدم داخليًا فقط لمنع تكرار نشر نفس العقار أو قطعة الأرض أكثر من مرة.",
    "listingPage.internalOnlyHintCar": "لن يظهر هذا الرقم للعملاء، ويُستخدم داخليًا فقط لمنع تكرار نشر نفس السيارة أكثر من مرة.",
    "landType.residential": "سكنية",
    "landType.commercial": "تجارية",
    "landType.agricultural": "زراعية",
    "listingPage.resDetails": "تفاصيل العقار السكني",
    "listingPage.roomsLabel": "عدد الغرف",
    "listingPage.roomsError": "الرجاء إدخال عدد الغرف",
    "listingPage.bathsLabel": "عدد الحمامات",
    "listingPage.bathsError": "الرجاء إدخال عدد الحمامات",
    "listingPage.comDetails": "تفاصيل العقار التجاري",
    "listingPage.comTypeLabel": "نوع الاستخدام",
    "listingPage.comTypeError": "الرجاء اختيار نوع الاستخدام",
    "comType.shop": "محل تجاري",
    "comType.office": "مكتب",
    "comType.warehouse": "مستودع",
    "comType.mall": "مجمع تجاري",
    "listingPage.carDetails": "تفاصيل السيارة",
    "listingPage.motoDetails": "تفاصيل الدراجة النارية",
    "listingPage.brandLabel": "شركة التصنيع",
    "listingPage.brandChoose": "اختر الشركة...",
    "listingPage.brandError": "الرجاء اختيار شركة التصنيع",
    "listingPage.modelLabel": "الموديل",
    "listingPage.modelChooseBrandFirst": "اختر الشركة أولاً",
    "listingPage.modelChoose": "اختر الموديل...",
    "listingPage.modelError": "الرجاء اختيار الموديل",
    "listingPage.yearLabel": "سنة الصنع",
    "listingPage.yearChoose": "اختر السنة...",
    "listingPage.yearError": "الرجاء اختيار سنة الصنع",
    "listingPage.descTitle": "وصف الإعلان",
    "listingPage.descLabel": "وصف إضافي (اختياري)",
    "listingPage.descPlaceholder": "أضف أي تفاصيل إضافية تساعد المهتمين، مثل الحالة، الإضافات، أو سبب البيع...",
    "listingPage.descHint": "للسيارات والدراجات: اذكر حالة الفحص، المسافة المقطوعة، أو أي تعديلات.",
    "listingPage.photosTitle": "الصور",
    "listingPage.photosLabel": "إرفاق صور (اختياري)",
    "listingPage.photosHint": "يمكنك إرفاق أكثر من صورة لإعلانك. هذه الخطوة اختيارية.",
    "listingPage.publishBtn": "نشر الإعلان",
    "listingPage.fixErrors": "الرجاء تصحيح البيانات المُعلّمة أعلاه قبل نشر الإعلان.",
    "listingPage.publishing": "جارٍ النشر...",
    "listingPage.success": "تم نشر إعلانك بنجاح، جارٍ تحويلك للصفحة الرئيسية...",
    "listingPage.odometerLabel": "عداد الكيلومترات (كم)",
    "listingPage.odometerError": "الرجاء إدخال قراءة عداد الكيلومترات",
    "listingPage.photosLabelRequired": "إرفاق صور",
    "listingPage.photosError": "الرجاء إرفاق صورة واحدة على الأقل",
    "listingPage.photosHintRequired": "يجب إرفاق صورة واحدة على الأقل لنشر الإعلان.",
    "listingPage.authRequired": "يجب تسجيل الدخول لنشر إعلان على المنصة.",
    "listingPage.noDescription": "لم يقم صاحب الإعلان بإضافة وصف إضافي.",
    "listingPage.ownAdNote": "هذا إعلانك الخاص. يمكنك متابعة الرسائل الواردة بخصوصه من صفحة رسائلي.",
    "listingPage.loginToMessagePrompt": "يجب تسجيل الدخول للتواصل مع صاحب الإعلان.",
    "listingPage.messagePlaceholder": "اكتب رسالتك لصاحب الإعلان هنا...",
    "listingPage.sendMessageBtn": "إرسال الرسالة",
    "listingPage.viewMessagesLink": "عرض رسائلي",
    "listingPage.detailBack": "← رجوع لكل الإعلانات",
    "listingPage.notFoundTitle": "الإعلان غير موجود",
    "listingPage.notFoundBody": "قد يكون هذا الإعلان قد حُذف أو أن الرابط غير صحيح.",
    "listingPage.galleryNoPhotos": "لا توجد صور مرفقة لهذا الإعلان",
    "listingPage.hiddenByAdminNotice": "تم إخفاء هذا الإعلان من قبل إدارة المنصة، ولا يظهر للمستخدمين الآخرين.",
    "listingPage.reportLink": "الإبلاغ عن هذا الإعلان",
    "listingPage.reportReasonLabel": "سبب الإبلاغ",
    "listingPage.reportReason.misleading": "معلومات مضللة",
    "listingPage.reportReason.duplicate": "إعلان مكرر",
    "listingPage.reportReason.soldElsewhere": "تم البيع في مكان آخر",
    "listingPage.reportReason.inappropriate": "محتوى غير لائق",
    "listingPage.reportReason.other": "أخرى",
    "listingPage.reportDetailsLabel": "تفاصيل إضافية (اختياري)",
    "listingPage.reportSubmitBtn": "إرسال البلاغ",
    "listingPage.reportSubmitted": "تم إرسال البلاغ، شكرًا لك",
    "adminRole.super_admin": "مدير عام (Super Admin)",
    "adminRole.admin": "مدير (Admin)",
    "adminRole.moderator": "مشرف مراجعة (Moderator)",
    "adminRole.support": "دعم فني (Support)",
    "adminRole.finance_admin": "مدير مالي (Finance Admin)",
    "adminRole.content_admin": "مدير محتوى (Content Admin)",

    "meta.admin.title": "لوحة تحكم الإدارة | مباشر",
    "admin.badge": "الإدارة",
    "admin.loginRequired": "يجب تسجيل الدخول للوصول إلى لوحة تحكم الإدارة.",
    "admin.accessDenied": "حسابك لا يملك صلاحية الوصول إلى لوحة تحكم الإدارة.",
    "admin.bootstrapNote": "لا يوجد بعد أي حساب \"مدير عام\" على المنصة. بصفتك أول مستخدم يفتح هذه الصفحة، يمكنك تفعيل صلاحية المدير العام لحسابك الحالي.",
    "admin.claimSuperAdminBtn": "تفعيل صلاحية المدير العام لحسابي",
    "admin.twoFactorPrompt": "هذا الحساب مفعّل عليه التحقق بخطوتين. أدخل الرمز المؤقت المعروض أدناه لإثبات الهوية (بيئة تجريبية: يظهر الرمز هنا بدلاً من إرساله فعليًا).",
    "admin.registerNewAdminBtn": "تسجيل مدير جديد",
    "admin.registerNewAdmin.heading": "تسجيل مدير جديد",
    "admin.registerNewAdmin.note": "هذه العملية متاحة فقط للمدير العام (Super Admin). أدخل بيانات المدير العام أدناه لتفويض العملية، ثم بيانات المدير الجديد ونوع صلاحياته.",
    "admin.registerNewAdmin.authorizerTitle": "بيانات المدير العام (للتفويض)",
    "admin.registerNewAdmin.authorizerError": "بيانات المدير العام غير صحيحة، أو الحساب لا يملك صلاحية المدير العام",
    "admin.registerNewAdmin.newAdminTitle": "بيانات المدير الجديد",
    "admin.registerNewAdmin.roleLabel": "نوع الصلاحية",
    "admin.registerNewAdmin.submitBtn": "تسجيل المدير الجديد",
    "admin.registerNewAdmin.backBtn": "العودة لتسجيل الدخول",
    "admin.registerNewAdmin.success": "تم تسجيل المدير الجديد بنجاح، وتم تسجيل دخولك بصفتك المدير العام.",
    "admin.role.user": "مستخدم عادي",

    "admin.nav.dashboard": "لوحة التحكم",
    "admin.nav.users": "المستخدمون",
    "admin.nav.cars": "السيارات",
    "admin.nav.properties": "العقارات",
    "admin.nav.listings": "الإعلانات",
    "admin.nav.payments": "المدفوعات",
    "admin.nav.subscriptions": "الاشتراكات",
    "admin.nav.reports": "البلاغات والشكاوى",
    "admin.nav.content": "المحتوى",
    "admin.nav.settings": "الإعدادات",
    "admin.nav.adminUsers": "مستخدمو الإدارة",
    "admin.nav.auditLogs": "سجل العمليات",

    "admin.dashboard.heading": "لوحة التحكم",
    "admin.dashboard.topCities": "أكثر المناطق نشاطًا",
    "admin.dashboard.noCityData": "لا توجد بيانات كافية بعد.",
    "admin.dashboard.stat.users": "عدد المستخدمين",
    "admin.dashboard.stat.listings": "عدد الإعلانات",
    "admin.dashboard.stat.cars": "عدد السيارات والدراجات",
    "admin.dashboard.stat.properties": "عدد العقارات والأراضي",
    "admin.dashboard.stat.sold": "الإعلانات المباعة",
    "admin.dashboard.stat.revenue": "الإيرادات التقديرية",
    "admin.dashboard.stat.newSubs": "اشتراكات جديدة (٧ أيام)",
    "admin.dashboard.stat.activeUsers": "مستخدمون نشطون (٣٠ يوم)",

    "admin.users.heading": "إدارة المستخدمين",
    "admin.users.searchPlaceholder": "بحث بالاسم أو البريد...",
    "admin.users.col.name": "الاسم",
    "admin.users.col.email": "البريد",
    "admin.users.col.phone": "الجوال",
    "admin.users.col.role": "الدور",
    "admin.users.col.status": "الحالة",
    "admin.users.col.plan": "الخطة",
    "admin.users.col.joined": "آخر دخول",
    "admin.users.col.actions": "إجراءات",
    "admin.users.statusActive": "نشط",
    "admin.users.statusDisabled": "معطّل",
    "admin.users.flagged": "مشبوه",
    "admin.users.enableBtn": "تفعيل",
    "admin.users.disableBtn": "تعطيل",
    "admin.users.flagBtn": "وضع علامة مشبوه",
    "admin.users.unflagBtn": "إزالة العلامة",
    "admin.users.deleteBtn": "حذف",
    "admin.users.deleteConfirm": "هل أنت متأكد من حذف هذا الحساب نهائيًا؟",
    "admin.users.cannotDeleteSelf": "لا يمكنك حذف حسابك الخاص من هنا.",
    "admin.users.neverLoggedIn": "لم يسجّل الدخول بعد",
    "admin.users.lastSuperAdminWarning": "لا يمكن ترك المنصة بدون مدير عام واحد على الأقل.",
    "admin.users.onlyOneSuperAdmin": "يوجد مدير عام (Super Admin) واحد بالفعل، ولا يمكن إضافة أكثر من مدير عام واحد. يجب إزالة صلاحية المدير العام الحالي أولًا إن رغبت بنقلها لشخص آخر.",

    "admin.cars.heading": "إدارة السيارات والدراجات النارية",
    "admin.properties.heading": "إدارة العقارات والأراضي",
    "admin.listings.heading": "جميع الإعلانات",
    "admin.listings.searchPlaceholder": "بحث في الإعلانات...",
    "admin.listings.col.category": "النوع",
    "admin.listings.col.title": "الإعلان",
    "admin.listings.col.owner": "المالك",
    "admin.listings.col.price": "السعر",
    "admin.listings.col.city": "المدينة",
    "admin.listings.col.status": "الحالة",
    "admin.listings.col.visibility": "الظهور",
    "admin.listings.col.actions": "إجراءات",
    "admin.listings.hidden": "مخفي",
    "admin.listings.visible": "ظاهر",
    "admin.listings.hideBtn": "إخفاء",
    "admin.listings.unhideBtn": "إظهار",

    "admin.payments.heading": "المدفوعات",
    "admin.payments.simulatedNote": "بيانات مشتقة من خطط الاشتراك الحالية للمستخدمين. لا توجد بوابة دفع فعلية مربوطة بهذا الموقع التجريبي.",
    "admin.payments.mrr": "الإيراد الشهري التقديري",
    "admin.payments.arr": "الإيراد السنوي التقديري",
    "admin.payments.totalSubscribers": "إجمالي المشتركين",
    "admin.payments.perYear": "سنويًا",
    "admin.payments.col.user": "المستخدم",
    "admin.payments.col.plan": "الخطة",
    "admin.payments.col.amount": "القيمة التقديرية",

    "admin.subscriptions.heading": "الاشتراكات",
    "admin.subscriptions.col.user": "المستخدم",
    "admin.subscriptions.col.plan": "الخطة الحالية",
    "admin.subscriptions.col.actions": "تغيير الخطة",

    "admin.coupons.heading": "العروض والكوبونات",
    "admin.coupons.codePlaceholder": "كود الكوبون",
    "admin.coupons.discountPlaceholder": "نسبة الخصم %",
    "admin.coupons.addBtn": "إضافة",
    "admin.coupons.col.code": "الكود",
    "admin.coupons.col.discount": "الخصم",
    "admin.coupons.col.status": "الحالة",
    "admin.coupons.col.actions": "إجراءات",
    "admin.coupons.active": "فعّال",
    "admin.coupons.inactive": "متوقف",
    "admin.coupons.activateBtn": "تفعيل",
    "admin.coupons.deactivateBtn": "إيقاف",

    "admin.reports.heading": "البلاغات والشكاوى",
    "admin.reports.col.listing": "الإعلان",
    "admin.reports.col.reporter": "المُبلّغ",
    "admin.reports.col.reason": "السبب",
    "admin.reports.col.status": "الحالة",
    "admin.reports.col.date": "التاريخ",
    "admin.reports.col.actions": "إجراءات",
    "admin.reports.listingDeleted": "تم حذف الإعلان",
    "admin.reports.resolveBtn": "معالجة",
    "admin.reports.dismissBtn": "تجاهل",
    "admin.reports.deleteListingBtn": "حذف الإعلان",
    "admin.reports.status.open": "مفتوح",
    "admin.reports.status.resolved": "تمت المعالجة",
    "admin.reports.status.dismissed": "تم التجاهل",

    "admin.content.heading": "إدارة محتوى الصفحة الرئيسية",
    "admin.content.note": "التعديلات هنا تستبدل النصوص الافتراضية لكل لغة على حدة. اترك الحقل فارغًا للرجوع للنص الافتراضي.",
    "admin.content.saveBtn": "حفظ التعديلات",
    "admin.content.arLabel": "العربية",
    "admin.content.enLabel": "الإنجليزية",
    "admin.content.saved": "تم حفظ محتوى الصفحة الرئيسية بنجاح.",

    "admin.settings.heading": "إعدادات المنصة",
    "admin.settings.minAgeLabel": "الحد الأدنى لعمر التسجيل",
    "admin.settings.maintenanceModeLabel": "تفعيل وضع الصيانة (يظهر تنبيه للزوار في الصفحة الرئيسية)",
    "admin.settings.maintenanceMessageLabel": "رسالة الصيانة",
    "admin.settings.saveBtn": "حفظ الإعدادات",
    "admin.settings.saved": "تم حفظ الإعدادات بنجاح.",
    "admin.settings.backupHeading": "النسخ الاحتياطي للبيانات",
    "admin.settings.backupNote": "تصدير جميع بيانات المنصة (المستخدمون، الإعلانات، الرسائل...) كملف نسخة احتياطية، أو استيراد نسخة سابقة.",
    "admin.settings.exportBtn": "تنزيل نسخة احتياطية",
    "admin.settings.importBtn": "استيراد نسخة احتياطية",
    "admin.settings.importConfirm": "سيؤدي هذا إلى استبدال بيانات المنصة الحالية بالكامل ببيانات النسخة الاحتياطية. هل تريد المتابعة؟",
    "admin.settings.importSuccess": "تم استيراد النسخة الاحتياطية بنجاح، جارٍ إعادة تحميل الصفحة...",
    "admin.settings.importError": "تعذّر قراءة ملف النسخة الاحتياطية. تأكد من أنه ملف JSON صالح.",

    "admin.adminUsers.heading": "مستخدمو الإدارة",
    "admin.adminUsers.emailPlaceholder": "بريد المستخدم",
    "admin.adminUsers.grantBtn": "منح صلاحية",
    "admin.adminUsers.col.name": "الاسم",
    "admin.adminUsers.col.email": "البريد",
    "admin.adminUsers.col.role": "الدور",
    "admin.adminUsers.col.twoFactor": "المصادقة الثنائية",
    "admin.adminUsers.col.actions": "إجراءات",
    "admin.adminUsers.enable2fa": "تفعيل المصادقة الثنائية",
    "admin.adminUsers.disable2fa": "إيقاف المصادقة الثنائية",
    "admin.adminUsers.revokeBtn": "سحب الصلاحية",
    "admin.adminUsers.userNotFound": "لم يتم العثور على مستخدم بهذا البريد الإلكتروني.",

    "admin.auditLogs.heading": "سجل العمليات (Audit Log)",
    "admin.auditLogs.col.date": "التاريخ",
    "admin.auditLogs.col.actor": "المستخدم",
    "admin.auditLogs.col.action": "الإجراء",
    "admin.auditLogs.col.target": "الهدف",
    "admin.auditLogs.col.details": "تفاصيل",

    "admin.auditAction.login_success": "تسجيل دخول ناجح",
    "admin.auditAction.login_failed": "محاولة دخول فاشلة",
    "admin.auditAction.login_blocked_disabled": "محاولة دخول لحساب معطّل",
    "admin.auditAction.listing_reported": "إبلاغ عن إعلان",
    "admin.auditAction.user_role_changed": "تغيير دور مستخدم",
    "admin.auditAction.user_enabled": "تفعيل حساب مستخدم",
    "admin.auditAction.user_disabled": "تعطيل حساب مستخدم",
    "admin.auditAction.user_flagged": "وضع علامة مشبوه على حساب",
    "admin.auditAction.user_unflagged": "إزالة علامة مشبوه عن حساب",
    "admin.auditAction.user_deleted": "حذف حساب مستخدم",
    "admin.auditAction.user_plan_changed": "تغيير خطة اشتراك مستخدم",
    "admin.auditAction.listing_hidden": "إخفاء إعلان",
    "admin.auditAction.listing_unhidden": "إعادة إظهار إعلان",
    "admin.auditAction.listing_status_changed": "تغيير حالة إعلان",
    "admin.auditAction.listing_deleted": "حذف إعلان",
    "admin.auditAction.listing_deleted_from_report": "حذف إعلان من خلال بلاغ",
    "admin.auditAction.report_resolved": "معالجة بلاغ",
    "admin.auditAction.report_dismissed": "تجاهل بلاغ",
    "admin.auditAction.coupon_added": "إضافة كوبون",
    "admin.auditAction.coupon_toggled": "تغيير حالة كوبون",
    "admin.auditAction.coupon_deleted": "حذف كوبون",
    "admin.auditAction.site_content_updated": "تعديل محتوى الصفحة الرئيسية",
    "admin.auditAction.site_settings_updated": "تعديل إعدادات المنصة",
    "admin.auditAction.backup_exported": "تصدير نسخة احتياطية",
    "admin.auditAction.backup_imported": "استيراد نسخة احتياطية",
    "admin.auditAction.admin_role_granted": "منح صلاحية إدارية",
    "admin.auditAction.admin_role_revoked": "سحب صلاحية إدارية",
    "admin.auditAction.admin_2fa_enabled": "تفعيل المصادقة الثنائية لحساب إداري",
    "admin.auditAction.admin_2fa_disabled": "إيقاف المصادقة الثنائية لحساب إداري",
    "admin.auditAction.admin_2fa_verified": "التحقق الناجح بالمصادقة الثنائية",

    "maintenance.defaultMessage": "المنصة قيد الصيانة حاليًا، نعتذر عن أي إزعاج وسنعود قريبًا.",

    "listingPage.saveChangesBtn": "حفظ التعديلات",
    "listingPage.editHeading": "تعديل الإعلان",
    "listingPage.editSub": "قم بتحديث تفاصيل إعلانك أدناه.",
    "listingPage.currentPhotosLabel": "الصور الحالية",
    "listingPage.photosHintEdit": "يمكنك ترك هذا الحقل فارغًا للاحتفاظ بالصور الحالية، أو إرفاق صور جديدة لاستبدالها.",
    "listingPage.editSuccess": "تم حفظ التعديلات بنجاح، جارٍ تحويلك...",
    "nav.myListings": "إعلاناتي",
    "meta.myListings.title": "إعلاناتي | مباشر",
    "myListings.heading": "إعلاناتي",
    "myListings.sub": "إدارة إعلاناتك المنشورة: التعديل، الحذف، أو تحديد الإعلان كـ \"تم البيع\".",
    "myListings.loginNotice": "يجب تسجيل الدخول لعرض إعلاناتك.",
    "myListings.emptyState": "لم تقم بنشر أي إعلان بعد.",
    "myListings.viewBtn": "عرض",
    "myListings.editBtn": "تعديل",
    "myListings.deleteBtn": "حذف",
    "myListings.deleteConfirm": "هل أنت متأكد من حذف هذا الإعلان؟ لا يمكن التراجع عن هذا الإجراء.",
    "myListings.markSoldBtn": "تحديد كـ «تم البيع»",
    "myListings.reactivateBtn": "إعادة تنشيط الإعلان",
    "myListings.notOwnerError": "لا يمكنك تعديل إعلان لا تملكه.",
    "listing.active": "متاح",
    "listing.sold": "تم البيع",
    "nav.messages": "رسائلي",
    "spec.km": "كم",
    "home.noRealestate": "لا توجد عقارات منشورة بعد. كن أول من ينشر إعلانًا!",
    "home.noVehicles": "لا توجد سيارات أو دراجات نارية منشورة بعد. كن أول من ينشر إعلانًا!",
    "meta.listingDetail.title": "تفاصيل الإعلان | مباشر",
    "meta.messages.title": "رسائلي | مباشر",
    "messages.heading": "رسائلي",
    "messages.sub": "تابع محادثاتك مع أصحاب الإعلانات والمهتمين بإعلاناتك.",
    "messages.loginNotice": "يجب تسجيل الدخول لعرض رسائلك.",
    "messages.emptyState": "لا توجد رسائل بعد. تصفح الإعلانات وابدأ محادثة مع صاحب أي إعلان يهمك.",
    "messages.deletedListing": "إعلان محذوف",
    "messages.replyPlaceholder": "اكتب ردك هنا...",
    "messages.sendBtn": "إرسال",
    "messages.noMessagesYet": "لا توجد رسائل في هذه المحادثة بعد.",
    "legal.updated": "آخر تحديث: سبتمبر 2026",
    "privacy.heading": "سياسة الخصوصية",
    "privacy.s1.heading": "مقدمة",
    "privacy.s1.body": "نحترم في \"مباشر\" خصوصية مستخدمينا، وتوضح هذه السياسة نوع المعلومات التي نجمعها وكيفية استخدامها وحمايتها عند استخدامك للمنصة.",
    "privacy.s2.heading": "المعلومات التي نجمعها",
    "privacy.s2.body": "نجمع المعلومات التي تقدمها مباشرة عند إنشاء حساب، مثل الاسم والبريد الإلكتروني ورقم الجوال، بالإضافة إلى تفاصيل الإعلانات التي تنشرها على المنصة.",
    "privacy.s3.heading": "كيف نستخدم معلوماتك",
    "privacy.s3.body": "نستخدم بياناتك لتشغيل حسابك، وعرض إعلاناتك للمستخدمين الآخرين، والتواصل معك بخصوص طلباتك، وتحسين خدمات المنصة.",
    "privacy.s4.heading": "مشاركة المعلومات",
    "privacy.s4.body": "لا نبيع بياناتك الشخصية لأطراف ثالثة. قد تُعرض بيانات التواصل التي تختار إظهارها في إعلانك للمستخدمين المهتمين فقط.",
    "privacy.s5.heading": "أمان البيانات",
    "privacy.s5.body": "نتخذ إجراءات معقولة لحماية بياناتك من الوصول غير المصرح به، مع العلم أن أي نظام تخزين إلكتروني لا يخلو من مخاطر أمنية بشكل كامل.",
    "privacy.s6.heading": "ملفات تعريف الارتباط",
    "privacy.s6.body": "تستخدم المنصة تخزينًا محليًا في متصفحك لحفظ تفضيلاتك، مثل اللغة وحالة تسجيل الدخول، لتحسين تجربتك أثناء التصفح.",
    "privacy.s7.heading": "حقوقك",
    "privacy.s7.body": "يحق لك الاطلاع على بياناتك أو تعديلها أو طلب حذف حسابك في أي وقت من خلال التواصل مع فريق الدعم.",
    "privacy.s8.heading": "التعديلات على هذه السياسة",
    "privacy.s8.body": "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر، وسيتم نشر أي تغييرات جوهرية على هذه الصفحة مع تاريخ التحديث.",
    "privacy.s9.heading": "تواصل معنا",
    "privacy.s9.body": "لأي استفسار بخصوص هذه السياسة أو بياناتك الشخصية، يمكنك التواصل مع فريق الدعم الفني عبر المنصة.",
    "terms.heading": "الشروط والأحكام",
    "terms.s1.heading": "مقدمة",
    "terms.s1.body": "باستخدامك منصة \"مباشر\"، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يرجى عدم استخدام المنصة.",
    "terms.s2.heading": "استخدام المنصة",
    "terms.s2.body": "تُستخدم المنصة لعرض وتصفح إعلانات العقارات والأراضي والسيارات والدراجات النارية فقط. يُمنع استخدامها لأي غرض مخالف للقانون.",
    "terms.s3.heading": "حسابات المستخدمين",
    "terms.s3.body": "أنت مسؤول عن الحفاظ على سرية بيانات حسابك وكلمة المرور الخاصة بك، وعن جميع الأنشطة التي تتم من خلال حسابك. يجب أن يكون عمر المستخدم 18 عامًا أو أكثر لإنشاء حساب واستخدام المنصة، ولا يُسمح بالتسجيل لمن هم دون هذا العمر.",
    "terms.s4.heading": "قواعد نشر الإعلانات",
    "terms.s4.body": "يجب أن تكون المعلومات المنشورة في إعلانك دقيقة وصحيحة. يُمنع نشر إعلانات مضللة أو مكررة أو لسلع غير مملوكة لك.",
    "terms.s5.heading": "المسؤولية",
    "terms.s5.body": "المنصة وسيط لعرض الإعلانات فقط، ولا تتحمل مسؤولية أي تعامل مباشر أو خلاف ينشأ بين البائع والمشتري.",
    "terms.s6.heading": "الملكية الفكرية",
    "terms.s6.body": "جميع عناصر التصميم والشعار الخاصة بالمنصة محمية، ولا يجوز نسخها أو إعادة استخدامها دون إذن مسبق.",
    "terms.s7.heading": "إنهاء الحساب",
    "terms.s7.body": "يحق للمنصة تعليق أو إنهاء أي حساب يخالف هذه الشروط، دون إشعار مسبق في حالات المخالفات الجسيمة.",
    "terms.s8.heading": "التعديلات على الشروط",
    "terms.s8.body": "قد يتم تحديث هذه الشروط من وقت لآخر، واستمرارك في استخدام المنصة بعد التحديث يُعد موافقة على الشروط الجديدة.",
    "terms.s9.heading": "تواصل معنا",
    "terms.s9.body": "لأي استفسار بخصوص هذه الشروط، يمكنك التواصل مع فريق الدعم الفني عبر المنصة.",
    },
    en: {
    "brand.name": "Mubasher",
    "meta.home.title": "Mubasher | Real Estate & Cars for Sale and Rent",
    "meta.login.title": "Log In | Mubasher",
    "meta.signup.title": "Sign Up | Mubasher",
    "meta.listing.title": "Post an Ad | Mubasher",
    "meta.privacy.title": "Privacy Policy | Mubasher",
    "meta.terms.title": "Terms & Conditions | Mubasher",
    "nav.realestate": "Real Estate",
    "nav.cars": "Cars",
    "nav.addListing": "Post an Ad",
    "nav.about": "About Us",
    "auth.login": "Log In",
    "auth.logout": "Log Out",
    "auth.signup": "Sign Up",
    "auth.backHome": "← Back to Home",
    "auth.backHomeShort": "Back to Home",
    "auth.loginTitle": "Log In",
    "auth.loginSub": "Enter your details to access your account",
    "auth.remember": "Remember me",
    "auth.forgot": "Forgot password?",
    "auth.loginBtn": "Log In",
    "auth.or": "or",
    "auth.noAccount": "Don't have an account?",
    "auth.createOne": "Create one",
    "auth.hasAccount": "Already have an account?",
    "auth.visualLogin": "Log in to keep track of your saved listings, message sellers, and post your own ads.",
    "auth.signupTitle": "Create a New Account",
    "auth.signupSub": "Fill in your details to start using the platform",
    "auth.signupBtn": "Create Account",
    "auth.agreeTo": "I agree to the",
    "auth.and": "and",
    "plan.title": "Choose Your Subscription Plan",
    "plan.intro": "A monthly subscription is required to post ads on the platform. Pay monthly, or pay yearly and save.",
    "plan.currency": "SDG",
    "plan.perMonth": "per month",
    "plan.perYear": "per year",
    "plan.monthly.name": "Monthly",
    "plan.yearly.name": "Yearly",
    "plan.yearly.badge": "Save 17%",
    "plan.yearly.savings": "Save 41,000 SDG a year compared to paying monthly",
    "plan.yearly.compareNote": "Instead of 240,000 SDG when paid monthly (20,000 × 12 months)",
    "auth.visualSignupTitle": "Join thousands of users buying and selling with confidence",
    "auth.visualSignupSub": "Create your account to save listings, post your properties and cars, and message interested buyers directly.",
    "auth.fixErrors": "Please fix the highlighted fields below before continuing.",
    "auth.agreeTermsRequired": "Please agree to the Terms & Conditions to continue.",
    "auth.emailExists": "An account with this email already exists.",
    "auth.creatingAccount": "Creating account...",
    "auth.signupSuccess": "Account created successfully, redirecting...",
    "auth.enterValidData": "Please enter valid information.",
    "auth.wrongCredentials": "Incorrect email or password. Please enter valid information.",
    "auth.loggingIn": "Logging in...",
    "auth.loginSuccess": "Logged in successfully, redirecting...",
    "auth.accountDisabled": "This account has been disabled by the platform administration. Please contact support.",
    "field.email": "Email",
    "field.password": "Password",
    "field.confirmPassword": "Confirm Password",
    "field.fullName": "Full Name",
    "field.phone": "Phone Number",
    "field.choose": "Choose...",
    "error.email": "Please enter a valid email address",
    "error.password": "Password must be at least 6 characters",
    "error.confirmPassword": "Passwords do not match",
    "error.fullName": "Please enter your full name",
    "error.phone": "Please enter a valid phone number (10 digits)",
    "field.birthdate": "Date of Birth",
    "error.birthdate": "Please enter a valid date of birth",
    "auth.ageRequirement": "You must be 18 years or older to register on the platform",
    "auth.ageRequirementHint": "You must be 18 years or older to create an account.",
    "field.profilePhoto": "Profile Photo (optional)",
    "field.profilePhotoHint": "You can add a profile photo that will appear next to the platform name after you log in.",
    "field.profilePhotoRequired": "Profile Photo",
    "field.profilePhotoHintRequired": "A profile photo is required and will appear next to the platform name after you log in.",
    "error.profilePhoto": "Please attach a profile photo",

    "field.identityVerificationTitle": "Identity Verification",
    "field.identityVerificationIntro": "This information is required for admin review before your account is activated, and is used for legal purposes only.",
    "field.nationalId": "National ID Number",
    "error.nationalId": "Please enter your national ID number",
    "field.idPhoto": "ID Photo",
    "error.idPhoto": "Please capture or attach a photo of your ID",
    "field.idPhotoHint": "Take a clear photo of your national ID, or attach one from your device. This photo is used only to verify your identity by the admin team.",

    "auth.pendingReviewMessage": "Your request was submitted successfully. Your account is now pending admin review, and you'll be notified once it's approved.",
    "auth.accountPendingReview": "Your account is pending admin review. You'll be notified once it's approved.",
    "auth.accountRejected": "Your registration request was rejected.",

    "nav.subscription": "My Subscription",
    "meta.subscription.title": "My Subscription | Mubasher",
    "subscription.heading": "My Subscription",
    "subscription.sub": "Track your account and subscription status, and complete payment to activate posting on the platform.",
    "subscription.loginNotice": "You must log in to view your subscription details.",
    "subscription.paymentTitle": "Complete payment to activate your subscription",
    "subscription.method.bankak": "Bankak (Bank of Khartoum)",
    "subscription.method.ewallet": "E-Wallet",
    "subscription.method.card": "Visa / Mastercard",
    "subscription.method.banktransfer": "Bank Transfer",
    "subscription.method.gateway": "Online Payment Gateway",
    "subscription.payNowBtn": "Pay Now",
    "subscription.paymentSimNote": "Demo environment: no real amount is charged. This form only simulates a payment.",
    "subscription.processing": "Processing payment...",
    "subscription.paymentSuccess": "Payment successful, your subscription is now active.",
    "subscription.trialDaysLeft": "{days} day(s) left in your free trial (ends {date}).",
    "subscription.rejectedReason": "Your registration request was rejected.",
    "subscription.activeSince": "Your subscription has been active since",
    "subscription.selectedPlan": "Selected plan:",
    "subscription.stageDetail.pending_review": "Your account is pending admin review of your national ID and ID photo. You can't post listings until it's approved.",
    "subscription.stageDetail.rejected": "Your registration request was rejected. Please contact support for more details.",
    "subscription.stageDetail.trial": "You're currently in your free trial period and can post listings freely.",
    "subscription.stageDetail.active": "Your subscription is active, and you can post listings freely.",
    "subscription.stageDetail.expired": "Your trial period has ended and your subscription isn't active yet. Complete payment to keep posting listings.",
    "subscription.goToSubscriptionBtn": "Manage Subscription",

    "admin.users.col.accountStage": "Subscription Stage",
    "admin.accountStage.pending_review": "Pending Review",
    "admin.accountStage.rejected": "Rejected",
    "admin.accountStage.trial": "Free Trial",
    "admin.accountStage.active": "Active",
    "admin.accountStage.expired": "Expired",

    "admin.pendingReview.heading": "Pending Registration Requests",
    "admin.pendingReview.note": "Review the national ID and ID photo before approving the account. Approval automatically starts a 7-day free trial.",
    "admin.pendingReview.col.name": "Name",
    "admin.pendingReview.col.email": "Email",
    "admin.pendingReview.col.nationalId": "National ID",
    "admin.pendingReview.col.idPhoto": "ID Photo",
    "admin.pendingReview.col.plan": "Requested Plan",
    "admin.pendingReview.col.actions": "Actions",
    "admin.pendingReview.approveBtn": "Approve",
    "admin.pendingReview.rejectBtn": "Reject",
    "admin.pendingReview.rejectReasonPrompt": "Rejection reason (optional):",
    "admin.pendingReview.empty": "There are no pending registration requests right now.",

    "admin.auditAction.account_submitted_for_review": "Account submitted for review",
    "admin.auditAction.user_approved": "User account approved",
    "admin.auditAction.user_rejected": "User registration rejected",
    "admin.auditAction.subscription_activated": "Subscription activated after payment",
    "admin.auditAction.login_blocked_pending_review": "Login attempt on a pending-review account",
    "admin.auditAction.login_blocked_rejected": "Login attempt on a rejected account",

    "terms.s10.heading": "Identity Verification and Account Review",
    "terms.s10.body": "When creating an account, you are required to enter your national ID number and attach a photo of your ID to verify your information. The account remains pending until it is reviewed and approved by the platform administration, and the administration reserves the right to reject any registration request with incomplete or apparently invalid information.",
    "terms.s11.heading": "Subscription, Free Trial, and Payment",
    "terms.s11.body": "Once your information is approved, you are granted a 7-day free trial to use the platform. To continue your subscription after the trial ends, you must complete payment through one of the available payment methods on the platform, and the subscription status automatically becomes \"Active\" once payment succeeds.",

    "privacy.s10.heading": "National ID Number and ID Photo",
    "privacy.s10.body": "The national ID number and ID photo you provide at signup are used exclusively to verify and review your information by the platform administration, and for legal purposes only. This data is never shared with any third party and is never used for marketing purposes.",

    "profile.title": "My Profile",
    "profile.changePhotoBtn": "Change Photo",
    "profile.addressLabel": "Address",
    "profile.addressPlaceholder": "Enter your address",
    "profile.saveAddressBtn": "Save Address",
    "profile.changePasswordTitle": "Change Password",
    "profile.currentPasswordLabel": "Current Password",
    "profile.newPasswordLabel": "New Password",
    "profile.confirmNewPasswordLabel": "Confirm New Password",
    "profile.savePasswordBtn": "Update Password",
    "profile.currentPasswordError": "Current password is incorrect",
    "profile.addressSaved": "Address saved successfully",
    "profile.passwordSaved": "Password updated successfully",
    "profile.photoSaved": "Profile photo updated",
    "profile.fixPasswordErrors": "Please fix the password fields above",
    "forgot.title": "Forgot Password?",
    "forgot.step1Sub": "Enter the email or phone number registered on your account",
    "forgot.identifierLabel": "Email or Phone Number",
    "forgot.identifierError": "No account is linked to this information",
    "forgot.sendBtn": "Send Temporary Password",
    "forgot.step2Title": "Verify the Temporary Password",
    "forgot.sentTo": "We sent a temporary password to",
    "forgot.demoNote": "Demo environment: the temporary password is shown here instead of actually being emailed or texted.",
    "forgot.otpLabel": "Enter the Temporary Password",
    "forgot.otpError": "Incorrect temporary password",
    "forgot.verifyBtn": "Verify",
    "forgot.step3Title": "Set a New Password",
    "forgot.step3Sub": "The temporary password can only be used once. Set a new password for your account",
    "forgot.newPassword": "New Password",
    "forgot.resetBtn": "Set Password & Log In",
    "hero.eyebrow": "A trusted platform for buying and selling",
    "hero.title": "Your next home, or your next car, all in one place",
    "hero.subtitle": "Thousands of verified listings for real estate, cars, and land — direct from owners or trusted agents.",
    "search.tab.realestate": "Real Estate",
    "search.tab.land": "Land",
    "search.tab.cars": "Cars",
    "search.tab.moto": "Motorcycles",
    "search.city.label": "City",
    "search.offerType.label": "Offer Type",
    "search.budget.label": "Budget",
    "search.cta": "Search Now",
    "city.khartoum": "Khartoum",
    "city.omdurman": "Omdurman",
    "city.bahri": "Bahri",
    "city.madani": "Wad Madani",
    "city.portsudan": "Port Sudan",
    "city.kassala": "Kassala",
    "city.elobeid": "El Obeid",
    "city.nyala": "Nyala",
    "city.elfasher": "El Fasher",
    "city.elgeneina": "El Geneina",
    "city.kosti": "Kosti",
    "city.sennar": "Sennar",
    "city.eddamazin": "Ed Damazin",
    "city.atbara": "Atbara",
    "city.dongola": "Dongola",
    "city.gadarif": "Gadarif",
    "city.shendi": "Shendi",
    "city.kadugli": "Kadugli",
    "city.zalingei": "Zalingei",
    "city.eddamer": "Ed Damer",
    "offer.sale": "For Sale",
    "offer.rent": "For Rent",
    "budget.low": "Under 500K",
    "budget.mid": "500K - 1M",
    "budget.high": "Over 1M",
    "cat.apartments.title": "Apartments & Villas",
    "cat.apartments.count": "3,240 listings",
    "cat.land.title": "Land",
    "cat.land.count": "1,180 listings",
    "cat.cars.title": "Cars",
    "cat.cars.count": "2,560 listings",
    "cat.commercial.title": "Commercial Property",
    "cat.commercial.count": "640 listings",
    "cat.moto.title": "Motorcycles",
    "cat.moto.count": "310 listings",
    "realestate.heading": "Latest Properties",
    "realestate.sub": "Handpicked villas, apartments, and land this week",
    "realestate.seeAll": "View All Properties",
    "listing1.price": "1,250,000 SDG",
    "listing1.title": "Elegant Duplex Villa in Al Yasmin",
    "listing1.loc": "Khartoum — Al Riyadh District",
    "listing2.price": "4,500 SDG / month",
    "listing2.title": "Furnished Apartment with Nile View",
    "listing2.loc": "Omdurman — Al Thawra",
    "listing3.price": "680,000 SDG",
    "listing3.title": "Planned Residential Land Plot",
    "listing3.loc": "Bahri — Al Kadaro",
    "spec.rooms": "rooms",
    "spec.baths": "baths",
    "spec.sqm": "sqm",
    "spec.corner": "Corner plot",
    "spec.eTitle": "E-title deed",
    "cars.heading": "Latest Cars",
    "cars.sub": "Inspected cars, listed directly by their owners",
    "cars.seeAll": "View All Cars",
    "listing4.price": "96,000 SDG",
    "listing4.title": "Toyota Land Cruiser GXR 2023",
    "listing4.loc": "Khartoum",
    "listing5.price": "61,500 SDG",
    "listing5.title": "Hyundai Sonata 2022 Fully Loaded",
    "listing5.loc": "Omdurman",
    "listing6.price": "142,000 SDG",
    "listing6.title": "Mercedes C200 2024 Model",
    "listing6.loc": "Bahri",
    "spec.thousandKm": "thousand km",
    "spec.automatic": "Automatic",
    "spec.petrol": "Petrol",
    "spec.dealerWarranty": "Dealer warranty",
    "promo.heading": "Have a property or car to sell?",
    "promo.sub": "Post your ad for free and reach thousands of serious buyers within minutes.",
    "promo.point1": "Publish your ad in minutes, no hassle",
    "promo.point2": "Verified listings to protect buyers and sellers",
    "promo.point3": "Message interested buyers directly on the platform",
    "promo.cta": "Post Your Ad Now",
    "footer.about": "A Sudanese platform to list, buy, and sell real estate, land, cars, and motorcycles directly between individuals and agents.",
    "footer.sections.heading": "Categories",
    "footer.sections.saleRealestate": "Property for Sale",
    "footer.sections.rentRealestate": "Property for Rent",
    "footer.sections.land": "Land",
    "footer.sections.cars": "Cars",
    "footer.sections.moto": "Motorcycles",
    "footer.company.heading": "Company",
    "footer.company.about": "About Us",
    "footer.company.contact": "Contact Us",
    "footer.company.faq": "FAQ",
    "footer.contact.heading": "Support",
    "footer.contact.support": "Technical Support",
    "footer.contact.terms": "Terms & Conditions",
    "footer.contact.privacy": "Privacy Policy",
    "footer.copyright": "© 2026 Mubasher. All rights reserved.",
    "listingPage.heading": "Post Your Ad",
    "listingPage.sub": "Choose what you're listing and enter the details. All prices are in Sudanese Pounds.",
    "listingPage.categoryTitle": "Ad Type",
    "listingPage.cat.land": "Land Plot",
    "listingPage.cat.residential": "Residential Property",
    "listingPage.cat.commercial": "Commercial Property",
    "listingPage.cat.car": "Car",
    "listingPage.cat.motorcycle": "Motorcycle",
    "listingPage.categoryError": "Please choose an ad type",
    "listingPage.detailsTitle": "Ad Details",
    "listingPage.offerTypeError": "Please choose an offer type",
    "listingPage.priceLabel": "Price (in Sudanese Pounds)",
    "listingPage.priceError": "Please enter a valid price",
    "listingPage.cityChoose": "Choose a city...",
    "listingPage.cityError": "Please choose a city",
    "listingPage.landDetails": "Land Details",
    "listingPage.areaLabel": "Area (sqm)",
    "listingPage.areaError": "Please enter the area",
    "listingPage.landTypeLabel": "Land Type",
    "listingPage.landTypeError": "Please choose a land type",
    "listingPage.addressLabel": "Address",
    "listingPage.addressPlaceholder": "Neighborhood, street, nearest landmark",
    "listingPage.addressError": "Please enter the address",
    "listingPage.landNumberLabel": "Land Plot Number",
    "listingPage.landNumberError": "Please enter the land plot number",
    "listingPage.landNumberDuplicate": "This land plot (same number) has already been listed. You cannot post a duplicate ad for the same plot.",
    "listingPage.propertyNumberLabel": "Property Number",
    "listingPage.propertyNumberError": "Please enter the property number",
    "listingPage.propertyNumberDuplicate": "This property (same number) has already been listed. You cannot post a duplicate ad for the same property.",
    "listingPage.carRegistrationLabel": "Vehicle Registration Number",
    "listingPage.carRegistrationError": "Please enter the vehicle registration number",
    "listingPage.carRegistrationDuplicate": "An ad for this vehicle (same registration number) has already been posted. You cannot post a duplicate ad for the same vehicle.",
    "listingPage.internalOnlyHintProperty": "This number is not shown to customers; used internally only to prevent duplicate listings for the same property or land plot.",
    "listingPage.internalOnlyHintCar": "This number is not shown to customers; used internally only to prevent duplicate listings for the same vehicle.",
    "landType.residential": "Residential",
    "landType.commercial": "Commercial",
    "landType.agricultural": "Agricultural",
    "listingPage.resDetails": "Residential Property Details",
    "listingPage.roomsLabel": "Number of Rooms",
    "listingPage.roomsError": "Please enter the number of rooms",
    "listingPage.bathsLabel": "Number of Bathrooms",
    "listingPage.bathsError": "Please enter the number of bathrooms",
    "listingPage.comDetails": "Commercial Property Details",
    "listingPage.comTypeLabel": "Usage Type",
    "listingPage.comTypeError": "Please choose a usage type",
    "comType.shop": "Retail Shop",
    "comType.office": "Office",
    "comType.warehouse": "Warehouse",
    "comType.mall": "Shopping Mall",
    "listingPage.carDetails": "Car Details",
    "listingPage.motoDetails": "Motorcycle Details",
    "listingPage.brandLabel": "Manufacturer",
    "listingPage.brandChoose": "Choose a manufacturer...",
    "listingPage.brandError": "Please choose a manufacturer",
    "listingPage.modelLabel": "Model",
    "listingPage.modelChooseBrandFirst": "Choose a manufacturer first",
    "listingPage.modelChoose": "Choose a model...",
    "listingPage.modelError": "Please choose a model",
    "listingPage.yearLabel": "Manufacture Year",
    "listingPage.yearChoose": "Choose a year...",
    "listingPage.yearError": "Please choose a manufacture year",
    "listingPage.descTitle": "Ad Description",
    "listingPage.descLabel": "Additional Description (optional)",
    "listingPage.descPlaceholder": "Add any extra details that help buyers, such as condition, extras, or reason for selling...",
    "listingPage.descHint": "For cars and motorcycles: mention inspection status, mileage, or any modifications.",
    "listingPage.photosTitle": "Photos",
    "listingPage.photosLabel": "Attach Photos (optional)",
    "listingPage.photosHint": "You can attach more than one photo for your ad. This step is optional.",
    "listingPage.publishBtn": "Publish Ad",
    "listingPage.fixErrors": "Please fix the highlighted fields above before publishing.",
    "listingPage.publishing": "Publishing...",
    "listingPage.success": "Your ad was published successfully, redirecting to the homepage...",
    "listingPage.odometerLabel": "Odometer Reading (km)",
    "listingPage.odometerError": "Please enter the odometer reading",
    "listingPage.photosLabelRequired": "Attach Photos",
    "listingPage.photosError": "Please attach at least one photo",
    "listingPage.photosHintRequired": "You must attach at least one photo to publish the ad.",
    "listingPage.authRequired": "You must log in to post an ad on the platform.",
    "listingPage.noDescription": "The owner did not add an additional description.",
    "listingPage.ownAdNote": "This is your own ad. You can follow any messages about it from the My Messages page.",
    "listingPage.loginToMessagePrompt": "You must log in to message the ad owner.",
    "listingPage.messagePlaceholder": "Write your message to the ad owner here...",
    "listingPage.sendMessageBtn": "Send Message",
    "listingPage.viewMessagesLink": "View My Messages",
    "listingPage.detailBack": "← Back to all listings",
    "listingPage.notFoundTitle": "Ad Not Found",
    "listingPage.notFoundBody": "This ad may have been removed, or the link is incorrect.",
    "listingPage.galleryNoPhotos": "No photos attached to this ad",
    "listingPage.hiddenByAdminNotice": "This ad has been hidden by the platform administration and is not visible to other users.",
    "listingPage.reportLink": "Report this ad",
    "listingPage.reportReasonLabel": "Reason for report",
    "listingPage.reportReason.misleading": "Misleading information",
    "listingPage.reportReason.duplicate": "Duplicate ad",
    "listingPage.reportReason.soldElsewhere": "Sold elsewhere",
    "listingPage.reportReason.inappropriate": "Inappropriate content",
    "listingPage.reportReason.other": "Other",
    "listingPage.reportDetailsLabel": "Additional details (optional)",
    "listingPage.reportSubmitBtn": "Submit Report",
    "listingPage.reportSubmitted": "Report submitted, thank you",
    "adminRole.super_admin": "Super Admin",
    "adminRole.admin": "Admin",
    "adminRole.moderator": "Moderator",
    "adminRole.support": "Support",
    "adminRole.finance_admin": "Finance Admin",
    "adminRole.content_admin": "Content Admin",

    "meta.admin.title": "Admin Dashboard | Mubasher",
    "admin.badge": "Admin",
    "admin.loginRequired": "You must log in to access the admin dashboard.",
    "admin.accessDenied": "Your account does not have access to the admin dashboard.",
    "admin.bootstrapNote": "There is no \"Super Admin\" account on the platform yet. As the first user to open this page, you can grant your own account Super Admin access.",
    "admin.claimSuperAdminBtn": "Grant my account Super Admin access",
    "admin.twoFactorPrompt": "This account has two-factor verification enabled. Enter the one-time code shown below to confirm it's you (demo environment: the code is shown here instead of being sent for real).",
    "admin.registerNewAdminBtn": "Register New Admin",
    "admin.registerNewAdmin.heading": "Register New Admin",
    "admin.registerNewAdmin.note": "This action is available to the Super Admin only. Enter the Super Admin's credentials below to authorize it, then the new admin's details and their permission type.",
    "admin.registerNewAdmin.authorizerTitle": "Super Admin Credentials (to authorize)",
    "admin.registerNewAdmin.authorizerError": "Invalid Super Admin credentials, or this account does not have Super Admin access",
    "admin.registerNewAdmin.newAdminTitle": "New Admin's Details",
    "admin.registerNewAdmin.roleLabel": "Permission Type",
    "admin.registerNewAdmin.submitBtn": "Register New Admin",
    "admin.registerNewAdmin.backBtn": "Back to Login",
    "admin.registerNewAdmin.success": "The new admin was registered successfully, and you are now signed in as the Super Admin.",
    "admin.role.user": "Regular user",

    "admin.nav.dashboard": "Dashboard",
    "admin.nav.users": "Users",
    "admin.nav.cars": "Cars",
    "admin.nav.properties": "Properties",
    "admin.nav.listings": "Listings",
    "admin.nav.payments": "Payments",
    "admin.nav.subscriptions": "Subscriptions",
    "admin.nav.reports": "Reports & Complaints",
    "admin.nav.content": "Content",
    "admin.nav.settings": "Settings",
    "admin.nav.adminUsers": "Admin Users",
    "admin.nav.auditLogs": "Audit Logs",

    "admin.dashboard.heading": "Dashboard",
    "admin.dashboard.topCities": "Most active regions",
    "admin.dashboard.noCityData": "Not enough data yet.",
    "admin.dashboard.stat.users": "Total users",
    "admin.dashboard.stat.listings": "Total listings",
    "admin.dashboard.stat.cars": "Cars & motorcycles",
    "admin.dashboard.stat.properties": "Properties & land",
    "admin.dashboard.stat.sold": "Sold listings",
    "admin.dashboard.stat.revenue": "Estimated revenue",
    "admin.dashboard.stat.newSubs": "New subscriptions (7 days)",
    "admin.dashboard.stat.activeUsers": "Active users (30 days)",

    "admin.users.heading": "User Management",
    "admin.users.searchPlaceholder": "Search by name or email...",
    "admin.users.col.name": "Name",
    "admin.users.col.email": "Email",
    "admin.users.col.phone": "Phone",
    "admin.users.col.role": "Role",
    "admin.users.col.status": "Status",
    "admin.users.col.plan": "Plan",
    "admin.users.col.joined": "Last login",
    "admin.users.col.actions": "Actions",
    "admin.users.statusActive": "Active",
    "admin.users.statusDisabled": "Disabled",
    "admin.users.flagged": "Flagged",
    "admin.users.enableBtn": "Enable",
    "admin.users.disableBtn": "Disable",
    "admin.users.flagBtn": "Flag as suspicious",
    "admin.users.unflagBtn": "Remove flag",
    "admin.users.deleteBtn": "Delete",
    "admin.users.deleteConfirm": "Are you sure you want to permanently delete this account?",
    "admin.users.cannotDeleteSelf": "You can't delete your own account from here.",
    "admin.users.neverLoggedIn": "Never logged in",
    "admin.users.lastSuperAdminWarning": "The platform must always have at least one Super Admin.",
    "admin.users.onlyOneSuperAdmin": "There is already a Super Admin, and only one Super Admin is allowed at a time. Remove the current Super Admin's role first if you want to transfer it to someone else.",

    "admin.cars.heading": "Cars & Motorcycles Management",
    "admin.properties.heading": "Properties & Land Management",
    "admin.listings.heading": "All Listings",
    "admin.listings.searchPlaceholder": "Search listings...",
    "admin.listings.col.category": "Type",
    "admin.listings.col.title": "Listing",
    "admin.listings.col.owner": "Owner",
    "admin.listings.col.price": "Price",
    "admin.listings.col.city": "City",
    "admin.listings.col.status": "Status",
    "admin.listings.col.visibility": "Visibility",
    "admin.listings.col.actions": "Actions",
    "admin.listings.hidden": "Hidden",
    "admin.listings.visible": "Visible",
    "admin.listings.hideBtn": "Hide",
    "admin.listings.unhideBtn": "Unhide",

    "admin.payments.heading": "Payments",
    "admin.payments.simulatedNote": "Data derived from users' current subscription plans. No real payment gateway is connected to this demo site.",
    "admin.payments.mrr": "Estimated monthly revenue",
    "admin.payments.arr": "Estimated yearly revenue",
    "admin.payments.totalSubscribers": "Total subscribers",
    "admin.payments.perYear": "per year",
    "admin.payments.col.user": "User",
    "admin.payments.col.plan": "Plan",
    "admin.payments.col.amount": "Estimated amount",

    "admin.subscriptions.heading": "Subscriptions",
    "admin.subscriptions.col.user": "User",
    "admin.subscriptions.col.plan": "Current plan",
    "admin.subscriptions.col.actions": "Change plan",

    "admin.coupons.heading": "Offers & Coupons",
    "admin.coupons.codePlaceholder": "Coupon code",
    "admin.coupons.discountPlaceholder": "Discount %",
    "admin.coupons.addBtn": "Add",
    "admin.coupons.col.code": "Code",
    "admin.coupons.col.discount": "Discount",
    "admin.coupons.col.status": "Status",
    "admin.coupons.col.actions": "Actions",
    "admin.coupons.active": "Active",
    "admin.coupons.inactive": "Inactive",
    "admin.coupons.activateBtn": "Activate",
    "admin.coupons.deactivateBtn": "Deactivate",

    "admin.reports.heading": "Reports & Complaints",
    "admin.reports.col.listing": "Listing",
    "admin.reports.col.reporter": "Reporter",
    "admin.reports.col.reason": "Reason",
    "admin.reports.col.status": "Status",
    "admin.reports.col.date": "Date",
    "admin.reports.col.actions": "Actions",
    "admin.reports.listingDeleted": "Listing deleted",
    "admin.reports.resolveBtn": "Resolve",
    "admin.reports.dismissBtn": "Dismiss",
    "admin.reports.deleteListingBtn": "Delete listing",
    "admin.reports.status.open": "Open",
    "admin.reports.status.resolved": "Resolved",
    "admin.reports.status.dismissed": "Dismissed",

    "admin.content.heading": "Homepage Content Management",
    "admin.content.note": "Changes here replace the default text per language. Leave a field empty to fall back to the default text.",
    "admin.content.saveBtn": "Save changes",
    "admin.content.arLabel": "Arabic",
    "admin.content.enLabel": "English",
    "admin.content.saved": "Homepage content saved successfully.",

    "admin.settings.heading": "Platform Settings",
    "admin.settings.minAgeLabel": "Minimum signup age",
    "admin.settings.maintenanceModeLabel": "Enable maintenance mode (shows a banner to visitors on the homepage)",
    "admin.settings.maintenanceMessageLabel": "Maintenance message",
    "admin.settings.saveBtn": "Save settings",
    "admin.settings.saved": "Settings saved successfully.",
    "admin.settings.backupHeading": "Data Backup",
    "admin.settings.backupNote": "Export all platform data (users, listings, messages...) as a backup file, or restore from a previous backup.",
    "admin.settings.exportBtn": "Download backup",
    "admin.settings.importBtn": "Import backup",
    "admin.settings.importConfirm": "This will completely replace the current platform data with the backup's data. Continue?",
    "admin.settings.importSuccess": "Backup imported successfully, reloading the page...",
    "admin.settings.importError": "Couldn't read the backup file. Make sure it's a valid JSON file.",

    "admin.adminUsers.heading": "Admin Users",
    "admin.adminUsers.emailPlaceholder": "User's email",
    "admin.adminUsers.grantBtn": "Grant access",
    "admin.adminUsers.col.name": "Name",
    "admin.adminUsers.col.email": "Email",
    "admin.adminUsers.col.role": "Role",
    "admin.adminUsers.col.twoFactor": "Two-factor auth",
    "admin.adminUsers.col.actions": "Actions",
    "admin.adminUsers.enable2fa": "Enable 2FA",
    "admin.adminUsers.disable2fa": "Disable 2FA",
    "admin.adminUsers.revokeBtn": "Revoke access",
    "admin.adminUsers.userNotFound": "No user found with that email.",

    "admin.auditLogs.heading": "Audit Log",
    "admin.auditLogs.col.date": "Date",
    "admin.auditLogs.col.actor": "User",
    "admin.auditLogs.col.action": "Action",
    "admin.auditLogs.col.target": "Target",
    "admin.auditLogs.col.details": "Details",

    "admin.auditAction.login_success": "Successful login",
    "admin.auditAction.login_failed": "Failed login attempt",
    "admin.auditAction.login_blocked_disabled": "Login attempt on a disabled account",
    "admin.auditAction.listing_reported": "Listing reported",
    "admin.auditAction.user_role_changed": "User role changed",
    "admin.auditAction.user_enabled": "User account enabled",
    "admin.auditAction.user_disabled": "User account disabled",
    "admin.auditAction.user_flagged": "User account flagged as suspicious",
    "admin.auditAction.user_unflagged": "User account flag removed",
    "admin.auditAction.user_deleted": "User account deleted",
    "admin.auditAction.user_plan_changed": "User subscription plan changed",
    "admin.auditAction.listing_hidden": "Listing hidden",
    "admin.auditAction.listing_unhidden": "Listing unhidden",
    "admin.auditAction.listing_status_changed": "Listing status changed",
    "admin.auditAction.listing_deleted": "Listing deleted",
    "admin.auditAction.listing_deleted_from_report": "Listing deleted via a report",
    "admin.auditAction.report_resolved": "Report resolved",
    "admin.auditAction.report_dismissed": "Report dismissed",
    "admin.auditAction.coupon_added": "Coupon added",
    "admin.auditAction.coupon_toggled": "Coupon status toggled",
    "admin.auditAction.coupon_deleted": "Coupon deleted",
    "admin.auditAction.site_content_updated": "Homepage content updated",
    "admin.auditAction.site_settings_updated": "Platform settings updated",
    "admin.auditAction.backup_exported": "Backup exported",
    "admin.auditAction.backup_imported": "Backup imported",
    "admin.auditAction.admin_role_granted": "Admin role granted",
    "admin.auditAction.admin_role_revoked": "Admin role revoked",
    "admin.auditAction.admin_2fa_enabled": "Two-factor auth enabled for an admin account",
    "admin.auditAction.admin_2fa_disabled": "Two-factor auth disabled for an admin account",
    "admin.auditAction.admin_2fa_verified": "Two-factor verification succeeded",

    "maintenance.defaultMessage": "The platform is currently under maintenance. We apologize for any inconvenience and will be back shortly.",

    "listingPage.saveChangesBtn": "Save Changes",
    "listingPage.editHeading": "Edit Ad",
    "listingPage.editSub": "Update your ad's details below.",
    "listingPage.currentPhotosLabel": "Current Photos",
    "listingPage.photosHintEdit": "Leave this empty to keep the current photos, or attach new ones to replace them.",
    "listingPage.editSuccess": "Your changes were saved successfully, redirecting...",
    "nav.myListings": "My Ads",
    "meta.myListings.title": "My Ads | Mubasher",
    "myListings.heading": "My Ads",
    "myListings.sub": "Manage your posted ads: edit, delete, or mark as sold.",
    "myListings.loginNotice": "You must log in to view your ads.",
    "myListings.emptyState": "You haven't posted any ads yet.",
    "myListings.viewBtn": "View",
    "myListings.editBtn": "Edit",
    "myListings.deleteBtn": "Delete",
    "myListings.deleteConfirm": "Are you sure you want to delete this ad? This cannot be undone.",
    "myListings.markSoldBtn": "Mark as Sold",
    "myListings.reactivateBtn": "Reactivate Ad",
    "myListings.notOwnerError": "You cannot edit an ad you do not own.",
    "listing.active": "Available",
    "listing.sold": "Sold",
    "nav.messages": "My Messages",
    "spec.km": "km",
    "home.noRealestate": "No properties posted yet. Be the first to post an ad!",
    "home.noVehicles": "No cars or motorcycles posted yet. Be the first to post an ad!",
    "meta.listingDetail.title": "Ad Details | Mubasher",
    "meta.messages.title": "My Messages | Mubasher",
    "messages.heading": "My Messages",
    "messages.sub": "Follow your conversations with ad owners and people interested in your ads.",
    "messages.loginNotice": "You must log in to view your messages.",
    "messages.emptyState": "No messages yet. Browse listings and start a conversation with any ad owner.",
    "messages.deletedListing": "Deleted listing",
    "messages.replyPlaceholder": "Write your reply here...",
    "messages.sendBtn": "Send",
    "messages.noMessagesYet": "No messages in this conversation yet.",
    "legal.updated": "Last updated: September 2026",
    "privacy.heading": "Privacy Policy",
    "privacy.s1.heading": "Introduction",
    "privacy.s1.body": "At Mubasher, we respect our users' privacy. This policy explains what information we collect, how we use it, and how we protect it when you use the platform.",
    "privacy.s2.heading": "Information We Collect",
    "privacy.s2.body": "We collect the information you provide directly when creating an account, such as your name, email, and phone number, along with the details of any ads you post on the platform.",
    "privacy.s3.heading": "How We Use Your Information",
    "privacy.s3.body": "We use your data to operate your account, display your ads to other users, communicate with you about your requests, and improve the platform's services.",
    "privacy.s4.heading": "Information Sharing",
    "privacy.s4.body": "We do not sell your personal data to third parties. Contact details you choose to display in your ad may be shown only to interested users.",
    "privacy.s5.heading": "Data Security",
    "privacy.s5.body": "We take reasonable measures to protect your data from unauthorized access, though no electronic storage system is completely free of security risk.",
    "privacy.s6.heading": "Cookies & Local Storage",
    "privacy.s6.body": "The platform uses local storage in your browser to save your preferences, such as language and login status, to improve your browsing experience.",
    "privacy.s7.heading": "Your Rights",
    "privacy.s7.body": "You have the right to access, update, or request deletion of your account at any time by contacting our support team.",
    "privacy.s8.heading": "Changes to This Policy",
    "privacy.s8.body": "We may update this privacy policy from time to time. Any material changes will be posted on this page along with the update date.",
    "privacy.s9.heading": "Contact Us",
    "privacy.s9.body": "For any questions about this policy or your personal data, you can contact our technical support team through the platform.",
    "terms.heading": "Terms & Conditions",
    "terms.s1.heading": "Introduction",
    "terms.s1.body": "By using the Mubasher platform, you agree to these Terms & Conditions. If you do not agree with any part of them, please do not use the platform.",
    "terms.s2.heading": "Use of the Platform",
    "terms.s2.body": "The platform is used to list and browse ads for real estate, land, cars, and motorcycles only. Using it for any unlawful purpose is prohibited.",
    "terms.s3.heading": "User Accounts",
    "terms.s3.body": "You are responsible for keeping your account credentials and password confidential, and for all activity that occurs under your account. Users must be 18 years of age or older to create an account and use the platform; registration is not permitted for anyone under this age.",
    "terms.s4.heading": "Posting Rules",
    "terms.s4.body": "Information posted in your ad must be accurate and truthful. Misleading or duplicate ads, or ads for items you do not own, are prohibited.",
    "terms.s5.heading": "Liability",
    "terms.s5.body": "The platform is only an intermediary for displaying ads and is not liable for any direct dealings or disputes between buyers and sellers.",
    "terms.s6.heading": "Intellectual Property",
    "terms.s6.body": "All design elements and the platform's logo are protected and may not be copied or reused without prior permission.",
    "terms.s7.heading": "Termination",
    "terms.s7.body": "The platform reserves the right to suspend or terminate any account that violates these terms, without prior notice in cases of serious violations.",
    "terms.s8.heading": "Changes to These Terms",
    "terms.s8.body": "These terms may be updated from time to time. Continuing to use the platform after an update constitutes acceptance of the new terms.",
    "terms.s9.heading": "Contact Us",
    "terms.s9.body": "For any questions about these terms, you can contact our technical support team through the platform.",
    }
  };

  /* ---------- محرك الترجمة ---------- */
  function t(key) {
    var overrides = getSiteContentOverrides();
    if (overrides[currentLang] && overrides[currentLang][key]) {
      return overrides[currentLang][key];
    }
    var dict = I18N[currentLang] || I18N.ar;
    return dict[key] !== undefined ? dict[key] : (I18N.ar[key] !== undefined ? I18N.ar[key] : key);
  }

  function applyTranslations() {
    document.documentElement.setAttribute("lang", currentLang === "ar" ? "ar" : "en");
    document.documentElement.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      el.textContent = t(key);
      if (el.tagName === "TITLE") document.title = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key));
    });

    var langToggle = document.getElementById("langToggle");
    if (langToggle) {
      langToggle.textContent = currentLang === "ar" ? "English" : "العربية";
    }
  }

  function setLang(lang) {
    currentLang = lang === "en" ? "en" : "ar";
    localStorage.setItem(LANG_KEY, currentLang);
    applyTranslations();
    initHeaderAuthState();
    if (typeof window.__rerenderPage === "function") {
      window.__rerenderPage();
    }
  }

  function initLangToggle() {
    var btn = document.getElementById("langToggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      setLang(currentLang === "ar" ? "en" : "ar");
    });
  }

  /* ---------- تخزين المستخدمين والجلسة ---------- */
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  function findUser(identifier) {
    if (!identifier) return null;
    var users = getUsers();
    return (
      users.find(function (u) {
        return u.email === identifier || u.phone === identifier;
      }) || null
    );
  }
  function updateUserRecord(email, patch) {
    var users = getUsers();
    var idx = users.findIndex(function (u) {
      return u.email === email;
    });
    if (idx === -1) return null;
    users[idx] = Object.assign({}, users[idx], patch);
    saveUsers(users);
    return users[idx];
  }
  function getSession() {
    return localStorage.getItem(SESSION_KEY);
  }
  function setSession(email) {
    localStorage.setItem(SESSION_KEY, email);
  }
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  /* ---------- تخزين الإعلانات ---------- */
  var LISTINGS_KEY = "eqari_listings";

  function getListings() {
    try {
      return JSON.parse(localStorage.getItem(LISTINGS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function saveListings(listings) {
    localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
  }
  function genId() {
    return "l_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
  }
  function addListing(listing) {
    var listings = getListings();
    listings.push(listing);
    saveListings(listings);
    return listing;
  }
  function getListingById(id) {
    if (!id) return null;
    return (
      getListings().find(function (l) {
        return l.id === id;
      }) || null
    );
  }
  function updateListing(id, patch) {
    var listings = getListings();
    var idx = listings.findIndex(function (l) {
      return l.id === id;
    });
    if (idx === -1) return null;
    listings[idx] = Object.assign({}, listings[idx], patch);
    saveListings(listings);
    return listings[idx];
  }
  function deleteListing(id) {
    var listings = getListings().filter(function (l) {
      return l.id !== id;
    });
    saveListings(listings);
  }
  function getListingStatus(listing) {
    return listing && listing.status === "sold" ? "sold" : "active";
  }
  function getUserStatus(user) {
    return user && user.status === "disabled" ? "disabled" : "active";
  }

  /* ---------- مرحلة الحساب: مراجعة الهوية والاشتراك والتجربة المجانية ---------- */
  var TRIAL_DAYS = 7;
  function getAccountStage(user) {
    if (!user) return "pending_review";
    if (!user.reviewStatus || user.reviewStatus === "pending") return "pending_review";
    if (user.reviewStatus === "rejected") return "rejected";
    if (user.subscriptionStatus === "active") return "active";
    if (user.trialEndsAt && Date.now() <= user.trialEndsAt) return "trial";
    return "expired";
  }
  function approveUserAccount(email) {
    var trialStart = Date.now();
    var trialEnd = trialStart + TRIAL_DAYS * 24 * 60 * 60 * 1000;
    return updateUserRecord(email, {
      reviewStatus: "approved",
      rejectionReason: "",
      reviewedAt: trialStart,
      trialStartsAt: trialStart,
      trialEndsAt: trialEnd,
      subscriptionStatus: "trial",
    });
  }
  function rejectUserAccount(email, reason) {
    return updateUserRecord(email, {
      reviewStatus: "rejected",
      rejectionReason: reason || "",
      reviewedAt: Date.now(),
    });
  }
  function activateSubscriptionPayment(email, paymentMethod) {
    return updateUserRecord(email, {
      subscriptionStatus: "active",
      paymentMethod: paymentMethod,
      paidAt: Date.now(),
    });
  }

  /* ---------- تخزين الرسائل بين المستخدمين ---------- */
  var MESSAGES_KEY = "eqari_messages";

  function getMessages() {
    try {
      return JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function saveMessages(messages) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }
  function sendMessage(data) {
    var messages = getMessages();
    var message = {
      id: "m_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9),
      listingId: data.listingId,
      fromEmail: data.fromEmail,
      toEmail: data.toEmail,
      body: data.body,
      createdAt: Date.now(),
    };
    messages.push(message);
    saveMessages(messages);
    return message;
  }
  function getThreadsForUser(email) {
    var msgs = getMessages().filter(function (m) {
      return m.fromEmail === email || m.toEmail === email;
    });
    var map = {};
    msgs.forEach(function (m) {
      var other = m.fromEmail === email ? m.toEmail : m.fromEmail;
      var key = m.listingId + "|" + other;
      if (!map[key]) map[key] = { listingId: m.listingId, other: other, messages: [] };
      map[key].messages.push(m);
    });
    return Object.keys(map)
      .map(function (k) {
        var thread = map[k];
        thread.messages.sort(function (a, b) {
          return a.createdAt - b.createdAt;
        });
        thread.lastMessage = thread.messages[thread.messages.length - 1];
        return thread;
      })
      .sort(function (a, b) {
        return b.lastMessage.createdAt - a.lastMessage.createdAt;
      });
  }

  /* ================= طبقة بيانات لوحة تحكم الإدارة (Admin) ================= */

  /* ---------- الأدوار والصلاحيات ---------- */
  var ADMIN_ROLES = {
    super_admin: {
      labelKey: "adminRole.super_admin",
      sections: [
        "dashboard", "users", "cars", "properties", "listings", "payments",
        "subscriptions", "reports", "content", "settings", "adminUsers", "auditLogs",
      ],
    },
    admin: {
      labelKey: "adminRole.admin",
      sections: ["dashboard", "users", "cars", "properties", "listings", "reports"],
    },
    moderator: {
      labelKey: "adminRole.moderator",
      sections: ["dashboard", "listings", "cars", "properties", "reports"],
    },
    support: {
      labelKey: "adminRole.support",
      sections: ["dashboard", "users", "reports"],
    },
    finance_admin: {
      labelKey: "adminRole.finance_admin",
      sections: ["dashboard", "payments", "subscriptions"],
    },
    content_admin: {
      labelKey: "adminRole.content_admin",
      sections: ["dashboard", "content", "settings"],
    },
  };
  var ADMIN_SECTION_ORDER = [
    "dashboard", "users", "cars", "properties", "listings", "payments",
    "subscriptions", "reports", "content", "settings", "adminUsers", "auditLogs",
  ];
  function isAdminRole(role) {
    return !!role && !!ADMIN_ROLES[role];
  }
  function getAdminUsersList() {
    return getUsers().filter(function (u) {
      return isAdminRole(u.role);
    });
  }
  function superAdminExists(excludeEmail) {
    return getAdminUsersList().some(function (u) {
      return u.role === "super_admin" && u.email !== excludeEmail;
    });
  }
  function roleAllowsSection(role, section) {
    return !!(ADMIN_ROLES[role] && ADMIN_ROLES[role].sections.indexOf(section) !== -1);
  }

  /* ---------- سجل العمليات (Audit Log) ---------- */
  var AUDIT_LOG_KEY = "eqari_audit_log";
  function getAuditLog() {
    try {
      return JSON.parse(localStorage.getItem(AUDIT_LOG_KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function logAuditEvent(action, target, details, actorOverride) {
    var log = getAuditLog();
    log.push({
      id: "a_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7),
      actorEmail: actorOverride || getSession() || "—",
      action: action,
      target: target || "",
      details: details || "",
      createdAt: Date.now(),
    });
    // نحتفظ بآخر 500 سجل فقط لتجنّب تضخم التخزين المحلي
    if (log.length > 500) log = log.slice(log.length - 500);
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(log));
  }

  /* ---------- البلاغات والشكاوى ---------- */
  var REPORTS_KEY = "eqari_reports";
  function getReports() {
    try {
      return JSON.parse(localStorage.getItem(REPORTS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function saveReports(reports) {
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  }
  function addReport(data) {
    var reports = getReports();
    var report = {
      id: "r_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7),
      listingId: data.listingId,
      reporterEmail: data.reporterEmail,
      reason: data.reason,
      details: data.details || "",
      status: "open",
      createdAt: Date.now(),
    };
    reports.push(report);
    saveReports(reports);
    return report;
  }
  function updateReport(id, patch) {
    var reports = getReports();
    var idx = reports.findIndex(function (r) {
      return r.id === id;
    });
    if (idx === -1) return null;
    reports[idx] = Object.assign({}, reports[idx], patch);
    saveReports(reports);
    return reports[idx];
  }

  /* ---------- الكوبونات والعروض ---------- */
  var COUPONS_KEY = "eqari_coupons";
  function getCoupons() {
    try {
      return JSON.parse(localStorage.getItem(COUPONS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function saveCoupons(coupons) {
    localStorage.setItem(COUPONS_KEY, JSON.stringify(coupons));
  }
  function addCoupon(data) {
    var coupons = getCoupons();
    var coupon = {
      id: "c_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7),
      code: data.code,
      discountPercent: data.discountPercent,
      active: true,
      createdAt: Date.now(),
    };
    coupons.push(coupon);
    saveCoupons(coupons);
    return coupon;
  }
  function deleteCoupon(id) {
    saveCoupons(
      getCoupons().filter(function (c) {
        return c.id !== id;
      })
    );
  }

  /* ---------- محتوى الصفحة الرئيسية القابل للتعديل (Content Admin) ---------- */
  var CONTENT_KEY = "eqari_site_content";
  function getSiteContentOverrides() {
    try {
      return JSON.parse(localStorage.getItem(CONTENT_KEY)) || { ar: {}, en: {} };
    } catch (e) {
      return { ar: {}, en: {} };
    }
  }
  function saveSiteContentOverride(lang, key, value) {
    var data = getSiteContentOverrides();
    if (!data[lang]) data[lang] = {};
    if (value === "") {
      delete data[lang][key];
    } else {
      data[lang][key] = value;
    }
    localStorage.setItem(CONTENT_KEY, JSON.stringify(data));
  }
  var EDITABLE_CONTENT_KEYS = [
    "hero.eyebrow", "hero.title", "hero.subtitle",
    "promo.heading", "promo.sub",
    "footer.about",
  ];

  /* ---------- إعدادات المنصة العامة (Settings) ---------- */
  var SETTINGS_KEY = "eqari_site_settings";
  var DEFAULT_SETTINGS = { minAge: 18, maintenanceMode: false, maintenanceMessage: "" };
  function getSiteSettings() {
    try {
      return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {});
    } catch (e) {
      return Object.assign({}, DEFAULT_SETTINGS);
    }
  }
  function saveSiteSettings(patch) {
    var current = getSiteSettings();
    var updated = Object.assign({}, current, patch);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  }

  /* ---------- عرض بيانات الإعلان (عنوان، موقع، سعر، مواصفات) ---------- */
  function readFilesAsDataURLs(fileList) {
    var files = Array.prototype.slice.call(fileList);
    return Promise.all(
      files.map(function (file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function () {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );
  }
  function getCategoryLabel(cat) {
    return t("listingPage.cat." + cat);
  }
  /* ---------- تنسيق الأرقام بفواصل الآلاف لسهولة القراءة والكتابة ---------- */
  function stripSeparators(str) {
    return String(str || "").replace(/[^\d]/g, "");
  }
  function formatNumberWithSeparators(digitsStr) {
    var clean = stripSeparators(digitsStr);
    if (!clean) return "";
    var sep = currentLang === "ar" ? "٬" : ",";
    return clean.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  }
  function attachThousandsFormatting(inputEl) {
    if (!inputEl) return;
    inputEl.addEventListener("input", function () {
      var cursorFromEnd = inputEl.value.length - inputEl.selectionStart;
      var clean = stripSeparators(inputEl.value);
      inputEl.value = formatNumberWithSeparators(clean);
      var newPos = Math.max(0, inputEl.value.length - cursorFromEnd);
      inputEl.setSelectionRange(newPos, newPos);
    });
  }
  function formatPrice(listing) {
    var n = Number(listing.price) || 0;
    var formatted = n.toLocaleString(currentLang === "ar" ? "ar-EG" : "en-US");
    var text = formatted + " " + t("plan.currency");
    if (listing.offerType === "rent") {
      text += " / " + t("plan.perMonth");
    }
    return text;
  }
  /* ---------- قوائم شركات وموديلات السيارات والدراجات النارية (ثنائية اللغة) ---------- */
  var CAR_DATA = {
    toyota: { label: { ar: "تويوتا", en: "Toyota" }, models: {
      camry: { ar: "كامري", en: "Camry" }, corolla: { ar: "كورولا", en: "Corolla" },
      landcruiser: { ar: "لاندكروزر", en: "Land Cruiser" }, hilux: { ar: "هايلكس", en: "Hilux" },
      rav4: { ar: "راف 4", en: "RAV4" }, yaris: { ar: "يارس", en: "Yaris" },
      prado: { ar: "برادو", en: "Prado" }, avalon: { ar: "أفالون", en: "Avalon" }, avanza: { ar: "أفانزا", en: "Avanza" },
    } },
    hyundai: { label: { ar: "هيونداي", en: "Hyundai" }, models: {
      sonata: { ar: "سوناتا", en: "Sonata" }, elantra: { ar: "إلنترا", en: "Elantra" },
      tucson: { ar: "توسان", en: "Tucson" }, accent: { ar: "أكسنت", en: "Accent" },
      santafe: { ar: "سانتافي", en: "Santa Fe" }, creta: { ar: "كريتا", en: "Creta" }, azera: { ar: "أزيرا", en: "Azera" },
    } },
    mercedes: { label: { ar: "مرسيدس", en: "Mercedes-Benz" }, models: {
      c200: { ar: "C200", en: "C200" }, e200: { ar: "E200", en: "E200" }, s500: { ar: "S500", en: "S500" },
      glc: { ar: "GLC", en: "GLC" }, gle: { ar: "GLE", en: "GLE" }, gla: { ar: "GLA", en: "GLA" }, gls: { ar: "GLS", en: "GLS" },
    } },
    nissan: { label: { ar: "نيسان", en: "Nissan" }, models: {
      altima: { ar: "التيما", en: "Altima" }, sunny: { ar: "صني", en: "Sunny" },
      patrol: { ar: "باترول", en: "Patrol" }, xtrail: { ar: "إكس تريل", en: "X-Trail" },
      sentra: { ar: "صنترا", en: "Sentra" }, qashqai: { ar: "قشقاي", en: "Qashqai" }, navara: { ar: "نافارا", en: "Navara" },
    } },
    kia: { label: { ar: "كيا", en: "Kia" }, models: {
      cerato: { ar: "سيراتو", en: "Cerato" }, sportage: { ar: "سبورتاج", en: "Sportage" },
      optima: { ar: "أوبتيما", en: "Optima" }, sorento: { ar: "سورينتو", en: "Sorento" },
      picanto: { ar: "بيكانتو", en: "Picanto" }, rio: { ar: "ريو", en: "Rio" },
    } },
    ford: { label: { ar: "فورد", en: "Ford" }, models: {
      f150: { ar: "F150", en: "F150" }, explorer: { ar: "إكسبلورر", en: "Explorer" },
      fusion: { ar: "فيوجن", en: "Fusion" }, edge: { ar: "إيدج", en: "Edge" },
      ranger: { ar: "رينجر", en: "Ranger" }, ecosport: { ar: "إيكوسبورت", en: "EcoSport" },
    } },
    chevrolet: { label: { ar: "شيفروليه", en: "Chevrolet" }, models: {
      caprice: { ar: "كابرس", en: "Caprice" }, tahoe: { ar: "تاهو", en: "Tahoe" },
      malibu: { ar: "ماليبو", en: "Malibu" }, silverado: { ar: "سيلفرادو", en: "Silverado" },
      aveo: { ar: "أفيو", en: "Aveo" }, cruze: { ar: "كروز", en: "Cruze" },
    } },
    lexus: { label: { ar: "لكزس", en: "Lexus" }, models: {
      es: { ar: "ES", en: "ES" }, rx: { ar: "RX", en: "RX" }, lx: { ar: "LX", en: "LX" }, gx: { ar: "GX", en: "GX" }, nx: { ar: "NX", en: "NX" },
    } },
    bmw: { label: { ar: "بي إم دبليو", en: "BMW" }, models: {
      series3: { ar: "الفئة 3", en: "3 Series" }, series5: { ar: "الفئة 5", en: "5 Series" },
      x5: { ar: "X5", en: "X5" }, x3: { ar: "X3", en: "X3" }, x6: { ar: "X6", en: "X6" },
    } },
    honda: { label: { ar: "هوندا", en: "Honda" }, models: {
      accord: { ar: "أكورد", en: "Accord" }, civic: { ar: "سيفيك", en: "Civic" },
      crv: { ar: "CR-V", en: "CR-V" }, pilot: { ar: "بايلوت", en: "Pilot" }, hrv: { ar: "HR-V", en: "HR-V" },
    } },
    mazda: { label: { ar: "مازدا", en: "Mazda" }, models: {
      mazda3: { ar: "مازدا 3", en: "Mazda 3" }, mazda6: { ar: "مازدا 6", en: "Mazda 6" },
      cx5: { ar: "CX-5", en: "CX-5" }, cx9: { ar: "CX-9", en: "CX-9" },
    } },
    mitsubishi: { label: { ar: "ميتسوبيشي", en: "Mitsubishi" }, models: {
      pajero: { ar: "باجيرو", en: "Pajero" }, lancer: { ar: "لانسر", en: "Lancer" },
      outlander: { ar: "أوتلاندر", en: "Outlander" }, l200: { ar: "L200", en: "L200" },
    } },
    suzukiCar: { label: { ar: "سوزوكي", en: "Suzuki" }, models: {
      swift: { ar: "سويفت", en: "Swift" }, vitara: { ar: "فيتارا", en: "Vitara" },
      alto: { ar: "ألتو", en: "Alto" }, ciaz: { ar: "سياز", en: "Ciaz" },
    } },
    geely: { label: { ar: "جيلي", en: "Geely" }, models: {
      emgrand: { ar: "إمجراند", en: "Emgrand" }, coolray: { ar: "كولراي", en: "Coolray" }, azkarra: { ar: "أزكارا", en: "Azkarra" },
    } },
    mg: { label: { ar: "إم جي", en: "MG" }, models: {
      mg5: { ar: "MG5", en: "MG5" }, mgzs: { ar: "MG ZS", en: "MG ZS" }, mgrx5: { ar: "MG RX5", en: "MG RX5" }, mghs: { ar: "MG HS", en: "MG HS" },
    } },
    haval: { label: { ar: "هافال", en: "Haval" }, models: {
      h6: { ar: "H6", en: "H6" }, jolion: { ar: "جوليون", en: "Jolion" }, h2: { ar: "H2", en: "H2" },
    } },
    byd: { label: { ar: "بي واي دي", en: "BYD" }, models: {
      f3: { ar: "F3", en: "F3" }, song: { ar: "سونج", en: "Song" }, tang: { ar: "تانج", en: "Tang" },
    } },
    peugeot: { label: { ar: "بيجو", en: "Peugeot" }, models: {
      p308: { ar: "308", en: "308" }, p3008: { ar: "3008", en: "3008" }, p5008: { ar: "5008", en: "5008" }, p206: { ar: "206", en: "206" },
    } },
    volkswagen: { label: { ar: "فولكس واجن", en: "Volkswagen" }, models: {
      passat: { ar: "باسات", en: "Passat" }, tiguan: { ar: "تيجوان", en: "Tiguan" },
      golf: { ar: "جولف", en: "Golf" }, jetta: { ar: "جيتا", en: "Jetta" },
    } },
  };
  var MOTO_DATA = {
    hondaMoto: { label: { ar: "هوندا", en: "Honda" }, models: {
      cb150: { ar: "CB150", en: "CB150" }, cbr500: { ar: "CBR500", en: "CBR500" },
      africatwin: { ar: "أفريكا توين", en: "Africa Twin" }, pcx: { ar: "PCX", en: "PCX" }, cg125: { ar: "CG125", en: "CG125" },
    } },
    yamaha: { label: { ar: "ياماها", en: "Yamaha" }, models: {
      ybr125: { ar: "YBR125", en: "YBR125" }, r15: { ar: "R15", en: "R15" },
      mt07: { ar: "MT-07", en: "MT-07" }, nmax: { ar: "NMAX", en: "NMAX" }, crypton: { ar: "Crypton", en: "Crypton" },
    } },
    kawasaki: { label: { ar: "كاواساكي", en: "Kawasaki" }, models: {
      ninja400: { ar: "Ninja 400", en: "Ninja 400" }, z900: { ar: "Z900", en: "Z900" }, versys: { ar: "Versys", en: "Versys" },
    } },
    suzukiMoto: { label: { ar: "سوزوكي", en: "Suzuki" }, models: {
      gsxr: { ar: "GSX-R", en: "GSX-R" }, gn125: { ar: "GN125", en: "GN125" },
      vstrom: { ar: "V-Strom", en: "V-Strom" }, en125: { ar: "EN125", en: "EN125" },
    } },
    bajaj: { label: { ar: "باجاج", en: "Bajaj" }, models: {
      pulsar150: { ar: "بولسار 150", en: "Pulsar 150" }, pulsar200: { ar: "بولسار 200", en: "Pulsar 200" },
      discover: { ar: "ديسكفر", en: "Discover" }, platina: { ar: "بلاتينا", en: "Platina" },
    } },
    tvs: { label: { ar: "TVS", en: "TVS" }, models: {
      apache: { ar: "أباتشي", en: "Apache" }, starcity: { ar: "ستار سيتي", en: "Star City" }, xl100: { ar: "XL100", en: "XL100" },
    } },
    lifan: { label: { ar: "لِفان", en: "Lifan" }, models: {
      lf150: { ar: "LF150", en: "LF150" }, lf200: { ar: "LF200", en: "LF200" }, kpr: { ar: "KPR", en: "KPR" },
    } },
    zongshen: { label: { ar: "زونغشن", en: "Zongshen" }, models: {
      zs150: { ar: "ZS150", en: "ZS150" }, zs200: { ar: "ZS200", en: "ZS200" },
    } },
    loncin: { label: { ar: "لونشين", en: "Loncin" }, models: {
      lx150: { ar: "LX150", en: "LX150" }, lx200: { ar: "LX200", en: "LX200" },
    } },
    sym: { label: { ar: "سيم (SYM)", en: "SYM" }, models: {
      wolf125: { ar: "Wolf 125", en: "Wolf 125" }, jet14: { ar: "Jet 14", en: "Jet 14" },
    } },
    cfmoto: { label: { ar: "سي إف موتو", en: "CFMoto" }, models: {
      cf150: { ar: "CF150", en: "CF150" }, cf250: { ar: "CF250", en: "CF250" },
    } },
    rocket: { label: { ar: "روكيت", en: "Rocket" }, models: {
      rocket125: { ar: "روكيت 125", en: "Rocket 125" }, rocket150: { ar: "روكيت 150", en: "Rocket 150" },
    } },
  };
  function getBrandLabel(data, brandId) {
    var entry = data[brandId];
    if (!entry) return brandId || "";
    return entry.label[currentLang] || entry.label.ar;
  }
  function getModelLabel(data, brandId, modelId) {
    var entry = data[brandId];
    var model = entry && entry.models[modelId];
    if (!model) return modelId || "";
    return model[currentLang] || model.ar;
  }
  function buildListingTitle(listing) {
    if (listing.category === "car") {
      return [getBrandLabel(CAR_DATA, listing.carBrand), getModelLabel(CAR_DATA, listing.carBrand, listing.carModel), listing.carYear]
        .filter(Boolean)
        .join(" ");
    }
    if (listing.category === "motorcycle") {
      return [getBrandLabel(MOTO_DATA, listing.motoBrand), getModelLabel(MOTO_DATA, listing.motoBrand, listing.motoModel), listing.motoYear]
        .filter(Boolean)
        .join(" ");
    }
    if (listing.category === "land") {
      return getCategoryLabel("land") + " — " + t("landType." + listing.landType);
    }
    if (listing.category === "residential") {
      return getCategoryLabel("residential") + " — " + listing.resRooms + " " + t("spec.rooms");
    }
    if (listing.category === "commercial") {
      return t("comType." + listing.comType);
    }
    return getCategoryLabel(listing.category);
  }
  function buildListingLocation(listing) {
    var city = t("city." + listing.city);
    var addr = listing.landAddress || listing.resAddress || listing.comAddress;
    return addr ? city + " — " + addr : city;
  }
  function buildListingSpecs(listing) {
    var specs = [];
    if (listing.category === "residential") {
      specs.push({ value: listing.resRooms, unit: t("spec.rooms") });
      specs.push({ value: listing.resArea, unit: t("spec.sqm") });
      specs.push({ value: listing.resBaths, unit: t("spec.baths") });
    } else if (listing.category === "land") {
      specs.push({ value: listing.landArea, unit: t("spec.sqm") });
      specs.push({ value: null, unit: t("landType." + listing.landType) });
    } else if (listing.category === "commercial") {
      specs.push({ value: listing.comArea, unit: t("spec.sqm") });
    } else if (listing.category === "car" || listing.category === "motorcycle") {
      var odo = listing.category === "car" ? listing.carOdometer : listing.motoOdometer;
      if (odo !== undefined && odo !== "" && odo !== null) {
        specs.push({ value: formatNumberWithSeparators(odo), unit: t("spec.km") });
      }
    }
    return specs;
  }
  function appendSpecsToEl(container, listing) {
    container.innerHTML = "";
    buildListingSpecs(listing).forEach(function (spec) {
      var span = document.createElement("span");
      if (spec.value !== null && spec.value !== undefined && spec.value !== "") {
        var b = document.createElement("b");
        b.textContent = spec.value;
        span.appendChild(b);
        span.appendChild(document.createTextNode(" " + spec.unit));
      } else {
        span.textContent = spec.unit;
      }
      container.appendChild(span);
    });
  }

  /* ---------- عرض إعلانات الصفحة الرئيسية ---------- */
  function createListingCardEl(listing) {
    var isSold = getListingStatus(listing) === "sold";
    var a = document.createElement("a");
    a.className = "card card-link" + (isSold ? " card-sold" : "");
    a.href = "listing.html?id=" + encodeURIComponent(listing.id);

    var media = document.createElement("div");
    media.className = "card-media";
    if (listing.photos && listing.photos[0]) {
      media.style.backgroundImage = "url('" + listing.photos[0] + "')";
    } else {
      media.classList.add("card-media-empty");
    }
    var badge = document.createElement("span");
    if (isSold) {
      badge.className = "badge badge-sold";
      badge.textContent = t("listing.sold");
    } else {
      badge.className = "badge" + (listing.offerType !== "rent" ? " sale" : "");
      badge.textContent = listing.offerType === "rent" ? t("offer.rent") : t("offer.sale");
    }
    media.appendChild(badge);
    a.appendChild(media);

    var body = document.createElement("div");
    body.className = "card-body";

    var price = document.createElement("div");
    price.className = "card-price";
    price.textContent = formatPrice(listing);
    body.appendChild(price);

    var title = document.createElement("div");
    title.className = "card-title";
    title.textContent = buildListingTitle(listing);
    body.appendChild(title);

    var loc = document.createElement("div");
    loc.className = "card-loc";
    loc.textContent = buildListingLocation(listing);
    body.appendChild(loc);

    var specs = document.createElement("div");
    specs.className = "card-specs";
    appendSpecsToEl(specs, listing);
    body.appendChild(specs);

    a.appendChild(body);
    return a;
  }

  function renderHomeListings() {
    var reContainer = document.getElementById("realestateGrid");
    var vehContainer = document.getElementById("vehiclesGrid");
    if (!reContainer && !vehContainer) return;

    var listings = getListings()
      .filter(function (l) {
        return !l.hidden;
      })
      .sort(function (a, b) {
        return b.createdAt - a.createdAt;
      });
    var reListings = listings.filter(function (l) {
      return l.category === "land" || l.category === "residential" || l.category === "commercial";
    });
    var vehListings = listings.filter(function (l) {
      return l.category === "car" || l.category === "motorcycle";
    });

    function fill(container, items, emptyKey) {
      if (!container) return;
      container.innerHTML = "";
      if (!items.length) {
        var empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = t(emptyKey);
        container.appendChild(empty);
        return;
      }
      items.slice(0, 6).forEach(function (listing) {
        container.appendChild(createListingCardEl(listing));
      });
    }

    fill(reContainer, reListings, "home.noRealestate");
    fill(vehContainer, vehListings, "home.noVehicles");
  }

  /* ---------- أدوات مشتركة ---------- */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  function isValidPhone(value) {
    return /^0\d{9}$/.test(value.trim());
  }
  function calculateAge(birthdateStr) {
    var b = new Date(birthdateStr);
    if (isNaN(b.getTime())) return null;
    var today = new Date();
    if (b.getTime() > today.getTime()) return null;
    var age = today.getFullYear() - b.getFullYear();
    var m = today.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < b.getDate())) age--;
    return age;
  }

  /* ---------- حالة الدخول في هيدر الصفحة الرئيسية ---------- */
  function renderBrandAvatar() {
    var avatarEl = document.getElementById("brandAvatar");
    if (!avatarEl) return;
    var session = getSession();
    var user = session ? findUser(session) : null;

    if (user) {
      avatarEl.classList.add("brand-mark-clickable");
      avatarEl.setAttribute("role", "button");
      avatarEl.setAttribute("tabindex", "0");
      avatarEl.onclick = function () {
        if (profileModalOpenFn) profileModalOpenFn();
      };
      if (user.photo) {
        avatarEl.style.backgroundImage = "url('" + user.photo + "')";
        avatarEl.classList.add("has-photo");
        avatarEl.textContent = "";
      } else {
        avatarEl.style.backgroundImage = "";
        avatarEl.classList.remove("has-photo");
        avatarEl.textContent = "م";
      }
    } else {
      avatarEl.classList.remove("brand-mark-clickable", "has-photo");
      avatarEl.removeAttribute("role");
      avatarEl.removeAttribute("tabindex");
      avatarEl.onclick = null;
      avatarEl.style.backgroundImage = "";
      avatarEl.textContent = "م";
    }
  }

  /* ---------- شارة اسم المستخدم وصورته أعلى جميع الصفحات ---------- */
  function renderHeaderUserBadge() {
    var badge = document.getElementById("headerUserBadge");
    if (!badge) return;
    var avatarEl = document.getElementById("headerUserAvatar");
    var nameEl = document.getElementById("headerUserName");
    var session = getSession();
    var user = session ? findUser(session) : null;

    if (!user) {
      badge.classList.remove("show");
      badge.onclick = null;
      return;
    }

    badge.classList.add("show");
    badge.setAttribute("role", "button");
    badge.setAttribute("tabindex", "0");
    badge.onclick = function () {
      if (profileModalOpenFn) profileModalOpenFn();
    };

    if (avatarEl) {
      if (user.photo) {
        avatarEl.style.backgroundImage = "url('" + user.photo + "')";
        avatarEl.classList.add("has-photo");
        avatarEl.textContent = "";
      } else {
        avatarEl.style.backgroundImage = "";
        avatarEl.classList.remove("has-photo");
        avatarEl.textContent = (user.name || user.email || "م").trim().charAt(0).toUpperCase();
      }
    }
    if (nameEl) {
      nameEl.textContent = user.name || user.email || "";
    }
  }

  function initHeaderAuthState() {
    var authActions = document.getElementById("authActions");
    var messagesLink = document.getElementById("navMessagesLink");
    var myListingsLink = document.getElementById("navMyListingsLink");
    var subscriptionLink = document.getElementById("navSubscriptionLink");
    var session = getSession();

    if (messagesLink) {
      messagesLink.style.display = session ? "" : "none";
    }
    if (myListingsLink) {
      var hasOwnListings =
        !!session &&
        getListings().some(function (l) {
          return l.ownerEmail === session;
        });
      myListingsLink.style.display = hasOwnListings ? "" : "none";
    }
    if (subscriptionLink) {
      subscriptionLink.style.display = session ? "" : "none";
    }

    renderBrandAvatar();
    renderHeaderUserBadge();

    if (!authActions) return;

    var loginBtn = document.getElementById("navLoginBtn");
    var signupBtn = document.getElementById("navSignupBtn");

    if (session) {
      if (signupBtn) signupBtn.style.display = "none";
      if (loginBtn) {
        loginBtn.removeAttribute("data-i18n");
        loginBtn.textContent = t("auth.logout");
        loginBtn.setAttribute("href", "#");
        loginBtn.addEventListener("click", function (e) {
          e.preventDefault();
          clearSession();
          window.location.href = "index.html";
        });
      }
    }
  }

  /* ---------- تبويبات البحث بالصفحة الرئيسية ---------- */
  function initSearchTabs() {
    var tabs = document.querySelectorAll(".search-tab");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t2) {
          t2.classList.remove("active");
        });
        tab.classList.add("active");
      });
    });
  }

  /* ---------- نموذج إنشاء حساب ---------- */
  function initSignupForm() {
    var form = document.getElementById("signupForm");
    if (!form) return;

    var status = document.getElementById("formStatus");
    var submitBtn = document.getElementById("submitBtn");

    var nameField = document.getElementById("nameField");
    var emailField = document.getElementById("emailField");
    var phoneField = document.getElementById("phoneField");
    var birthdateField = document.getElementById("birthdateField");
    var nationalIdField = document.getElementById("nationalIdField");
    var idPhotoField = document.getElementById("idPhotoField");
    var passwordField = document.getElementById("passwordField");
    var confirmField = document.getElementById("confirmField");

    var nameInput = document.getElementById("fullName");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var birthdateInput = document.getElementById("birthdate");
    var profilePhotoInput = document.getElementById("profilePhoto");
    var nationalIdInput = document.getElementById("nationalId");
    var idPhotoInput = document.getElementById("idPhoto");
    var passwordInput = document.getElementById("password");
    var confirmInput = document.getElementById("confirmPassword");
    var termsInput = document.getElementById("terms");

    function setInvalid(fieldEl, invalid) {
      fieldEl.classList.toggle("invalid", invalid);
    }

    /* ---------- خطة الاشتراك (شهري / سنوي بخصم) ---------- */
    var planOptions = document.querySelectorAll(".plan-option");
    if (planOptions.length) {
      planOptions.forEach(function (option) {
        var radio = option.querySelector('input[type="radio"]');
        radio.addEventListener("change", function () {
          planOptions.forEach(function (o) {
            o.classList.toggle("active", o === option);
          });
        });
      });
    }
    function getSelectedPlan() {
      var checked = document.querySelector('input[name="plan"]:checked');
      return checked ? checked.value : "monthly";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.classList.remove("show", "success", "error");

      var nameValid = nameInput.value.trim().length >= 2;
      var emailValid = isValidEmail(emailInput.value.trim());
      var phoneValid = isValidPhone(phoneInput.value);
      var passwordValid = passwordInput.value.length >= 6;
      var confirmValid =
        confirmInput.value === passwordInput.value && confirmInput.value.length > 0;

      var birthdateRaw = birthdateInput ? birthdateInput.value : "";
      var age = birthdateRaw ? calculateAge(birthdateRaw) : null;
      var birthdateFilled = birthdateRaw !== "" && age !== null;
      var minAge = getSiteSettings().minAge || 18;
      var ageOk = birthdateFilled && age >= minAge;
      var birthdateValid = birthdateFilled && ageOk;

      var profilePhotoField = document.getElementById("profilePhotoField");
      var photoValid =
        !!profilePhotoInput && !!profilePhotoInput.files && profilePhotoInput.files.length > 0;

      var nationalIdValid = !!nationalIdInput && nationalIdInput.value.trim().length >= 5;
      var idPhotoValid = !!idPhotoInput && !!idPhotoInput.files && idPhotoInput.files.length > 0;

      setInvalid(nameField, !nameValid);
      setInvalid(emailField, !emailValid);
      setInvalid(phoneField, !phoneValid);
      setInvalid(passwordField, !passwordValid);
      setInvalid(confirmField, !confirmValid);
      if (birthdateField) {
        setInvalid(birthdateField, !birthdateValid);
        var birthdateErrorMsg = document.getElementById("birthdateErrorMsg");
        if (birthdateErrorMsg) {
          birthdateErrorMsg.textContent =
            birthdateFilled && !ageOk ? t("auth.ageRequirement") : t("error.birthdate");
        }
      }
      if (profilePhotoField) {
        setInvalid(profilePhotoField, !photoValid);
      }
      if (nationalIdField) {
        setInvalid(nationalIdField, !nationalIdValid);
      }
      if (idPhotoField) {
        setInvalid(idPhotoField, !idPhotoValid);
      }

      if (
        !nameValid || !emailValid || !phoneValid || !passwordValid || !confirmValid ||
        !birthdateValid || !photoValid || !nationalIdValid || !idPhotoValid
      ) {
        status.textContent = t("auth.fixErrors");
        status.classList.add("show", "error");
        return;
      }

      if (!termsInput.checked) {
        status.textContent = t("auth.agreeTermsRequired");
        status.classList.add("show", "error");
        return;
      }

      var users = getUsers();
      var email = emailInput.value.trim();
      var alreadyExists = users.some(function (u) {
        return u.email === email;
      });
      if (alreadyExists) {
        status.textContent = t("auth.emailExists");
        status.classList.add("show", "error");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = t("auth.creatingAccount");

      var photoPromise =
        profilePhotoInput && profilePhotoInput.files && profilePhotoInput.files.length
          ? readFilesAsDataURLs(profilePhotoInput.files).then(function (urls) {
              return urls[0] || "";
            })
          : Promise.resolve("");
      var idPhotoPromise =
        idPhotoInput && idPhotoInput.files && idPhotoInput.files.length
          ? readFilesAsDataURLs(idPhotoInput.files).then(function (urls) {
              return urls[0] || "";
            })
          : Promise.resolve("");

      Promise.all([photoPromise, idPhotoPromise])
        .then(function (results) {
          var photoUrl = results[0];
          var idPhotoUrl = results[1];
          var freshUsers = getUsers();
          freshUsers.push({
            name: nameInput.value.trim(),
            email: email,
            phone: phoneInput.value.trim(),
            password: passwordInput.value,
            plan: getSelectedPlan(),
            birthdate: birthdateRaw,
            photo: photoUrl,
            nationalId: nationalIdInput.value.trim(),
            idPhoto: idPhotoUrl,
            reviewStatus: "pending",
            address: "",
            createdAt: Date.now(),
          });
          saveUsers(freshUsers);
          logAuditEvent("account_submitted_for_review", email, "", email);

          status.textContent = t("auth.pendingReviewMessage");
          status.classList.remove("error");
          status.classList.add("show", "success");
          form.reset();
          setTimeout(function () {
            window.location.href = "login.html";
          }, 2200);
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = t("auth.signupBtn");
          status.textContent = t("auth.fixErrors");
          status.classList.add("show", "error");
        });
    });

    [nameInput, emailInput, phoneInput, birthdateInput, profilePhotoInput, nationalIdInput, idPhotoInput, passwordInput, confirmInput].forEach(
      function (input) {
        if (!input) return;
        var evt = input.type === "file" ? "change" : "input";
        input.addEventListener(evt, function () {
          input.closest(".form-field").classList.remove("invalid");
        });
      }
    );
  }

  /* ---------- نموذج تسجيل الدخول ---------- */
  function initLoginForm() {
    var form = document.getElementById("loginForm");
    if (!form) return;

    var emailField = document.getElementById("emailField");
    var passwordField = document.getElementById("passwordField");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var status = document.getElementById("formStatus");
    var submitBtn = document.getElementById("submitBtn");

    function setInvalid(fieldEl, invalid) {
      fieldEl.classList.toggle("invalid", invalid);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.classList.remove("show", "success", "error");

      var emailValid = isValidEmail(emailInput.value.trim());
      var passwordValid = passwordInput.value.length >= 6;

      setInvalid(emailField, !emailValid);
      setInvalid(passwordField, !passwordValid);

      if (!emailValid || !passwordValid) {
        status.textContent = t("auth.enterValidData");
        status.classList.add("show", "error");
        return;
      }

      var users = getUsers();
      var email = emailInput.value.trim();
      var match = users.find(function (u) {
        return u.email === email && u.password === passwordInput.value;
      });

      if (!match) {
        logAuditEvent("login_failed", email, "", email);
        status.textContent = t("auth.wrongCredentials");
        status.classList.add("show", "error");
        return;
      }

      if (getUserStatus(match) === "disabled") {
        logAuditEvent("login_blocked_disabled", email, "", email);
        status.textContent = t("auth.accountDisabled");
        status.classList.add("show", "error");
        return;
      }

      var stage = getAccountStage(match);
      if (stage === "pending_review") {
        logAuditEvent("login_blocked_pending_review", email, "", email);
        status.textContent = t("auth.accountPendingReview");
        status.classList.add("show", "error");
        return;
      }
      if (stage === "rejected") {
        logAuditEvent("login_blocked_rejected", email, "", email);
        status.textContent = t("auth.accountRejected") + (match.rejectionReason ? " — " + match.rejectionReason : "");
        status.classList.add("show", "error");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = t("auth.loggingIn");

      setTimeout(function () {
        status.textContent = t("auth.loginSuccess");
        status.classList.remove("error");
        status.classList.add("show", "success");
        setSession(match.email);
        updateUserRecord(match.email, { lastLoginAt: Date.now() });
        logAuditEvent("login_success", match.email, "");
        setTimeout(function () {
          window.location.href = "index.html";
        }, 700);
      }, 700);
    });

    [emailInput, passwordInput].forEach(function (input) {
      input.addEventListener("input", function () {
        input.closest(".form-field").classList.remove("invalid");
      });
    });
  }

  /* ---------- نافذة نسيت كلمة المرور (رمز مؤقت لمرة واحدة) ---------- */
  function initForgotPassword() {
    var modal = document.getElementById("forgotModal");
    if (!modal) return;

    var openLink = document.getElementById("forgotLink");
    var closeBtn = document.getElementById("closeForgot");

    var step1 = document.getElementById("forgotStep1");
    var step2 = document.getElementById("forgotStep2");
    var step3 = document.getElementById("forgotStep3");

    var identifierField = document.getElementById("identifierField");
    var identifierInput = document.getElementById("identifier");
    var sendBtn = document.getElementById("sendOtpBtn");

    var sentTo = document.getElementById("sentTo");
    var otpDisplay = document.getElementById("otpDisplay");
    var otpField = document.getElementById("otpField");
    var otpInput = document.getElementById("otpInput");
    var verifyBtn = document.getElementById("verifyOtpBtn");

    var newPasswordField = document.getElementById("newPasswordField");
    var newPasswordConfirmField = document.getElementById("newPasswordConfirmField");
    var newPasswordInput = document.getElementById("newPassword");
    var newPasswordConfirmInput = document.getElementById("newPasswordConfirm");
    var resetBtn = document.getElementById("resetPasswordBtn");

    var matchedUser = null;
    var generatedOtp = null;
    var otpUsed = false;

    function showStep(step) {
      [step1, step2, step3].forEach(function (s) {
        s.classList.remove("active");
      });
      step.classList.add("active");
    }

    function resetModal() {
      matchedUser = null;
      generatedOtp = null;
      otpUsed = false;
      identifierInput.value = "";
      otpInput.value = "";
      newPasswordInput.value = "";
      newPasswordConfirmInput.value = "";
      [identifierField, otpField, newPasswordField, newPasswordConfirmField].forEach(function (f) {
        f.classList.remove("invalid");
      });
      showStep(step1);
    }

    openLink.addEventListener("click", function (e) {
      e.preventDefault();
      resetModal();
      modal.classList.add("open");
    });
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("open");
    });
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.classList.remove("open");
    });

    sendBtn.addEventListener("click", function () {
      var value = identifierInput.value.trim();
      var user = findUser(value);

      if (!user) {
        identifierField.classList.add("invalid");
        return;
      }
      identifierField.classList.remove("invalid");

      matchedUser = user;
      otpUsed = false;
      generatedOtp = String(Math.floor(100000 + Math.random() * 900000));

      sentTo.textContent = value;
      otpDisplay.textContent = generatedOtp;
      showStep(step2);
    });

    verifyBtn.addEventListener("click", function () {
      var entered = otpInput.value.trim();
      if (otpUsed || !generatedOtp || entered !== generatedOtp) {
        otpField.classList.add("invalid");
        return;
      }
      otpField.classList.remove("invalid");
      otpUsed = true;
      showStep(step3);
    });

    resetBtn.addEventListener("click", function () {
      var pw = newPasswordInput.value;
      var pw2 = newPasswordConfirmInput.value;
      var pwValid = pw.length >= 6;
      var matchValid = pw === pw2 && pw2.length > 0;

      newPasswordField.classList.toggle("invalid", !pwValid);
      newPasswordConfirmField.classList.toggle("invalid", !matchValid);
      if (!pwValid || !matchValid) return;

      var users = getUsers();
      var idx = users.findIndex(function (u) {
        return u.email === matchedUser.email;
      });
      if (idx > -1) {
        users[idx].password = pw;
        saveUsers(users);
      }

      generatedOtp = null;
      setSession(matchedUser.email);
      modal.classList.remove("open");
      window.location.href = "index.html";
    });
  }

  /* ---------- نافذة الملف الشخصي (الصورة، العنوان، كلمة المرور) ---------- */
  function initProfileModal() {
    var modal = document.getElementById("profileModal");
    if (!modal) return;

    var closeBtn = document.getElementById("closeProfile");
    var photoInput = document.getElementById("profilePhotoInput");
    var photoPreview = document.getElementById("profilePhotoPreview");
    var nameEl = document.getElementById("profileName");
    var emailEl = document.getElementById("profileEmail");
    var statusEl = document.getElementById("profileStatus");
    var addressField = document.getElementById("profileAddressField");
    var addressInput = document.getElementById("profileAddress");
    var saveAddressBtn = document.getElementById("saveAddressBtn");
    var currentPasswordField = document.getElementById("currentPasswordField");
    var newPasswordField = document.getElementById("newPasswordProfileField");
    var confirmNewPasswordField = document.getElementById("confirmNewPasswordProfileField");
    var currentPasswordInput = document.getElementById("currentPassword");
    var newPasswordInput = document.getElementById("newPasswordProfile");
    var confirmNewPasswordInput = document.getElementById("confirmNewPasswordProfile");
    var savePasswordBtn = document.getElementById("savePasswordBtn");

    function setPreview(url) {
      if (!photoPreview) return;
      if (url) {
        photoPreview.style.backgroundImage = "url('" + url + "')";
        photoPreview.classList.add("has-photo");
        photoPreview.textContent = "";
      } else {
        photoPreview.style.backgroundImage = "";
        photoPreview.classList.remove("has-photo");
        photoPreview.textContent = "م";
      }
    }

    function loadUser() {
      var session = getSession();
      var user = session ? findUser(session) : null;
      if (!user) return null;
      if (nameEl) nameEl.textContent = user.name || "";
      if (emailEl) emailEl.textContent = user.email || "";
      if (addressInput) addressInput.value = user.address || "";
      setPreview(user.photo || "");
      return user;
    }

    function openModal() {
      var user = loadUser();
      if (!user) return;
      if (statusEl) statusEl.classList.remove("show", "success", "error");
      if (currentPasswordInput) currentPasswordInput.value = "";
      if (newPasswordInput) newPasswordInput.value = "";
      if (confirmNewPasswordInput) confirmNewPasswordInput.value = "";
      [currentPasswordField, newPasswordField, confirmNewPasswordField, addressField].forEach(function (f) {
        if (f) f.classList.remove("invalid");
      });
      modal.classList.add("open");
    }
    profileModalOpenFn = openModal;

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        modal.classList.remove("open");
      });
    }
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.classList.remove("open");
    });

    if (photoInput) {
      photoInput.addEventListener("change", function () {
        var session = getSession();
        if (!session || !photoInput.files || !photoInput.files.length) return;
        readFilesAsDataURLs(photoInput.files).then(function (urls) {
          var url = urls[0];
          updateUserRecord(session, { photo: url });
          setPreview(url);
          renderBrandAvatar();
          renderHeaderUserBadge();
          if (statusEl) {
            statusEl.textContent = t("profile.photoSaved");
            statusEl.classList.remove("error");
            statusEl.classList.add("show", "success");
          }
        });
      });
    }

    if (saveAddressBtn) {
      saveAddressBtn.addEventListener("click", function () {
        var session = getSession();
        if (!session) return;
        updateUserRecord(session, { address: addressInput.value.trim() });
        if (statusEl) {
          statusEl.textContent = t("profile.addressSaved");
          statusEl.classList.remove("error");
          statusEl.classList.add("show", "success");
        }
      });
    }

    if (savePasswordBtn) {
      savePasswordBtn.addEventListener("click", function () {
        var session = getSession();
        var user = session ? findUser(session) : null;
        if (!user) return;

        var currentValid = currentPasswordInput.value === user.password;
        var newValid = newPasswordInput.value.length >= 6;
        var confirmValid =
          confirmNewPasswordInput.value === newPasswordInput.value && confirmNewPasswordInput.value.length > 0;

        currentPasswordField.classList.toggle("invalid", !currentValid);
        newPasswordField.classList.toggle("invalid", !newValid);
        confirmNewPasswordField.classList.toggle("invalid", !confirmValid);

        if (!currentValid || !newValid || !confirmValid) {
          if (statusEl) {
            statusEl.textContent = t("profile.fixPasswordErrors");
            statusEl.classList.remove("success");
            statusEl.classList.add("show", "error");
          }
          return;
        }

        updateUserRecord(session, { password: newPasswordInput.value });
        currentPasswordInput.value = "";
        newPasswordInput.value = "";
        confirmNewPasswordInput.value = "";
        if (statusEl) {
          statusEl.textContent = t("profile.passwordSaved");
          statusEl.classList.remove("error");
          statusEl.classList.add("show", "success");
        }
      });
    }
  }

  /* ---------- نموذج إضافة إعلان ---------- */
  function initListingForm() {
    var form = document.getElementById("listingForm");
    if (!form) return;

    /* ---------- الحماية: يجب تسجيل الدخول لنشر إعلان ---------- */
    var authNotice = document.getElementById("authRequiredNotice");
    var subNotice = document.getElementById("subscriptionRequiredNotice");
    var listingFormCard = document.getElementById("listingFormCard");
    var currentSession = getSession();
    if (!currentSession) {
      if (authNotice) authNotice.style.display = "";
      if (subNotice) subNotice.style.display = "none";
      if (listingFormCard) listingFormCard.style.display = "none";
      return;
    }
    if (authNotice) authNotice.style.display = "none";

    /* ---------- وضع التعديل: تحرير إعلان منشور مسبقًا ---------- */
    var editingId = new URLSearchParams(window.location.search).get("edit");

    /* ---------- الحماية: يتطلب نشر إعلان جديد حسابًا مفعّلًا (تجربة أو اشتراك نشط) ---------- */
    var currentUserRecord = findUser(currentSession);
    var accountStage = getAccountStage(currentUserRecord);
    if (!editingId && accountStage !== "trial" && accountStage !== "active") {
      var subMessageEl = document.getElementById("subscriptionRequiredMessage");
      if (subMessageEl) subMessageEl.textContent = t("subscription.stageDetail." + accountStage);
      if (subNotice) subNotice.style.display = "";
      if (listingFormCard) listingFormCard.style.display = "none";
      return;
    }
    if (subNotice) subNotice.style.display = "none";
    if (listingFormCard) listingFormCard.style.display = "";

    var editingListing = editingId ? getListingById(editingId) : null;
    if (editingId && (!editingListing || editingListing.ownerEmail !== currentSession)) {
      window.location.href = "my-listings.html";
      return;
    }
    if (editingListing) {
      var introHeading = document.querySelector(".listing-intro h1");
      var introSub = document.querySelector(".listing-intro p");
      if (introHeading) {
        introHeading.removeAttribute("data-i18n");
        introHeading.textContent = t("listingPage.editHeading");
      }
      if (introSub) {
        introSub.removeAttribute("data-i18n");
        introSub.textContent = t("listingPage.editSub");
      }
    }

    function fillBrandSelect(selectEl, data) {
      selectEl.innerHTML = "";
      var placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = t("listingPage.brandChoose");
      selectEl.appendChild(placeholder);
      Object.keys(data).forEach(function (brandId) {
        var opt = document.createElement("option");
        opt.value = brandId;
        opt.textContent = getBrandLabel(data, brandId);
        selectEl.appendChild(opt);
      });
    }

    function wireDependentSelects(brandEl, modelEl, data) {
      brandEl.addEventListener("change", function () {
        modelEl.innerHTML = "";
        var brandId = brandEl.value;
        if (!brandId || !data[brandId]) {
          var ph = document.createElement("option");
          ph.value = "";
          ph.textContent = t("listingPage.modelChooseBrandFirst");
          modelEl.appendChild(ph);
          return;
        }
        var placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = t("listingPage.modelChoose");
        modelEl.appendChild(placeholder);
        Object.keys(data[brandId].models).forEach(function (modelId) {
          var opt = document.createElement("option");
          opt.value = modelId;
          opt.textContent = getModelLabel(data, brandId, modelId);
          modelEl.appendChild(opt);
        });
      });
    }

    function fillYearSelect(selectEl) {
      var currentYear = new Date().getFullYear();
      for (var y = currentYear; y >= 1990; y--) {
        var opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        selectEl.appendChild(opt);
      }
    }

    var carBrand = document.getElementById("carBrand");
    var carModel = document.getElementById("carModel");
    var carYear = document.getElementById("carYear");
    var motoBrand = document.getElementById("motoBrand");
    var motoModel = document.getElementById("motoModel");
    var motoYear = document.getElementById("motoYear");

    fillBrandSelect(carBrand, CAR_DATA);
    fillBrandSelect(motoBrand, MOTO_DATA);
    wireDependentSelects(carBrand, carModel, CAR_DATA);
    wireDependentSelects(motoBrand, motoModel, MOTO_DATA);

    /* ---------- تحديث نصوص القوائم عند تبديل اللغة ---------- */
    function refreshBrandModelLabels() {
      [
        [carBrand, CAR_DATA],
        [motoBrand, MOTO_DATA],
      ].forEach(function (pair) {
        var selectEl = pair[0],
          data = pair[1];
        Array.prototype.forEach.call(selectEl.options, function (opt) {
          if (opt.value && data[opt.value]) {
            opt.textContent = getBrandLabel(data, opt.value);
          } else if (!opt.value) {
            opt.textContent = t("listingPage.brandChoose");
          }
        });
      });
      [
        [carBrand, carModel, CAR_DATA],
        [motoBrand, motoModel, MOTO_DATA],
      ].forEach(function (triple) {
        var brandEl = triple[0],
          modelEl = triple[1],
          data = triple[2];
        var brandId = brandEl.value;
        Array.prototype.forEach.call(modelEl.options, function (opt) {
          if (opt.value && brandId && data[brandId] && data[brandId].models[opt.value]) {
            opt.textContent = getModelLabel(data, brandId, opt.value);
          } else if (!opt.value) {
            opt.textContent = brandId ? t("listingPage.modelChoose") : t("listingPage.modelChooseBrandFirst");
          }
        });
      });
    }
    fillYearSelect(carYear);
    fillYearSelect(motoYear);

    var categoryOptions = document.querySelectorAll(".category-option");
    var fieldGroups = {
      land: document.getElementById("group-land"),
      residential: document.getElementById("group-residential"),
      commercial: document.getElementById("group-commercial"),
      car: document.getElementById("group-car"),
      motorcycle: document.getElementById("group-motorcycle"),
    };
    var detailsWrapper = document.getElementById("detailsWrapper");
    var offerTypeField = document.getElementById("offerTypeField");
    var selectedCategory = "";

    categoryOptions.forEach(function (opt) {
      opt.addEventListener("click", function () {
        categoryOptions.forEach(function (o) {
          o.classList.remove("active");
        });
        opt.classList.add("active");
        selectedCategory = opt.dataset.category;
        document.getElementById("categoryField").classList.remove("invalid");

        Object.keys(fieldGroups).forEach(function (key) {
          fieldGroups[key].classList.toggle("active", key === selectedCategory);
        });

        // لا يوجد نوع عرض (بيع/إيجار) لقطع الأراضي
        if (offerTypeField) {
          offerTypeField.style.display = selectedCategory === "land" ? "none" : "";
          offerTypeField.classList.remove("invalid");
        }

        // إظهار بقية الحقول فقط بعد اختيار نوع الإعلان
        if (detailsWrapper) detailsWrapper.classList.add("active");
      });
    });

    var status = document.getElementById("formStatus");
    var submitBtn = document.getElementById("submitBtn");

    /* ---------- تنسيق حقول السعر وعداد الكيلومترات بفواصل الآلاف ---------- */
    [document.getElementById("price"), document.getElementById("carOdometer"), document.getElementById("motoOdometer")].forEach(
      attachThousandsFormatting
    );

    /* ---------- تعبئة الفورم ببيانات الإعلان عند التعديل ---------- */
    var currentPhotosPreview = document.getElementById("currentPhotosPreview");
    function renderCurrentPhotosPreview() {
      if (!currentPhotosPreview || !editingListing) return;
      currentPhotosPreview.innerHTML = "";
      var photos = editingListing.photos || [];
      if (!photos.length) return;
      var label = document.createElement("div");
      label.className = "current-photos-label";
      label.textContent = t("listingPage.currentPhotosLabel");
      currentPhotosPreview.appendChild(label);
      var strip = document.createElement("div");
      strip.className = "current-photos-strip";
      photos.forEach(function (src) {
        var img = document.createElement("img");
        img.src = src;
        strip.appendChild(img);
      });
      currentPhotosPreview.appendChild(strip);
    }

    if (editingListing) {
      var catOpt = document.querySelector('.category-option[data-category="' + editingListing.category + '"]');
      if (catOpt) catOpt.click();

      if (editingListing.offerType) {
        var offerTypeSelect = document.getElementById("offerType");
        if (offerTypeSelect) offerTypeSelect.value = editingListing.offerType;
      }
      document.getElementById("price").value = editingListing.price != null ? formatNumberWithSeparators(editingListing.price) : "";
      document.getElementById("city").value = editingListing.city || "";

      if (editingListing.category === "land") {
        document.getElementById("landArea").value = editingListing.landArea || "";
        document.getElementById("landType").value = editingListing.landType || "";
        document.getElementById("landAddress").value = editingListing.landAddress || "";
        document.getElementById("landNumber").value = editingListing.landNumber || "";
      } else if (editingListing.category === "residential") {
        document.getElementById("resArea").value = editingListing.resArea || "";
        document.getElementById("resRooms").value = editingListing.resRooms || "";
        document.getElementById("resBaths").value = editingListing.resBaths || "";
        document.getElementById("resAddress").value = editingListing.resAddress || "";
        document.getElementById("resNumber").value = editingListing.resNumber || "";
      } else if (editingListing.category === "commercial") {
        document.getElementById("comArea").value = editingListing.comArea || "";
        document.getElementById("comType").value = editingListing.comType || "";
        document.getElementById("comAddress").value = editingListing.comAddress || "";
        document.getElementById("comNumber").value = editingListing.comNumber || "";
      } else if (editingListing.category === "car") {
        carBrand.value = editingListing.carBrand || "";
        carBrand.dispatchEvent(new Event("change"));
        carModel.value = editingListing.carModel || "";
        carYear.value = editingListing.carYear || "";
        document.getElementById("carOdometer").value = editingListing.carOdometer ? formatNumberWithSeparators(editingListing.carOdometer) : "";
        document.getElementById("carRegistration").value = editingListing.carRegistration || "";
      } else if (editingListing.category === "motorcycle") {
        motoBrand.value = editingListing.motoBrand || "";
        motoBrand.dispatchEvent(new Event("change"));
        motoModel.value = editingListing.motoModel || "";
        motoYear.value = editingListing.motoYear || "";
        document.getElementById("motoOdometer").value = editingListing.motoOdometer ? formatNumberWithSeparators(editingListing.motoOdometer) : "";
      }

      document.getElementById("description").value = editingListing.description || "";

      submitBtn.removeAttribute("data-i18n");
      submitBtn.textContent = t("listingPage.saveChangesBtn");

      var photosHintEl = document.querySelector("#photosField .hint");
      if (photosHintEl) {
        photosHintEl.removeAttribute("data-i18n");
        photosHintEl.textContent = t("listingPage.photosHintEdit");
      }

      renderCurrentPhotosPreview();

      window.__rerenderPage = function () {
        if (introHeading) introHeading.textContent = t("listingPage.editHeading");
        if (introSub) introSub.textContent = t("listingPage.editSub");
        submitBtn.textContent = t("listingPage.saveChangesBtn");
        if (photosHintEl) photosHintEl.textContent = t("listingPage.photosHintEdit");
        renderCurrentPhotosPreview();
        refreshBrandModelLabels();
      };
    } else {
      window.__rerenderPage = function () {
        refreshBrandModelLabels();
      };
    }

    function setInvalid(id, invalid) {
      var el = document.getElementById(id);
      if (el) el.classList.toggle("invalid", invalid);
    }
    function val(id) {
      return document.getElementById(id).value.trim();
    }
    function numVal(id) {
      return stripSeparators(document.getElementById(id).value);
    }
    function setFieldMessage(errorMsgId, key) {
      var el = document.getElementById(errorMsgId);
      if (el) el.textContent = t(key);
    }

    /* ---------- منع تكرار نشر نفس السيارة أو نفس العقار/الأرض ----------
       يتم تخزين أرقام الاستمارة/العقار كمفاتيح رئيسية فريدة محليًا،
       ولا تُعرض هذه الأرقام للعميل في أي مكان بالموقع. */
    var USED_IDS_KEY = "eqari_used_ids";

    function getUsedIds() {
      try {
        return (
          JSON.parse(localStorage.getItem(USED_IDS_KEY)) || {
            car: {},
            land: {},
            residential: {},
            commercial: {},
          }
        );
      } catch (e) {
        return { car: {}, land: {}, residential: {}, commercial: {} };
      }
    }
    function normalizeId(value) {
      return value.trim().replace(/\s+/g, "").toUpperCase();
    }
    function isIdUsed(bucket, id) {
      var data = getUsedIds();
      return !!(data[bucket] && data[bucket][normalizeId(id)]);
    }
    function markIdUsed(bucket, id) {
      var data = getUsedIds();
      if (!data[bucket]) data[bucket] = {};
      data[bucket][normalizeId(id)] = true;
      localStorage.setItem(USED_IDS_KEY, JSON.stringify(data));
    }
    function freeUsedId(bucket, id) {
      var data = getUsedIds();
      if (data[bucket]) {
        delete data[bucket][normalizeId(id)];
        localStorage.setItem(USED_IDS_KEY, JSON.stringify(data));
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.classList.remove("show", "success", "error");
      var allValid = true;

      if (!selectedCategory) {
        setInvalid("categoryField", true);
        allValid = false;
      } else {
        setInvalid("categoryField", false);
      }

      // لا يوجد حقل نوع عرض لقطع الأراضي
      if (selectedCategory !== "land") {
        var offerValid = val("offerType") !== "";
        setInvalid("offerTypeField", !offerValid);
        if (!offerValid) allValid = false;
      }

      var priceValid = parseFloat(numVal("price")) > 0;
      setInvalid("priceField", !priceValid);
      if (!priceValid) allValid = false;

      var cityValid = val("city") !== "";
      setInvalid("cityField", !cityValid);
      if (!cityValid) allValid = false;

      var pendingUsedId = null;

      if (selectedCategory === "land") {
        var a1 = val("landArea") !== "" && parseFloat(val("landArea")) > 0;
        var t1 = val("landType") !== "";
        var addr1 = val("landAddress") !== "";
        setInvalid("landAreaField", !a1);
        setInvalid("landTypeField", !t1);
        setInvalid("landAddressField", !addr1);

        var landNumberRaw = val("landNumber");
        var landNumEmpty = landNumberRaw === "";
        var landNumOriginal = editingListing ? editingListing.landNumber || null : null;
        var landNumUnchanged = landNumOriginal !== null && normalizeId(landNumberRaw) === normalizeId(landNumOriginal);
        var landNumDup = !landNumEmpty && !landNumUnchanged && isIdUsed("land", landNumberRaw);
        var landNumValid = !landNumEmpty && !landNumDup;
        setInvalid("landNumberField", !landNumValid);
        setFieldMessage(
          "landNumberErrorMsg",
          landNumDup ? "listingPage.landNumberDuplicate" : "listingPage.landNumberError"
        );
        if (landNumValid) pendingUsedId = { bucket: "land", id: landNumberRaw, previousId: landNumOriginal };

        if (!a1 || !t1 || !addr1 || !landNumValid) allValid = false;
      } else if (selectedCategory === "residential") {
        var a2 = val("resArea") !== "" && parseFloat(val("resArea")) > 0;
        var r2 = val("resRooms") !== "";
        var b2 = val("resBaths") !== "";
        var addr2 = val("resAddress") !== "";
        setInvalid("resAreaField", !a2);
        setInvalid("resRoomsField", !r2);
        setInvalid("resBathsField", !b2);
        setInvalid("resAddressField", !addr2);

        var resNumberRaw = val("resNumber");
        var resNumEmpty = resNumberRaw === "";
        var resNumOriginal = editingListing ? editingListing.resNumber || null : null;
        var resNumUnchanged = resNumOriginal !== null && normalizeId(resNumberRaw) === normalizeId(resNumOriginal);
        var resNumDup = !resNumEmpty && !resNumUnchanged && isIdUsed("residential", resNumberRaw);
        var resNumValid = !resNumEmpty && !resNumDup;
        setInvalid("resNumberField", !resNumValid);
        setFieldMessage(
          "resNumberErrorMsg",
          resNumDup ? "listingPage.propertyNumberDuplicate" : "listingPage.propertyNumberError"
        );
        if (resNumValid) pendingUsedId = { bucket: "residential", id: resNumberRaw, previousId: resNumOriginal };

        if (!a2 || !r2 || !b2 || !addr2 || !resNumValid) allValid = false;
      } else if (selectedCategory === "commercial") {
        var a3 = val("comArea") !== "" && parseFloat(val("comArea")) > 0;
        var t3 = val("comType") !== "";
        var addr3 = val("comAddress") !== "";
        setInvalid("comAreaField", !a3);
        setInvalid("comTypeField", !t3);
        setInvalid("comAddressField", !addr3);

        var comNumberRaw = val("comNumber");
        var comNumEmpty = comNumberRaw === "";
        var comNumOriginal = editingListing ? editingListing.comNumber || null : null;
        var comNumUnchanged = comNumOriginal !== null && normalizeId(comNumberRaw) === normalizeId(comNumOriginal);
        var comNumDup = !comNumEmpty && !comNumUnchanged && isIdUsed("commercial", comNumberRaw);
        var comNumValid = !comNumEmpty && !comNumDup;
        setInvalid("comNumberField", !comNumValid);
        setFieldMessage(
          "comNumberErrorMsg",
          comNumDup ? "listingPage.propertyNumberDuplicate" : "listingPage.propertyNumberError"
        );
        if (comNumValid) pendingUsedId = { bucket: "commercial", id: comNumberRaw, previousId: comNumOriginal };

        if (!a3 || !t3 || !addr3 || !comNumValid) allValid = false;
      } else if (selectedCategory === "car") {
        var b4 = val("carBrand") !== "";
        var m4 = val("carModel") !== "";
        var y4 = val("carYear") !== "";
        var odo4 = numVal("carOdometer") !== "" && parseFloat(numVal("carOdometer")) >= 0;
        setInvalid("carBrandField", !b4);
        setInvalid("carModelField", !m4);
        setInvalid("carYearField", !y4);
        setInvalid("carOdometerField", !odo4);

        var carRegRaw = val("carRegistration");
        var carRegEmpty = carRegRaw === "";
        var carRegOriginal = editingListing ? editingListing.carRegistration || null : null;
        var carRegUnchanged = carRegOriginal !== null && normalizeId(carRegRaw) === normalizeId(carRegOriginal);
        var carRegDup = !carRegEmpty && !carRegUnchanged && isIdUsed("car", carRegRaw);
        var carRegValid = !carRegEmpty && !carRegDup;
        setInvalid("carRegistrationField", !carRegValid);
        setFieldMessage(
          "carRegistrationErrorMsg",
          carRegDup ? "listingPage.carRegistrationDuplicate" : "listingPage.carRegistrationError"
        );
        if (carRegValid) pendingUsedId = { bucket: "car", id: carRegRaw, previousId: carRegOriginal };

        if (!b4 || !m4 || !y4 || !odo4 || !carRegValid) allValid = false;
      } else if (selectedCategory === "motorcycle") {
        var b5 = val("motoBrand") !== "";
        var m5 = val("motoModel") !== "";
        var y5 = val("motoYear") !== "";
        var odo5 = numVal("motoOdometer") !== "" && parseFloat(numVal("motoOdometer")) >= 0;
        setInvalid("motoBrandField", !b5);
        setInvalid("motoModelField", !m5);
        setInvalid("motoYearField", !y5);
        setInvalid("motoOdometerField", !odo5);
        if (!b5 || !m5 || !y5 || !odo5) allValid = false;
      }

      var photosInput = document.getElementById("photos");
      var hasNewPhotos = !!(photosInput && photosInput.files && photosInput.files.length > 0);
      var hasExistingPhotos = !!(editingListing && editingListing.photos && editingListing.photos.length > 0);
      var photosValid = hasNewPhotos || hasExistingPhotos;
      setInvalid("photosField", !photosValid);
      if (!photosValid) allValid = false;

      if (!allValid) {
        status.textContent = t("listingPage.fixErrors");
        status.classList.add("show", "error");
        status.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = editingListing ? t("listingPage.publishing") : t("listingPage.publishing");

      var photosWorkPromise = hasNewPhotos
        ? readFilesAsDataURLs(photosInput.files)
        : Promise.resolve(editingListing ? editingListing.photos : []);

      photosWorkPromise
        .then(function (photoUrls) {
          var owner = findUser(currentSession);
          var listing = {
            category: selectedCategory,
            offerType: selectedCategory === "land" ? "" : val("offerType"),
            price: parseFloat(numVal("price")),
            city: val("city"),
            description: document.getElementById("description").value.trim(),
            photos: photoUrls,
          };

          if (selectedCategory === "land") {
            listing.landArea = val("landArea");
            listing.landType = val("landType");
            listing.landAddress = val("landAddress");
            listing.landNumber = val("landNumber");
          } else if (selectedCategory === "residential") {
            listing.resArea = val("resArea");
            listing.resRooms = val("resRooms");
            listing.resBaths = val("resBaths");
            listing.resAddress = val("resAddress");
            listing.resNumber = val("resNumber");
          } else if (selectedCategory === "commercial") {
            listing.comArea = val("comArea");
            listing.comType = val("comType");
            listing.comAddress = val("comAddress");
            listing.comNumber = val("comNumber");
          } else if (selectedCategory === "car") {
            listing.carBrand = val("carBrand");
            listing.carModel = val("carModel");
            listing.carYear = val("carYear");
            listing.carOdometer = numVal("carOdometer");
            listing.carRegistration = val("carRegistration");
          } else if (selectedCategory === "motorcycle") {
            listing.motoBrand = val("motoBrand");
            listing.motoModel = val("motoModel");
            listing.motoYear = val("motoYear");
            listing.motoOdometer = numVal("motoOdometer");
          }

          if (pendingUsedId) {
            if (pendingUsedId.previousId && normalizeId(pendingUsedId.previousId) !== normalizeId(pendingUsedId.id)) {
              freeUsedId(pendingUsedId.bucket, pendingUsedId.previousId);
            }
            markIdUsed(pendingUsedId.bucket, pendingUsedId.id);
          }

          var finalId;
          if (editingListing) {
            finalId = editingListing.id;
            listing.ownerEmail = editingListing.ownerEmail;
            listing.ownerName = editingListing.ownerName;
            listing.createdAt = editingListing.createdAt;
            listing.status = editingListing.status || "active";
            listing.updatedAt = Date.now();
            updateListing(finalId, listing);
          } else {
            finalId = genId();
            listing.id = finalId;
            listing.ownerEmail = currentSession;
            listing.ownerName = owner ? owner.name : "";
            listing.createdAt = Date.now();
            listing.status = "active";
            addListing(listing);
          }

          status.textContent = editingListing ? t("listingPage.editSuccess") : t("listingPage.success");
          status.classList.remove("error");
          status.classList.add("show", "success");
          setTimeout(function () {
            window.location.href = "listing.html?id=" + encodeURIComponent(finalId);
          }, 800);
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = editingListing ? t("listingPage.saveChangesBtn") : t("listingPage.publishBtn");
          status.textContent = t("listingPage.fixErrors");
          status.classList.add("show", "error");
        });
    });
  }

  /* ---------- صفحة تفاصيل الإعلان ---------- */
  function initListingDetailPage() {
    var root = document.getElementById("listingDetailRoot");
    if (!root) return;

    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var listing = id ? getListingById(id) : null;

    var notFound = document.getElementById("listingNotFound");
    var content = document.getElementById("listingDetailContent");

    var viewerSession = getSession();
    var viewerUser = viewerSession ? findUser(viewerSession) : null;
    var viewerIsAdmin = viewerUser && isAdminRole(viewerUser.role);
    var viewerIsOwner = !!(listing && viewerSession === listing.ownerEmail);

    if (!listing || (listing.hidden && !viewerIsOwner && !viewerIsAdmin)) {
      if (content) content.style.display = "none";
      if (notFound) notFound.style.display = "";
      return;
    }
    if (notFound) notFound.style.display = "none";
    if (content) content.style.display = "";

    var hiddenNotice = document.getElementById("hiddenByAdminNotice");
    if (hiddenNotice) {
      hiddenNotice.style.display = listing.hidden ? "" : "none";
    }

    function renderThread(viewerEmail, otherEmail) {
      var threadWrap = document.getElementById("threadMessages");
      if (!threadWrap) return;
      threadWrap.innerHTML = "";
      var msgs = getMessages()
        .filter(function (m) {
          if (m.listingId !== listing.id) return false;
          return (
            (m.fromEmail === viewerEmail && m.toEmail === otherEmail) ||
            (m.fromEmail === otherEmail && m.toEmail === viewerEmail)
          );
        })
        .sort(function (a, b) {
          return a.createdAt - b.createdAt;
        });

      if (!msgs.length) {
        var empty = document.createElement("p");
        empty.className = "thread-empty";
        empty.textContent = t("messages.noMessagesYet");
        threadWrap.appendChild(empty);
        return;
      }
      msgs.forEach(function (m) {
        var bubble = document.createElement("div");
        bubble.className = "msg-bubble " + (m.fromEmail === viewerEmail ? "mine" : "theirs");
        var p = document.createElement("p");
        p.textContent = m.body;
        bubble.appendChild(p);
        threadWrap.appendChild(bubble);
      });
      threadWrap.scrollTop = threadWrap.scrollHeight;
    }

    function renderContactPanel() {
      var session = getSession();
      var ownAdNote = document.getElementById("ownAdNote");
      var loginPrompt = document.getElementById("loginToMessage");
      var messageForm = document.getElementById("messageFormWrap");
      var threadWrap = document.getElementById("threadMessages");

      [ownAdNote, loginPrompt, messageForm].forEach(function (el) {
        if (el) el.style.display = "none";
      });
      if (threadWrap) threadWrap.innerHTML = "";

      if (!session) {
        if (loginPrompt) loginPrompt.style.display = "";
        return;
      }
      if (session === listing.ownerEmail) {
        if (ownAdNote) ownAdNote.style.display = "";
        return;
      }
      if (messageForm) messageForm.style.display = "";
      renderThread(session, listing.ownerEmail);
    }

    function render() {
      var titleEl = document.getElementById("detailTitle");
      if (titleEl) titleEl.textContent = buildListingTitle(listing);
      document.title = buildListingTitle(listing) + " | " + t("brand.name");

      var priceEl = document.getElementById("detailPrice");
      if (priceEl) priceEl.textContent = formatPrice(listing);

      var locEl = document.getElementById("detailLoc");
      if (locEl) locEl.textContent = buildListingLocation(listing);

      var catEl = document.getElementById("detailCategory");
      if (catEl) catEl.textContent = getCategoryLabel(listing.category);

      var soldEl = document.getElementById("detailSoldBadge");
      if (soldEl) {
        var sold = getListingStatus(listing) === "sold";
        soldEl.style.display = sold ? "" : "none";
        soldEl.textContent = t("listing.sold");
      }

      var specsWrap = document.getElementById("detailSpecs");
      if (specsWrap) appendSpecsToEl(specsWrap, listing);

      var descEl = document.getElementById("detailDescription");
      if (descEl) descEl.textContent = listing.description || t("listingPage.noDescription");

      var mainPhoto = document.getElementById("mainPhoto");
      var thumbStrip = document.getElementById("thumbStrip");
      var noPhotoPlaceholder = document.getElementById("noPhotoPlaceholder");
      var photos = listing.photos && listing.photos.length ? listing.photos : [];

      if (thumbStrip) thumbStrip.innerHTML = "";
      if (photos.length && mainPhoto) {
        mainPhoto.src = photos[0];
        mainPhoto.style.display = "";
        if (noPhotoPlaceholder) noPhotoPlaceholder.style.display = "none";
        photos.forEach(function (src, idx) {
          var thumb = document.createElement("img");
          thumb.src = src;
          thumb.className = "thumb" + (idx === 0 ? " active" : "");
          thumb.addEventListener("click", function () {
            mainPhoto.src = src;
            thumbStrip.querySelectorAll(".thumb").forEach(function (th) {
              th.classList.remove("active");
            });
            thumb.classList.add("active");
          });
          if (thumbStrip) thumbStrip.appendChild(thumb);
        });
      } else {
        if (mainPhoto) mainPhoto.style.display = "none";
        if (noPhotoPlaceholder) noPhotoPlaceholder.style.display = "";
      }

      renderContactPanel();
    }

    var msgForm = document.getElementById("messageForm");
    if (msgForm) {
      msgForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var textarea = document.getElementById("messageText");
        var text = textarea.value.trim();
        if (!text) return;
        sendMessage({
          listingId: listing.id,
          fromEmail: getSession(),
          toEmail: listing.ownerEmail,
          body: text,
        });
        textarea.value = "";
        renderThread(getSession(), listing.ownerEmail);
      });
    }

    var reportLink = document.getElementById("reportListingLink");
    var reportFormWrap = document.getElementById("reportFormWrap");
    var submitReportBtn = document.getElementById("submitReportBtn");
    if (reportLink) {
      reportLink.addEventListener("click", function (e) {
        e.preventDefault();
        var session = getSession();
        if (!session) {
          window.location.href = "login.html";
          return;
        }
        if (reportFormWrap) reportFormWrap.style.display = reportFormWrap.style.display === "none" ? "" : "none";
      });
    }
    if (submitReportBtn) {
      submitReportBtn.addEventListener("click", function () {
        var session = getSession();
        if (!session) return;
        var reason = document.getElementById("reportReason").value;
        var details = document.getElementById("reportDetails").value.trim();
        addReport({ listingId: listing.id, reporterEmail: session, reason: reason, details: details });
        logAuditEvent("listing_reported", listing.id, reason);
        submitReportBtn.disabled = true;
        submitReportBtn.textContent = t("listingPage.reportSubmitted");
      });
    }

    render();
    window.__rerenderPage = render;
  }

  /* ---------- صفحة رسائلي (صندوق الرسائل) ---------- */
  function initMessagesPage() {
    var root = document.getElementById("messagesRoot");
    if (!root) return;

    var session = getSession();
    var notice = document.getElementById("messagesLoginNotice");
    var listWrap = document.getElementById("threadsList");
    var emptyState = document.getElementById("messagesEmptyState");

    if (!session) {
      if (notice) notice.style.display = "";
      if (listWrap) listWrap.style.display = "none";
      if (emptyState) emptyState.style.display = "none";
      return;
    }
    if (notice) notice.style.display = "none";

    function render() {
      var threads = getThreadsForUser(session);
      if (!listWrap) return;
      listWrap.innerHTML = "";

      if (!threads.length) {
        if (emptyState) emptyState.style.display = "";
        listWrap.style.display = "none";
        return;
      }
      if (emptyState) emptyState.style.display = "none";
      listWrap.style.display = "";

      threads.forEach(function (thread) {
        var listing = getListingById(thread.listingId);
        var card = document.createElement("div");
        card.className = "thread-card";

        var header = document.createElement("div");
        header.className = "thread-card-header";
        var titleEl = document.createElement("div");
        titleEl.className = "thread-card-title";
        titleEl.textContent = listing ? buildListingTitle(listing) : t("messages.deletedListing");
        var otherEl = document.createElement("div");
        otherEl.className = "thread-card-other";
        var otherUser = findUser(thread.other);
        otherEl.textContent = otherUser ? otherUser.name : thread.other;
        header.appendChild(titleEl);
        header.appendChild(otherEl);
        card.appendChild(header);

        var snippet = document.createElement("div");
        snippet.className = "thread-card-snippet";
        snippet.textContent = thread.lastMessage.body;
        card.appendChild(snippet);

        var threadBody = document.createElement("div");
        threadBody.className = "thread-card-body";
        thread.messages.forEach(function (m) {
          var bubble = document.createElement("div");
          bubble.className = "msg-bubble " + (m.fromEmail === session ? "mine" : "theirs");
          var p = document.createElement("p");
          p.textContent = m.body;
          bubble.appendChild(p);
          threadBody.appendChild(bubble);
        });
        card.appendChild(threadBody);

        var replyForm = document.createElement("form");
        replyForm.className = "thread-reply-form";
        var textarea = document.createElement("textarea");
        textarea.placeholder = t("messages.replyPlaceholder");
        var sendBtn = document.createElement("button");
        sendBtn.type = "submit";
        sendBtn.className = "btn btn-solid";
        sendBtn.textContent = t("messages.sendBtn");
        replyForm.appendChild(textarea);
        replyForm.appendChild(sendBtn);
        replyForm.addEventListener("click", function (e) {
          e.stopPropagation();
        });
        replyForm.addEventListener("submit", function (e) {
          e.preventDefault();
          var text = textarea.value.trim();
          if (!text) return;
          sendMessage({ listingId: thread.listingId, fromEmail: session, toEmail: thread.other, body: text });
          render();
        });
        card.appendChild(replyForm);

        header.addEventListener("click", function () {
          card.classList.toggle("open");
        });
        snippet.addEventListener("click", function () {
          card.classList.toggle("open");
        });

        listWrap.appendChild(card);
      });
    }

    render();
    window.__rerenderPage = render;
  }

  /* ---------- صفحة إعلاناتي (إدارة الإعلانات الخاصة بالمستخدم) ---------- */
  function initMyListingsPage() {
    var root = document.getElementById("myListingsRoot");
    if (!root) return;

    var session = getSession();
    var notice = document.getElementById("myListingsLoginNotice");
    var emptyState = document.getElementById("myListingsEmptyState");
    var grid = document.getElementById("myListingsGrid");

    if (!session) {
      if (notice) notice.style.display = "";
      if (grid) grid.style.display = "none";
      if (emptyState) emptyState.style.display = "none";
      return;
    }
    if (notice) notice.style.display = "none";

    function createRow(listing) {
      var status = getListingStatus(listing);
      var isSold = status === "sold";

      var row = document.createElement("div");
      row.className = "my-listing-row" + (isSold ? " sold" : "");

      var thumb = document.createElement("div");
      thumb.className = "my-listing-thumb";
      if (listing.photos && listing.photos[0]) {
        thumb.style.backgroundImage = "url('" + listing.photos[0] + "')";
      } else {
        thumb.classList.add("card-media-empty");
      }
      row.appendChild(thumb);

      var info = document.createElement("div");
      info.className = "my-listing-info";

      var titleEl = document.createElement("div");
      titleEl.className = "my-listing-title";
      titleEl.textContent = buildListingTitle(listing);
      info.appendChild(titleEl);

      var priceEl = document.createElement("div");
      priceEl.className = "my-listing-price";
      priceEl.textContent = formatPrice(listing);
      info.appendChild(priceEl);

      var statusBadge = document.createElement("span");
      statusBadge.className = "my-listing-status " + (isSold ? "sold" : "active");
      statusBadge.textContent = isSold ? t("listing.sold") : t("listing.active");
      info.appendChild(statusBadge);

      row.appendChild(info);

      var actions = document.createElement("div");
      actions.className = "my-listing-actions";

      var viewLink = document.createElement("a");
      viewLink.className = "btn btn-ghost";
      viewLink.href = "listing.html?id=" + encodeURIComponent(listing.id);
      viewLink.textContent = t("myListings.viewBtn");
      actions.appendChild(viewLink);

      var editLink = document.createElement("a");
      editLink.className = "btn btn-ghost";
      editLink.href = "add-listing.html?edit=" + encodeURIComponent(listing.id);
      editLink.textContent = t("myListings.editBtn");
      actions.appendChild(editLink);

      var toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "btn btn-ghost";
      toggleBtn.textContent = isSold ? t("myListings.reactivateBtn") : t("myListings.markSoldBtn");
      toggleBtn.addEventListener("click", function () {
        updateListing(listing.id, { status: isSold ? "active" : "sold" });
        render();
      });
      actions.appendChild(toggleBtn);

      var deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "btn btn-ghost my-listing-delete";
      deleteBtn.textContent = t("myListings.deleteBtn");
      deleteBtn.addEventListener("click", function () {
        if (window.confirm(t("myListings.deleteConfirm"))) {
          deleteListing(listing.id);
          render();
          initHeaderAuthState();
        }
      });
      actions.appendChild(deleteBtn);

      row.appendChild(actions);
      return row;
    }

    function render() {
      if (!grid) return;
      var listings = getListings()
        .filter(function (l) {
          return l.ownerEmail === session;
        })
        .sort(function (a, b) {
          return b.createdAt - a.createdAt;
        });

      grid.innerHTML = "";
      if (!listings.length) {
        if (emptyState) emptyState.style.display = "";
        grid.style.display = "none";
        return;
      }
      if (emptyState) emptyState.style.display = "none";
      grid.style.display = "";
      listings.forEach(function (l) {
        grid.appendChild(createRow(l));
      });
    }

    render();
    window.__rerenderPage = render;
  }

  /* ---------- صفحة إدارة الاشتراك (subscription.html) ---------- */
  function initSubscriptionPage() {
    var root = document.getElementById("subscriptionRoot");
    if (!root) return;

    var session = getSession();
    var loginNotice = document.getElementById("subLoginNotice");
    var statusCard = document.getElementById("subStatusCard");

    if (!session) {
      if (loginNotice) loginNotice.style.display = "";
      if (statusCard) statusCard.style.display = "none";
      return;
    }
    if (loginNotice) loginNotice.style.display = "none";
    if (statusCard) statusCard.style.display = "";

    function formatDate(ts) {
      return new Date(ts).toLocaleDateString(currentLang === "ar" ? "ar-EG" : "en-US");
    }

    function render() {
      var user = findUser(session);
      if (!user) return;
      var stage = getAccountStage(user);

      var badge = document.getElementById("subStageBadge");
      var detail = document.getElementById("subStageDetail");
      var trialInfo = document.getElementById("subTrialInfo");
      var rejectedInfo = document.getElementById("subRejectedInfo");
      var paymentSection = document.getElementById("subPaymentSection");
      var activeInfo = document.getElementById("subActiveInfo");

      [trialInfo, rejectedInfo, paymentSection, activeInfo].forEach(function (el) {
        if (el) el.style.display = "none";
      });

      var tone = stage === "active" || stage === "trial" ? "chip-ok" : stage === "rejected" ? "chip-danger" : stage === "pending_review" ? "chip-warn" : "chip-neutral";
      if (badge) {
        badge.className = "admin-badge-chip " + tone;
        badge.textContent = t("admin.accountStage." + stage);
      }
      if (detail) {
        detail.textContent = t("subscription.stageDetail." + stage);
      }

      if (stage === "trial") {
        var daysLeft = Math.max(0, Math.ceil((user.trialEndsAt - Date.now()) / (24 * 60 * 60 * 1000)));
        if (trialInfo) {
          trialInfo.style.display = "";
          trialInfo.textContent = t("subscription.trialDaysLeft").replace("{days}", String(daysLeft)).replace("{date}", formatDate(user.trialEndsAt));
        }
        if (paymentSection) paymentSection.style.display = "";
      } else if (stage === "expired") {
        if (paymentSection) paymentSection.style.display = "";
      } else if (stage === "rejected") {
        if (rejectedInfo) {
          rejectedInfo.style.display = "";
          rejectedInfo.textContent = t("subscription.rejectedReason") + (user.rejectionReason ? " " + user.rejectionReason : "");
        }
      } else if (stage === "active") {
        if (activeInfo) {
          activeInfo.style.display = "";
          activeInfo.textContent =
            t("subscription.activeSince") + " " + (user.paidAt ? formatDate(user.paidAt) : "—") +
            (user.paymentMethod ? " · " + t("subscription.method." + user.paymentMethod) : "");
        }
      }

      var planSummary = document.getElementById("subPlanSummary");
      if (planSummary) {
        var priceText = user.plan ? formatMoney(PLAN_PRICES[user.plan] || 0) + (user.plan === "monthly" ? " / " + t("plan.perMonth") : " / " + t("admin.payments.perYear")) : "";
        planSummary.textContent = t("subscription.selectedPlan") + " " + (user.plan ? t("plan." + user.plan + ".name") : "—") + " — " + priceText;
      }
    }

    var payBtn = document.getElementById("payNowBtn");
    if (payBtn) {
      payBtn.addEventListener("click", function () {
        var methodInput = document.querySelector('input[name="paymentMethod"]:checked');
        var method = methodInput ? methodInput.value : "bankak";
        var statusEl = document.getElementById("subPaymentStatus");
        payBtn.disabled = true;
        payBtn.textContent = t("subscription.processing");
        setTimeout(function () {
          activateSubscriptionPayment(session, method);
          logAuditEvent("subscription_activated", session, method);
          if (statusEl) {
            statusEl.textContent = t("subscription.paymentSuccess");
            statusEl.classList.add("show", "success");
          }
          payBtn.disabled = false;
          payBtn.textContent = t("subscription.payNowBtn");
          render();
        }, 900);
      });
    }

    render();
    window.__rerenderPage = render;
  }

  /* ---------- شريط تنبيه وضع الصيانة ---------- */
  function renderMaintenanceBanner() {
    var banner = document.getElementById("maintenanceBanner");
    if (!banner) return;
    var settings = getSiteSettings();
    if (settings.maintenanceMode) {
      banner.textContent = settings.maintenanceMessage || t("maintenance.defaultMessage");
      banner.style.display = "";
    } else {
      banner.style.display = "none";
    }
  }

  /* ================= لوحة تحكم الإدارة (admin.html) ================= */
  var PLAN_PRICES = { monthly: 20000, yearly: 199000 };

  function formatMoney(n) {
    var formatted = Number(n || 0).toLocaleString(currentLang === "ar" ? "ar-EG" : "en-US");
    return formatted + " " + t("plan.currency");
  }

  function td(text) {
    var cell = document.createElement("td");
    cell.textContent = text;
    return cell;
  }

  function adminBadge(text, tone) {
    var span = document.createElement("span");
    span.className = "admin-badge-chip chip-" + tone;
    span.textContent = text;
    return span;
  }

  function statTileEl(label, value) {
    var tile = document.createElement("div");
    tile.className = "admin-stat-tile";
    var v = document.createElement("div");
    v.className = "admin-stat-value";
    v.textContent = value;
    var l = document.createElement("div");
    l.className = "admin-stat-label";
    l.textContent = label;
    tile.appendChild(v);
    tile.appendChild(l);
    return tile;
  }

  function initAdminPage() {
    var shell = document.getElementById("adminShell");
    if (!shell) return;

    var loginNotice = document.getElementById("adminLoginNotice");
    var registerGate = document.getElementById("adminRegisterGate");
    var deniedNotice = document.getElementById("adminAccessDenied");
    var bootstrapNotice = document.getElementById("adminBootstrap");
    var twoFactorGate = document.getElementById("adminTwoFactorGate");

    function hideAllGates() {
      [loginNotice, registerGate, deniedNotice, bootstrapNotice, twoFactorGate, shell].forEach(function (el) {
        if (el) el.style.display = "none";
      });
    }

    /* ---------- تسجيل مدير جديد (متاح فقط لمن يفوّض العملية ببيانات مدير عام صحيحة) ---------- */
    function initAdminRegisterGate() {
      var showBtn = document.getElementById("showAdminRegisterBtn");
      var backBtn = document.getElementById("backToAdminLoginBtn");
      var submitBtn = document.getElementById("submitAdminRegisterBtn");
      var roleSelect = document.getElementById("newAdminRole");
      var statusEl = document.getElementById("adminRegisterStatus");

      if (roleSelect) {
        roleSelect.innerHTML = "";
        var superAdminTaken = superAdminExists();
        Object.keys(ADMIN_ROLES).forEach(function (r) {
          if (r === "super_admin" && superAdminTaken) return;
          var opt = document.createElement("option");
          opt.value = r;
          opt.textContent = t(ADMIN_ROLES[r].labelKey);
          roleSelect.appendChild(opt);
        });
      }

      if (showBtn && !showBtn.dataset.bound) {
        showBtn.dataset.bound = "1";
        showBtn.addEventListener("click", function () {
          if (loginNotice) loginNotice.style.display = "none";
          if (registerGate) registerGate.style.display = "";
        });
      }
      if (backBtn && !backBtn.dataset.bound) {
        backBtn.dataset.bound = "1";
        backBtn.addEventListener("click", function () {
          if (registerGate) registerGate.style.display = "none";
          if (loginNotice) loginNotice.style.display = "";
        });
      }

      function setFieldInvalid(id, invalid) {
        var field = document.getElementById(id);
        if (field) field.classList.toggle("invalid", invalid);
      }

      if (submitBtn && !submitBtn.dataset.bound) {
        submitBtn.dataset.bound = "1";
        submitBtn.addEventListener("click", function () {
          if (statusEl) statusEl.classList.remove("show", "success", "error");

          var authorizerEmail = document.getElementById("authorizerEmail").value.trim();
          var authorizerPassword = document.getElementById("authorizerPassword").value;
          var name = document.getElementById("newAdminName").value.trim();
          var email = document.getElementById("newAdminEmail").value.trim();
          var phone = document.getElementById("newAdminPhone").value.trim();
          var password = document.getElementById("newAdminPassword").value;
          var confirmPassword = document.getElementById("newAdminConfirmPassword").value;
          var role = roleSelect.value;

          var nameValid = name.length >= 2;
          var emailValid = isValidEmail(email);
          var phoneValid = isValidPhone(phone);
          var passwordValid = password.length >= 6;
          var confirmValid = confirmPassword === password && confirmPassword.length > 0;
          var emailTaken = !!findUser(email);

          setFieldInvalid("newAdminNameField", !nameValid);
          setFieldInvalid("newAdminEmailField", !emailValid || emailTaken);
          setFieldInvalid("newAdminPhoneField", !phoneValid);
          setFieldInvalid("newAdminPasswordField", !passwordValid);
          setFieldInvalid("newAdminConfirmPasswordField", !confirmValid);
          var emailFormatMsg = document.getElementById("newAdminEmailFormatMsg");
          var emailExistsMsg = document.getElementById("newAdminEmailExistsMsg");
          if (emailFormatMsg) emailFormatMsg.style.display = !emailValid ? "block" : "none";
          if (emailExistsMsg) emailExistsMsg.style.display = emailValid && emailTaken ? "block" : "none";

          // التحقق من بيانات المدير العام المفوِّض للعملية
          var authorizer = findUser(authorizerEmail);
          var authorizerValid =
            !!authorizer && authorizer.password === authorizerPassword && authorizer.role === "super_admin";
          setFieldInvalid("authorizerEmailField", !authorizerValid);

          if (!authorizerValid) {
            if (statusEl) {
              statusEl.textContent = t("admin.registerNewAdmin.authorizerError");
              statusEl.classList.add("show", "error");
            }
            return;
          }

          if (!nameValid || !emailValid || emailTaken || !phoneValid || !passwordValid || !confirmValid) {
            if (statusEl) {
              statusEl.textContent = t("auth.fixErrors");
              statusEl.classList.add("show", "error");
            }
            return;
          }

          if (role === "super_admin" && superAdminExists()) {
            if (statusEl) {
              statusEl.textContent = t("admin.users.onlyOneSuperAdmin");
              statusEl.classList.add("show", "error");
            }
            return;
          }

          var users = getUsers();
          users.push({
            name: name,
            email: email,
            phone: phone,
            password: password,
            role: role,
            reviewStatus: "approved",
            reviewedAt: Date.now(),
            address: "",
            createdAt: Date.now(),
          });
          saveUsers(users);
          logAuditEvent("admin_registered_by_superadmin", email, role + " (by " + authorizer.email + ")");

          setSession(authorizer.email);
          if (statusEl) {
            statusEl.textContent = t("admin.registerNewAdmin.success");
            statusEl.classList.remove("error");
            statusEl.classList.add("show", "success");
          }
          setTimeout(function () {
            window.location.reload();
          }, 900);
        });
      }
    }
    initAdminRegisterGate();

    var session = getSession();
    if (!session) {
      hideAllGates();
      if (loginNotice) loginNotice.style.display = "";
      return;
    }
    var currentUser = findUser(session);
    if (!currentUser) {
      hideAllGates();
      if (loginNotice) loginNotice.style.display = "";
      return;
    }

    if (!isAdminRole(currentUser.role)) {
      if (getAdminUsersList().length === 0) {
        hideAllGates();
        if (bootstrapNotice) bootstrapNotice.style.display = "";
        var claimBtn = document.getElementById("claimSuperAdminBtn");
        if (claimBtn && !claimBtn.dataset.bound) {
          claimBtn.dataset.bound = "1";
          claimBtn.addEventListener("click", function () {
            updateUserRecord(currentUser.email, { role: "super_admin" });
            logAuditEvent("admin_role_granted", currentUser.email, "super_admin (bootstrap)");
            window.location.reload();
          });
        }
        return;
      }
      hideAllGates();
      if (deniedNotice) deniedNotice.style.display = "";
      return;
    }

    var otpVerifiedKey = "eqari_admin_otp_ok_" + currentUser.email;
    if (currentUser.twoFactorEnabled && sessionStorage.getItem(otpVerifiedKey) !== "1") {
      hideAllGates();
      if (twoFactorGate) twoFactorGate.style.display = "";
      var generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
      var otpDisplay = document.getElementById("adminOtpDisplay");
      if (otpDisplay) otpDisplay.textContent = generatedOtp;
      var otpField = document.getElementById("adminOtpField");
      var otpInput = document.getElementById("adminOtpInput");
      var verifyBtn = document.getElementById("adminOtpVerifyBtn");
      if (verifyBtn) {
        verifyBtn.addEventListener("click", function () {
          if (otpInput.value.trim() === generatedOtp) {
            sessionStorage.setItem(otpVerifiedKey, "1");
            logAuditEvent("admin_2fa_verified", currentUser.email, "");
            window.location.reload();
          } else {
            if (otpField) otpField.classList.add("invalid");
          }
        });
      }
      return;
    }

    hideAllGates();
    shell.style.display = "";

    var role = currentUser.role;
    var activeSection = null;

    var roleChip = document.getElementById("adminRoleChip");
    if (roleChip) {
      roleChip.textContent = (currentUser.name || currentUser.email) + " — " + t(ADMIN_ROLES[role].labelKey);
    }

    var nav = document.getElementById("adminNav");
    var sections = ADMIN_SECTION_ORDER.filter(function (s) {
      return roleAllowsSection(role, s);
    });

    function buildListingRow(l, withCategory) {
      var tr = document.createElement("tr");
      if (withCategory) tr.appendChild(td(getCategoryLabel(l.category)));

      var titleTd = document.createElement("td");
      var link = document.createElement("a");
      link.href = "listing.html?id=" + encodeURIComponent(l.id);
      link.target = "_blank";
      link.textContent = buildListingTitle(l);
      titleTd.appendChild(link);
      tr.appendChild(titleTd);

      tr.appendChild(td(l.ownerEmail || "—"));
      tr.appendChild(td(formatPrice(l)));
      tr.appendChild(td(t("city." + l.city)));

      var isSold = getListingStatus(l) === "sold";
      var statusTd = document.createElement("td");
      statusTd.appendChild(adminBadge(isSold ? t("listing.sold") : t("listing.active"), isSold ? "neutral" : "ok"));
      tr.appendChild(statusTd);

      var visTd = document.createElement("td");
      visTd.appendChild(adminBadge(l.hidden ? t("admin.listings.hidden") : t("admin.listings.visible"), l.hidden ? "danger" : "ok"));
      tr.appendChild(visTd);

      var actionsTd = document.createElement("td");
      actionsTd.className = "admin-actions-cell";

      var hideBtn = document.createElement("button");
      hideBtn.type = "button";
      hideBtn.className = "btn btn-ghost btn-xs";
      hideBtn.textContent = l.hidden ? t("admin.listings.unhideBtn") : t("admin.listings.hideBtn");
      hideBtn.addEventListener("click", function () {
        updateListing(l.id, { hidden: !l.hidden });
        logAuditEvent(l.hidden ? "listing_unhidden" : "listing_hidden", l.id, "");
        renderSection(activeSection);
      });
      actionsTd.appendChild(hideBtn);

      var toggleSoldBtn = document.createElement("button");
      toggleSoldBtn.type = "button";
      toggleSoldBtn.className = "btn btn-ghost btn-xs";
      toggleSoldBtn.textContent = isSold ? t("myListings.reactivateBtn") : t("myListings.markSoldBtn");
      toggleSoldBtn.addEventListener("click", function () {
        updateListing(l.id, { status: isSold ? "active" : "sold" });
        logAuditEvent("listing_status_changed", l.id, isSold ? "active" : "sold");
        renderSection(activeSection);
      });
      actionsTd.appendChild(toggleSoldBtn);

      var deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "btn btn-ghost btn-xs btn-danger";
      deleteBtn.textContent = t("myListings.deleteBtn");
      deleteBtn.addEventListener("click", function () {
        if (window.confirm(t("myListings.deleteConfirm"))) {
          deleteListing(l.id);
          logAuditEvent("listing_deleted", l.id, "");
          renderSection(activeSection);
        }
      });
      actionsTd.appendChild(deleteBtn);

      tr.appendChild(actionsTd);
      return tr;
    }

    function renderDashboard() {
      var wrap = document.getElementById("dashboardStats");
      if (wrap) {
        wrap.innerHTML = "";
        var users = getUsers();
        var listings = getListings();
        var soldCount = listings.filter(function (l) { return l.status === "sold"; }).length;
        var carsCount = listings.filter(function (l) { return l.category === "car" || l.category === "motorcycle"; }).length;
        var propsCount = listings.filter(function (l) { return ["land", "residential", "commercial"].indexOf(l.category) !== -1; }).length;
        var mrr = users.reduce(function (sum, u) {
          return sum + (u.plan === "monthly" ? PLAN_PRICES.monthly : u.plan === "yearly" ? Math.round(PLAN_PRICES.yearly / 12) : 0);
        }, 0);
        var thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        var activeUsersCount = users.filter(function (u) { return u.lastLoginAt && u.lastLoginAt >= thirtyDaysAgo; }).length;
        var sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        var newSubsCount = users.filter(function (u) { return u.createdAt && u.createdAt >= sevenDaysAgo; }).length;

        wrap.appendChild(statTileEl(t("admin.dashboard.stat.users"), String(users.length)));
        wrap.appendChild(statTileEl(t("admin.dashboard.stat.listings"), String(listings.length)));
        wrap.appendChild(statTileEl(t("admin.dashboard.stat.cars"), String(carsCount)));
        wrap.appendChild(statTileEl(t("admin.dashboard.stat.properties"), String(propsCount)));
        wrap.appendChild(statTileEl(t("admin.dashboard.stat.sold"), String(soldCount)));
        wrap.appendChild(statTileEl(t("admin.dashboard.stat.revenue"), formatMoney(mrr) + " / " + t("plan.perMonth")));
        wrap.appendChild(statTileEl(t("admin.dashboard.stat.newSubs"), String(newSubsCount)));
        wrap.appendChild(statTileEl(t("admin.dashboard.stat.activeUsers"), String(activeUsersCount)));
      }

      var citiesWrap = document.getElementById("dashboardTopCities");
      if (citiesWrap) {
        citiesWrap.innerHTML = "";
        var tally = {};
        getListings().forEach(function (l) {
          if (!l.city) return;
          tally[l.city] = (tally[l.city] || 0) + 1;
        });
        var entries = Object.keys(tally)
          .map(function (city) { return { city: city, count: tally[city] }; })
          .sort(function (a, b) { return b.count - a.count; })
          .slice(0, 5);
        if (!entries.length) {
          var empty = document.createElement("p");
          empty.className = "admin-note";
          empty.textContent = t("admin.dashboard.noCityData");
          citiesWrap.appendChild(empty);
        } else {
          var maxCount = entries[0].count;
          entries.forEach(function (e) {
            var row = document.createElement("div");
            row.className = "admin-city-row";
            var name = document.createElement("span");
            name.className = "admin-city-name";
            name.textContent = t("city." + e.city);
            var barWrap = document.createElement("span");
            barWrap.className = "admin-city-bar-wrap";
            var bar = document.createElement("span");
            bar.className = "admin-city-bar";
            bar.style.width = Math.max(6, Math.round((e.count / maxCount) * 100)) + "%";
            barWrap.appendChild(bar);
            var count = document.createElement("span");
            count.className = "admin-city-count";
            count.textContent = String(e.count);
            row.appendChild(name);
            row.appendChild(barWrap);
            row.appendChild(count);
            citiesWrap.appendChild(row);
          });
        }
      }
    }

    var usersFilter = "";
    var usersSearchInput = document.getElementById("usersSearchInput");
    if (usersSearchInput && !usersSearchInput.dataset.bound) {
      usersSearchInput.dataset.bound = "1";
      usersSearchInput.addEventListener("input", function () {
        usersFilter = usersSearchInput.value.trim().toLowerCase();
        renderUsers();
      });
    }
    function renderUsers() {
      var tbody = document.getElementById("usersTableBody");
      if (!tbody) return;
      tbody.innerHTML = "";
      var list = getUsers().filter(function (u) {
        if (!usersFilter) return true;
        return (u.name || "").toLowerCase().indexOf(usersFilter) !== -1 || (u.email || "").toLowerCase().indexOf(usersFilter) !== -1;
      });
      list.forEach(function (u) {
        var tr = document.createElement("tr");
        tr.appendChild(td(u.name || "—"));
        tr.appendChild(td(u.email));
        tr.appendChild(td(u.phone || "—"));

        var roleTd = document.createElement("td");
        var roleSelect = document.createElement("select");
        roleSelect.className = "admin-mini-select";
        ["user"].concat(Object.keys(ADMIN_ROLES)).forEach(function (r) {
          if (r === "super_admin" && u.role !== "super_admin" && superAdminExists()) return;
          var opt = document.createElement("option");
          opt.value = r;
          opt.textContent = r === "user" ? t("admin.role.user") : t(ADMIN_ROLES[r].labelKey);
          if ((u.role || "user") === r) opt.selected = true;
          roleSelect.appendChild(opt);
        });
        roleSelect.addEventListener("change", function () {
          if (u.role === "super_admin" && roleSelect.value !== "super_admin") {
            var others = getAdminUsersList().filter(function (a) { return a.role === "super_admin" && a.email !== u.email; });
            if (!others.length) {
              window.alert(t("admin.users.lastSuperAdminWarning"));
              roleSelect.value = "super_admin";
              return;
            }
          }
          if (roleSelect.value === "super_admin" && u.role !== "super_admin" && superAdminExists(u.email)) {
            window.alert(t("admin.users.onlyOneSuperAdmin"));
            roleSelect.value = u.role || "user";
            return;
          }
          updateUserRecord(u.email, { role: roleSelect.value === "user" ? undefined : roleSelect.value });
          logAuditEvent("user_role_changed", u.email, roleSelect.value);
          renderUsers();
        });
        roleTd.appendChild(roleSelect);
        tr.appendChild(roleTd);

        var statusTd = document.createElement("td");
        var uStatus = getUserStatus(u);
        var statusLabel = t(uStatus === "disabled" ? "admin.users.statusDisabled" : "admin.users.statusActive") + (u.flagged ? " · " + t("admin.users.flagged") : "");
        statusTd.appendChild(adminBadge(statusLabel, uStatus === "disabled" ? "danger" : u.flagged ? "warn" : "ok"));
        tr.appendChild(statusTd);

        var stageTd = document.createElement("td");
        var stage = getAccountStage(u);
        var stageTone = stage === "active" || stage === "trial" ? "ok" : stage === "rejected" ? "danger" : stage === "pending_review" ? "warn" : "neutral";
        stageTd.appendChild(adminBadge(t("admin.accountStage." + stage), stageTone));
        tr.appendChild(stageTd);

        tr.appendChild(td(u.plan ? t("plan." + u.plan + ".name") : "—"));
        tr.appendChild(td(u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString(currentLang === "ar" ? "ar-EG" : "en-US") : t("admin.users.neverLoggedIn")));

        var actionsTd = document.createElement("td");
        actionsTd.className = "admin-actions-cell";

        var toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "btn btn-ghost btn-xs";
        toggleBtn.textContent = uStatus === "disabled" ? t("admin.users.enableBtn") : t("admin.users.disableBtn");
        toggleBtn.addEventListener("click", function () {
          updateUserRecord(u.email, { status: uStatus === "disabled" ? "active" : "disabled" });
          logAuditEvent(uStatus === "disabled" ? "user_enabled" : "user_disabled", u.email, "");
          renderUsers();
        });
        actionsTd.appendChild(toggleBtn);

        var flagBtn = document.createElement("button");
        flagBtn.type = "button";
        flagBtn.className = "btn btn-ghost btn-xs";
        flagBtn.textContent = u.flagged ? t("admin.users.unflagBtn") : t("admin.users.flagBtn");
        flagBtn.addEventListener("click", function () {
          updateUserRecord(u.email, { flagged: !u.flagged });
          logAuditEvent(u.flagged ? "user_unflagged" : "user_flagged", u.email, "");
          renderUsers();
        });
        actionsTd.appendChild(flagBtn);

        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn btn-ghost btn-xs btn-danger";
        deleteBtn.textContent = t("admin.users.deleteBtn");
        deleteBtn.addEventListener("click", function () {
          if (u.email === session) {
            window.alert(t("admin.users.cannotDeleteSelf"));
            return;
          }
          if (window.confirm(t("admin.users.deleteConfirm"))) {
            saveUsers(getUsers().filter(function (x) { return x.email !== u.email; }));
            logAuditEvent("user_deleted", u.email, "");
            renderUsers();
          }
        });
        actionsTd.appendChild(deleteBtn);

        tr.appendChild(actionsTd);
        tbody.appendChild(tr);
      });
    }

    function renderPendingReview() {
      var tbody = document.getElementById("pendingReviewTableBody");
      var emptyNote = document.getElementById("pendingReviewEmptyNote");
      if (!tbody) return;
      tbody.innerHTML = "";
      var pending = getUsers().filter(function (u) {
        return !u.reviewStatus || u.reviewStatus === "pending";
      });
      if (emptyNote) emptyNote.style.display = pending.length ? "none" : "";
      pending.forEach(function (u) {
        var tr = document.createElement("tr");
        tr.appendChild(td(u.name || "—"));
        tr.appendChild(td(u.email));
        tr.appendChild(td(u.nationalId || "—"));

        var photoTd = document.createElement("td");
        if (u.idPhoto) {
          var link = document.createElement("a");
          link.href = u.idPhoto;
          link.target = "_blank";
          var thumb = document.createElement("img");
          thumb.src = u.idPhoto;
          thumb.alt = "";
          thumb.className = "admin-id-photo-thumb";
          link.appendChild(thumb);
          photoTd.appendChild(link);
        } else {
          photoTd.textContent = "—";
        }
        tr.appendChild(photoTd);

        tr.appendChild(td(u.plan ? t("plan." + u.plan + ".name") : "—"));

        var actionsTd = document.createElement("td");
        actionsTd.className = "admin-actions-cell";

        var approveBtn = document.createElement("button");
        approveBtn.type = "button";
        approveBtn.className = "btn btn-ghost btn-xs";
        approveBtn.textContent = t("admin.pendingReview.approveBtn");
        approveBtn.addEventListener("click", function () {
          approveUserAccount(u.email);
          logAuditEvent("user_approved", u.email, "");
          renderPendingReview();
          renderUsers();
        });
        actionsTd.appendChild(approveBtn);

        var rejectBtn = document.createElement("button");
        rejectBtn.type = "button";
        rejectBtn.className = "btn btn-ghost btn-xs btn-danger";
        rejectBtn.textContent = t("admin.pendingReview.rejectBtn");
        rejectBtn.addEventListener("click", function () {
          var reason = window.prompt(t("admin.pendingReview.rejectReasonPrompt"), "");
          if (reason === null) return;
          rejectUserAccount(u.email, reason);
          logAuditEvent("user_rejected", u.email, reason);
          renderPendingReview();
          renderUsers();
        });
        actionsTd.appendChild(rejectBtn);

        tr.appendChild(actionsTd);
        tbody.appendChild(tr);
      });
    }

    function renderCars() {
      var tbody = document.getElementById("carsTableBody");
      if (!tbody) return;
      tbody.innerHTML = "";
      getListings()
        .filter(function (l) { return l.category === "car" || l.category === "motorcycle"; })
        .sort(function (a, b) { return b.createdAt - a.createdAt; })
        .forEach(function (l) { tbody.appendChild(buildListingRow(l, false)); });
    }

    function renderProperties() {
      var tbody = document.getElementById("propertiesTableBody");
      if (!tbody) return;
      tbody.innerHTML = "";
      getListings()
        .filter(function (l) { return ["land", "residential", "commercial"].indexOf(l.category) !== -1; })
        .sort(function (a, b) { return b.createdAt - a.createdAt; })
        .forEach(function (l) { tbody.appendChild(buildListingRow(l, false)); });
    }

    var listingsFilter = "";
    var listingsSearchInput = document.getElementById("listingsSearchInput");
    if (listingsSearchInput && !listingsSearchInput.dataset.bound) {
      listingsSearchInput.dataset.bound = "1";
      listingsSearchInput.addEventListener("input", function () {
        listingsFilter = listingsSearchInput.value.trim().toLowerCase();
        renderMasterListings();
      });
    }
    function renderMasterListings() {
      var tbody = document.getElementById("listingsTableBody");
      if (!tbody) return;
      tbody.innerHTML = "";
      getListings()
        .filter(function (l) {
          if (!listingsFilter) return true;
          return buildListingTitle(l).toLowerCase().indexOf(listingsFilter) !== -1 || (l.ownerEmail || "").toLowerCase().indexOf(listingsFilter) !== -1;
        })
        .sort(function (a, b) { return b.createdAt - a.createdAt; })
        .forEach(function (l) { tbody.appendChild(buildListingRow(l, true)); });
    }

    function renderPayments() {
      var users = getUsers();
      var statsWrap = document.getElementById("paymentsStats");
      if (statsWrap) {
        statsWrap.innerHTML = "";
        var mrr = users.reduce(function (sum, u) {
          return sum + (u.plan === "monthly" ? PLAN_PRICES.monthly : u.plan === "yearly" ? Math.round(PLAN_PRICES.yearly / 12) : 0);
        }, 0);
        statsWrap.appendChild(statTileEl(t("admin.payments.mrr"), formatMoney(mrr)));
        statsWrap.appendChild(statTileEl(t("admin.payments.arr"), formatMoney(mrr * 12)));
        statsWrap.appendChild(statTileEl(t("admin.payments.totalSubscribers"), String(users.length)));
      }
      var tbody = document.getElementById("paymentsTableBody");
      if (tbody) {
        tbody.innerHTML = "";
        users.forEach(function (u) {
          var tr = document.createElement("tr");
          tr.appendChild(td(u.name + " — " + u.email));
          tr.appendChild(td(u.plan ? t("plan." + u.plan + ".name") : "—"));
          var amountText = formatMoney(PLAN_PRICES[u.plan] || 0) + (u.plan === "monthly" ? " / " + t("plan.perMonth") : u.plan === "yearly" ? " / " + t("admin.payments.perYear") : "");
          tr.appendChild(td(amountText));
          tbody.appendChild(tr);
        });
      }
    }

    var couponForm = document.getElementById("addCouponForm");
    if (couponForm && !couponForm.dataset.bound) {
      couponForm.dataset.bound = "1";
      couponForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var codeInput = document.getElementById("couponCode");
        var discountInput = document.getElementById("couponDiscount");
        var code = codeInput.value.trim();
        var discount = Number(discountInput.value);
        if (!code || !discount || discount < 1 || discount > 100) return;
        addCoupon({ code: code, discountPercent: discount });
        logAuditEvent("coupon_added", code, discount + "%");
        codeInput.value = "";
        discountInput.value = "";
        renderCoupons();
      });
    }
    function renderCoupons() {
      var tbody = document.getElementById("couponsTableBody");
      if (!tbody) return;
      tbody.innerHTML = "";
      getCoupons().forEach(function (c) {
        var tr = document.createElement("tr");
        tr.appendChild(td(c.code));
        tr.appendChild(td(c.discountPercent + "%"));
        var statusTd = document.createElement("td");
        statusTd.appendChild(adminBadge(c.active ? t("admin.coupons.active") : t("admin.coupons.inactive"), c.active ? "ok" : "neutral"));
        tr.appendChild(statusTd);

        var actionsTd = document.createElement("td");
        var toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "btn btn-ghost btn-xs";
        toggleBtn.textContent = c.active ? t("admin.coupons.deactivateBtn") : t("admin.coupons.activateBtn");
        toggleBtn.addEventListener("click", function () {
          var coupons = getCoupons();
          var idx = coupons.findIndex(function (x) { return x.id === c.id; });
          if (idx > -1) {
            coupons[idx].active = !coupons[idx].active;
            saveCoupons(coupons);
          }
          logAuditEvent("coupon_toggled", c.code, "");
          renderCoupons();
        });
        actionsTd.appendChild(toggleBtn);

        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn btn-ghost btn-xs btn-danger";
        deleteBtn.textContent = t("myListings.deleteBtn");
        deleteBtn.addEventListener("click", function () {
          deleteCoupon(c.id);
          logAuditEvent("coupon_deleted", c.code, "");
          renderCoupons();
        });
        actionsTd.appendChild(deleteBtn);

        tr.appendChild(actionsTd);
        tbody.appendChild(tr);
      });
    }

    function renderSubscriptions() {
      var tbody = document.getElementById("subscriptionsTableBody");
      if (tbody) {
        tbody.innerHTML = "";
        getUsers().forEach(function (u) {
          var tr = document.createElement("tr");
          tr.appendChild(td(u.name + " — " + u.email));
          tr.appendChild(td(u.plan ? t("plan." + u.plan + ".name") : "—"));
          var actionTd = document.createElement("td");
          var select = document.createElement("select");
          select.className = "admin-mini-select";
          ["monthly", "yearly"].forEach(function (p) {
            var opt = document.createElement("option");
            opt.value = p;
            opt.textContent = t("plan." + p + ".name");
            if (u.plan === p) opt.selected = true;
            select.appendChild(opt);
          });
          select.addEventListener("change", function () {
            updateUserRecord(u.email, { plan: select.value });
            logAuditEvent("user_plan_changed", u.email, select.value);
            renderSubscriptions();
          });
          actionTd.appendChild(select);
          tr.appendChild(actionTd);
          tbody.appendChild(tr);
        });
      }
      renderCoupons();
    }

    function renderReports() {
      var tbody = document.getElementById("reportsTableBody");
      if (!tbody) return;
      tbody.innerHTML = "";
      getReports()
        .slice()
        .sort(function (a, b) { return b.createdAt - a.createdAt; })
        .forEach(function (r) {
          var tr = document.createElement("tr");
          var listing = getListingById(r.listingId);
          var listingTd = document.createElement("td");
          if (listing) {
            var link = document.createElement("a");
            link.href = "listing.html?id=" + encodeURIComponent(listing.id);
            link.target = "_blank";
            link.textContent = buildListingTitle(listing);
            listingTd.appendChild(link);
          } else {
            listingTd.textContent = t("admin.reports.listingDeleted");
          }
          tr.appendChild(listingTd);
          tr.appendChild(td(r.reporterEmail));
          tr.appendChild(td(t("listingPage.reportReason." + r.reason)));

          var statusTd = document.createElement("td");
          statusTd.appendChild(adminBadge(t("admin.reports.status." + r.status), r.status === "open" ? "danger" : "ok"));
          tr.appendChild(statusTd);

          tr.appendChild(td(new Date(r.createdAt).toLocaleDateString(currentLang === "ar" ? "ar-EG" : "en-US")));

          var actionsTd = document.createElement("td");
          if (r.status === "open") {
            var resolveBtn = document.createElement("button");
            resolveBtn.type = "button";
            resolveBtn.className = "btn btn-ghost btn-xs";
            resolveBtn.textContent = t("admin.reports.resolveBtn");
            resolveBtn.addEventListener("click", function () {
              updateReport(r.id, { status: "resolved" });
              logAuditEvent("report_resolved", r.id, r.listingId);
              renderReports();
            });
            actionsTd.appendChild(resolveBtn);

            var dismissBtn = document.createElement("button");
            dismissBtn.type = "button";
            dismissBtn.className = "btn btn-ghost btn-xs";
            dismissBtn.textContent = t("admin.reports.dismissBtn");
            dismissBtn.addEventListener("click", function () {
              updateReport(r.id, { status: "dismissed" });
              logAuditEvent("report_dismissed", r.id, r.listingId);
              renderReports();
            });
            actionsTd.appendChild(dismissBtn);

            if (listing) {
              var deleteListingBtn = document.createElement("button");
              deleteListingBtn.type = "button";
              deleteListingBtn.className = "btn btn-ghost btn-xs btn-danger";
              deleteListingBtn.textContent = t("admin.reports.deleteListingBtn");
              deleteListingBtn.addEventListener("click", function () {
                if (window.confirm(t("myListings.deleteConfirm"))) {
                  deleteListing(listing.id);
                  updateReport(r.id, { status: "resolved" });
                  logAuditEvent("listing_deleted_from_report", listing.id, r.id);
                  renderReports();
                }
              });
              actionsTd.appendChild(deleteListingBtn);
            }
          }
          tr.appendChild(actionsTd);
          tbody.appendChild(tr);
        });
    }

    function renderContentEditor() {
      var wrap = document.getElementById("contentEditorFields");
      if (!wrap) return;
      wrap.innerHTML = "";
      var overrides = getSiteContentOverrides();
      EDITABLE_CONTENT_KEYS.forEach(function (key) {
        var group = document.createElement("div");
        group.className = "admin-content-field-group";
        var heading = document.createElement("div");
        heading.className = "admin-content-field-heading";
        heading.textContent = key;
        group.appendChild(heading);

        ["ar", "en"].forEach(function (lang) {
          var field = document.createElement("div");
          field.className = "form-field";
          var label = document.createElement("label");
          label.textContent = lang === "ar" ? t("admin.content.arLabel") : t("admin.content.enLabel");
          field.appendChild(label);
          var input = document.createElement("input");
          input.type = "text";
          input.setAttribute("data-content-lang", lang);
          input.setAttribute("data-content-key", key);
          input.value = (overrides[lang] && overrides[lang][key]) || "";
          input.placeholder = I18N[lang][key] || "";
          field.appendChild(input);
          group.appendChild(field);
        });
        wrap.appendChild(group);
      });
    }
    var saveContentBtn = document.getElementById("saveContentBtn");
    if (saveContentBtn && !saveContentBtn.dataset.bound) {
      saveContentBtn.dataset.bound = "1";
      saveContentBtn.addEventListener("click", function () {
        var inputs = document.querySelectorAll("#contentEditorFields input[data-content-key]");
        Array.prototype.forEach.call(inputs, function (input) {
          saveSiteContentOverride(input.getAttribute("data-content-lang"), input.getAttribute("data-content-key"), input.value.trim());
        });
        logAuditEvent("site_content_updated", "", "");
        applyTranslations();
        if (typeof window.__rerenderPage === "function") window.__rerenderPage();
        window.alert(t("admin.content.saved"));
      });
    }

    function renderSettings() {
      var settings = getSiteSettings();
      var minAgeInput = document.getElementById("settingMinAge");
      var maintenanceModeInput = document.getElementById("settingMaintenanceMode");
      var maintenanceMessageInput = document.getElementById("settingMaintenanceMessage");
      if (minAgeInput) minAgeInput.value = settings.minAge;
      if (maintenanceModeInput) maintenanceModeInput.checked = !!settings.maintenanceMode;
      if (maintenanceMessageInput) maintenanceMessageInput.value = settings.maintenanceMessage || "";
    }
    var saveSettingsBtn = document.getElementById("saveSettingsBtn");
    if (saveSettingsBtn && !saveSettingsBtn.dataset.bound) {
      saveSettingsBtn.dataset.bound = "1";
      saveSettingsBtn.addEventListener("click", function () {
        var minAgeInput = document.getElementById("settingMinAge");
        var maintenanceModeInput = document.getElementById("settingMaintenanceMode");
        var maintenanceMessageInput = document.getElementById("settingMaintenanceMessage");
        saveSiteSettings({
          minAge: Math.max(13, Number(minAgeInput.value) || 18),
          maintenanceMode: !!maintenanceModeInput.checked,
          maintenanceMessage: maintenanceMessageInput.value.trim(),
        });
        logAuditEvent("site_settings_updated", "", "");
        window.alert(t("admin.settings.saved"));
      });
    }

    var exportBtn = document.getElementById("exportBackupBtn");
    if (exportBtn && !exportBtn.dataset.bound) {
      exportBtn.dataset.bound = "1";
      exportBtn.addEventListener("click", function () {
        var backup = {};
        var keys = [
          "eqari_users", "eqari_listings", "eqari_messages", "eqari_used_ids",
          "eqari_audit_log", "eqari_reports", "eqari_coupons", "eqari_site_content", "eqari_site_settings",
        ];
        keys.forEach(function (k) {
          var raw = localStorage.getItem(k);
          if (raw !== null) {
            try { backup[k] = JSON.parse(raw); } catch (e) { /* تجاهل */ }
          }
        });
        backup.exportedAt = Date.now();
        var blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "mubasher-backup-" + new Date().toISOString().slice(0, 10) + ".json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        logAuditEvent("backup_exported", "", "");
      });
    }
    var importInput = document.getElementById("importBackupInput");
    if (importInput && !importInput.dataset.bound) {
      importInput.dataset.bound = "1";
      importInput.addEventListener("change", function () {
        var file = importInput.files && importInput.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          try {
            var data = JSON.parse(reader.result);
            if (!window.confirm(t("admin.settings.importConfirm"))) {
              importInput.value = "";
              return;
            }
            Object.keys(data).forEach(function (k) {
              if (k === "exportedAt") return;
              localStorage.setItem(k, JSON.stringify(data[k]));
            });
            logAuditEvent("backup_imported", "", "");
            window.alert(t("admin.settings.importSuccess"));
            window.location.reload();
          } catch (e) {
            window.alert(t("admin.settings.importError"));
          }
          importInput.value = "";
        };
        reader.readAsText(file);
      });
    }

    function renderAdminUsers() {
      var tbody = document.getElementById("adminUsersTableBody");
      if (tbody) {
        tbody.innerHTML = "";
        getAdminUsersList().forEach(function (u) {
          var tr = document.createElement("tr");
          tr.appendChild(td(u.name || "—"));
          tr.appendChild(td(u.email));

          var roleTd = document.createElement("td");
          var roleSelect = document.createElement("select");
          roleSelect.className = "admin-mini-select";
          Object.keys(ADMIN_ROLES).forEach(function (r) {
            if (r === "super_admin" && u.role !== "super_admin" && superAdminExists()) return;
            var opt = document.createElement("option");
            opt.value = r;
            opt.textContent = t(ADMIN_ROLES[r].labelKey);
            if (u.role === r) opt.selected = true;
            roleSelect.appendChild(opt);
          });
          roleSelect.addEventListener("change", function () {
            if (u.role === "super_admin" && roleSelect.value !== "super_admin") {
              var others = getAdminUsersList().filter(function (a) { return a.role === "super_admin" && a.email !== u.email; });
              if (!others.length) {
                window.alert(t("admin.users.lastSuperAdminWarning"));
                roleSelect.value = "super_admin";
                return;
              }
            }
            if (roleSelect.value === "super_admin" && u.role !== "super_admin" && superAdminExists(u.email)) {
              window.alert(t("admin.users.onlyOneSuperAdmin"));
              roleSelect.value = u.role;
              return;
            }
            updateUserRecord(u.email, { role: roleSelect.value });
            logAuditEvent("user_role_changed", u.email, roleSelect.value);
            renderAdminUsers();
          });
          roleTd.appendChild(roleSelect);
          tr.appendChild(roleTd);

          var tfaTd = document.createElement("td");
          var tfaToggle = document.createElement("button");
          tfaToggle.type = "button";
          tfaToggle.className = "btn btn-ghost btn-xs";
          tfaToggle.textContent = u.twoFactorEnabled ? t("admin.adminUsers.disable2fa") : t("admin.adminUsers.enable2fa");
          tfaToggle.addEventListener("click", function () {
            updateUserRecord(u.email, { twoFactorEnabled: !u.twoFactorEnabled });
            logAuditEvent(u.twoFactorEnabled ? "admin_2fa_disabled" : "admin_2fa_enabled", u.email, "");
            renderAdminUsers();
          });
          tfaTd.appendChild(tfaToggle);
          tr.appendChild(tfaTd);

          var actionsTd = document.createElement("td");
          var revokeBtn = document.createElement("button");
          revokeBtn.type = "button";
          revokeBtn.className = "btn btn-ghost btn-xs btn-danger";
          revokeBtn.textContent = t("admin.adminUsers.revokeBtn");
          revokeBtn.addEventListener("click", function () {
            if (u.role === "super_admin") {
              var others = getAdminUsersList().filter(function (a) { return a.role === "super_admin" && a.email !== u.email; });
              if (!others.length) {
                window.alert(t("admin.users.lastSuperAdminWarning"));
                return;
              }
            }
            updateUserRecord(u.email, { role: undefined });
            logAuditEvent("admin_role_revoked", u.email, "");
            renderAdminUsers();
          });
          actionsTd.appendChild(revokeBtn);
          tr.appendChild(actionsTd);

          tbody.appendChild(tr);
        });
      }
      var roleSelectGrant = document.getElementById("grantAdminRole");
      if (roleSelectGrant) {
        var prevGrantVal = roleSelectGrant.value;
        roleSelectGrant.innerHTML = "";
        var superAdminTaken = superAdminExists();
        Object.keys(ADMIN_ROLES).forEach(function (r) {
          if (r === "super_admin" && superAdminTaken) return;
          var opt = document.createElement("option");
          opt.value = r;
          opt.textContent = t(ADMIN_ROLES[r].labelKey);
          roleSelectGrant.appendChild(opt);
        });
        if (prevGrantVal && Array.prototype.some.call(roleSelectGrant.options, function (o) { return o.value === prevGrantVal; })) {
          roleSelectGrant.value = prevGrantVal;
        }
      }
    }
    var grantAdminBtn = document.getElementById("grantAdminBtn");
    if (grantAdminBtn && !grantAdminBtn.dataset.bound) {
      grantAdminBtn.dataset.bound = "1";
      grantAdminBtn.addEventListener("click", function () {
        var emailInput = document.getElementById("grantAdminEmail");
        var roleSelect = document.getElementById("grantAdminRole");
        var email = emailInput.value.trim();
        var target = findUser(email);
        if (!target) {
          window.alert(t("admin.adminUsers.userNotFound"));
          return;
        }
        if (roleSelect.value === "super_admin" && superAdminExists(target.email)) {
          window.alert(t("admin.users.onlyOneSuperAdmin"));
          return;
        }
        updateUserRecord(target.email, { role: roleSelect.value });
        logAuditEvent("admin_role_granted", target.email, roleSelect.value);
        emailInput.value = "";
        renderAdminUsers();
      });
    }

    function renderAuditLogs() {
      var tbody = document.getElementById("auditLogTableBody");
      if (!tbody) return;
      tbody.innerHTML = "";
      getAuditLog()
        .slice()
        .reverse()
        .slice(0, 200)
        .forEach(function (entry) {
          var tr = document.createElement("tr");
          tr.appendChild(td(new Date(entry.createdAt).toLocaleString(currentLang === "ar" ? "ar-EG" : "en-US")));
          tr.appendChild(td(entry.actorEmail));
          tr.appendChild(td(t("admin.auditAction." + entry.action)));
          tr.appendChild(td(entry.target || "—"));
          tr.appendChild(td(entry.details || "—"));
          tbody.appendChild(tr);
        });
    }

    function renderSection(sec) {
      if (sec === "dashboard") renderDashboard();
      else if (sec === "users") { renderPendingReview(); renderUsers(); }
      else if (sec === "cars") renderCars();
      else if (sec === "properties") renderProperties();
      else if (sec === "listings") renderMasterListings();
      else if (sec === "payments") renderPayments();
      else if (sec === "subscriptions") renderSubscriptions();
      else if (sec === "reports") renderReports();
      else if (sec === "content") renderContentEditor();
      else if (sec === "settings") renderSettings();
      else if (sec === "adminUsers") renderAdminUsers();
      else if (sec === "auditLogs") renderAuditLogs();
    }

    function showSection(sec) {
      activeSection = sec;
      ADMIN_SECTION_ORDER.forEach(function (s) {
        var el = document.getElementById("section-" + s);
        if (el) el.style.display = s === sec ? "" : "none";
      });
      Array.prototype.forEach.call(nav.querySelectorAll("button"), function (btn) {
        btn.classList.toggle("active", btn.getAttribute("data-section") === sec);
      });
      renderSection(sec);
    }

    nav.innerHTML = "";
    sections.forEach(function (sec) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-section", sec);
      btn.textContent = t("admin.nav." + sec);
      btn.addEventListener("click", function () { showSection(sec); });
      nav.appendChild(btn);
    });

    showSection(sections[0]);
    window.__rerenderAdmin = function () {
      if (activeSection) showSection(activeSection);
    };
  }

  /* ---------- تشغيل كل الوحدات بعد تحميل الصفحة ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyTranslations();
    initLangToggle();
    initHeaderAuthState();
    initSearchTabs();
    initSignupForm();
    initLoginForm();
    initForgotPassword();
    initProfileModal();
    initListingForm();
    renderHomeListings();
    initListingDetailPage();
    initMessagesPage();
    initMyListingsPage();
    initSubscriptionPage();
    initAdminPage();
    renderMaintenanceBanner();
    if (document.getElementById("realestateGrid") || document.getElementById("vehiclesGrid")) {
      window.__rerenderPage = renderHomeListings;
    }
  });
})();
