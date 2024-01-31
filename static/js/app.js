// Click Listener Global
window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', event => {
        let target = event.target;

        if (target.dataset.toggle == 'myModal' || target.dataset.close) {
            let allModals = document.querySelectorAll('.myModal-container');
            console.log(target);
            console.log(allModals);
            for (const modal of allModals) {
                modal.classList.remove('show');
            }

            let modalTargetId = target.dataset.target || target.dataset.close;
            let modalTargetEl = document.getElementById(modalTargetId);

            if (modalTargetEl) {
                modalTargetEl.classList.add('show');
                document.body.classList.add('over-y-hide');
            }

        }
        if (target.classList.contains('myModal-container')) {
            target.classList.remove('show');
            document.body.classList.remove('over-y-hide');
        }

        // Logica para abrir y cerrar los dropdowns
        if (target.classList.contains('dropdown-link')) {
            if (target.nextElementSibling.classList.contains('dropdown-list')) {
                target.nextElementSibling.classList.toggle('show');
            }
            document.addEventListener('click', (e) => {
                if (!target.contains(e.target)) {
                    target.nextElementSibling.classList.remove('show');
                }
            });
        }
        // Logica para abrir y cerrar los dropdowns
        if (target.classList.contains('dropdown-toggle')) {
            if (target.nextElementSibling.classList.contains('dropdown-items')) {
                target.nextElementSibling.classList.toggle('show');
            }
            document.addEventListener('click', (e) => {
                if (!target.contains(e.target)) {
                    target.nextElementSibling.classList.remove('show');
                }
            });
        }

        if (target.classList.contains('dropdownCard-link')) {
            target.nextElementSibling.classList.toggle('show');
        }

        // Logica para abrir y cerrar el sidebar
        if (target.classList.contains('pageSidebar-toggler')) {
            let sidebarContainer = document.querySelector('.pageSidebar-container');
            if (sidebarContainer) {
                sidebarContainer.classList.toggle('visible');
            }
            document.body.classList.toggle('over-y-hide');
        }

        // Logica para abrir y cerrar los items del FAQ
        if (target.classList.contains('faq-header')) {
            let faqDetails = document.querySelectorAll(".faq")
            let faqContainer = document.querySelectorAll(".faq-item")
            for (let i = 0; i < faqContainer.length; i++) {
                faqContainer[i].addEventListener('click', () => {
                    for (let count = 0; count < faqDetails.length; count++) {
                        if (!faqDetails[i].hasAttribute('open')) faqDetails[count].removeAttribute('open')
                    }
                })
            }
        }

        if (target.classList.contains('burgerMenu-toggler') || target.classList.contains('burgerMenu-close')) {
            let burguerMenuContainer = document.querySelector('.burgerMenu-container');
            burguerMenuContainer.classList.toggle('show');
            document.body.classList.toggle('over-y-hide');
        }

        if (target.hasAttribute('modal-preview') || target.classList.contains('back-button') || target.classList.contains('cardPreview-container')) {
            event.preventDefault();
            let previewContainer = document.querySelector('.cardPreview-container');
            previewContainer.classList.toggle('open-preview');
            document.body.classList.toggle('over-y-hide');
        }

        if (target.classList.contains('toggle-sideInfo') || target.classList.contains('info-visualizer-close')) {
            let visualizerInfo = document.querySelector('.modal-visualizer-info');
            visualizerInfo.classList.toggle('show');
            document.body.classList.toggle('over-y-hide');
        }

        if (target.classList.contains('header-top-close')) {
            let headerTopContainer = target.parentElement;
            headerTopContainer.remove();
        }

        // Logica para tabs globales
        if (target.getAttribute("name") == "tab-button") {
            console.log(target);
            let faqValue = target.value;
            let allFaqContent = document.querySelectorAll(".tab-content");
            let faqContent = document.getElementById(faqValue);
            for (const faqContent of allFaqContent) {
                faqContent.classList.remove("active");
            }
            faqContent.classList.add("active");
        }

        // Logica para abrir y cerrar los enlaces expandidos del menu mobile
        if (target.classList.contains('mobileMenu-link')) {
            let dataExpanded = target.dataset.expand;
            if (dataExpanded) {
                let contentExpanded = document.getElementById(`${dataExpanded}`);
                contentExpanded.classList.toggle('show');

                document.addEventListener('click', (e) => {
                    if (!target.contains(e.target) && !contentExpanded.contains(e.target)) {
                        contentExpanded.classList.remove('show');
                    }
                });
            }
        }
        if (target.classList.contains('expandedLink-item-link')) {
            let dataExpanded = target.dataset.expand;
            if (dataExpanded) {
                let contentExpanded = document.getElementById(`${dataExpanded}`);
                contentExpanded.classList.toggle('show');
                target.parentElement.classList.toggle('open');

                document.addEventListener('click', (e) => {
                    if (!target.contains(e.target) && !contentExpanded.contains(e.target)) {
                        contentExpanded.classList.remove('show');
                        target.parentElement.classList.remove('open');
                    }
                });
            }
        }

    })

    let pricingSwitch = document.querySelector('.tab-switch-container');
    if (pricingSwitch) {
        pricingSwitch.addEventListener("click", (event) => {
            let target = event.target;
            let switchIndicator = document.querySelector('.switch-indicator');
            let listPasswordEl = document.querySelector('.private-list-password');
            if (target.name) {
                let pricingValue = target.value;
                switchIndicator.classList = `switch-indicator ${pricingValue}`;

                if (target.name == 'list-type-switch') {
                    let listPasswordInput = document.querySelector('#list-password');
                    if (target.id == 'private') {
                        listPasswordEl.classList.remove('hidden');
                        listPasswordInput.removeAttribute('disabled');
                    } else {
                        listPasswordEl.classList.add('hidden');
                        listPasswordInput.disabled = true;
                    }
                }
            }
        });
    }
})


