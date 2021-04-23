export function getNumberInput(message, min, max){
    let result = ""
    while(true){
        result = prompt(message, "");
        if(result === null || result === ""){
            result = null;
            break;
        }
        result = Number(result);
		if (isNaN(result) || (result < min) || (result > max) || (Math.floor(result) !== result)){
			alert(`Enter a number from ${min}-${max}`);
			continue;
		}
		break;
    }
    return result;
}