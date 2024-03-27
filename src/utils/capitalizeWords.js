export function capitalizeWords(title) {

  if (!title) {
      return "Título inválido";
  }


  const words = title.split(" ");


  for (let i = 0; i < words.length; i++) {

      if (words[i]) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
  }


  const formattedTitle = words.join(" ");

  return formattedTitle;
}