function copyText(target) {
    let dataCopy = target.dataset.copy;
    const contentBtn = target.innerHTML;
    target.innerHTML = "Copied";
    setTimeout(() => {
        target.innerHTML = contentBtn;
    }, 1500);
    const textArea = document.createElement("textarea");

    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = 0;
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";

    textArea.value = dataCopy;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand("copy");
    } catch (err) {
        console.log("Oops, unable to copy");
    }
    document.body.removeChild(textArea);
}


// Agregar timer custom a las notify default - 5 seg
function createNotify(
    type = "",
    style = "success",
    title = "",
    text = undefined,
    timeout
) {
    if (type != "" && style != "" && title != "") {
        let notifyContainer = document.querySelector(".notify-container");

        notifyElement =
            `
            <div class="notify-wrapper hide ` +
            style +
            `">
                <span class="notify-icon"></span>
                <div class="notify-body">
                    <p class="notify-body_title">` +
            title +
            `</p>
                    <p class="notify-body_text">
                    ` +
            text +
            `
                    </p>
                </div>
                <button class="notify-close"></button>
            </div>
        `;
        tempNotifyElement =
            `
            <div class="temporalNotify-wrapper hide ` +
            style +
            `">
                    <p class="notify-text">
                    ` +
            title +
            `
                    </p>
            </div>
        `;

        if (!notifyContainer) {
            let notifyContainer = document.createElement("div");
            document.body.appendChild(notifyContainer);
            notifyContainer.classList.add("notify-container");

            if (type == "temp") {
                let tempNotifyContainer = document.querySelector(
                    ".temporalNotify-container"
                );
                if (tempNotifyContainer) {
                    tempNotifyContainer.insertAdjacentHTML(
                        "afterbegin",
                        tempNotifyElement
                    );

                    setTimeout(() => {
                        tempNotifyContainer.children[0].classList.remove("hide");
                    }, 50);
                    setTimeout(() => {
                        tempNotifyContainer.lastElementChild.classList.add("hide");
                        setTimeout(() => {
                            tempNotifyContainer.lastElementChild.remove();
                        }, 200);
                    }, 2000);
                } else {
                    let tempNotifyContainer = document.createElement("div");
                    notifyContainer.appendChild(tempNotifyContainer);
                    tempNotifyContainer.classList.add("temporalNotify-container");
                    tempNotifyContainer.insertAdjacentHTML(
                        "afterbegin",
                        tempNotifyElement
                    );
                    setTimeout(() => {
                        tempNotifyContainer.children[0].classList.remove("hide");
                    }, 50);
                    setTimeout(() => {
                        tempNotifyContainer.lastElementChild.classList.add("hide");
                        setTimeout(() => {
                            tempNotifyContainer.lastElementChild.remove();
                        }, 200);
                    }, 2000);
                }
            }

            if (type == "normal") {
                notifyContainer.insertAdjacentHTML("afterbegin", notifyElement);
                setTimeout(() => {
                    notifyContainer.children[0].classList.remove("hide");
                }, 100);
                if (timeout) {
                    let timeRemove = timeout + 200;
                    setTimeout(() => {
                        notifyContainer.children[0].classList.add("hide");
                    }, timeout);
                    setTimeout(() => {
                        notifyContainer.children[0].remove();
                    }, timeRemove);
                }
            }
        } else {
            if (type == "temp") {
                let tempNotifyContainer = document.querySelector(
                    ".temporalNotify-container"
                );
                if (tempNotifyContainer) {
                    tempNotifyContainer.insertAdjacentHTML(
                        "afterbegin",
                        tempNotifyElement
                    );

                    setTimeout(() => {
                        tempNotifyContainer.children[0].classList.remove("hide");
                    }, 50);
                    setTimeout(() => {
                        tempNotifyContainer.lastElementChild.classList.add("hide");
                        setTimeout(() => {
                            tempNotifyContainer.lastElementChild.remove();
                        }, 200);
                    }, 2000);
                } else {
                    let tempNotifyContainer = document.createElement("div");
                    notifyContainer.appendChild(tempNotifyContainer);
                    tempNotifyContainer.classList.add("temporalNotify-container");
                    tempNotifyContainer.insertAdjacentHTML(
                        "afterbegin",
                        tempNotifyElement
                    );
                    setTimeout(() => {
                        tempNotifyContainer.children[0].classList.remove("hide");
                    }, 50);
                    setTimeout(() => {
                        tempNotifyContainer.lastElementChild.classList.add("hide");
                        setTimeout(() => {
                            tempNotifyContainer.lastElementChild.remove();
                        }, 200);
                    }, 2000);
                }
            }

            if (type == "normal") {
                notifyContainer.insertAdjacentHTML("afterbegin", notifyElement);
                setTimeout(() => {
                    notifyContainer.children[0].classList.remove("hide");
                }, 100);
                if (timeout) {
                    let timeRemove = timeout + 200;
                    setTimeout(() => {
                        notifyContainer.children[0].classList.add("hide");
                    }, timeout);
                    setTimeout(() => {
                        notifyContainer.children[0].remove();
                    }, timeRemove);
                }
            }
        }
    }
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("notify-close")) {
            e.target.parentElement.classList.add("hide");
            setTimeout(() => {
                e.target.parentElement.remove();
            }, 500);
        }
    });
}