/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    const formData = new FormData;
    let template;
    let myObj = options.data;
    template = options.url;
    if (options.method === "GET") {

        if (myObj){
            template += "?";
            for(let key in myObj){
                template += myObj[key]+"&";
            }
        }
        console.log(options.url);
            if(template){
                template.slice(0, -1);
            }
        xhr.open('GET', template);
        xhr.send();

        } else {

        if (myObj) {
            for (let key in myObj) {
                formData.append(key, myObj[key]);
            }
        }
        xhr.open(options.method, template);
        xhr.send(formData);
            }
    try{
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                options.callback(null, xhr.response);
            }
        }
    } catch (err){
        options.callback(err, xhr.response);
    }
};
