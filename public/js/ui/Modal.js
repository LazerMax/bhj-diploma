/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    if(element){
      Modal.element = element;
      this.registerEvents();
    } else{
      console.log("The element is not exist");
    }
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    if(Modal.element.style.display){
      Modal.element.querySelectorAll("[data-dismiss=modal]").forEach(e => e.addEventListener("click", el => this.onClose(el.target)));
    }
    else{
      console.log(Modal.element)
      this.open();
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    e.preventDefault();
    this.close();
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    document.querySelectorAll(".menu-item").forEach(e => e.addEventListener("click", el => {
      console.log(el.closest());
    }))
    //Modal.element.querySelectorAll()addEventListener("click", el => {
   //   el.target.preventDefault();
    // el.style.display = "block";});
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    Modal.element.style.removeProperty("display");
  }
}