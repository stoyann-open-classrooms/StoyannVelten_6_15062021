/**
 * @module modale
 */

function openModalForm(currentPhotographer) {
  const banerBody = document.querySelector(".banner-body");
  const bannerBtnTablet = document.querySelector(".banner-btn");
  const btnModalMobile = document.querySelector(".btn-modal-mobile");
  const bannerModal = document.createElement("div");
  const bannerModalContent = document.createElement("div");
  const bannerModalValidationMsg = document.createElement("div");
  const bannerModalHeader = document.createElement("div");
  const modalClose = document.createElement("i");
  const modalTitle = document.createElement("h3");
  const bannerForm = document.createElement("form");
  const formFirstName = document.createElement("label");
  const formFirstNameInp = document.createElement("input");
  const messageAlertFirst = document.createElement("span");

  const formLastName = document.createElement("label");
  const formLastNameInp = document.createElement("input");
  const messageAlertLast = document.createElement("span");

  const formEmail = document.createElement("label");
  const formEmailInp = document.createElement("input");
  const messageAlertMail = document.createElement("span");

  const formTxt = document.createElement("label");
  const formTxtInp = document.createElement("textarea");
  const messageAlertMsg = document.createElement("span");

  const formBtn = document.createElement("button");

  bannerModal.classList.add("contact-modal");
  modalClose.classList.add("modal-close");
  bannerModalValidationMsg.classList.add("modal-validation-msg");
  modalClose.classList.add("fas");
  modalTitle.classList.add("modal-title");

  modalClose.classList.add("fa-times");
  bannerModalHeader.classList.add("modal-header");
  bannerForm.classList.add("modal-form");
  messageAlertFirst.classList.add("message-alert");
  messageAlertLast.classList.add("message-alert");
  messageAlertMail.classList.add("message-alert");
  messageAlertMsg.classList.add("message-alert");

  formFirstNameInp.classList.add("firstName-inp");
  formFirstNameInp.id = "prenom";
  formFirstName.setAttribute("for", "prenom");
  formFirstNameInp.setAttribute("type", "text");
  formFirstNameInp.setAttribute("maxlenght", "24");
  formFirstNameInp.setAttribute("name", "first-Name");

  formLastNameInp.classList.add("lastName-inp");
  formLastNameInp.id = "nom";
  formLastName.setAttribute("for", "nom");
  formLastNameInp.setAttribute("type", "text");
  formLastNameInp.setAttribute("maxlenght", "24");
  formLastNameInp.setAttribute("name", "last-Name");

  formEmailInp.classList.add("email-inp");
  formEmailInp.id = "email";
  formEmail.setAttribute("for", "email");
  formEmailInp.setAttribute("type", "email");
  formBtn.setAttribute("type", "submit");
  formBtn.setAttribute("value", "Envoyer");
  formBtn.setAttribute("name", "Email");

  formTxtInp.classList.add("msg-inp");
  formTxtInp.id = "msg";
  formTxt.setAttribute("for", "msg");
  formTxtInp.setAttribute("type", "text");
  formTxtInp.setAttribute("name", "message");

  bannerModalContent.classList.add("modal-content");
  btnModalMobile.setAttribute("type", "button");
  bannerBtnTablet.setAttribute("type", "button");

  modalTitle.innerHTML = `Contactez-Moi <br>${currentPhotographer.name}`;

  formFirstName.innerHTML = "Prénom";
  messageAlertFirst.textContent = "Vous devez entrer votre prénom !";
  messageAlertLast.textContent = "Vous devez entrer votre nom !";
  messageAlertMail.textContent = "Vous devez entrer un Email valide ! ";
  messageAlertMsg.textContent = "Votre devez entrer un message ! ";
  formLastName.innerHTML = "Nom";
  formEmail.innerHTML = "Email<br>";
  formTxt.innerHTML = "Votre Message<br>";
  formBtn.textContent = "Envoyer";
  // bannerModalValidationMsg.textContent = `Votre message a bien été envoyé à ${currentPhotographer.name} `;

  banerBody.append(bannerModal);
  bannerModal.append(bannerModalContent);
  bannerModalContent.append(bannerModalHeader, bannerForm);
  bannerModalHeader.append(modalTitle, modalClose);
  bannerForm.append(
    formFirstName,
    formFirstNameInp,
    messageAlertFirst,
    formLastName,
    formLastNameInp,
    messageAlertLast,
    formEmail,
    formEmailInp,
    messageAlertMail,
    formTxt,
    formTxtInp,
    messageAlertMsg,
    formBtn
  );
  //open modal
  btnModalMobile.addEventListener("click", () => {
    bannerModal.style.display = "flex";
  });
  bannerBtnTablet.addEventListener("click", () => {
    bannerModal.style.display = "flex";
  });
  // close modal
  modalClose.addEventListener("click", () => {
    bannerModal.style.display = "none";
  });
  // submit form
  bannerForm.addEventListener("submit", isValid);
}

