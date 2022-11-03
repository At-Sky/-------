const successBtn = document.querySelector(".buttons__success");
// const errorBtn = document.querySelector(".buttons__error");

class Notification {
  addNotification(settings) {
    this.type = settings.type;
    this.title = settings.title;
    this.message = settings.message;

    let icon;
    let divClass;
    let textColor;

    if (this.type == "success") {
      icon = "fas fa-check";
      divClass = "success";
      textColor = "#64963b";
    } else if (this.type == "error") {
      icon = "fas fa-times";
      divClass = "error";
      textColor = "#963b3b";
    }

    let notificationContent = `
      <div class="notification__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="${textColor}" d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"/></svg>
      </div>
      <div class="notification__exit-icon" onclick="notify.closeWindow(event)">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="15" height="15" viewBox="0 0 94.926 94.926" style="enable-background:new 0 0 94.926 94.926;"
            xml:space="preserve">
          <g>
            <path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0
              c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096
              c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476
              c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62
              s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"/>
          </g>
        </svg>
      </div>
      <div class="notification__content">
        <h1 class="notification-title" style="color: ${textColor}">${
      this.title
    }</h1>
        <p class="notification-message">${this.message}</p>
      </div>`;

    let notifyArea = document.createElement("div");
    notifyArea.classList.add("notification-area");

    let notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerHTML = notificationContent;

    const area = document.querySelector(".notification-area");

    let firstTimer;
    let secondTimer;

    if (!area) {
      document.body.appendChild(notifyArea);
      notifyArea.appendChild(notification);

      if (!notification) {
        clearTimeout(firstTimer);
      } else if (notification) {
        firstTimer = setTimeout(() => {
          notification.remove();
        }, 1000);
      }
    } else {
      area.appendChild(notification);

      if (!notification) {
        clearTimeout(secondTimer);
      } else {
        secondTimer = setTimeout(function() {
          notification.remove();
        }, 1000);
      }
    }
  }

  closeWindow(e) {
    e.target.parentElement.parentElement.remove();
  }
}

let notify = new Notification();

/* ----- Specify type of notification, title and message | Вызывается в cartAdd.js ----- */

// successBtn.addEventListener("click", () => {
//   notify.addNotification({
//     type: "success",
//     title: "Готово!",
//     message: "Ваш товар добавлен в корзину!"
//   });
// });

// errorBtn.addEventListener("click", () => {
//   notify.addNotification({
//     type: "error",
//     title: "Error!",
//     message: "Please try again!"
//   });
// });
