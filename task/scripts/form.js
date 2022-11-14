import { cart } from "./scripts/cart.js";

const cartInput = document.querySelector('.form__input_cart')
const validation = new JustValidate('#form');

validation
  .addField('#name', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Имя должно содержать не меньше 3 букв',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Имя должно содержать не больше 3 букв',
    },
    {
        rule: 'required',
        errorMessage: 'Поле обязательно',
    },
  ])
  .addField('#phone', [
    {
      rule: 'customRegexp',
      value: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
      errorMessage: 'Телефон неверен',
    },
    {
      rule: 'required',
      errorMessage: 'Поле обязательно',
    },
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно',
    },
    {
      rule: 'email',
      errorMessage: 'Адрес неверен',
    },
  ]).onSuccess(() => {
    let formData = new FormData(form);
    formSend(formData)
  })

async function formSend(formData) {
  cartInput.value = formatCart(cart)

  form.classList.add('form_loading')

  let response = await fetch('./sendmail.php', {
    method: 'POST', 
    body: formData,
  })

  if (response.ok) {
    form.reset()
    form.classList.remove('form_loading')
  }

}


function formatCart(cart) {

  let list = []

  let reduced = cart.reduce((acc, n) => (acc[n.id] = (acc[n.id] || 0) + 1, acc), {});

  Object.keys(reduced).forEach((key) => {
    let prod = cart.find(item => item.id == key ? true : false)
    list.push(prod)
  })

  list.map((item) => item.amount = reduced[item.id])

  return JSON.stringify(list)
}
