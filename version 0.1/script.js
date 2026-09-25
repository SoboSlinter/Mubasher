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
    "terms.s3.body": "أنت مسؤول عن الحفاظ على سرية بيانات حسابك وكلمة المرور الخاصة بك، وعن جميع الأنشطة التي تتم من خلال حسابك.",
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
    "terms.s3.body": "You are responsible for keeping your account credentials and password confidential, and for all activity that occurs under your account.",
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
  function formatPrice(listing) {
    var n = Number(listing.price) || 0;
    var formatted = n.toLocaleString(currentLang === "ar" ? "ar-EG" : "en-US");
    var text = formatted + " " + t("plan.currency");
    if (listing.offerType === "rent") {
      text += " / " + t("plan.perMonth");
    }
    return text;
  }
  function buildListingTitle(listing) {
    if (listing.category === "car") {
      return [listing.carBrand, listing.carModel, listing.carYear].filter(Boolean).join(" ");
    }
    if (listing.category === "motorcycle") {
      return [listing.motoBrand, listing.motoModel, listing.motoYear].filter(Boolean).join(" ");
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
        specs.push({ value: odo, unit: t("spec.km") });
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
    var a = document.createElement("a");
    a.className = "card card-link";
    a.href = "listing.html?id=" + encodeURIComponent(listing.id);

    var media = document.createElement("div");
    media.className = "card-media";
    if (listing.photos && listing.photos[0]) {
      media.style.backgroundImage = "url('" + listing.photos[0] + "')";
    } else {
      media.classList.add("card-media-empty");
    }
    var badge = document.createElement("span");
    badge.className = "badge" + (listing.offerType !== "rent" ? " sale" : "");
    badge.textContent = listing.offerType === "rent" ? t("offer.rent") : t("offer.sale");
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

    var listings = getListings().slice().sort(function (a, b) {
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

  /* ---------- حالة الدخول في هيدر الصفحة الرئيسية ---------- */
  function initHeaderAuthState() {
    var authActions = document.getElementById("authActions");
    var messagesLink = document.getElementById("navMessagesLink");
    var session = getSession();

    if (messagesLink) {
      messagesLink.style.display = session ? "" : "none";
    }

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
    var passwordField = document.getElementById("passwordField");
    var confirmField = document.getElementById("confirmField");

    var nameInput = document.getElementById("fullName");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
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

      setInvalid(nameField, !nameValid);
      setInvalid(emailField, !emailValid);
      setInvalid(phoneField, !phoneValid);
      setInvalid(passwordField, !passwordValid);
      setInvalid(confirmField, !confirmValid);

      if (!nameValid || !emailValid || !phoneValid || !passwordValid || !confirmValid) {
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

      users.push({
        name: nameInput.value.trim(),
        email: email,
        phone: phoneInput.value.trim(),
        password: passwordInput.value,
        plan: getSelectedPlan(),
      });
      saveUsers(users);

      submitBtn.disabled = true;
      submitBtn.textContent = t("auth.creatingAccount");

      setTimeout(function () {
        status.textContent = t("auth.signupSuccess");
        status.classList.remove("error");
        status.classList.add("show", "success");
        setSession(email);
        setTimeout(function () {
          window.location.href = "index.html";
        }, 700);
      }, 900);
    });

    [nameInput, emailInput, phoneInput, passwordInput, confirmInput].forEach(function (input) {
      input.addEventListener("input", function () {
        input.closest(".form-field").classList.remove("invalid");
      });
    });
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
        status.textContent = t("auth.wrongCredentials");
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

  /* ---------- نموذج إضافة إعلان ---------- */
  function initListingForm() {
    var form = document.getElementById("listingForm");
    if (!form) return;

    /* ---------- الحماية: يجب تسجيل الدخول لنشر إعلان ---------- */
    var authNotice = document.getElementById("authRequiredNotice");
    var listingFormCard = document.getElementById("listingFormCard");
    var currentSession = getSession();
    if (!currentSession) {
      if (authNotice) authNotice.style.display = "";
      if (listingFormCard) listingFormCard.style.display = "none";
      return;
    }
    if (authNotice) authNotice.style.display = "none";
    if (listingFormCard) listingFormCard.style.display = "";

    var carData = {
      "تويوتا": ["كامري", "كورولا", "لاندكروزر", "هايلكس", "راف 4", "يارس"],
      "هيونداي": ["سوناتا", "إلنترا", "توسان", "أكسنت", "سانتافي"],
      "مرسيدس": ["C200", "E200", "S500", "GLC", "GLE"],
      "نيسان": ["التيما", "صني", "باترول", "إكس تريل", "صنترا"],
      "كيا": ["سيراتو", "سبورتاج", "أوبتيما", "سورينتو"],
      "فورد": ["F150", "إكسبلورر", "فيوجن", "إيدج"],
      "شيفروليه": ["كابرس", "تاهو", "ماليبو", "سيلفرادو"],
      "لكزس": ["ES", "RX", "LX", "GX"],
      "بي إم دبليو": ["الفئة 3", "الفئة 5", "X5", "X3"],
      "هوندا": ["أكورد", "سيفيك", "CR-V", "بايلوت"],
    };

    var motoData = {
      "هوندا": ["CB150", "CBR500", "أفريكا توين", "PCX"],
      "ياماها": ["YBR125", "R15", "MT-07", "NMAX"],
      "كاواساكي": ["Ninja 400", "Z900", "Versys"],
      "سوزوكي": ["GSX-R", "GN125", "V-Strom"],
      "باجاج": ["بولسار 150", "بولسار 200", "ديسكفر"],
      TVS: ["أباتشي", "ستار سيتي"],
    };

    function fillBrandSelect(selectEl, data) {
      Object.keys(data).forEach(function (brand) {
        var opt = document.createElement("option");
        opt.value = brand;
        opt.textContent = brand;
        selectEl.appendChild(opt);
      });
    }

    function wireDependentSelects(brandEl, modelEl, data) {
      brandEl.addEventListener("change", function () {
        modelEl.innerHTML = "";
        var brand = brandEl.value;
        if (!brand) {
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
        data[brand].forEach(function (model) {
          var opt = document.createElement("option");
          opt.value = model;
          opt.textContent = model;
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

    fillBrandSelect(carBrand, carData);
    fillBrandSelect(motoBrand, motoData);
    wireDependentSelects(carBrand, carModel, carData);
    wireDependentSelects(motoBrand, motoModel, motoData);
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

    function setInvalid(id, invalid) {
      var el = document.getElementById(id);
      if (el) el.classList.toggle("invalid", invalid);
    }
    function val(id) {
      return document.getElementById(id).value.trim();
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

      var priceValid = parseFloat(val("price")) > 0;
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
        var landNumDup = !landNumEmpty && isIdUsed("land", landNumberRaw);
        var landNumValid = !landNumEmpty && !landNumDup;
        setInvalid("landNumberField", !landNumValid);
        setFieldMessage(
          "landNumberErrorMsg",
          landNumDup ? "listingPage.landNumberDuplicate" : "listingPage.landNumberError"
        );
        if (landNumValid) pendingUsedId = { bucket: "land", id: landNumberRaw };

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
        var resNumDup = !resNumEmpty && isIdUsed("residential", resNumberRaw);
        var resNumValid = !resNumEmpty && !resNumDup;
        setInvalid("resNumberField", !resNumValid);
        setFieldMessage(
          "resNumberErrorMsg",
          resNumDup ? "listingPage.propertyNumberDuplicate" : "listingPage.propertyNumberError"
        );
        if (resNumValid) pendingUsedId = { bucket: "residential", id: resNumberRaw };

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
        var comNumDup = !comNumEmpty && isIdUsed("commercial", comNumberRaw);
        var comNumValid = !comNumEmpty && !comNumDup;
        setInvalid("comNumberField", !comNumValid);
        setFieldMessage(
          "comNumberErrorMsg",
          comNumDup ? "listingPage.propertyNumberDuplicate" : "listingPage.propertyNumberError"
        );
        if (comNumValid) pendingUsedId = { bucket: "commercial", id: comNumberRaw };

        if (!a3 || !t3 || !addr3 || !comNumValid) allValid = false;
      } else if (selectedCategory === "car") {
        var b4 = val("carBrand") !== "";
        var m4 = val("carModel") !== "";
        var y4 = val("carYear") !== "";
        var odo4 = val("carOdometer") !== "" && parseFloat(val("carOdometer")) >= 0;
        setInvalid("carBrandField", !b4);
        setInvalid("carModelField", !m4);
        setInvalid("carYearField", !y4);
        setInvalid("carOdometerField", !odo4);

        var carRegRaw = val("carRegistration");
        var carRegEmpty = carRegRaw === "";
        var carRegDup = !carRegEmpty && isIdUsed("car", carRegRaw);
        var carRegValid = !carRegEmpty && !carRegDup;
        setInvalid("carRegistrationField", !carRegValid);
        setFieldMessage(
          "carRegistrationErrorMsg",
          carRegDup ? "listingPage.carRegistrationDuplicate" : "listingPage.carRegistrationError"
        );
        if (carRegValid) pendingUsedId = { bucket: "car", id: carRegRaw };

        if (!b4 || !m4 || !y4 || !odo4 || !carRegValid) allValid = false;
      } else if (selectedCategory === "motorcycle") {
        var b5 = val("motoBrand") !== "";
        var m5 = val("motoModel") !== "";
        var y5 = val("motoYear") !== "";
        var odo5 = val("motoOdometer") !== "" && parseFloat(val("motoOdometer")) >= 0;
        setInvalid("motoBrandField", !b5);
        setInvalid("motoModelField", !m5);
        setInvalid("motoYearField", !y5);
        setInvalid("motoOdometerField", !odo5);
        if (!b5 || !m5 || !y5 || !odo5) allValid = false;
      }

      var photosInput = document.getElementById("photos");
      var photosValid = photosInput && photosInput.files && photosInput.files.length > 0;
      setInvalid("photosField", !photosValid);
      if (!photosValid) allValid = false;

      if (!allValid) {
        status.textContent = t("listingPage.fixErrors");
        status.classList.add("show", "error");
        status.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = t("listingPage.publishing");

      readFilesAsDataURLs(photosInput.files)
        .then(function (photoUrls) {
          var owner = findUser(currentSession);
          var listing = {
            id: genId(),
            category: selectedCategory,
            offerType: selectedCategory === "land" ? "" : val("offerType"),
            price: parseFloat(val("price")),
            city: val("city"),
            description: document.getElementById("description").value.trim(),
            photos: photoUrls,
            ownerEmail: currentSession,
            ownerName: owner ? owner.name : "",
            createdAt: Date.now(),
          };

          if (selectedCategory === "land") {
            listing.landArea = val("landArea");
            listing.landType = val("landType");
            listing.landAddress = val("landAddress");
          } else if (selectedCategory === "residential") {
            listing.resArea = val("resArea");
            listing.resRooms = val("resRooms");
            listing.resBaths = val("resBaths");
            listing.resAddress = val("resAddress");
          } else if (selectedCategory === "commercial") {
            listing.comArea = val("comArea");
            listing.comType = val("comType");
            listing.comAddress = val("comAddress");
          } else if (selectedCategory === "car") {
            listing.carBrand = val("carBrand");
            listing.carModel = val("carModel");
            listing.carYear = val("carYear");
            listing.carOdometer = val("carOdometer");
          } else if (selectedCategory === "motorcycle") {
            listing.motoBrand = val("motoBrand");
            listing.motoModel = val("motoModel");
            listing.motoYear = val("motoYear");
            listing.motoOdometer = val("motoOdometer");
          }

          addListing(listing);
          if (pendingUsedId) markIdUsed(pendingUsedId.bucket, pendingUsedId.id);

          status.textContent = t("listingPage.success");
          status.classList.remove("error");
          status.classList.add("show", "success");
          setTimeout(function () {
            window.location.href = "listing.html?id=" + encodeURIComponent(listing.id);
          }, 800);
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = t("listingPage.publishBtn");
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

    if (!listing) {
      if (content) content.style.display = "none";
      if (notFound) notFound.style.display = "";
      return;
    }
    if (notFound) notFound.style.display = "none";
    if (content) content.style.display = "";

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

  /* ---------- تشغيل كل الوحدات بعد تحميل الصفحة ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyTranslations();
    initLangToggle();
    initHeaderAuthState();
    initSearchTabs();
    initSignupForm();
    initLoginForm();
    initForgotPassword();
    initListingForm();
    renderHomeListings();
    initListingDetailPage();
    initMessagesPage();
    if (document.getElementById("realestateGrid") || document.getElementById("vehiclesGrid")) {
      window.__rerenderPage = renderHomeListings;
    }
  });
})();
