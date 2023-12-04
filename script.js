window.addEventListener("load",function(){

    document.getElementById('capture').onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;
    
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('PredictedPicture').src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }
    }
            
            button.addEventListener("click", function(){
         
             const file = document.getElementById('capture').files[0];
             console.log(file);
           
            // CUSTOM VISION URL
            var URL = "https://animaldetect-prediction.cognitiveservices.azure.com/customvision/v3.0/"
            +"Prediction/82ec7dfa-6073-4ef2-9961-ec29abab69f6/detect/iterations/animal/image";
            var xhr = new XMLHttpRequest();
            
            xhr.open('POST', URL, true);
            // CUSTOM VISION API KEY
            xhr.setRequestHeader('Prediction-Key','6425c230d0624ef5b7491fa4e36fe80c');
            xhr.setRequestHeader('Content-Type','application/octet-stream')
            xhr.send(file); 
            
            xhr.onreadystatechange = processRequest;
            
            function processRequest(e){
                if(xhr.readyState == 4 && xhr.status == 200){
                var json = JSON.parse(xhr.responseText);
                console.log(json);
                console.log(json.predictions[0]['probability']);
                console.log(typeof(json));  
    
                var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
                table.innerHTML = "";
    
                for(var i = Math.min(json.predictions.length, 1) - 1 ; i >= 0 ; i--){
                    var row = table.insertRow(0);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
    
                    cell1.innerHTML = json.predictions[i]['tagName'];
                    cell2.innerHTML = json.predictions[i]['probability'] * 100 + '%';
                    }
                }
            }
            },false);
    
            },false);