function verifFirst() {
  const formFirstNameInp = document.querySelector(".firstName-inp");
  const errorMessage = document.querySelectorAll(".message-alert");

  formFirstNameInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[0].style.display = "inline";
      formFirstNameInp.classList.add("echec");
      formFirstNameInp.classList.add("border");

      setTimeout(() => {
        formFirstNameInp.classList.remove("echec");
        formFirstNameInp.classList.remove("border");
      }, 500);
      FormVerification.push(false);
    } else {
      errorMessage[0].style.display = "none";
      FormVerification.push(true);
    }
  });
}

function verifLast() {
  const formLastNameInp = document.querySelector(".lastName-inp");
  const errorMessage = document.querySelectorAll(".message-alert");

  formLastNameInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[1].style.display = "inline";
      formLastNameInp.classList.add("echec");
      formLastNameInp.classList.add("border");

      setTimeout(() => {
        formLastNameInp.classList.remove("echec");
        formLastNameInp.classList.remove("border");
      }, 500);
      FormVerification.push(false);

      form;
    } else {
      errorMessage[1].style.display = "none";
      FormVerification.push(true);
    }
  });
}
function verifMail() {
  const formEmailInp = document.querySelector(".email-inp");
  const errorMessage = document.querySelectorAll(".message-alert");

  formEmailInp.addEventListener("input", (e) => {
    const regexMail = /\S+@\S+\.\S+/;
    if (e.target.value.search(regexMail) === 0) {
      errorMessage[2].style.display = "none";
      FormVerification.push(true);
    } else if (e.target.value.search(regexMail) === -1) {
      errorMessage[2].style.display = "inline";
      formEmailInp.classList.add("echec");
      formEmailInp.classList.add("border");

      setTimeout(() => {
        formEmailInp.classList.remove("echec");
        formEmailInp.classList.remove("border");
      }, 500);
      FormVerification.push(false);
    }
  });
}
function verifMsg() {
  const formMsgInp = document.querySelector(".msg-inp");
  const errorMessage = document.querySelectorAll(".message-alert");

  formMsgInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[3].style.display = "inline";
      formMsgInp.classList.add("echec");
      formMsgInp.classList.add("border");

      setTimeout(() => {
        formMsgInp.classList.remove("echec");
        formMsgInp.classList.remove("border");
      }, 500);
      FormVerification.push(false);
    } else {
      errorMessage[3].style.display = "none";
      FormVerification.push(true);
    }
  });
}

function isValid(e, currentPhotographer) {
  e.preventDefault();
  verifFirst();
  verifLast();
  verifMail();
  verifMsg();

  {
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.textContent = `Votre message a bien été envoyé à ${currentPhotographer.name} `;
    bannerForm.style.display = "none";
    modalTitle.style.animation = "apparition-down 0.8s ease-in-out";
    modalTitle.style.margin = "65% 0";
    modalTitle.style.fontSize = "30px";

    // log des entres de l'uttilisateur
    let datas = new FormData(bannerForm);
    for (let i of datas.entries()) {
      console.log(i[0], ":", i[1]);
    }
  }
}

export { openModalForm, verifFirst, verifLast, verifMail, verifMsg, isValid };
