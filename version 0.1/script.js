/* =========================================================
   عقاري وسيارتي — ملف الجافاسكريبت الموحّد لكل صفحات المشروع
   يشمل: حالة الدخول بالهيدر، تسجيل الدخول والخروج، إنشاء حساب،
   نسيت كلمة المرور (رمز مؤقت لمرة واحدة)، وصفحة إضافة إعلان.

   ملاحظة: هذا موقع تجريبي بدون خادم فعلي، لذلك يتم تخزين
   الحسابات وحالة الدخول داخل localStorage الخاص بالمتصفح،
   وكلمة المرور المؤقتة تُعرض على الشاشة بدلاً من إرسالها
   فعليًا عبر بريد إلكتروني أو رسالة نصية.
   ========================================================= */

(function () {
  "use strict";

  var USERS_KEY = "eqari_users";
  var SESSION_KEY = "eqari_session";

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
    if (!authActions) return;

    var loginBtn = document.getElementById("navLoginBtn");
    var signupBtn = document.getElementById("navSignupBtn");
    var session = getSession();

    if (session) {
      if (signupBtn) signupBtn.style.display = "none";
      if (loginBtn) {
        loginBtn.textContent = "تسجيل الخروج";
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
        tabs.forEach(function (t) {
          t.classList.remove("active");
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
        status.textContent = "الرجاء تصحيح البيانات المُعلّمة أدناه قبل المتابعة.";
        status.classList.add("show", "error");
        return;
      }

      if (!termsInput.checked) {
        status.textContent = "الرجاء الموافقة على الشروط والأحكام للمتابعة.";
        status.classList.add("show", "error");
        return;
      }

      var users = getUsers();
      var email = emailInput.value.trim();
      var alreadyExists = users.some(function (u) {
        return u.email === email;
      });
      if (alreadyExists) {
        status.textContent = "يوجد حساب مسجّل بهذا البريد الإلكتروني مسبقًا.";
        status.classList.add("show", "error");
        return;
      }

      users.push({
        name: nameInput.value.trim(),
        email: email,
        phone: phoneInput.value.trim(),
        password: passwordInput.value,
      });
      saveUsers(users);

      submitBtn.disabled = true;
      submitBtn.textContent = "جارٍ إنشاء الحساب...";

      setTimeout(function () {
        status.textContent = "تم إنشاء الحساب بنجاح، جارٍ تحويلك...";
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
        status.textContent = "الرجاء إدخال بيانات صحيحة.";
        status.classList.add("show", "error");
        return;
      }

      var users = getUsers();
      var email = emailInput.value.trim();
      var match = users.find(function (u) {
        return u.email === email && u.password === passwordInput.value;
      });

      if (!match) {
        status.textContent = "البريد الإلكتروني أو كلمة المرور غير صحيحة، الرجاء إدخال بيانات صحيحة.";
        status.classList.add("show", "error");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "جارٍ الدخول...";

      setTimeout(function () {
        status.textContent = "تم تسجيل الدخول بنجاح، جارٍ تحويلك...";
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

    // الخطوة 1: التحقق من تطابق البريد/الجوال وإرسال رمز مؤقت
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

    // الخطوة 2: التحقق من الرمز المؤقت (لمرة واحدة فقط)
    verifyBtn.addEventListener("click", function () {
      var entered = otpInput.value.trim();
      if (otpUsed || !generatedOtp || entered !== generatedOtp) {
        otpField.classList.add("invalid");
        return;
      }
      otpField.classList.remove("invalid");
      otpUsed = true; // إبطال الرمز فور استخدامه بنجاح
      showStep(step3);
    });

    // الخطوة 3: تعيين كلمة مرور جديدة ثم الدخول للموقع
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

      generatedOtp = null; // الرمز غير صالح بعد الآن
      setSession(matchedUser.email);
      modal.classList.remove("open");
      window.location.href = "index.html";
    });
  }

  /* ---------- نموذج إضافة إعلان ---------- */
  function initListingForm() {
    var form = document.getElementById("listingForm");
    if (!form) return;

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
          modelEl.innerHTML = '<option value="">اختر الشركة أولاً</option>';
          return;
        }
        var placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "اختر الموديل...";
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

      var titleValid = val("title").length >= 3;
      setInvalid("titleField", !titleValid);
      if (!titleValid) allValid = false;

      var offerValid = val("offerType") !== "";
      setInvalid("offerTypeField", !offerValid);
      if (!offerValid) allValid = false;

      var priceValid = parseFloat(val("price")) > 0;
      setInvalid("priceField", !priceValid);
      if (!priceValid) allValid = false;

      var cityValid = val("city") !== "";
      setInvalid("cityField", !cityValid);
      if (!cityValid) allValid = false;

      if (selectedCategory === "land") {
        var a1 = val("landArea") !== "" && parseFloat(val("landArea")) > 0;
        var t1 = val("landType") !== "";
        setInvalid("landAreaField", !a1);
        setInvalid("landTypeField", !t1);
        if (!a1 || !t1) allValid = false;
      } else if (selectedCategory === "residential") {
        var a2 = val("resArea") !== "" && parseFloat(val("resArea")) > 0;
        var r2 = val("resRooms") !== "";
        var b2 = val("resBaths") !== "";
        setInvalid("resAreaField", !a2);
        setInvalid("resRoomsField", !r2);
        setInvalid("resBathsField", !b2);
        if (!a2 || !r2 || !b2) allValid = false;
      } else if (selectedCategory === "commercial") {
        var a3 = val("comArea") !== "" && parseFloat(val("comArea")) > 0;
        var t3 = val("comType") !== "";
        setInvalid("comAreaField", !a3);
        setInvalid("comTypeField", !t3);
        if (!a3 || !t3) allValid = false;
      } else if (selectedCategory === "car") {
        var b4 = val("carBrand") !== "";
        var m4 = val("carModel") !== "";
        var y4 = val("carYear") !== "";
        setInvalid("carBrandField", !b4);
        setInvalid("carModelField", !m4);
        setInvalid("carYearField", !y4);
        if (!b4 || !m4 || !y4) allValid = false;
      } else if (selectedCategory === "motorcycle") {
        var b5 = val("motoBrand") !== "";
        var m5 = val("motoModel") !== "";
        var y5 = val("motoYear") !== "";
        setInvalid("motoBrandField", !b5);
        setInvalid("motoModelField", !m5);
        setInvalid("motoYearField", !y5);
        if (!b5 || !m5 || !y5) allValid = false;
      }

      if (!allValid) {
        status.textContent = "الرجاء تصحيح البيانات المُعلّمة أعلاه قبل نشر الإعلان.";
        status.classList.add("show", "error");
        status.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "جارٍ النشر...";

      setTimeout(function () {
        status.textContent = "تم نشر إعلانك بنجاح، جارٍ تحويلك للصفحة الرئيسية...";
        status.classList.remove("error");
        status.classList.add("show", "success");
        setTimeout(function () {
          window.location.href = "index.html";
        }, 800);
      }, 900);
    });
  }

  /* ---------- تشغيل كل الوحدات بعد تحميل الصفحة ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initHeaderAuthState();
    initSearchTabs();
    initSignupForm();
    initLoginForm();
    initForgotPassword();
    initListingForm();
  });
})();
