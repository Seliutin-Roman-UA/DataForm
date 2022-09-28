//Инициализация
const formRef = document.querySelector(".js-contact-form");
const FORM_STORAGE_KEY = "form-storage-key";
const KEY = "MyData";
let formData = new FormData(formRef);

//Функции
function fillFormInStart() {
  const dataFromLS = load(KEY);
  console.log("dataFromLS = ", dataFromLS);
  if (!dataFromLS) return;
  Object.entries(dataFromLS).forEach(([name, value]) => {
    formRef[name].value = value;
  });
}

function collectFormData() {
  formData = new FormData(formRef);
  let formAsObject = Object.fromEntries([...formData]);
  return formAsObject;
}

// Тело
fillFormInStart();

formRef.addEventListener("input", (e) => {
  e.preventDefault();
  save(KEY, collectFormData());
});

formRef.addEventListener("submit", (e) => {
  e.preventDefault();
  const formAsObject = collectFormData();
  for (let i of Object.values(formAsObject)) {
    if (i === "") {
      console.log("Введите все значения");
      return;
    }
  }
  console.log("Данные формы в виде обьекта  ", formAsObject);
  remove(KEY);
  e.currentTarget.reset();
  console.log("Дякуємо за зворотній відгук!");
});

// Плюшки
function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
}
function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
}
function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
}
