import React from 'react';

import './style.scss';

export default function Info() {
  return (
    <div className='rulles'>
      <p>Зробити апку на реакт/редакс/редакс-сага де можна створювати пости і залишати відгуки під ними.</p>
      <p>Автор може редагувати/видаляти свій пост/відгук.</p>
      <p>Автор посту не може залишати відгуки під своїм постом,</p>
      <p>відвідувач не може залишати більше ніж 1 відгук до поста.</p>
      <p>Замість бекенду можна використати localStorage, і робити запити асинхронно через таймаути.</p>
      <p>Всі запити здійснювати через саги.</p>
      <p>Авторизація дуже проста, просто форма з логін і пароль.</p>
      <p>Записи всіх юзерів і їх інфо також зберігати в localStorage</p>
    </div>
  )
}