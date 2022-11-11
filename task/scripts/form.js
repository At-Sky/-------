const form = document.querySelector('.form');
const validation = new JustValidate('#form');
let success;

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
  ]).onSuccess((event) => {
    console.log('Validation passes and form submitted', event);
    success = event
    formSend(event, success)
    console.log(success)
  });

async function formSend(e, success) {
  e.preventDefault()

  let formData = new FormData(form)
  console.log(success)
  if (success) {
    form.classList.add('form_loading')
    console.log(success)
    let response = await fetch('sendmail.php', {
      method: 'POST', 
      body: formData
    })

    if (response.ok) {
      let result = await response.json()

      formPreview.innerHTML = ''
      form.reset()
      form.classList.remove('form_loading')
    }
  }
}
