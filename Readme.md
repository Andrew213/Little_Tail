# Heading

<h1 align="center">Little Tail</h1>


# Title

Работа находится по адресу [Little_Tail](http://littletail.webtm.ru/)

### Запуск проекта

```
npm run dev
```
Запускается на порте 8080

#### Архитектура проекта

* components
 * Login - окно авторизации
  * Navigation - навигация (вложен в хедер в компоненте App)
  * PetModal - модальное окно питомца
  * Pets - страница всех животных
  * Today - страница приема


* store
 * store - главный стор приложения
 * reducers - содержит combineReducers
 * папки для каждого стора