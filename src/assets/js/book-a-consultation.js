function initBookConsultationForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
  const actualPhone = document.getElementById("actualPhone");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("validMsg");

  const countryInput = document.getElementById("countryInput");
  const nationalityInput = document.getElementById("nationalityInput");
  const degreeInput = document.getElementById("degreeInput");
  const specializationInput = document.getElementById("specializationInput");

  const countryError = document.getElementById("countryError");
  const nationalityError = document.getElementById("nationalityError");
  const degreeError = document.getElementById("degreeError");
  const specializationError = document.getElementById("specializationError");

  // Conditional field containers
  const conditionalContainer = document.getElementById("degreeConditionalFields");
  const bachelorFields = document.getElementById("bachelorFields");
  const masterFields = document.getElementById("masterFields");
  const phdFields = document.getElementById("phdFields");

  // Conditional inputs (now text inputs)
  const branchInput = document.getElementById("branchInput");
  const gpaInput = document.getElementById("gpaInput");
  const bachelorSpecInput = document.getElementById("bachelorSpecInput");
  const phdBachelorSpecInput = document.getElementById("phdBachelorSpecInput");
  const masterSpecInput = document.getElementById("masterSpecInput");

  // Conditional errors
  const branchError = document.getElementById("branchError");
  const gpaError = document.getElementById("gpaError");
  const bachelorSpecError = document.getElementById("bachelorSpecError");
  const phdBachelorSpecError = document.getElementById("phdBachelorSpecError");
  const masterSpecError = document.getElementById("masterSpecError");

  if (
    !nameInput ||
    !emailInput ||
    !phoneInput ||
    !actualPhone ||
    !nameError ||
    !emailError ||
    !phoneError ||
    !countryInput ||
    !nationalityInput ||
    !degreeInput ||
    !specializationInput ||
    !countryError ||
    !nationalityError ||
    !degreeError ||
    !specializationError
  ) {
    return;
  }

  // Track current degree for validation
  let currentDegree = "";

  let iti = null;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !iti) {
      iti = window.intlTelInput(phoneInput, {
        initialCountry: "sa",
        preferredCountries: ["sa", "eg", "ae", "kw", "qa", "jo"],
        separateDialCode: true,
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
      });
      observer.disconnect();
    }
  });

  function validateName() {
    const value = nameInput.value.trim();
    const hasNumbers = /\d/.test(value);

    nameError.classList.add("hidden");
    nameError.children[0].classList.add("hidden");
    nameError.children[1].classList.add("hidden");

    if (value.length < 3) {
      nameError.classList.remove("hidden");
      nameError.children[0].classList.remove("hidden");
      return false;
    }

    if (hasNumbers) {
      nameError.classList.remove("hidden");
      nameError.children[1].classList.remove("hidden");
      return false;
    }

    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const isValid = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i.test(value);

    if (isValid) {
      emailError.classList.add("hidden");
      return true;
    }

    emailError.classList.remove("hidden");
    return false;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    phoneError.classList.add("hidden");

    if (!value) {
      phoneError.textContent = "الرجاء إدخال رقم الجوال";
      phoneError.classList.remove("hidden");
      return false;
    }

    if (iti && !iti.isValidNumber()) {
      phoneError.textContent = "الرجاء إدخال رقم جوال صحيح";
      phoneError.classList.remove("hidden");
      return false;
    }

    return true;
  }

  function validateSelect(selectElement, errorElement, message) {
    if (selectElement.value.trim() === "") {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
      return false;
    }

    errorElement.classList.add("hidden");
    return true;
  }

  function validateTextInput(inputElement, errorElement, message) {
    if (inputElement.value.trim() === "") {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
      return false;
    }

    errorElement.classList.add("hidden");
    return true;
  }

  // ===== Degree Conditional Logic =====
  function hideAllConditionalFields() {
    bachelorFields.classList.add("hidden");
    masterFields.classList.add("hidden");
    phdFields.classList.add("hidden");
  }

  function resetConditionalInputs() {
    // Reset all conditional input values
    if (branchInput) branchInput.value = "";
    if (gpaInput) gpaInput.value = "";
    if (bachelorSpecInput) bachelorSpecInput.value = "";
    if (phdBachelorSpecInput) phdBachelorSpecInput.value = "";
    if (masterSpecInput) masterSpecInput.value = "";

    // Hide all conditional errors
    if (branchError) branchError.classList.add("hidden");
    if (gpaError) gpaError.classList.add("hidden");
    if (bachelorSpecError) bachelorSpecError.classList.add("hidden");
    if (phdBachelorSpecError) phdBachelorSpecError.classList.add("hidden");
    if (masterSpecError) masterSpecError.classList.add("hidden");
  }

  function showConditionalContainer() {
    conditionalContainer.style.gridTemplateRows = "1fr";
    conditionalContainer.style.opacity = "1";
  }

  function hideConditionalContainer() {
    conditionalContainer.style.gridTemplateRows = "0fr";
    conditionalContainer.style.opacity = "0";
  }

  function handleDegreeChange() {
    const degree = degreeInput.value;
    currentDegree = degree;

    hideAllConditionalFields();
    resetConditionalInputs();

    if (!degree) {
      hideConditionalContainer();
      return;
    }

    // Show the appropriate fields based on degree
    switch (degree) {
      case "بكالوريوس":
        bachelorFields.classList.remove("hidden");
        break;
      case "ماجستير":
        masterFields.classList.remove("hidden");
        break;
      case "دكتوراه":
        phdFields.classList.remove("hidden");
        break;
    }

    // Animate container open
    showConditionalContainer();
  }

  function validateConditionalFields() {
    let isValid = true;

    switch (currentDegree) {
      case "بكالوريوس":
        if (branchInput && branchError) {
          if (!validateTextInput(branchInput, branchError, "الرجاء إدخال التشعيب الدراسي")) isValid = false;
        }
        if (gpaInput && gpaError) {
          if (!validateTextInput(gpaInput, gpaError, "الرجاء إدخال المعدل الدراسي")) isValid = false;
        }
        break;

      case "ماجستير":
        if (bachelorSpecInput && bachelorSpecError) {
          if (!validateTextInput(bachelorSpecInput, bachelorSpecError, "الرجاء إدخال تخصص البكالوريوس")) isValid = false;
        }
        break;

      case "دكتوراه":
        if (phdBachelorSpecInput && phdBachelorSpecError) {
          if (!validateTextInput(phdBachelorSpecInput, phdBachelorSpecError, "الرجاء إدخال تخصص البكالوريوس")) isValid = false;
        }
        if (masterSpecInput && masterSpecError) {
          if (!validateTextInput(masterSpecInput, masterSpecError, "الرجاء إدخال تخصص الماجستير")) isValid = false;
        }
        break;
    }

    return isValid;
  }

  // ===== Event Listeners =====
  observer.observe(phoneInput);

  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });

  // GPA: numbers only (digits and dot for decimals)
  if (gpaInput) {
    gpaInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^\d.]/g, "");
      // Prevent multiple dots
      const parts = this.value.split(".");
      if (parts.length > 2) {
        this.value = parts[0] + "." + parts.slice(1).join("");
      }
    });
  }

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);
  phoneInput.addEventListener("blur", validatePhone);

  countryInput.addEventListener("change", () =>
    validateSelect(countryInput, countryError, "الرجاء اختيار الدولة"),
  );
  nationalityInput.addEventListener("change", () =>
    validateSelect(nationalityInput, nationalityError, "الرجاء اختيار الجنسية"),
  );
  degreeInput.addEventListener("change", () => {
    validateSelect(degreeInput, degreeError, "الرجاء اختيار الدرجة العلمية");
    handleDegreeChange();
  });
  specializationInput.addEventListener("input", () =>
    validateTextInput(
      specializationInput,
      specializationError,
      "الرجاء إدخال التخصص الدراسي",
    ),
  );

  // Conditional field input listeners
  if (branchInput && branchError) {
    branchInput.addEventListener("input", () =>
      validateTextInput(branchInput, branchError, "الرجاء إدخال التشعيب الدراسي"),
    );
  }
  if (gpaInput && gpaError) {
    gpaInput.addEventListener("input", () =>
      validateTextInput(gpaInput, gpaError, "الرجاء إدخال المعدل الدراسي"),
    );
  }
  if (bachelorSpecInput && bachelorSpecError) {
    bachelorSpecInput.addEventListener("input", () =>
      validateTextInput(
        bachelorSpecInput,
        bachelorSpecError,
        "الرجاء إدخال تخصص البكالوريوس",
      ),
    );
  }
  if (phdBachelorSpecInput && phdBachelorSpecError) {
    phdBachelorSpecInput.addEventListener("input", () =>
      validateTextInput(
        phdBachelorSpecInput,
        phdBachelorSpecError,
        "الرجاء إدخال تخصص البكالوريوس",
      ),
    );
  }
  if (masterSpecInput && masterSpecError) {
    masterSpecInput.addEventListener("input", () =>
      validateTextInput(
        masterSpecInput,
        masterSpecError,
        "الرجاء إدخال تخصص الماجستير",
      ),
    );
  }

  form.addEventListener("submit", (event) => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isCountryValid = validateSelect(
      countryInput,
      countryError,
      "الرجاء اختيار الدولة",
    );
    const isNationalityValid = validateSelect(
      nationalityInput,
      nationalityError,
      "الرجاء اختيار الجنسية",
    );
    const isDegreeValid = validateSelect(
      degreeInput,
      degreeError,
      "الرجاء اختيار الدرجة العلمية",
    );
    const isSpecializationValid = validateTextInput(
      specializationInput,
      specializationError,
      "الرجاء إدخال التخصص الدراسي",
    );
    const isConditionalValid = validateConditionalFields();

    if (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isCountryValid &&
      isNationalityValid &&
      isDegreeValid &&
      isSpecializationValid &&
      isConditionalValid
    ) {
      const dialCode = iti ? iti.getSelectedCountryData().dialCode : "";
      actualPhone.value = dialCode ? "+" + dialCode + phoneInput.value.trim() : phoneInput.value.trim();
      return;
    }

    event.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initBookConsultationForm();
});
