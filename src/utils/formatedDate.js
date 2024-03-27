export const formatedDate = (date) => {

    if (!date) {
        return "Data inválida";
    }


    const split = date.split("-");
    

    if (split.length !== 3) {
        return "Formato de data inválido";
    }


    const formattedDate = split[2] + "/" + split[1] + "/" + split[0];
    
    return formattedDate;
}
