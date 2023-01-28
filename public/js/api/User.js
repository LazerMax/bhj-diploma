/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

    static URL = "/user";

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */

  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const current = localStorage.getItem("user");
    return current;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({url: User.URL+'/current', method: 'GET', callback(err, response){
        let obj = JSON.parse(response);

        if ( obj && obj.user ) {
          User.setCurrent( obj.user );
        } else{
            User.unsetCurrent();
        }
        callback(err, response);
      }});
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({data: data, url: User.URL+'/login', method: 'POST', callback(err, response){
        let obj = JSON.parse(response);
        if ( obj && obj.user ) {
          User.setCurrent( obj.user );
        }
        callback(err, response);
      }});
      location.reload();
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({data: data, url: User.URL+'/register', method: 'POST', callback(err, response){
      let obj = JSON.parse(response);
        if ( obj && obj.user ) {
          User.setCurrent( obj.user );
        }
        callback(err, response);
      }});
    location.reload();
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({url: User.URL+'/logout', method: 'POST', callback(err, response){
        let obj = JSON.parse(response);
        if ( obj && obj.user ) {
          User.unsetCurrent();
        }
        callback(err, response);
      }});
      location.reload();
  }
}
