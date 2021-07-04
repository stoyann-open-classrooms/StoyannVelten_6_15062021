/**
 * @module modale
 */

function openModalForm(currentPhotographer) {
  const modalTitle = document.querySelector(".modal-title");
  const btnModalMobile = document.querySelector(".btn-modal-mobile");
  const bannerBtnTablet = document.querySelector(".banner-btn");
  const bannerModal = document.querySelector("form");
  const contactModal = document.querySelector(".contact-modal");
  const formFirstNameInp = document.querySelector(".firstName-inp");
  const formLastNameInp = document.querySelector(".lastName-inp");
  const formEmailInp = document.querySelector(".email-inp");
  const formMsgInp = document.querySelector(".msg-inp");
  const errorMessage = document.querySelectorAll(".message-alert");

  modalTitle.innerHTML = `Contactez-Moi <br>${currentPhotographer.name} `;

  //open modal
  btnModalMobile.addEventListener("click", () => {
    contactModal.style.display = "flex";
  });
  bannerBtnTablet.addEventListener("click", () => {
    contactModal.style.display = "flex";
  });
  closeModal();
  formFirstNameInp.addEventListener("input", (e) => {
    verifFirst = false;
    if (e.target.value.length <= 3) {
      errorMessage[0].style.display = "inline";
      formFirstNameInp.classList.add("echec");
      formFirstNameInp.classList.add("border");

      setTimeout(() => {
        formFirstNameInp.classList.remove("echec");
        formFirstNameInp.classList.remove("border");
      }, 500);
      return (verifFirst = false);
    } else {
      errorMessage[0].style.display = "none";
      return (verifFirst = true);
    }
  });
  formLastNameInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[1].style.display = "inline";
      formLastNameInp.classList.add("echec");
      formLastNameInp.classList.add("border");

      setTimeout(() => {
        formLastNameInp.classList.remove("echec");
        formLastNameInp.classList.remove("border");
      }, 500);
    } else {
      errorMessage[1].style.display = "none";
    }
  });
  formEmailInp.addEventListener("input", (e) => {
    const regexMail = /\S+@\S+\.\S+/;
    if (e.target.value.search(regexMail) === 0) {
      errorMessage[2].style.display = "none";
    } else if (e.target.value.search(regexMail) === -1) {
      errorMessage[2].style.display = "inline";
      formEmailInp.classList.add("echec");
      formEmailInp.classList.add("border");

      setTimeout(() => {
        formEmailInp.classList.remove("echec");
        formEmailInp.classList.remove("border");
      }, 500);
    }
  });

  formMsgInp.addEventListener("input", (e) => {
    if (e.target.value.length <= 3) {
      errorMessage[3].style.display = "inline";
      formMsgInp.classList.add("echec");
      formMsgInp.classList.add("border");

      setTimeout(() => {
        formMsgInp.classList.remove("echec");
        formMsgInp.classList.remove("border");
      }, 500);
    } else {
      errorMessage[3].style.display = "none";
    }
  });

  // submit form

  bannerModal.addEventListener("submit", (e) => {
    e.preventDefault();
    const modalTitle = document.querySelector(".modal-title");
    const bannerModal = document.querySelector("form");
    bannerModal.style.opacity = "0";

    modalTitle.innerHTML = `Votre message a bien étè envoyer a <br> ${currentPhotographer.name} `;
    let datas = new FormData(bannerModal);
    for (let i of datas.entries()) {
      console.log(i[0], ":", i[1]);
    }
  });
}
function closeModal() {
  const modalClose = document.querySelector(".modal-close");
  const contactModal = document.querySelector(".contact-modal");

  modalClose.addEventListener("click", () => {
    contactModal.style.display = "none";
  });
}

export { openModalForm };
