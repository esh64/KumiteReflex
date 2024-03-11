document.getElementById("training-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const selectedKicks = [];
    const checkboxes = document.querySelectorAll('input[name="kicks"]:checked');
    checkboxes.forEach((checkbox) => {
        selectedKicks.push(checkbox.value);
    });
    
    const reactionTime = parseInt(document.getElementById("reaction-time").value) * 1000; // Convert to milliseconds
    const trainingTime = parseInt(document.getElementById("training-time").value) * 60000; // Convert to milliseconds
    const executionTime = parseInt(document.getElementById("execution-time").value) * 1000; // Convert to milliseconds
    
    startTraining(selectedKicks, reactionTime, trainingTime, executionTime);
});

function startTraining(selectedKicks, reactionTime, trainingTime, executionTime) {
    document.getElementById("initial-screen").style.display = "none";
    document.getElementById("training-screen").style.display = "block";
   
    const kicks1x2 = ["Kizame Zuki", "Mawashi Geri", "Ura Mawashi Geri", "Kizami Mawashi Geri", "Kizami Ura Mawashi Geri"];
    const kicks2x2 = ["Gyaku Zuki", "Mawashi Geri", "Kizami Mawashi Geri", "Yoko Geri", "Avançar", "Recuar"];
    const kicks2x1 = ["Desviar para esquerda"];
    const kicks2x3 = ["Desviar para direita"];

    const b_1x2 = ['','Avançar'];
    const b_2x2 = ['',];
    const b_2x1 = ['',"Desviar para esquerda"];
    const b_2x3 = ['',"Desviar para direita"];
    const b_3x2 = ['','Recuar'];
    
    selectedKicks.forEach((kick) => {
        if (kicks1x2.includes(kick)) {
            b_1x2.push(kick);
        }
        if (kicks2x2.includes(kick)) {
            b_2x2.push(kick);
        }
        if (kicks2x1.includes(kick)) {
            b_2x1.push(kick);
        }
        if (kicks2x3.includes(kick)) {
            b_2x3.push(kick);
        }
    });

    const startTime = Date.now(); // Tempo de início do treinamento
    const endTime = startTime + trainingTime; // Tempo de término do treinamento
    
    const countdownInterval = setInterval(function() {
        const remainingTime = endTime - Date.now(); // Tempo restante em milissegundos
        const remainingSeconds = Math.ceil(remainingTime / 1000); // Converter para segundos e arredondar para cima
        
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        
        document.getElementById("countdown").textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("training-screen").style.display = "none";
            document.getElementById("initial-screen").style.display = "block";
        }
    }, 1000); // Atualizar a cada segundo
    
    const intervalId = setInterval(function() {
        clearTable(); // Limpar toda a tabela antes de exibir um novo movimento
        
        const randomPosition = getRandomIndex(5); // Select random position index
        let selectedList;
        let cellId;
        
        switch (randomPosition) {
            case 0:
                selectedList = b_1x2;
                cellId = "1x2";
                break;
            case 1:
                selectedList = b_2x2;
                cellId = "2x2";
                break;
            case 2:
                selectedList = b_2x1;
                cellId = "2x1";
                break;
            case 3:
                selectedList = b_2x3;
                cellId = "2x3";
                break;
            case 4:
                selectedList = b_3x2;
                cellId = "3x2";
                break;
            default:
                break;
        }
        
        const randomKickIndex = getRandomIndex(selectedList.length);
        const randomKick = selectedList[randomKickIndex];
        
        document.getElementById(cellId).textContent = randomKick;
        setColor(randomKick, cellId);
        
        const randomTime = getRandomTime(executionTime);
        setTimeout(function() {
            document.getElementById(cellId).textContent = "";
            document.getElementById(cellId).style.backgroundColor = "#ffffff"; // Reset background color
        }, randomTime);
    }, reactionTime);
    
    setTimeout(function() {
        clearInterval(intervalId);
        clearInterval(countdownInterval);
        document.getElementById("training-screen").style.display = "none";
        document.getElementById("initial-screen").style.display = "block";
    }, trainingTime);
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function getRandomTime(baseTime) {
    return Math.floor(Math.random() * (1.75 * baseTime - baseTime) + baseTime);
}

function clearTable() {
    const cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.style.backgroundColor = "#ffffff"; // Reset background color
    });
}

function setColor(kick, cellId) {
    switch (kick) {
        case "Kizame Zuki":
            document.getElementById(cellId).style.backgroundColor = "green";
            break;
        case "Gyaku Zuki":
            document.getElementById(cellId).style.backgroundColor = "green";
            break;
        case "Mawashi Geri":
            document.getElementById(cellId).style.backgroundColor = "blue";
            break;
        case "Ura Mawashi Geri":
            document.getElementById(cellId).style.backgroundColor = "red";
            break;
        case "Kizami Mawashi Geri":
            document.getElementById(cellId).style.backgroundColor = "cyan";
            break;
        case "Kizami Ura Mawashi Geri":
            document.getElementById(cellId).style.backgroundColor = "pink";
            break;
        case "Yoko Geri":
            document.getElementById(cellId).style.backgroundColor = "yellow";
            break;
        case "Avançar":
            document.getElementById(cellId).style.backgroundColor = "orange";
            break;
        case "Recuar":
            document.getElementById(cellId).style.backgroundColor = "orange";
            break;
        case "Desviar para esquerda":
            document.getElementById(cellId).style.backgroundColor = "orange";
            break;
        case "Desviar para direita":
            document.getElementById(cellId).style.backgroundColor = "orange";
            break;
        default:
            break;
    }
}

// Função para acessar a webcam e exibir o vídeo
function startWebcam() {
    const videoElement = document.getElementById("videoElement");

    // Solicitar permissão para acessar a webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            videoElement.srcObject = stream;
            videoElement.addEventListener('loadedmetadata', function() {
                // Obter as dimensões do vídeo
                const videoWidth = this.videoWidth;
                const videoHeight = this.videoHeight;
                
                console.log(videoWidth)
                console.log(videoHeight)
                // Definir o tamanho da tabela com base nas dimensões do vídeo
                const trainingTable = document.getElementById('training-table');
                trainingTable.style.width = videoWidth + 'px';
                trainingTable.style.height = videoHeight + 'px';
            });
        })
        .catch(function(error) {
            console.error("Erro ao acessar a webcam: ", error);
        });
}

// Iniciar a exibição da webcam ao carregar a página
window.addEventListener("load", startWebcam);

