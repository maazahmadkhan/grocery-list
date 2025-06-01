const form = document.getElementById("grocery-form");
const input = document.getElementById("item-input");
const list = document.getElementById("grocery-list");
const dialog = document.getElementById("confirm-dialog");
const dialogTitle = document.getElementById("dialog-title");

let itemToDelete = null;

document.addEventListener("DOMContentLoaded", loadItems);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const itemText = input.value.trim();
  if (!itemText) return;

  addItem(itemText);
  saveItem(itemText);
  input.value = "";
});

function addItem(text) {
  const li = document.createElement("li");
  li.textContent = text;

  const removeBtn = document.createElement("div");
  removeBtn.className = "underline cursor-pointer text-red";
  removeBtn.textContent = "Delete";
  removeBtn.addEventListener("click", () => {
    itemToDelete = { element: li, text };
    const title = li?.childNodes?.[0]?.textContent || "";
    dialogTitle.innerText = `Are you sure you want to delete ${title}?`;
    dialog.showModal();
  });

  li.appendChild(removeBtn);
  list.appendChild(li);
}

function saveItem(item) {
  const items = getItems();
  items.push(item);
  localStorage.setItem("groceryItems", JSON.stringify(items));
}

function removeItem(item) {
  let items = getItems();
  items = items.filter((i) => i !== item);
  localStorage.setItem("groceryItems", JSON.stringify(items));
}

function getItems() {
  return JSON.parse(localStorage.getItem("groceryItems")) || [];
}

function loadItems() {
  const items = getItems();
  items.forEach(addItem);
}

// Handle dialog actions
dialog.addEventListener("close", () => {
  if (dialog.returnValue === "confirm" && itemToDelete) {
    itemToDelete.element.remove();
    removeItem(itemToDelete.text);
    itemToDelete = null;
  } else {
    itemToDelete = null; // Cancelled or closed
  }
});
