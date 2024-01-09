export function validSequence(braces: string) {
  const stack = [];
  let last;

  for (let i = 0; i < braces.length; i++) {
    if (braces[i] === "[" || braces[i] === "(" || braces[i] === "{" || braces[i] === "<") {
      // если на входе скобка открыв., то добавляем в стэк
      stack.push({ key: braces[i], value: i });
    } else if (braces[i] === "]" || braces[i] === ")" || braces[i] === "}" || braces[i] === ">") {
      //если на входе закрыв. скобка
      if (stack.length) {
        // и стэк не пустой
        last = stack[stack.length - 1].key; //проверяем какая последняя и сравниваем
        if (
          (last === "[" && braces[i] === "]") ||
          (last === "(" && braces[i] === ")") ||
          (last === "{" && braces[i] === "}") ||
          (last === "<" && braces[i] === ">")
        ) {
          stack.pop(); //если скобки одинакового типа, то убираем последнюю открыв. из стэка
        }
      }
    }
  }
  for (let i = braces.length; i >= 0; i--) {
    if (braces[i] === "]" || braces[i] === ")" || braces[i] === "}" || braces[i] === ">") {
      // если на входе скобка закрыта, то добавляем в стэк
      stack.push({ key: braces[i], value: i });
    } else if (braces[i] === "[" || braces[i] === "(" || braces[i] === "{" || braces[i] === "<") {
      //если на входе открыв. скобка
      if (stack.length) {
        // и стэк не пустой
        last = stack[stack.length - 1].key; //проверяем какая последняя и сравниваем
        if (
          (last === "]" && braces[i] === "[") ||
          (last === ")" && braces[i] === "(") ||
          (last === "}" && braces[i] === "{") ||
          (last === ">" && braces[i] === "<")
        ) {
          stack.pop(); //если скобки одинакового типа, то убираем последнюю открыв. из стэка
        }
      }
    }
  }

  return new Set(stack.map((item) => item.value)); // возвращаем массив позиций
}
