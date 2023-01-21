/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    const formData = new FormData;
    let template;
    try{
        xhr.addEventListener("load", () => {
            let myObj = options.data;

            if (options.method === "GET") {
                 template = options.URL;

                if (myObj){
                    template += "?";
                }

                for(let key in myObj){
                    template += myObj.key+"&";
                }

                template.slice(0, -1);
                xhr.open('GET', template);
                xhr.send();

            } else {
                template = options.URL;
                for(let key in myObj){
                    formData.append( key, myObj.key);
                }
            }
            options.callback(null, xhr.response);
        });
    } catch (err){
        options.callback(err, xhr.response);
    }
    xhr.open(options.method, template);
    xhr.responseType = 'json';
    if(options.method === "GET"){
        xhr.send();
    }
    else{
        xhr.send(formData);
    }
};
